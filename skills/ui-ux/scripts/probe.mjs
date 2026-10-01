#!/usr/bin/env node
// Mở trang thật ở nhiều bề rộng, đo những lỗi máy đo được, chụp ảnh để mắt soi phần còn lại.
// Dùng ở cổng 3 của checklist (references/checklist.md). Chỉ đọc trang, không sửa gì.
//
//   node probe.mjs <url> [--widths 375,768,1024,1280,1440,1920] [--out <thư mục>] [--dark] [--wait 800] [--dpr 1]
//                        [--sweep [1440,375,20]] [--wireframe <link phương án đã chọn>]
//
// --wireframe: so bản dựng với wireframe đã chọn (design-process.md, U4) ở 1440 và 375: khoảng nào cao thấp khác,
// chữ nào đổi hay thiếu, cỡ chữ, độ đậm nào khác; link có mau=mau thì so cả màu chữ, màu icon, nền. Ghi vào danh sách P.
//
// --sweep: đo xong các khổ cố định thì kéo bề rộng từ 1440 xuống 375, mỗi bước 20px, chụp từng bước và
// báo khoảng bề rộng có lỗi (cuộn ngang, khung giấu chữ, chữ trong nút xuống dòng, hàng rớt dòng, chữ cắt
// nuốt mất số hay còn quá ngắn). Bắt
// lỗi nằm giữa hai khổ cố định, ví dụ nav xuống dòng ở 900px. Dùng ở nhánh soi UI (references/review.md).
//
// Playwright tìm theo thứ tự: --pw <thư mục có node_modules/playwright>, thư mục đang đứng, thư mục script.
// Chưa có thì cài vào một thư mục tạm, đừng cài vào dự án:
//   npm i --prefix "$TMPDIR/evon-probe" playwright && node probe.mjs <url> --pw "$TMPDIR/evon-probe"

import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultWidths = [375, 768, 1024, 1280, 1440, 1920];
const defaultSweep = [1440, 375, 20];
const mobileWidthLimit = 640;
// Sàn cỡ bấm của skill: nút h-8 trong bảng dày là nhỏ nhất được phép (list-row.md).
const minTapSize = 32;
// Số lần bấm Tab tối đa, và số phần tử cùng kiểu (cùng thẻ + class) được chụp so: nút thứ ba trở đi của
// 8 card giống nhau thì Tab lướt qua, để trang nhiều card vẫn đi tới được nút nổi ở cuối trang.
const maxTabStops = 160;
const maxFocusChecksPerKind = 2;

function parseArgs(argv) {
  const options = { url: "", widths: defaultWidths, out: "", isDark: false, waitMs: 800, dpr: 1, playwrightDir: "", sweep: null, wireframeUrl: "" };
  const rest = [...argv];

  while (rest.length > 0) {
    const arg = rest.shift();

    if (arg === "--widths") options.widths = rest.shift().split(",").map(Number);
    else if (arg === "--sweep") {
      const [from, to, step] = /^\d+,\d+(,\d+)?$/.test(rest[0] ?? "") ? rest.shift().split(",").map(Number) : defaultSweep;
      options.sweep = { from: Math.max(from, to), to: Math.min(from, to), step: step || defaultSweep[2] };
    }
    else if (arg === "--out") options.out = rest.shift();
    else if (arg === "--dark") options.isDark = true;
    else if (arg === "--wait") options.waitMs = Number(rest.shift());
    else if (arg === "--dpr") options.dpr = Number(rest.shift());
    else if (arg === "--pw") options.playwrightDir = rest.shift();
    else if (arg === "--wireframe") options.wireframeUrl = rest.shift();
    else if (!arg.startsWith("--")) options.url = arg;
  }

  if (!options.out) options.out = join(tmpdir(), `evon-probe-${Date.now()}`);

  return options;
}

function loadPlaywright(playwrightDir) {
  const searchDirs = [playwrightDir, process.cwd(), fileURLToPath(new URL(".", import.meta.url))].filter(Boolean);

  for (const searchDir of searchDirs) {
    try {
      return createRequire(join(resolve(searchDir), "noop.js"))("playwright");
    } catch {
      // Thử thư mục kế tiếp.
    }
  }

  return null;
}

async function launchBrowser(chromium) {
  try {
    return await chromium.launch();
  } catch {
    // Chưa tải Chromium của Playwright thì dùng Chrome đã cài trên máy.
    return chromium.launch({ channel: "chrome" });
  }
}

// ---------- Các phép đo, chạy trong trang ----------

// Tắt transition và animation để đo và chụp ra trạng thái cuối, không phải giữa chừng.
const freezeMotionCss = "*,*::before,*::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important;caret-color:transparent!important}";

// Probe tắt mọi chuyển động trước khi đo (ảnh chụp ổn định), nên ghi lại `transition` của từng phần tử vào
// `data-evon-transition` trước đó, để các mục đo chuyển động (18f, 18g) còn đọc được.
function stampTransitions() {
  for (const element of document.body.querySelectorAll("*")) {
    const style = getComputedStyle(element);
    if (parseFloat(style.transitionDuration) > 0) element.dataset.evonTransition = style.transitionProperty;
  }
}

function measureInPage({ minTapSize, isMobile, isSweep = false }) {
  const viewportWidth = document.documentElement.clientWidth;

  // 0. Trang tự cuộn khi vừa tải: cửa sổ hay khung cuộn chính (cao từ 60% màn) đã rời đầu trang trước
  //    khi ai chạm vào. Khung nhỏ cuộn sẵn xuống đáy (danh sách tin nhắn) là cố ý, không tính.
  const autoScrolledAreas = [];
  if (window.scrollY > 0) autoScrolledAreas.push(`cửa sổ đã cuộn ${Math.round(window.scrollY)}px`);
  for (const container of document.querySelectorAll("body *")) {
    const overflowY = getComputedStyle(container).overflowY;
    if (!["auto", "scroll"].includes(overflowY) || container.scrollTop <= 0 || container.clientHeight < window.innerHeight * 0.6) continue;
    // Lưới giờ cuộn sẵn tới vạch "bây giờ" (`data-now`, `layouts/app.md` "Lưới giờ trong ngày") là cố ý: vạch
    // nằm trong phần đang thấy của khung thì không tính (báo nhầm 30/09/2026, lịch hẹn nha khoa).
    const containerRect = container.getBoundingClientRect();
    const isScrolledToNow = [...container.querySelectorAll("[data-now]")].some((marker) => {
      const markerRect = marker.getBoundingClientRect();
      return markerRect.top >= containerRect.top && markerRect.bottom <= containerRect.bottom;
    });
    if (isScrolledToNow) continue;
    const classes = (container.getAttribute("class") || "").trim().split(/\s+/).slice(0, 5).join(".");
    autoScrolledAreas.push(`${container.tagName.toLowerCase()}${classes ? "." + classes : ""} đã cuộn ${Math.round(container.scrollTop)}px`);
  }

  function describe(element) {
    const tag = element.tagName.toLowerCase();
    const label = (element.getAttribute("aria-label") || element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    const classes = (element.getAttribute("class") || "").trim().split(/\s+/).slice(0, 6).join(".");

    return `${tag}${classes ? "." + classes : ""}${label ? ` "${label}"` : ""}`;
  }

  function isVisible(element) {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);

    return rect.width > 2 && rect.height > 2 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0;
  }

  function isClippedHorizontally(element) {
    for (let ancestor = element.parentElement; ancestor && ancestor !== document.body; ancestor = ancestor.parentElement) {
      const overflowX = getComputedStyle(ancestor).overflowX;
      if (overflowX !== "visible") return true;
    }

    return false;
  }

  function getFirstTextRect(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (textNode) => (textNode.textContent.trim() && isVisible(textNode.parentElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    const textNode = walker.nextNode();
    if (!textNode) return null;

    const range = document.createRange();
    const text = textNode.textContent;
    const start = text.length - text.trimStart().length;
    range.setStart(textNode, start);
    range.setEnd(textNode, text.trimEnd().length);

    const rect = range.getBoundingClientRect();

    return { left: rect.left, right: rect.right, width: rect.width, text: text.trim().slice(0, 12), node: textNode };
  }

  // Chữ trong chip / badge (khối có nền hoặc viền) thì mép thẳng cột là mép khối, không phải mép chữ:
  // chữ "VIP" thụt 8px trong pill là đúng (báo nhầm 27/09/2026, panel xem nhanh khách hàng).
  function getBoxedTextEdge(textRect, cell) {
    for (let node = textRect.node.parentElement; node && node !== cell; node = node.parentElement) {
      const style = getComputedStyle(node);
      const hasFill = style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent";
      const hasBorder = parseFloat(style.borderLeftWidth) > 0 && style.borderLeftStyle !== "none";
      if (hasFill || hasBorder) {
        const boxRect = node.getBoundingClientRect();

        return { left: boxRect.left, right: boxRect.right };
      }
    }

    return textRect;
  }

  const isColorClass = (className) =>
    /^(bg|fill|stroke|ring|inset-ring|outline|decoration|shadow|from|via|to)-/.test(className) ||
    (/^text-/.test(className) && !/^text-(xs|sm|base|lg|\d?xl|\[)/.test(className)) ||
    (/^border-/.test(className) && !/^border-(\d|[trblxy]($|-\d))/.test(className));
  // Tập các đường thẻ + class (bỏ class màu) của con cháu ba tầng, không tính số lượng: ô lịch hai việc
  // với ô ba việc cùng cấu trúc, nên ô ba việc cao lệch 2px vẫn bị bắt (26/09/2026).
  function getStructureSignature(element) {
    const paths = new Set();
    const visit = (node, prefix, depth) => {
      for (const child of node.children) {
        const classKey = (child.getAttribute("class") || "").split(/\s+/).filter((className) => className && !isColorClass(className)).sort().join(".");
        const path = `${prefix}>${child.tagName}.${classKey}`;
        paths.add(path);
        if (depth < 3) visit(child, path, depth + 1);
      }
    };
    visit(element, "", 1);

    return [...paths].sort().join("|");
  }

  // Thanh công cụ và khung lý do của trang wireframe (`design-process.md` U3) nằm ngoài bản thiết kế: không đo.
  //  Đã báo nhầm 30/09/2026, wireframe nha khoa: "hàng nút header không đồng cỡ", chỗ bấm nhỏ, vạch lệch với thanh.
  const isWireframeChrome = (element) => Boolean(element.closest(".wf-bar, .wf-reason, [data-wf-reason]"));
  const allElements = [...document.body.querySelectorAll("*")].filter((element) => !["SCRIPT", "STYLE", "svg", "path"].includes(element.tagName) && !isWireframeChrome(element));

  // 1. Cuộn ngang: trang rộng hơn màn, và phần tử nào lòi ra ngoài mép phải.
  const pageScrollWidth = document.documentElement.scrollWidth;
  const overflowingElements = allElements
    .filter((element) => isVisible(element) && element.getBoundingClientRect().right > viewportWidth + 1 && !isClippedHorizontally(element))
    .map((element) => ({ element: describe(element), right: Math.round(element.getBoundingClientRect().right) }))
    .slice(0, 8);

  // 1b. Khung giấu mất chữ: khung overflow hidden / clip mà có chữ bên trong nằm ngoài khung (hàng chip
  //     cao cố định giấu hàng thứ hai, số liệu bị xén). Chữ nằm trong một khung cắt hay khung cuộn nhỏ
  //     hơn thì để khung đó tự báo: dấu … và line-clamp đã có mục 2, bảng cuộn ngang là cố ý.
  function findHiddenText(container, isClippingX, isClippingY) {
    const box = container.getBoundingClientRect();
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);

    for (let textNode = walker.nextNode(); textNode; textNode = walker.nextNode()) {
      const holder = textNode.parentElement;
      if (!textNode.textContent.trim() || !holder || holder.closest("[aria-hidden='true'], [inert]")) continue;
      if (getComputedStyle(holder).visibility === "hidden") continue;

      let isInnerClip = false;
      for (let node = holder; node && node !== container; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (style.overflowX !== "visible" || style.overflowY !== "visible") isInnerClip = true;
      }
      if (isInnerClip) continue;

      const range = document.createRange();
      range.selectNodeContents(textNode);
      for (const rect of range.getClientRects()) {
        if (rect.width === 0) continue;
        const isOutsideX = isClippingX && (rect.right > box.right + 1 || rect.left < box.left - 1);
        const isOutsideY = isClippingY && (rect.bottom > box.bottom + 1 || rect.top < box.top - 1);
        if (isOutsideX || isOutsideY) {
          return textNode.textContent.trim().replace(/\s+/g, " ").slice(0, 30);
        }
      }
    }

    return "";
  }

  const clippedBlocks = [];
  for (const element of allElements) {
    if (clippedBlocks.length >= 8) break;
    const style = getComputedStyle(element);
    // Xét từng chiều: cột trang `overflow-x-hidden overflow-y-auto` cuộn dọc được, chữ dưới mép màn
    // không bị giấu (báo nhầm 27/09/2026, dự án mồi phase 2, mọi khổ desktop).
    const isClippingX = ["hidden", "clip"].includes(style.overflowX);
    const isClippingY = ["hidden", "clip"].includes(style.overflowY);
    const isEllipsis = style.textOverflow === "ellipsis" || style.webkitLineClamp !== "none";
    const hasMoreContent = (isClippingX && element.scrollWidth > element.clientWidth + 1) || (isClippingY && element.scrollHeight > element.clientHeight + 1);
    if (isEllipsis || !hasMoreContent || !isVisible(element)) continue;

    const hiddenText = findHiddenText(element, isClippingX, isClippingY);
    if (hiddenText) clippedBlocks.push({ element: describe(element), hiddenText });
  }

  // 1c. Chữ trong nút, link, tab xuống hai dòng: nút bị bóp. Chỉ tính nhãn ngắn một mảnh chữ; link nằm
  //     trong đoạn văn, card bọc link, mục menu có dòng mô tả thì nhiều dòng là đúng.
  const wrappedControls = [];
  for (const control of document.querySelectorAll("a, button, [role='tab'], [role='menuitem']")) {
    if (wrappedControls.length >= 8) break;
    if (!isVisible(control) || getComputedStyle(control).display === "inline") continue;
    // Nút "nhãn dài" cố ý đặt trong khung hẹp trên trang design system (`D9`, `data-demo-state`): báo mãi ở
    // cả 4a lẫn 4b ngày 30/09/2026.
    if (control.closest("[data-demo-state]")) continue;
    // Ô dạng icon trên chữ dưới (ô danh mục cao từ 56px) thì nhãn hai dòng là thiết kế, không phải nút bị
    // bóp (báo nhầm 27/09/2026, ô danh mục ở dự án mồi phase 2).
    const controlStyle = getComputedStyle(control);
    if (controlStyle.flexDirection.startsWith("column") && controlStyle.display.includes("flex") && control.getBoundingClientRect().height >= 56) continue;

    const textNodes = [];
    const walker = document.createTreeWalker(control, NodeFilter.SHOW_TEXT);
    for (let textNode = walker.nextNode(); textNode; textNode = walker.nextNode()) if (textNode.textContent.trim()) textNodes.push(textNode);
    if (textNodes.length !== 1 || textNodes[0].textContent.trim().length > 40) continue;

    const range = document.createRange();
    range.selectNodeContents(textNodes[0]);
    const lineTops = new Set([...range.getClientRects()].filter((rect) => rect.width > 0).map((rect) => Math.round(rect.top)));
    if (lineTops.size > 1) wrappedControls.push(describe(control));
  }

  // 1d. Hàng rớt dòng trong header, nav, thanh công cụ, thanh tab: con của một hàng flex-wrap nằm trên
  //     hai dòng. Lưới card flex-wrap ở thân trang thì rớt dòng là cố ý, không đo.
  const wrappedRows = [];
  for (const row of document.querySelectorAll("header, header *, nav, nav *, [role='toolbar'], [role='tablist']")) {
    if (wrappedRows.length >= 6) break;
    const style = getComputedStyle(row);
    if (!style.display.includes("flex") || !style.flexDirection.startsWith("row") || style.flexWrap !== "wrap" || !isVisible(row)) continue;

    const visibleChildren = [...row.children].filter(isVisible);
    const children = visibleChildren.map((child) => child.getBoundingClientRect());
    if (children.length < 2) continue;
    const shortestHeight = Math.min(...children.map((rect) => rect.height));
    const topSpread = Math.max(...children.map((rect) => rect.top)) - Math.min(...children.map((rect) => rect.top));
    if (topSpread <= shortestHeight / 2) continue;
    // Chỉ dòng chữ (không có control) tách lên dòng riêng, các control vẫn chung một hàng: phân trang
    // "1–8 trên 34" nằm trên dãy số trang ở màn hẹp là cố ý (báo nhầm hai lần 30/09/2026, dự án mồi kho hàng).
    const interactiveSelector = "a[href], button, input, select, textarea, [role='button'], [role='tab'], [tabindex]";
    const controlTops = visibleChildren
      .filter((child) => child.matches(interactiveSelector) || child.querySelector(interactiveSelector))
      .map((child) => Math.round(child.getBoundingClientRect().top));
    const isCaptionOnlyWrap = controlTops.length > 0 && controlTops.length < visibleChildren.length && Math.max(...controlTops) - Math.min(...controlTops) <= shortestHeight / 2;
    if (!isCaptionOnlyWrap) wrappedRows.push(describe(row));
  }
  // 1d2. Hàng nút ở bất kỳ đâu (footer panel, card) mà nút chỉ icon (⋯) rớt xuống dòng dưới một mình: nhìn
  //      như một nút lạc (30/09/2026, panel chi tiết 352px của wireframe lịch hẹn: "Bắt đầu khám", "Mở hồ sơ"
  //      một dòng, ⋯ dòng dưới). Sửa: nút không `flex-1`, rút nhãn, hoặc ⋯ lên header panel.
  for (const row of document.querySelectorAll("div, footer, section, ul, ol, p")) {
    if (wrappedRows.length >= 6) break;
    const style = getComputedStyle(row);
    if (!style.display.includes("flex") || !style.flexDirection.startsWith("row") || style.flexWrap !== "wrap" || !isVisible(row)) continue;
    const children = [...row.children].filter(isVisible);
    if (children.length < 2) continue;
    const lastChild = children.at(-1);
    const lastTop = lastChild.getBoundingClientRect().top;
    const isAlone = children.slice(0, -1).every((child) => child.getBoundingClientRect().bottom <= lastTop + 1);
    if (!isAlone) continue;
    const isButtonRow = children.every((child) => child.matches("button, a[href], [role='button']"));
    if (isButtonRow && !lastChild.textContent.trim()) {
      wrappedRows.push(`nút chỉ icon rớt dòng một mình: ${describe(lastChild)} trong ${describe(row)}`);
      continue;
    }
    // `R3`: hàng mục ngắn (chú thích, số đếm, chip) từ ba mục mà dòng dưới chỉ còn một mục (30/09/2026, chú
    // thích sơ đồ răng 375px: "Mất răng" rớt một mình). Lưới card (mục rộng quá nửa hàng) thì rớt là bình thường.
    const rowWidth = row.getBoundingClientRect().width;
    const isShortItems = children.every((child) => child.getBoundingClientRect().width < rowWidth / 2 && child.getBoundingClientRect().height < 48);
    if (children.length >= 3 && isShortItems) wrappedRows.push(`mục rớt dòng một mình (R3): ${describe(lastChild)} trong ${describe(row)}`);
  }

  // 2. Chữ bị cắt còn quá ngắn: ô chỉ đọc được vài ký tự thì như không có chữ.
  const truncatedTexts = allElements
    .filter((element) => {
      const style = getComputedStyle(element);
      const isEllipsis = style.textOverflow === "ellipsis" || style.webkitLineClamp !== "none";

      return isEllipsis && isVisible(element) && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1);
    })
    .map((element) => {
      const fullText = element.textContent.trim().replace(/\s+/g, " ");
      const style = getComputedStyle(element);
      const isClamp = style.webkitLineClamp !== "none";
      const visibleRatio = isClamp ? element.clientHeight / element.scrollHeight : element.clientWidth / element.scrollWidth;

      return { element: describe(element), fullText, visibleChars: Math.floor(fullText.length * visibleRatio), width: Math.round(element.clientWidth), isSingleLine: !isClamp };
    });
  const tooShortTexts = truncatedTexts.filter((item) => item.visibleChars < 10 && item.fullText.length > item.visibleChars + 3);

  // 18d. Chữ cắt nuốt mất số: dòng `truncate` một dòng mà phần bị giấu có số kèm đơn vị (m², triệu, đ, %).
  //      Số thường là thứ người dùng dùng để so sánh ("Duplex gác xép… " nuốt "210m²", 28/09/2026).
  //      Ô chỉ có một con số (số liệu, giá) mà bị cắt thì cắt ở đâu cũng đọc thành số khác: "1.284.500.…"
  //      của "1.284.500.000 ₫", thẻ số liệu hẹp ở 816–989px (sót 30/09/2026, lịch khám: phần giấu "000 ₫"
  //      không lọt phép cũ vì lượt quét chưa đo chữ cắt).
  const numberWithUnit = /\d+(?:[.,]\d+)?\s?(?:m²|m2|triệu|tr\b|đ\b|₫|%|km\b|người|phòng)/i;
  const numberOnlyValue = /^[\s\d.,:+\-–%$€£¥₫]*\d[\s\d.,:+\-–%$€£¥₫]*(?:đ|vnđ|vnd|tr|triệu|tỷ|k)?$/i;
  const swallowedNumbers = truncatedTexts
    .filter((item) => item.isSingleLine && (numberWithUnit.test(item.fullText.slice(item.visibleChars)) || numberOnlyValue.test(item.fullText)))
    .slice(0, 6)
    .map((item) => `giấu "${item.fullText.slice(item.visibleChars).trim().slice(0, 24)}" của "${item.fullText.slice(0, 32)}": ${item.element}`);

  if (isSweep) {
    return {
      autoScrolledAreas,
      viewportWidth,
      pageScrollWidth,
      hasHorizontalScroll: pageScrollWidth > viewportWidth + 1,
      overflowingElements: overflowingElements.slice(0, 3),
      clippedBlocks,
      wrappedControls,
      wrappedRows,
      tooShortTexts,
      swallowedNumbers,
    };
  }

  // 3. Anh em cùng loại cao gần bằng mà không bằng (lệch 1-4px): thường là khe baseline của
  //    inline-block, viền thừa, padding lệch. Lệch lớn là nội dung khác, bỏ qua.
  const unevenSiblingGroups = [];
  for (const parent of allElements) {
    const groups = new Map();

    for (const child of parent.children) {
      if (!isVisible(child)) continue;
      // Bỏ class viền một cạnh khỏi khoá: ô cuối hàng thiếu border-r vẫn là cùng loại ô.
      const classKey = (child.getAttribute("class") || "").split(/\s+/).filter((className) => !/^border-[trblxy]$/.test(className)).join(" ");
      const key = `${child.tagName}.${classKey}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(child);
    }

    // Chỉ so các khối cùng cấu trúc con: hàng có badge `py-1` cao hơn hàng chữ trơn, mục gói tên 16px
    // cao hơn mục thẻ tên 14px, là nội dung khác chứ không phải khe baseline (báo nhầm 27/09/2026,
    // danh sách mô tả ở /components, /dashboard/settings/billing/states). Class màu bỏ khỏi khoá:
    // badge xanh với badge xám vẫn cùng cấu trúc.
    const splitByStructure = (siblings) => {
      const byStructure = new Map();
      for (const sibling of siblings) {
        const structure = getStructureSignature(sibling);
        if (!byStructure.has(structure)) byStructure.set(structure, []);
        byStructure.get(structure).push(sibling);
      }

      return [...byStructure.values()];
    };

    for (const siblings of [...groups.values()].flatMap(splitByStructure)) {
      if (siblings.length < 3) continue;

      const innerHeights = siblings.map((sibling) => {
        const style = getComputedStyle(sibling);

        return sibling.getBoundingClientRect().height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);
      });
      const heightCounts = new Map();
      for (const height of innerHeights) heightCounts.set(Math.round(height), (heightCounts.get(Math.round(height)) || 0) + 1);
      const commonHeight = [...heightCounts.entries()].sort((first, second) => second[1] - first[1])[0][0];
      const nearMisses = innerHeights.filter((height) => Math.abs(height - commonHeight) >= 0.75 && Math.abs(height - commonHeight) <= 4);

      if (nearMisses.length > 0) {
        unevenSiblingGroups.push({
          element: describe(siblings[0]),
          count: siblings.length,
          commonHeight,
          otherHeights: [...new Set(nearMisses.map((height) => Math.round(height * 10) / 10))],
        });
      }
    }
  }

  // 4. Chữ cùng cột lệch mép: các lưới cùng khung cột (hàng tiêu đề + lưới ô), mỗi cột so mép
  //    chữ đầu tiên của từng ô. Chữ không căn giữa ô mà mép trái lẫn mép phải đều lệch vài px là
  //    hai kiểu căn trộn nhau (vd tên thứ căn trái, số ngày căn giữa một vòng tròn nhỏ).
  const gridsBySignature = new Map();
  for (const element of allElements) {
    const style = getComputedStyle(element);
    if (style.display !== "grid" || !isVisible(element) || element.children.length < 2) continue;

    const columnCount = style.gridTemplateColumns.split(" ").length;
    if (columnCount < 2) continue;

    const signature = `${Math.round(element.getBoundingClientRect().left)}|${Math.round(element.getBoundingClientRect().width)}|${columnCount}`;
    if (!gridsBySignature.has(signature)) gridsBySignature.set(signature, []);
    gridsBySignature.get(signature).push(element);
  }

  const misalignedColumns = [];
  for (const grids of gridsBySignature.values()) {
    const cellsByColumn = new Map();

    for (const grid of grids) {
      for (const cell of grid.children) {
        if (!isVisible(cell)) continue;
        const cellRect = cell.getBoundingClientRect();
        const textRect = getFirstTextRect(cell);
        if (!textRect || textRect.width === 0) continue;

        const columnKey = Math.round(cellRect.left);
        if (!cellsByColumn.has(columnKey)) cellsByColumn.set(columnKey, []);
        const edge = getBoxedTextEdge(textRect, cell);
        cellsByColumn.get(columnKey).push({
          cell,
          leftOffset: edge.left - cellRect.left,
          rightOffset: cellRect.right - edge.right,
          textLeftOffset: textRect.left - cellRect.left,
          textRightOffset: cellRect.right - textRect.right,
          isBoxed: edge !== textRect,
          centerDelta: textRect.left + textRect.width / 2 - (cellRect.left + cellRect.width / 2),
          text: textRect.text,
        });
      }
    }

    for (const cells of cellsByColumn.values()) {
      // Ô căn giữa cả ô (lịch chọn ngày) thì mép chữ lệch theo độ dài là đúng, bỏ qua.
      const startAlignedCells = cells.filter((item) => Math.abs(item.centerDelta) > 2);
      if (startAlignedCells.length < 3) continue;

      // Chữ trong khối có nền: mép khối hoặc mép chữ trùng cột đều được. Pill "VIP" thẳng theo mép
      // khối; số hôm nay trong vòng `min-w-7` thẳng theo mép chữ với tên thứ (báo nhầm 27/09/2026, lịch
      // tháng: "27" đúng mép chữ "CN" nhưng mép vòng lệch 6px).
      const plainCells = startAlignedCells.filter((item) => !item.isBoxed);
      if (plainCells.length > 0) {
        const plainLeft = plainCells.map((item) => item.leftOffset).sort((first, second) => first - second)[Math.floor(plainCells.length / 2)];
        const plainRight = plainCells.map((item) => item.rightOffset).sort((first, second) => first - second)[Math.floor(plainCells.length / 2)];
        for (const item of startAlignedCells) {
          if (!item.isBoxed) continue;
          if (Math.abs(item.textLeftOffset - plainLeft) < Math.abs(item.leftOffset - plainLeft)) item.leftOffset = item.textLeftOffset;
          if (Math.abs(item.textRightOffset - plainRight) < Math.abs(item.rightOffset - plainRight)) item.rightOffset = item.textRightOffset;
        }
      }

      const leftOffsets = startAlignedCells.map((item) => item.leftOffset);
      const rightOffsets = startAlignedCells.map((item) => item.rightOffset);
      const leftSpread = Math.max(...leftOffsets) - Math.min(...leftOffsets);
      const rightSpread = Math.max(...rightOffsets) - Math.min(...rightOffsets);

      if (leftSpread > 1.5 && leftSpread <= 8 && rightSpread > 1.5) {
        const leftmost = startAlignedCells.reduce((best, item) => (item.leftOffset < best.leftOffset ? item : best));
        const rightmost = startAlignedCells.reduce((best, item) => (item.leftOffset > best.leftOffset ? item : best));
        misalignedColumns.push({
          element: describe(startAlignedCells[0].cell.parentElement),
          leftSpread: Math.round(leftSpread * 10) / 10,
          example: `"${leftmost.text}" cách mép ô ${leftmost.leftOffset.toFixed(1)}px, "${rightmost.text}" ${rightmost.leftOffset.toFixed(1)}px`,
        });
        break;
      }
    }
  }

  // 5. Chỗ bấm dưới 44px ở màn cảm ứng. Nút nhỏ mà có vùng bấm nới ra (::before phủ 44px) thì
  //    elementFromPoint ở mép 44px vẫn trúng chính nó, không tính là lỗi.
  const smallTapTargets = [];
  if (isMobile) {
    // scrollIntoView cuộn cả khung cuộn bên trong (bảng cuộn ngang), window.scrollTo cuối vòng không
    // trả chúng về: ảnh chụp sau đó ra bảng lệch hẳn sang phải, mất cột tên (đã dính 27/09/2026,
    // /dashboard/tasks ở 375px). Ghi vị trí cuộn của mọi khung trước, trả lại sau.
    const scrolledContainers = [...document.querySelectorAll("*")]
      .filter((container) => container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight)
      .map((container) => ({ container, left: container.scrollLeft, top: container.scrollTop }));
    const interactiveElements = [...document.querySelectorAll('button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="tab"], [role="checkbox"], [role="switch"], [role="menuitem"]')];

    for (const element of interactiveElements) {
      if (!isVisible(element) || element.closest("[inert], [aria-hidden='true']") || isWireframeChrome(element)) continue;
      // Chỗ bấm nằm trong câu (link, nút `inline` như "Xoá tìm kiếm" cuối câu rỗng, `empty-state.md`) được
      // WCAG 2.5.8 miễn cỡ. Trước chỉ miễn thẻ <a>: báo nhầm 30/09/2026, design system phòng khám bản shadcn.
      // Nút `inline` thì trình duyệt tính ra `inline-block`, nên nhận bằng chữ trơn đứng cạnh trong cùng cha.
      const elementDisplay = getComputedStyle(element).display;
      const isInSentence = elementDisplay === "inline-block" && [...element.parentElement.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 1);
      if (elementDisplay === "inline" || isInSentence) continue;
      // Không nhận chạm thì không phải chỗ bấm: input range chồng dưới thanh trượt hai đầu.
      if (getComputedStyle(element).pointerEvents === "none") continue;

      const rect = element.getBoundingClientRect();
      if (rect.width >= minTapSize && rect.height >= minTapSize) continue;
      // Ô nằm trong <label> đủ cỡ (dòng lựa chọn min-h-11, I26): cả nhãn là vùng bấm. Ô đứng sát mép
      // trái nhãn nên điểm thử bên trái rơi ra ngoài; đã báo nhầm 27/09/2026, radio ở /dashboard/tasks/new.
      const hasLargeWrappingLabel = [...(element.labels || [])].some((label) => {
        const labelRect = label.getBoundingClientRect();

        return label.contains(element) && labelRect.width >= minTapSize && labelRect.height >= minTapSize;
      });
      if (hasLargeWrappingLabel) continue;

      element.scrollIntoView({ block: "center", inline: "center" });
      const centeredRect = element.getBoundingClientRect();
      // Nằm ngoài màn (sidebar trượt ra ngoài khi đóng) thì người dùng không bấm được, bỏ qua.
      if (centeredRect.right <= 0 || centeredRect.left >= viewportWidth) continue;
      const centerX = centeredRect.left + centeredRect.width / 2;
      const centerY = centeredRect.top + centeredRect.height / 2;
      const reach = minTapSize / 2 - 1;
      const probePoints = [
        [centerX, centerY - reach],
        [centerX, centerY + reach],
        [centerX - reach, centerY],
        [centerX + reach, centerY],
      ];
      const isEachProbeHit = probePoints.every(([pointX, pointY]) => {
        const hitElement = document.elementFromPoint(pointX, pointY);

        if (!hitElement) return false;
        // Checkbox, radio: bấm vào nhãn cũng là bấm vào ô (I26).
        const isInsideLabel = [...(element.labels || [])].some((label) => label.contains(hitElement));

        return element === hitElement || element.contains(hitElement) || isInsideLabel;
      });

      if (!isEachProbeHit) smallTapTargets.push({ element: describe(element), size: `${Math.round(rect.width)}×${Math.round(rect.height)}` });
    }

    for (const { container, left, top } of scrolledContainers) {
      container.scrollLeft = left;
      container.scrollTop = top;
    }
    window.scrollTo(0, 0);
  }

  // 6. Dấu câu rơi xuống đầu dòng (". Đổi tài khoản", "· 3 ngày"): thường do chữ đứng trước là
  //    inline-block (EmailText, badge) nên trình duyệt được phép ngắt ngay trước dấu.
  const orphanPunctuation = [];
  const punctuationPattern = /[.,;:!?)·»”…]/;
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let previousCharRect = null;

  while (textWalker.nextNode() && orphanPunctuation.length < 10) {
    const textNode = textWalker.currentNode;
    const parent = textNode.parentElement;
    // Không bỏ qua aria-hidden: dấu " · " ngăn cách thường aria-hidden mà vẫn nhìn thấy, rơi đầu dòng là
    // lỗi hình ("· Huỷ", đã lọt 27/09/2026 ở /dashboard/profile/states 375px).
    if (!parent || !isVisible(parent) || parent.closest("script, style")) continue;
    // Chữ trong code / pre không xét, nhưng vẫn là "chữ đứng trước" của dấu theo sau: bỏ qua hẳn thì dấu
    // phẩy sau `DH-2026-004821` bị so với dòng trên, báo nhầm (27/09/2026, trợ lý AI 375px).
    if (parent.closest("code, pre")) {
      const lastIndex = textNode.data.trimEnd().length - 1;
      if (lastIndex >= 0) {
        const lastRange = document.createRange();
        lastRange.setStart(textNode, lastIndex);
        lastRange.setEnd(textNode, lastIndex + 1);
        const lastRect = lastRange.getBoundingClientRect();
        if (lastRect.width) previousCharRect = lastRect;
      }
      continue;
    }
    // Ký tự đứng một mình trong khối riêng (vòng "!" của bước lỗi, `flex size-8`) là hình, không phải dấu
    // câu của chữ trước (báo nhầm 27/09/2026, bộ bước ở /components). Dấu " · " inline vẫn xét.
    if (/^[.,;:!?)·»”…]+$/.test(parent.textContent.trim()) && /^(block|flex|grid)$/.test(getComputedStyle(parent).display)) continue;

    for (let index = 0; index < textNode.length; index++) {
      const character = textNode.data[index];
      if (/\s/.test(character)) continue;

      const charRange = document.createRange();
      charRange.setStart(textNode, index);
      charRange.setEnd(textNode, index + 1);
      const charRect = charRange.getBoundingClientRect();
      if (!charRect.width) continue;

      const isOnNewLine = previousCharRect && charRect.top >= previousCharRect.bottom - 2 && charRect.left < previousCharRect.left;
      // Dấu nằm giữa một chuỗi liền ("…toan" / ".tong@" của email, "1.284") là chỗ ngắt cố ý, không
      // phải dấu câu: chỉ tính dấu đứng cuối chữ (sau nó là khoảng trắng hoặc hết đoạn).
      // Dấu "." của EmailText là text node riêng: ký tự sau nó nằm ở node kế tiếp.
      let nextCharacter = textNode.data[index + 1];
      if (nextCharacter === undefined) {
        const peekWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        peekWalker.currentNode = textNode;
        nextCharacter = peekWalker.nextNode()?.data[0];
      }
      const isInsideToken = /[.,:]/.test(character) && nextCharacter !== undefined && !/\s/.test(nextCharacter);
      if (punctuationPattern.test(character) && isOnNewLine && !isInsideToken) {
        const lineText = textNode.data.slice(index, index + 30).trim();
        orphanPunctuation.push({ lineStart: lineText, element: describe(parent.closest("p, li, div, span") || parent) });
      }

      previousCharRect = charRect;
    }
  }

  // 7. Ô nhập lệch mép với nút rộng hết khung trong cùng form / hộp thoại: màn hẹp nút xếp dọc
  //    rộng hết, còn ô nằm trong cột chữ thụt sau icon (hộp xác nhận có ô gõ lại tên: ô 239px ở
  //    x=96, nút 295px ở x=40, đo 26/09/2026). Nút tự co theo chữ (màn rộng) thì không so.
  const misalignedFields = [];
  const fieldContainers = document.querySelectorAll("form, dialog, [role='dialog'], [role='alertdialog']");

  for (const container of fieldContainers) {
    if (!isVisible(container)) continue;

    const containerWidth = container.getBoundingClientRect().width;
    const wideButtons = [...container.querySelectorAll("button")].filter(
      (button) => isVisible(button) && button.getBoundingClientRect().width >= containerWidth * 0.6,
    );
    if (wideButtons.length === 0) continue;

    const buttonRect = wideButtons[0].getBoundingClientRect();
    const fields = [...container.querySelectorAll("input:not([type='hidden']):not([type='checkbox']):not([type='radio']), textarea, select")];

    for (const field of fields) {
      if (!isVisible(field)) continue;
      // Hàng nhiều ô cùng cỡ (OTP sáu ô 40–57px) không cần khớp mép nút (báo nhầm 26/09/2026).
      const siblingFields = [...(field.parentElement?.parentElement || field.parentElement).querySelectorAll("input")].filter(isVisible);
      if (siblingFields.length >= 3 && siblingFields.every((sibling) => Math.abs(sibling.getBoundingClientRect().width - field.getBoundingClientRect().width) <= 2)) continue;

      // Ô không viền nằm trong một khung có viền (ô nhập nhiều email: chip + input trong một khung) thì
      // mép người dùng thấy là mép khung (báo nhầm 27/09/2026, /components).
      let visualBox = field;
      for (let node = field; node && node !== container; node = node.parentElement) {
        if ((parseFloat(getComputedStyle(node).borderLeftWidth) || 0) >= 1) {
          visualBox = node;
          break;
        }
      }
      const fieldRect = visualBox.getBoundingClientRect();
      const leftGap = Math.round(Math.abs(fieldRect.left - buttonRect.left));
      const rightGap = Math.round(Math.abs(fieldRect.right - buttonRect.right));
      if (leftGap <= 4 && rightGap <= 4) continue;

      misalignedFields.push({
        field: `${Math.round(fieldRect.width)}px ở x=${Math.round(fieldRect.left)}`,
        button: `${Math.round(buttonRect.width)}px ở x=${Math.round(buttonRect.left)}`,
        element: describe(container),
      });
      break;
    }
  }

  // 8. Dấu ngăn (›, /) không cách đều hai bên: đo từ nét của dấu tới nét chữ hay icon kế bên, không
  //    đo hộp. Nút "…" size-8 giữa đường dẫn để trống 22px mỗi bên trong khi chữ cách dấu 12px
  //    (đo 26/09/2026). Dấu ngăn là svg aria-hidden đứng ngoài link, nút; icon trong nút phân trang
  //    không tính.
  function getSvgInkRect(svg) {
    const rect = svg.getBoundingClientRect();
    const box = svg.getBBox();
    const scale = rect.width / (svg.viewBox.baseVal?.width || rect.width);

    return { left: rect.left + box.x * scale, right: rect.left + (box.x + box.width) * scale, top: rect.top };
  }

  function getItemInkRect(item) {
    const textNodes = [];
    const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) if (walker.currentNode.textContent.trim()) textNodes.push(walker.currentNode);

    if (textNodes.length === 0) {
      const icon = item.querySelector("svg");

      return icon ? getSvgInkRect(icon) : null;
    }

    const range = document.createRange();
    range.setStartBefore(textNodes[0]);
    range.setEndAfter(textNodes[textNodes.length - 1]);
    const textRect = range.getBoundingClientRect();
    // Chữ bị cắt (truncate): nét chữ dừng ở mép hộp, không ở cuối chuỗi đầy đủ.
    const itemRect = item.getBoundingClientRect();

    return { left: Math.max(textRect.left, itemRect.left), right: Math.min(textRect.right, itemRect.right), top: itemRect.top };
  }

  // Chỉ dấu ngăn cách thật (›, ‹, /). Icon ưu tiên trong thẻ kanban cũng là svg aria-hidden trong một
  // <ul>, đo như dấu › thì ra "khe 150–178px" (báo nhầm 27/09/2026, /dashboard/tasks/states ở 375px).
  const isSeparatorIcon = (svg) => /lucide-(chevron-(right|left)|slash)\b/.test(svg.getAttribute("class") || "");
  const separatorRows = new Set();
  for (const svg of document.querySelectorAll("svg[aria-hidden='true']")) {
    if (svg.closest("a, button, [role='button']") || !isVisible(svg) || !isSeparatorIcon(svg)) continue;
    const row = svg.closest("ol, ul, nav");
    if (row) separatorRows.add(row);
  }

  const unevenSeparatorRows = [];
  for (const row of separatorRows) {
    const units = [...row.querySelectorAll("svg[aria-hidden='true'], a, button")]
      .filter((element) => isVisible(element) && !element.parentElement.closest("a, button"))
      .filter((element) => element.tagName.toLowerCase() !== "svg" || isSeparatorIcon(element))
      .map((element) => {
        const isSeparator = element.tagName.toLowerCase() === "svg";

        return { isSeparator, ink: isSeparator ? getSvgInkRect(element) : getItemInkRect(element) };
      })
      .filter((unit) => unit.ink);

    const gaps = [];
    for (let index = 1; index < units.length; index++) {
      const previous = units[index - 1];
      const current = units[index];
      const isSameLine = Math.abs(current.ink.top - previous.ink.top) < 12;
      if (isSameLine && (previous.isSeparator || current.isSeparator)) gaps.push(current.ink.left - previous.ink.right);
    }
    if (gaps.length < 3) continue;

    const smallestGap = Math.min(...gaps);
    const largestGap = Math.max(...gaps);
    if (largestGap - smallestGap > 4) {
      unevenSeparatorRows.push({
        element: describe(row),
        gaps: `${smallestGap.toFixed(1)}–${largestGap.toFixed(1)}px`,
      });
    }
  }


  // 10. Nhãn số đè lên đường biểu đồ: số ghi cạnh chấm mà đường đi xuyên qua chữ (đo 27/09/2026,
  //     báo cáo doanh thu: điểm cuối thấp hơn điểm kề, số đặt trên chấm nằm đúng trên đoạn nối).
  //     Lấy mẫu dọc từng đường theo toạ độ màn, rồi xem có mẫu nào lọt vào khung chữ của nhãn
  //     nằm cùng khung vẽ (chữ HTML đặt đè lên svg, hoặc <text> trong svg của thư viện).
  const overlappedChartLabels = [];
  const outsideChartLabels = [];
  for (const svg of document.querySelectorAll("svg")) {
    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width < 120 || svgRect.height < 60 || !isVisible(svg)) continue;

    const lines = [...svg.querySelectorAll("polyline, path, line")].filter((shape) => {
      const style = getComputedStyle(shape);

      return style.stroke !== "none" && parseFloat(style.strokeWidth) > 0 && (style.fill === "none" || shape.tagName === "polyline");
    });
    if (lines.length === 0) continue;

    const samplePoints = [];
    for (const shape of lines) {
      const matrix = shape.getScreenCTM();
      const totalLength = shape.getTotalLength?.() ?? 0;
      if (!matrix || totalLength === 0) continue;

      for (let step = 0; step <= 400; step++) {
        const point = shape.getPointAtLength((totalLength * step) / 400).matrixTransform(matrix);
        samplePoints.push(point);
      }
    }

    const container = svg.parentElement;
    const labelNodes = [...container.querySelectorAll("*")].filter((node) => {
      if (node === svg || (svg.contains(node) && node.tagName.toLowerCase() !== "text")) return false;
      const ownText = [...node.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.textContent.trim());

      return ownText && isVisible(node);
    });

    // Chữ lồng trong nhãn ("Hôm nay ·" trong "Hôm nay · 6,8 tr đ") tính theo nhãn ngoài cùng.
    const outerLabelNodes = labelNodes.filter((node) => !labelNodes.some((other) => other !== node && other.contains(node)));

    for (const labelNode of outerLabelNodes) {
      const range = document.createRange();
      range.selectNodeContents(labelNode);
      const textRect = range.getBoundingClientRect();
      const isInsidePlot = textRect.bottom > svgRect.top && textRect.top < svgRect.bottom;
      if (!isInsidePlot) continue;

      // Nhãn lọt ra ngoài vùng vẽ: dưới đường 0 là chỗ của nhãn trục, số rơi xuống đó đọc ra một
      // nhãn trục thứ hai (đo 27/09/2026: "Hôm nay · 6,8 tr đ" dưới đáy 16px, cách "27/09" 9px).
      const outsideBy = Math.max(svgRect.top - textRect.top, textRect.bottom - svgRect.bottom);
      if (outsideBy > 2) {
        outsideChartLabels.push(`"${labelNode.textContent.trim().slice(0, 24)}" lòi ${Math.round(outsideBy)}px: ${describe(labelNode)}`);
      }

      const hitPoint = samplePoints.find(
        (point) => point.x > textRect.left + 1 && point.x < textRect.right - 1 && point.y > textRect.top + 1 && point.y < textRect.bottom - 1,
      );
      if (hitPoint) overlappedChartLabels.push(`"${labelNode.textContent.trim().slice(0, 24)}": ${describe(labelNode)}`);
    }
  }

  // 10b. Badge đếm đè mất icon: chấm hay số `absolute` trên nút chỉ có icon (chuông, giỏ hàng) phủ từ 40%
  //      icon trở lên thì icon không còn nhận ra (sót 30/09/2026, lịch khám: số "3" size-4 đặt top-1.5
  //      right-1.5 phủ gần nửa chuông 20px, chỉ còn thấy quả lắc; lượt chỉ đưa ảnh bắt được bằng mắt).
  const iconCoveringBadges = [];
  for (const button of document.querySelectorAll("button, a[href], [role='button']")) {
    if (iconCoveringBadges.length >= 4 || !isVisible(button)) continue;
    const icon = [...button.querySelectorAll("svg")].find((svg) => svg.getBoundingClientRect().width >= 12);
    if (!icon) continue;
    const iconRect = icon.getBoundingClientRect();
    const badge = [...button.querySelectorAll("span, div")].find((node) => {
      const rect = node.getBoundingClientRect();

      return getComputedStyle(node).position === "absolute" && !node.contains(icon) && rect.width > 0 && rect.width <= 28 && rect.height <= 28 && isVisible(node);
    });
    if (!badge) continue;
    const badgeRect = badge.getBoundingClientRect();
    const overlapWidth = Math.max(0, Math.min(iconRect.right, badgeRect.right) - Math.max(iconRect.left, badgeRect.left));
    const overlapHeight = Math.max(0, Math.min(iconRect.bottom, badgeRect.bottom) - Math.max(iconRect.top, badgeRect.top));
    const coveredRatio = (overlapWidth * overlapHeight) / (iconRect.width * iconRect.height);
    if (coveredRatio >= 0.4) {
      iconCoveringBadges.push(`badge ${Math.round(badgeRect.width)}×${Math.round(badgeRect.height)}px phủ ${Math.round(coveredRatio * 100)}% icon ${Math.round(iconRect.width)}px: ${describe(button)}`);
    }
  }

  // 11. Bảng cuộn ngang mà cột nhận diện trôi theo (R9): cuộn một nhịp là mất tên, các ô còn lại
  //     không biết của ai. Cột đầu phải `sticky` và không quá ~40% khung; dưới `sm` bảng quản lý
  //     thành danh sách dòng (đã dính 27/09/2026: bảng nhóm công việc 832px trong khung 341px ở
  //     375px, không ghim, cuộn sang thì cả tên nhóm lẫn tên việc trôi mất).
  const unpinnedScrollTables = [];
  for (const table of document.querySelectorAll("table")) {
    if (!isVisible(table)) continue;
    let scroller = table.parentElement;
    while (scroller && scroller !== document.body && !["auto", "scroll"].includes(getComputedStyle(scroller).overflowX)) scroller = scroller.parentElement;
    if (!scroller || scroller === document.body || scroller.scrollWidth <= scroller.clientWidth + 1) continue;

    const firstBodyCell = [...table.querySelectorAll("tbody tr")]
      .map((row) => row.cells[0])
      .find((cell) => cell && cell.colSpan === 1 && isVisible(cell));
    if (!firstBodyCell) continue;

    const isPinned = getComputedStyle(firstBodyCell).position === "sticky";
    const pinnedShare = firstBodyCell.getBoundingClientRect().width / scroller.clientWidth;
    const size = `bảng ${table.scrollWidth}px trong khung ${scroller.clientWidth}px`;

    if (!isPinned) unpinnedScrollTables.push(`${size}, cột đầu không ghim${isMobile ? " (dưới sm: thành danh sách dòng)" : ""}: ${describe(table)}`);
    else if (pinnedShare > 0.4) unpinnedScrollTables.push(`${size}, cột ghim chiếm ${Math.round(pinnedShare * 100)}% khung: ${describe(table)}`);
    // Ghim rồi mà cột cuối (nút ⋯ của dòng) vẫn nằm ngoài khung tới khi cuộn: khung vừa phải ẩn cột
    // phụ trước (đã dính 27/09/2026, bảng khách hàng 960px trong khung 718px ở 768 và 1024px).
    const lastCell = firstBodyCell.parentElement.cells[firstBodyCell.parentElement.cells.length - 1];
    if (isPinned && lastCell.getBoundingClientRect().left >= scroller.getBoundingClientRect().right) {
      unpinnedScrollTables.push(`${size}, cột cuối ("${(lastCell.textContent.trim() || lastCell.querySelector("[aria-label]")?.getAttribute("aria-label") || "").slice(0, 24)}") nằm ngoài khung tới khi cuộn, ẩn cột phụ: ${describe(table)}`);
    }
  }

  // Số dòng chữ thật của một khối: đếm đỉnh các hộp dòng của chữ (Range), không suy từ chiều cao hay số thẻ.
  // Khai báo function để 11b, 11c và 18j cùng dùng.
  function countTextLines(element) {
    const tops = new Set();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim() || isScreenReaderOnly(node.parentElement, element)) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) if (rect.width > 2 && rect.height > 6) tops.add(Math.round(rect.top / 4));
    }

    return tops.size;
  }

  // Chữ `sr-only` (khung 1px, overflow hidden) không phải một dòng nhìn thấy: tên người cạnh avatar ẩn ở
  // khung vừa nằm lệch tâm avatar, đếm vào thì ra hai dòng (báo nhầm 01/10/2026, cột Phụ trách ở 768px).
  function isScreenReaderOnly(node, root) {
    for (let current = node; current && current !== root.parentElement; current = current.parentElement) {
      const box = current.getBoundingClientRect();
      if (box.width <= 1 && box.height <= 1 && getComputedStyle(current).overflow !== "visible") return true;
    }

    return false;
  }

  // 11b. Cột chữ của bảng bị ép xuống dòng trong khi bảng không cuộn: các cột khác `nowrap` giữ chỗ, cột
  //      tên / dịch vụ còn ~100px, nửa số dòng thành hai dòng, dòng cao thấp lởm chởm. Khung vừa phải ẩn cột
  //      phụ theo `@container` của card (`layouts/app.md`, "Khung vừa thì ẩn cột phụ"), không theo viewport
  //      (đã dính 30/09/2026, bảng Điều trị ở hồ sơ bệnh nhân 1280px: cột Điều trị 101px, 4/6 dòng hai dòng,
  //      vì cột Bác sĩ ẩn theo `lg:` mà cột phải 22rem đã lấy mất chỗ).
  const squeezedTableColumns = [];
  for (const table of document.querySelectorAll("table")) {
    if (!isVisible(table)) continue;
    const bodyRows = [...table.querySelectorAll("tbody tr")].filter((row) => isVisible(row) && row.cells.length > 1);
    if (bodyRows.length < 3) continue;
    const visibleCellsPerRow = bodyRows.map((row) => [...row.cells].filter(isVisible));
    const columnCount = visibleCellsPerRow[0].length;
    if (columnCount < 4 || visibleCellsPerRow.some((cells) => cells.length !== columnCount)) continue;

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      const cells = visibleCellsPerRow.map((cells) => cells[columnIndex]);
      if (!cells[0].textContent.trim() || getComputedStyle(cells[0]).whiteSpace === "nowrap") continue;
      const wrappedCount = cells.filter((cell) => countTextLines(cell) > 1).length;
      const columnWidth = Math.round(cells[0].getBoundingClientRect().width);
      if (wrappedCount >= 2 && wrappedCount * 2 >= cells.length && columnWidth < 200) {
        const header = table.querySelectorAll("thead th")[columnIndex]?.textContent.trim() || `cột ${columnIndex + 1}`;
        squeezedTableColumns.push(`cột "${header.slice(0, 24)}" rộng ${columnWidth}px, ${wrappedCount}/${cells.length} dòng xuống hai dòng, bảng ${columnCount} cột: ${describe(table)}`);
      }
    }
  }

  // 11c. Cặp nhãn–giá trị đứng hai cột trong khối hẹp: cột nhãn ~7rem ăn mất một phần ba, email vỡ ba
  //      dòng, địa chỉ bốn dòng. Khối dưới 384px thì nhãn trên, giá trị dưới; chuyển khuôn theo bề rộng
  //      `<dl>` (`@container`), không theo viewport (`components/description-list.md`). Đã dính 30/09/2026,
  //      card Liên hệ cột phải hồ sơ bệnh nhân: `<dl>` 310px, `sm:grid-cols-[7rem_…]` bật vì màn 1440px.
  const crampedDescriptionLists = [];
  for (const list of document.querySelectorAll("dl")) {
    const listWidth = list.getBoundingClientRect().width;
    if (!isVisible(list) || listWidth >= 384) continue;
    const pairs = [...list.querySelectorAll("dt")].map((term) => [term, term.nextElementSibling]).filter(([, value]) => value?.tagName === "DD" && isVisible(value));
    const sideBySidePairs = pairs.filter(([term, value]) => value.getBoundingClientRect().left >= term.getBoundingClientRect().right - 1 && Math.abs(value.getBoundingClientRect().top - term.getBoundingClientRect().top) < 8);
    if (sideBySidePairs.length < 2) continue;
    const longest = Math.max(...sideBySidePairs.map(([, value]) => countTextLines(value)));
    if (longest >= 3) crampedDescriptionLists.push(`<dl> ${Math.round(listWidth)}px, ${sideBySidePairs.length} cặp nhãn cạnh giá trị, giá trị dài nhất ${longest} dòng: ${describe(list)}`);
  }

  // 12. Nhóm radio / checkbox xếp lưới (vừa nhiều cột vừa nhiều hàng): đọc thành chữ Z, thang có thứ
  //     tự như mức ưu tiên ra "Thấp, Trung bình / Cao, Khẩn cấp" (đã dính 27/09/2026, form tạo công
  //     việc 375px). Một hàng hoặc một cột thì đúng.
  const gridChoiceGroups = [];
  for (const group of document.querySelectorAll("fieldset, [role='radiogroup'], [role='group']")) {
    const choices = [...group.querySelectorAll("input[type='radio'], input[type='checkbox'], [role='radio']")].filter(isVisible);
    if (choices.length < 3) continue;

    const lefts = new Set(choices.map((choice) => Math.round(choice.getBoundingClientRect().left / 4)));
    const tops = new Set(choices.map((choice) => Math.round(choice.getBoundingClientRect().top / 4)));
    if (lefts.size > 1 && tops.size > 1) {
      const legend = group.querySelector("legend")?.textContent.trim() || describe(group);
      gridChoiceGroups.push(`${choices.length} lựa chọn thành ${lefts.size} cột × ${tops.size} hàng: "${legend.slice(0, 40)}"`);
    }
  }

  // 13. Hàng ô số liệu (mỗi ô một cặp dt/dd) mà số không thẳng một đường: một nhãn xuống dòng đẩy riêng
  //     số của ô đó (đã dính 27/09/2026, trang chi tiết khách 1280px, "3" thấp hơn "12,3 tr đ" 16px).
  const unevenStatRows = [];
  for (const statGroup of document.querySelectorAll("dl")) {
    const tiles = [...statGroup.children].filter((tile) => isVisible(tile) && tile.querySelector(":scope > dt") && tile.querySelector(":scope > dd"));
    if (tiles.length < 2) continue;

    const tilesByRow = new Map();
    for (const tile of tiles) {
      const rowKey = Math.round(tile.getBoundingClientRect().top);
      if (!tilesByRow.has(rowKey)) tilesByRow.set(rowKey, []);
      tilesByRow.get(rowKey).push(tile);
    }
    for (const rowTiles of tilesByRow.values()) {
      if (rowTiles.length < 2) continue;
      const valueTops = rowTiles.map((tile) => tile.querySelector(":scope > dd").getBoundingClientRect().top);
      const spread = Math.max(...valueTops) - Math.min(...valueTops);
      if (spread > 2) {
        unevenStatRows.push(`số lệch ${Math.round(spread)}px giữa ${rowTiles.length} ô cùng hàng: ${describe(statGroup)}`);
        break;
      }
    }
  }

  // 14. Số tiền kèm đơn vị bị ngắt dòng ("128.900.000" / "đ"): đo trên khối chứa cả số lẫn đơn vị, xem
  //     chuỗi tiền có nằm trên hai dòng không (đã dính 27/09/2026, modal đơn hàng 375px, `T16`).
  const brokenMoney = [];
  // Chỉ đo phần tử mà cả nội dung là một số tiền ("128.900.000 đ", "0 ₫", có thể kèm "/tháng"); khối
  // chứa cả nhãn lẫn tiền thì nhiều dòng là đúng thiết kế.
  const moneyOnlyPattern = /^\s*-?\d[\d.,]*\s*(đ|₫|VND)(\s*\/\s*[\p{L}]+)?\s*$/u;
  for (const holder of document.querySelectorAll("dd, td, p, span, div, strong")) {
    if (!isVisible(holder) || !moneyOnlyPattern.test(holder.textContent)) continue;
    if (holder.parentElement && moneyOnlyPattern.test(holder.parentElement.textContent)) continue;
    const range = document.createRange();
    range.selectNodeContents(holder);
    // Hai mảnh cùng dòng khi khoảng dọc chồng nhau: số 30px và "/tháng" 14px chung baseline có đáy
    // lệch nhau, gom theo đáy thì báo nhầm (27/09/2026, trang giá 375px).
    const pieces = [...range.getClientRects()].filter((rect) => rect.width > 0).sort((first, second) => first.top - second.top);
    let lineCount = pieces.length > 0 ? 1 : 0;
    let lineBottom = pieces[0]?.bottom ?? 0;
    for (const piece of pieces.slice(1)) {
      if (piece.top >= lineBottom - 2) lineCount++;
      lineBottom = Math.max(lineBottom, piece.bottom);
    }
    if (lineCount > 1) brokenMoney.push(`"${holder.textContent.trim().slice(0, 24)}": ${describe(holder)}`);
  }

  // 15. Tương phản chữ: màu chữ trộn lên nền thật phía sau nó. Màu đọc qua canvas nên oklch của
  //     Tailwind v4 cũng ra rgb. Nền lấy ở lớp nằm ngay dưới chữ (elementsFromPoint), rồi đi ngược lên
  //     các cha tới lớp nền đặc. Cha có gradient thì chấm theo điểm dừng tệ nhất; chữ trên ảnh, video,
  //     hay lớp phủ gradient không phải cha thì không đo được, chỉ đếm. Chữ trong
  //     control đang khoá thì WCAG không tính, bỏ qua.
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = 1;
  colorCanvas.height = 1;
  const colorContext = colorCanvas.getContext("2d", { willReadFrequently: true });

  function readColor(cssColor) {
    colorContext.clearRect(0, 0, 1, 1);
    colorContext.fillStyle = "rgba(0, 0, 0, 0)";
    colorContext.fillStyle = cssColor;
    colorContext.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = colorContext.getImageData(0, 0, 1, 1).data;

    return { red, green, blue, alpha: alpha / 255 };
  }

  function blendColors(top, bottom) {
    const alpha = top.alpha + bottom.alpha * (1 - top.alpha);
    if (alpha === 0) return { red: 0, green: 0, blue: 0, alpha: 0 };
    const mixChannel = (channel) => (top[channel] * top.alpha + bottom[channel] * bottom.alpha * (1 - top.alpha)) / alpha;

    return { red: mixChannel("red"), green: mixChannel("green"), blue: mixChannel("blue"), alpha };
  }

  function readLuminance(color) {
    const toLinear = (channel) => {
      const value = channel / 255;

      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };

    return 0.2126 * toLinear(color.red) + 0.7152 * toLinear(color.green) + 0.0722 * toLinear(color.blue);
  }

  function readContrastRatio(first, second) {
    const [lighter, darker] = [readLuminance(first), readLuminance(second)].sort((first, second) => second - first);

    return (lighter + 0.05) / (darker + 0.05);
  }

  function toHex(color) {
    return `#${[color.red, color.green, color.blue].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
  }

  const whiteCanvas = { red: 255, green: 255, blue: 255, alpha: 1 };

  // Gom các lớp nền từ một phần tử lên tới lớp đặc đầu tiên. Gặp ảnh hay gradient thì trả null.
  function readAncestorBackdrop(element) {
    const layers = [];

    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== "none") return null;
      const color = readColor(style.backgroundColor);
      if (color.alpha > 0) layers.push(color);
      if (color.alpha >= 0.99) break;
    }

    return layers.reverse().reduce((bottom, top) => blendColors(top, bottom), whiteCanvas);
  }

  // Màu các điểm dừng của nền chỉ có gradient; nền có ảnh thì null. Computed style đã đổi màu sang rgb().
  function readGradientStops(backgroundImage) {
    if (backgroundImage === "none") return [];
    if (/url\(|image-set\(|element\(|cross-fade\(/.test(backgroundImage)) return null;

    return [...backgroundImage.matchAll(/(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)/g)].map((match) => readColor(match[0]));
  }

  // Như `readAncestorBackdrop` nhưng đi qua lớp cha nền gradient: mỗi điểm dừng trộn lên màu nền của
  // chính lớp đó là một nền có thể nằm dưới chữ, trả hết để chấm theo nền tệ nhất. Trước đây gặp
  // gradient là bỏ đo: app nền tối có quầng sáng trên `body` thì không chữ nào được đo, sót chữ giờ
  // 2.91:1 (30/09/2026, dự án mồi kho hàng, lượt tự mở trang; lượt chỉ đưa ảnh lại bắt được).
  function readAncestorBackdrops(element) {
    const layers = [];

    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      const stops = readGradientStops(style.backgroundImage);
      if (!stops) return null;
      const color = readColor(style.backgroundColor);
      const variants = stops.length > 0 ? [color, ...stops.map((stop) => blendColors(stop, color))] : [color];
      if (variants.some((variant) => variant.alpha > 0)) layers.push(variants);
      if (variants.every((variant) => variant.alpha >= 0.99)) break;
    }

    let backdrops = [whiteCanvas];
    for (const variants of layers.reverse()) {
      const blended = backdrops.flatMap((bottom) => variants.map((top) => blendColors(top, bottom)));
      backdrops = [...new Map(blended.map((backdrop) => [toHex(backdrop), backdrop])).values()].slice(0, 24);
    }

    return backdrops;
  }

  // Nền thật dưới chữ: lớp phủ định vị tuyệt đối (panel, ảnh bìa) không phải cha trong DOM của chữ.
  // Trả danh sách nền có thể có (nhiều hơn một khi cha có gradient), hoặc null khi không đo được.
  function readBackdrop(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const isInViewport = centerX >= 0 && centerY >= 0 && centerX < innerWidth && centerY < innerHeight;
    if (!isInViewport) return readAncestorBackdrops(element);

    // Lớp đứng TRÊN chữ (thanh điều hướng cố định che mất chữ lúc chụp) không phải nền của chữ: chỉ
    // xét các lớp nằm sau chữ trong chồng. Đã đo nhầm một nút nền xanh ra 1:1 vì thanh dưới đáy màu trắng che nút
    // (27/09/2026, dự án mồi phase 2). Chữ bị che hẳn thì đi theo các cha trong DOM.
    const stack = document.elementsFromPoint(centerX, centerY);
    const textIndex = stack.findIndex((layer) => layer === element || element.contains(layer));
    if (textIndex === -1) return readAncestorBackdrops(element);

    // Lớp không phải cha mà có gradient (lớp phủ trên ảnh bìa) vẫn bỏ đo: ảnh nằm cạnh nó, không phải cha.
    for (const layer of stack.slice(textIndex)) {
      if (layer === element || element.contains(layer)) continue;
      if (layer.contains(element)) break;
      if (["IMG", "VIDEO", "CANVAS", "svg"].includes(layer.tagName) || getComputedStyle(layer).backgroundImage !== "none") return null;
      if (readColor(getComputedStyle(layer).backgroundColor).alpha > 0) return readAncestorBackdrops(layer);
    }

    return readAncestorBackdrops(element);
  }

  function readOpacityChain(element) {
    let opacity = 1;
    for (let node = element; node; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);

    return opacity;
  }

  const lowContrastTexts = new Map();
  let unmeasuredContrastCount = 0;

  function checkContrast(element, cssColor, sample) {
    const backdrops = readBackdrop(element);
    if (!backdrops) {
      unmeasuredContrastCount++;
      return;
    }

    const style = getComputedStyle(element);
    const textColor = readColor(cssColor);
    textColor.alpha *= readOpacityChain(element);
    const fontSize = parseFloat(style.fontSize);
    const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && Number(style.fontWeight) >= 700);
    const requiredRatio = isLargeText ? 3 : 4.5;
    // Nền gradient cho nhiều nền có thể có: chấm theo nền tệ nhất.
    const [{ backdrop, shownColor, ratio }] = backdrops
      .map((candidate) => {
        const blendedText = blendColors(textColor, candidate);

        return { backdrop: candidate, shownColor: blendedText, ratio: readContrastRatio(blendedText, candidate) };
      })
      .sort((first, second) => first.ratio - second.ratio);
    if (ratio >= requiredRatio) return;

    const key = `${toHex(shownColor)}|${toHex(backdrop)}|${element.tagName}.${element.getAttribute("class") || ""}`;
    if (!lowContrastTexts.has(key)) {
      lowContrastTexts.set(key, {
        ratio,
        line: `${ratio.toFixed(2)}:1, cần ${requiredRatio}:1, chữ ${toHex(shownColor)} trên nền ${toHex(backdrop)} "${sample}": ${describe(element)}`,
      });
    }
  }

  for (const element of allElements) {
    if (element.closest(":disabled, [aria-disabled='true']") || !isVisible(element)) continue;
    const ownText = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).map((node) => node.textContent.trim()).join(" ").trim();
    if (ownText) checkContrast(element, getComputedStyle(element).color, ownText.slice(0, 24));

    const isEmptyField = (element.tagName === "INPUT" || element.tagName === "TEXTAREA") && element.placeholder && !element.value;
    if (isEmptyField) checkContrast(element, getComputedStyle(element, "::placeholder").color, `placeholder: ${element.placeholder.slice(0, 20)}`);
  }

  const sortedLowContrast = [...lowContrastTexts.values()].sort((first, second) => first.ratio - second.ratio);

  // 16. Khung khai viền mà viền không thấy: nền trong khung trùng nền ngoài, viền cũng trùng cả hai, nên cả
  //     khung tan vào nền (khung chat nền trang + viền nhạt hơn nền, 27/09/2026, bản sửa dự án mồi).
  const channelDistance = (first, second) => Math.max(Math.abs(first.red - second.red), Math.abs(first.green - second.green), Math.abs(first.blue - second.blue));
  const invisibleFrames = [];
  for (const element of allElements) {
    if (invisibleFrames.length >= 6) break;
    const style = getComputedStyle(element);
    if (!(parseFloat(style.borderTopWidth) > 0) || style.borderTopStyle === "none" || style.boxShadow !== "none" || !isVisible(element)) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width * rect.height < 20000) continue;
    const outside = element.parentElement ? readAncestorBackdrop(element.parentElement) : whiteCanvas;
    const inside = readAncestorBackdrop(element);
    if (!outside || !inside) continue;
    const border = blendColors(readColor(style.borderTopColor), outside);
    if (channelDistance(inside, outside) <= 4 && channelDistance(border, outside) <= 4 && channelDistance(border, inside) <= 4) {
      invisibleFrames.push(`viền ${toHex(border)}, nền trong ${toHex(inside)}, nền ngoài ${toHex(outside)}: ${describe(element)}`);
    }
  }

  // 16b. Khối cùng component mà bo góc khác nhau (Lệch hệ, `V1` "cùng vai"): gom khối có nền / viền / bóng theo
  //      component, nhận ra bằng `data-slot` (shadcn) hoặc class CSS Module có hash (`_card_x1y2z`,
  //      `glass-card-module__card__AbC12`). Một khối bo khác số đông của chính component đó là bị đè riêng.
  //      Card "Ngưỡng cảnh báo" bo 8px giữa các card kính 20px, lượt tự mở trang sót, lượt chỉ đưa ảnh bắt
  //      bằng mắt (30/09/2026, dự án mồi kho hàng).
  const isModuleClass = (token) => /__/.test(token) || /^_[A-Za-z][\w-]*_[A-Za-z0-9-]{5}(_\d+)?$/.test(token);
  const surfacesByComponent = new Map();
  for (const element of allElements) {
    const style = getComputedStyle(element);
    const hasSurface = readColor(style.backgroundColor).alpha > 0 || parseFloat(style.borderTopWidth) > 0 || style.boxShadow !== "none";
    if (!hasSurface || !isVisible(element)) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width * rect.height < 20000) continue;
    const keys = [element.dataset.slot && `slot:${element.dataset.slot}`, ...[...element.classList].filter(isModuleClass)].filter(Boolean);
    for (const key of keys) {
      if (!surfacesByComponent.has(key)) surfacesByComponent.set(key, []);
      surfacesByComponent.get(key).push({ element, radius: Math.round(parseFloat(style.borderTopLeftRadius) || 0) });
    }
  }
  const mismatchedRadii = [];
  const reportedRadiusElements = new Set();
  for (const [key, surfaces] of surfacesByComponent) {
    if (surfaces.length < 3 || mismatchedRadii.length >= 6) continue;
    const radiusCounts = new Map();
    for (const surface of surfaces) radiusCounts.set(surface.radius, (radiusCounts.get(surface.radius) ?? 0) + 1);
    const [commonRadius, commonCount] = [...radiusCounts].sort((first, second) => second[1] - first[1])[0];
    if (commonCount < 2 || commonCount === surfaces.length) continue;
    for (const surface of surfaces) {
      if (Math.abs(surface.radius - commonRadius) < 4 || reportedRadiusElements.has(surface.element)) continue;
      reportedRadiusElements.add(surface.element);
      mismatchedRadii.push(`bo ${surface.radius}px, ${commonCount} khối cùng component (${key.replace(/^slot:/, "data-slot ")}) bo ${commonRadius}px: ${describe(surface.element)}`);
    }
  }

  // 17. Ô nhập, nút, select còn kiểu mặc định của trình duyệt: dự án không nạp preflight (reset) của
  //     Tailwind mà control chưa tự reset (viền inset / outset, viền xám #767676, select `appearance: auto`).
  const browserDefaultControls = [];
  for (const control of document.querySelectorAll("input:not([type='checkbox']):not([type='radio']):not([type='hidden']), textarea, select, button")) {
    if (browserDefaultControls.length >= 8 || !isVisible(control)) continue;
    const style = getComputedStyle(control);
    const hasDefaultBorder = ["inset", "outset"].includes(style.borderTopStyle) || (parseFloat(style.borderTopWidth) > 0 && style.borderTopColor === "rgb(118, 118, 118)");
    // Select gốc chưa tô: còn `appearance: auto` VÀ còn góc vuông hay viền xám của trình duyệt. Select gốc đã
    // bo góc, viền token vẫn giữ mũi tên trình duyệt là cách làm được, không báo.
    const isNativeSelect = control.tagName === "SELECT" && ["auto", "menulist"].includes(style.appearance)
      && (style.borderTopLeftRadius === "0px" || style.borderTopColor === "rgb(118, 118, 118)" || style.borderTopColor === "rgb(0, 0, 0)");
    // Thanh trượt gốc: `appearance: auto` mà trang không tự vẽ thanh (thanh trượt hai đầu tự dựng thì input nằm
    // dưới, `pointer-events-none` hoặc trong suốt).
    const isNativeRange = control.type === "range" && style.appearance === "auto" && style.pointerEvents !== "none" && Number(style.opacity) > 0.1;
    if (isNativeRange) {
      browserDefaultControls.push(`thanh trượt gốc trình duyệt: ${describe(control)}`);
      continue;
    }
    if (control.type === "range") continue;
    if (hasDefaultBorder || isNativeSelect) browserDefaultControls.push(`${isNativeSelect ? "select gốc trình duyệt" : `viền ${style.borderTopWidth} ${style.borderTopStyle} ${style.borderTopColor}`}: ${describe(control)}`);
  }

  // 17a. Checkbox, radio gốc, kể cả khi chỉ tô `accent-color`: skill dựng trên `appearance-none`
  //      (components/choice-controls.md). Ô `sr-only` hay trong suốt nằm dưới ô tự vẽ thì không tính.
  for (const choice of document.querySelectorAll("input[type='checkbox'], input[type='radio']")) {
    if (browserDefaultControls.length >= 8 || !isVisible(choice)) continue;
    const style = getComputedStyle(choice);
    if (style.appearance === "none" || Number(style.opacity) <= 0.1) continue;
    browserDefaultControls.push(`${choice.type} gốc trình duyệt${style.accentColor !== "auto" ? " (chỉ tô accent-color)" : ""}: ${describe(choice)}`);
  }

  // 17b. Select gốc đã tô ở khổ desktop: lúc đóng khớp app, bấm vào vẫn bung menu của hệ điều hành. Chế độ
  //      soi bỏ qua, hai chế độ dựng lại thay bằng Select dựng (review.md V1, 28/09/2026).
  //      Ô ngày, giờ gốc cùng lý do: bấm vào ra lịch của hệ điều hành. Control trong lớp nổi đang ẩn
  //      thì `findNativeControls` đo riêng.
  const styledNativeSelects = isMobile ? [] : [...document.querySelectorAll("select, input[type='date'], input[type='time'], input[type='datetime-local'], input[type='month'], input[type='week']")]
    .filter((control) => isVisible(control) && (control.tagName !== "SELECT" || !["auto", "menulist"].includes(getComputedStyle(control).appearance)))
    .slice(0, 6)
    .map((control) => `${control.tagName === "SELECT" ? `${control.options.length} mục` : `ô ${control.type} gốc`}: ${describe(control)}`);

  // 18. Đường ngăn ngang của hai cột kề nhau lệch vài px: vạch dưới khối logo ở sidebar với vạch dưới
  //     header, nhìn thành một đường gãy (28/09/2026). Lệch lớn hơn 16px là hai tầng khác nhau, bỏ qua.
  const horizontalRules = [];
  for (const element of allElements) {
    const style = getComputedStyle(element);
    if (!isVisible(element)) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width < 120) continue;
    for (const [side, edgeY] of [["Bottom", rect.bottom], ["Top", rect.top]]) {
      const isDrawn = parseFloat(style[`border${side}Width`]) > 0 && style[`border${side}Style`] !== "none" && readColor(style[`border${side}Color`]).alpha > 0.05;
      if (isDrawn) horizontalRules.push({ element, edgeY, left: rect.left, right: rect.right, color: style[`border${side}Color`] });
    }
  }
  const brokenRules = [];
  const mismatchedRuleColors = [];
  for (const first of horizontalRules) {
    for (const second of horizontalRules) {
      if (brokenRules.length >= 6) break;
      const isSideBySide = Math.abs(first.right - second.left) <= 4;
      const offset = Math.abs(first.edgeY - second.edgeY);
      // Thẳng hàng mà khác màu cũng là gãy: vạch dưới logo `border-light` #f1f5f9 nối vào vạch dưới
      // header `border` #e2e8f0, nhìn như sidebar nhạt còn phần ngoài đậm (28/09/2026, chủ dự án tự thấy).
      if (isSideBySide && offset < 0.75 && first.color !== second.color && mismatchedRuleColors.length < 4) {
        mismatchedRuleColors.push(`${first.color} nối vào ${second.color}: ${describe(first.element)} | ${describe(second.element)}`);
      }
      // Hai khối cùng bắt đầu ở đỉnh trang (khối logo sidebar và header) là cùng một tầng, lệch bao nhiêu
      // cũng là gãy: header bị bóp còn 35px lệch 46px với vạch dưới logo (28/09/2026).
      const isTopBand = first.element.getBoundingClientRect().top <= 1 && second.element.getBoundingClientRect().top <= 1;
      if (isSideBySide && offset >= 0.75 && (offset <= 16 || (isTopBand && offset <= 120))) {
        brokenRules.push(`lệch ${offset.toFixed(1)}px: ${describe(first.element)} | ${describe(second.element)}`);
      }
    }
  }

  // 18b. Khối khai chiều cao cố định (`h-[70px]`, `h-16`) mà hiện ra thấp hơn: con của khung flex dọc
  //      thiếu `shrink-0` bị nội dung dài bóp lại (header 70px còn 35px, 28/09/2026). Khối có biến thể
  //      `md:h-…` hay `max-h-…` thì chiều cao đổi theo khổ là cố ý, bỏ qua.
  const squeezedBlocks = [];
  for (const element of allElements) {
    if (squeezedBlocks.length >= 6) break;
    const classNames = (element.getAttribute("class") || "").split(/\s+/);
    if (classNames.some((className) => /:h-|^max-h-/.test(className))) continue;
    const heightClass = classNames.map((className) => className.match(/^h-(?:\[(\d+(?:\.\d+)?)px\]|(\d+(?:\.\d+)?))$/)).find(Boolean);
    if (!heightClass || !isVisible(element)) continue;
    const declaredHeight = heightClass[1] ? Number(heightClass[1]) : Number(heightClass[2]) * 4;
    const renderedHeight = element.getBoundingClientRect().height;
    if (declaredHeight >= 24 && renderedHeight < declaredHeight - 2) {
      squeezedBlocks.push(`khai ${declaredHeight}px, hiện ${Math.round(renderedHeight)}px: ${describe(element)}`);
    }
  }

  // 18d. Hàng nút trên thanh đầu trang (khối dính đỉnh, cao 48–88px) không đồng cỡ: nút đặc cao 30px
  //      chữ 13px đứng giữa các nút ghost cao 34px chữ 14px, bo tròn hẳn giữa các nút bo 12px
  //      (28/09/2026, tim-phong-sua: header giữ nguyên bản cũ trong khi wireframe đã vẽ lại).
  const unevenHeaderActions = [];
  for (const bar of allElements) {
    const barRect = bar.getBoundingClientRect();
    if (barRect.top > 1 || barRect.height < 48 || barRect.height > 88 || barRect.width < 400 || !isVisible(bar)) continue;
    const actions = [...bar.querySelectorAll("button, a")].filter((action) => {
      const actionRect = action.getBoundingClientRect();
      return isVisible(action) && actionRect.height >= 24 && actionRect.left > barRect.left + barRect.width / 2 && !action.parentElement.closest("button, a");
    });
    if (actions.length < 3) continue;
    const heights = actions.map((action) => Math.round(action.getBoundingClientRect().height));
    const fontSizes = new Set(actions.map((action) => getComputedStyle(action).fontSize));
    const isFullRadius = (action) => parseFloat(getComputedStyle(action).borderTopLeftRadius) >= action.getBoundingClientRect().height / 2;
    // Nút avatar (vuông, bo tròn hẳn, chỉ ảnh hoặc 1–2 chữ cái) tròn cạnh nút icon bo góc là quy ước chung, không
    // tính vào phép so hình (báo nhầm 01/10/2026, header khung app: trăng, chuông, avatar "T").
    const isAvatarAction = (action) => {
      const actionRect = action.getBoundingClientRect();

      return isFullRadius(action) && Math.abs(actionRect.width - actionRect.height) <= 2 && (Boolean(action.querySelector("img")) || action.textContent.trim().length <= 2);
    };
    const shapeCount = new Set(actions.filter((action) => !isAvatarAction(action)).map(isFullRadius)).size;
    const heightSpread = Math.max(...heights) - Math.min(...heights);
    // Khoảng giữa hai nút kề nhau: dưới 6px thì nền rê dính nhau, hàng thành một cục (gap-2, 30/09/2026).
    const sortedActions = [...actions].sort((first, second) => first.getBoundingClientRect().left - second.getBoundingClientRect().left);
    const actionGaps = sortedActions.slice(1).map((action, index) => action.getBoundingClientRect().left - sortedActions[index].getBoundingClientRect().right);
    const tightestGap = Math.min(...actionGaps);
    if (heightSpread >= 3 || fontSizes.size > 1 || shapeCount > 1 || tightestGap < 6) {
      unevenHeaderActions.push(`${actions.length} nút, cao ${Math.min(...heights)}–${Math.max(...heights)}px, chữ ${[...fontSizes].join(" / ")}${shapeCount > 1 ? ", lẫn bo tròn hẳn với bo góc" : ""}${tightestGap < 6 ? `, cách nhau ${Math.round(tightestGap)}px (gap-2)` : ""}: ${describe(bar)}`);
      break;
    }
  }

  // 18c. Cột dính mà cuộn riêng: `sticky` kèm `max-h-[calc(100vh-…)] overflow-y-auto` (cột lọc, mục lục).
  //      Thanh cuộn riêng hiện thường trực, dính sát viền, màn càng cao thì càng dài gần hết cột
  //      (28/09/2026). Cột dài hơn màn thì để cuộn theo trang. Khung cuộn chính của app không dính nên
  //      không tính; danh sách trong lớp nổi là `fixed` / `absolute`, cũng không tính.
  const stickyScrollColumns = [];
  for (const element of allElements) {
    if (stickyScrollColumns.length >= 4) break;
    const style = getComputedStyle(element);
    if (style.position !== "sticky" || !["auto", "scroll"].includes(style.overflowY) || !isVisible(element)) continue;
    const { clientHeight, scrollHeight } = element;
    if (clientHeight < 120 || scrollHeight <= clientHeight + 4) continue;
    stickyScrollColumns.push(`khung cao ${clientHeight}px, nội dung ${scrollHeight}px: ${describe(element)}`);
  }

  // 18k. Hàng cuộn ngang ẩn thanh cuộn mà không có nút mũi tên, ở desktop: chuột thường chỉ cuộn dọc,
  //      nên mục phía sau (thường có cả "Xoá lọc") không tới được. Máy trackpad kéo được nên người làm
  //      không thấy (hàng chip đang lọc, 28/09/2026). Nút mũi tên tìm trong hai tầng cha, ngoài khung cuộn.
  const mouseUnreachableScrollers = [];
  for (const element of isMobile ? [] : allElements) {
    if (mouseUnreachableScrollers.length >= 4) break;
    const style = getComputedStyle(element);
    if (!["auto", "scroll"].includes(style.overflowX) || style.scrollbarWidth !== "none" || !isVisible(element)) continue;
    if (element.scrollWidth <= element.clientWidth + 4) continue;
    const scope = element.parentElement?.parentElement || element.parentElement;
    const hasArrowButton = [...(scope?.querySelectorAll("button, [role='button']") || [])]
      .some((button) => !element.contains(button) && isVisible(button) && button.getBoundingClientRect().width < 64);
    if (hasArrowButton) continue;
    mouseUnreachableScrollers.push(`khung ${element.clientWidth}px, nội dung ${element.scrollWidth}px, khuất ${element.scrollWidth - element.clientWidth}px: ${describe(element)}`);
  }

  // 18e. Nội dung trôi giữa màn rộng: khối nội dung chính có trần bề rộng và căn giữa, hở hai bên từ
  //      120px. Cạnh sidebar thì thành khoảng trống giữa sidebar và nội dung (`mx-auto max-w-300`, 28/09/2026).
  //      Chỉ xét khối rộng từ 900px: cột form, cài đặt hẹp căn giữa là mẫu riêng của từng trang.
  const floatingContent = [];
  if (viewportWidth >= 1600) {
    for (const element of allElements) {
      if (floatingContent.length >= 2) break;
      const style = getComputedStyle(element);
      if (style.maxWidth === "none" || !isVisible(element)) continue;
      const marginLeft = parseFloat(style.marginLeft);
      const marginRight = parseFloat(style.marginRight);
      const width = element.getBoundingClientRect().width;
      if (width >= 900 && marginLeft >= 120 && Math.abs(marginLeft - marginRight) <= 2) {
        floatingContent.push(`rộng ${Math.round(width)}px, hở ${Math.round(marginLeft)}px mỗi bên: ${describe(element)}`);
      }
    }
  }

  // 18f. Khung hộp thoại nằm trong lớp nền mờ (scrim) mà cả hai cùng chuyển `opacity`: độ mờ nhân nhau, khung
  //      tan nhanh hơn lớp nền lúc đóng, nhìn giật (28/09/2026). Chỉ đo được khi hộp thoại luôn nằm trong DOM.
  const nestedFadeDialogs = [];
  for (const dialog of document.querySelectorAll("[role='dialog'], dialog")) {
    if (nestedFadeDialogs.length >= 3) break;
    const isFading = (element) => /opacity|all/.test(element.dataset.evonTransition || "");
    if (!isFading(dialog)) continue;
    for (let node = dialog.parentElement; node && node !== document.body; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.position === "fixed" && readColor(style.backgroundColor).alpha > 0.05 && isFading(node)) {
        nestedFadeDialogs.push(`${describe(dialog)} nằm trong ${describe(node)}`);
        break;
      }
    }
  }

  // 18g. Bẫy Tailwind v4: `scale-*`, `translate-*`, `rotate-*` ghi vào thuộc tính `scale`, `translate`, `rotate`
  //      riêng, còn `transition-[transform]` / `transition-[opacity,transform]` chỉ chuyển `transform`. Khung
  //      nhảy cỡ một phát rồi mới mờ, mũi tên nhảy ngược không xoay (28/09/2026, menu tài khoản và mẫu
  //      accordion của skill). Xét cả phần tử đang ẩn: menu đóng vẫn nằm trong DOM. `transition-transform`
  //      của v4 đã gồm cả ba nên không báo.
  const untransitionedMotion = [];
  for (const element of document.body.querySelectorAll("*")) {
    if (untransitionedMotion.length >= 6) break;
    const classNames = element.getAttribute("class") || "";
    if (!/(^|[\s:])-?(scale|translate|rotate)-/.test(classNames)) continue;
    const property = element.dataset.evonTransition || "";
    if (!/\btransform\b/.test(property) || /\b(all|scale|translate|rotate)\b/.test(property)) continue;
    untransitionedMotion.push(`transition: ${property}: ${describe(element)}`);
  }

  // 18h. Vạch chia trong menu đậm hơn viền khung: menu tách bằng đường tóc, vạch giữa các nhóm cùng token với
  //      viền (`border-border`), không `border-strong` (28/09/2026).
  const relativeLuminance = (color) => (0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue) / 255;
  const heavySeparators = [];
  for (const menu of document.querySelectorAll("[role='menu'], [role='listbox']")) {
    if (heavySeparators.length >= 3) break;
    const menuStyle = getComputedStyle(menu);
    if (!(parseFloat(menuStyle.borderTopWidth) > 0)) continue;
    const frameLuminance = relativeLuminance(readColor(menuStyle.borderTopColor));
    for (const separator of menu.querySelectorAll("hr, [role='separator']")) {
      const separatorStyle = getComputedStyle(separator);
      const color = parseFloat(separatorStyle.borderTopWidth) > 0 ? separatorStyle.borderTopColor : separatorStyle.backgroundColor;
      if (frameLuminance - relativeLuminance(readColor(color)) > 0.02) {
        heavySeparators.push(`vạch ${color}, viền khung ${menuStyle.borderTopColor}: ${describe(separator)}`);
        break;
      }
    }
  }

  // 18i. Vạch trái của mục đang chọn (viền trái hay bóng inset) bị bo góc của khung `overflow-hidden` cắt cong
  //      ở dòng đầu, dòng cuối (28/09/2026, danh sách việc làm).
  const clippedBars = [];
  for (const element of allElements) {
    if (clippedBars.length >= 3) break;
    const style = getComputedStyle(element);
    const hasInsetBar = /inset/.test(style.boxShadow) && /(^|\s)[2-6]px 0px 0px/.test(style.boxShadow);
    const hasBorderBar = parseFloat(style.borderLeftWidth) >= 2 && readColor(style.borderLeftColor).alpha > 0.1 && !(parseFloat(style.borderTopWidth) > 0);
    if ((!hasInsetBar && !hasBorderBar) || !isVisible(element)) continue;
    const rect = element.getBoundingClientRect();
    for (let node = element.parentElement; node && node !== document.body; node = node.parentElement) {
      const nodeStyle = getComputedStyle(node);
      if (!["hidden", "clip"].includes(nodeStyle.overflowX)) continue;
      const radius = parseFloat(nodeStyle.borderTopLeftRadius) || 0;
      const box = node.getBoundingClientRect();
      const isAtCorner = Math.abs(rect.left - box.left) <= 2 && (Math.abs(rect.top - box.top) <= radius || Math.abs(rect.bottom - box.bottom) <= radius);
      if (radius >= 6 && isAtCorner) clippedBars.push(`bo ${radius}px của ${describe(node)} cắt vạch trái ${describe(element)}`);
      break;
    }
  }

  // 18j. Mục lặp dày chữ: card hay dòng lặp từ ba cái trở lên mà một cái có từ năm dòng chữ. Người dùng không tự
  //      thấy "card chữ quá trời" (28/09/2026, wireframe danh sách + chi tiết năm dòng mỗi mục); đặt ra số dòng
  //      thì thấy. Đếm dòng bằng các hộp dòng của chữ (Range), không bằng số thẻ.
  const denseItems = [];
  for (const parent of allElements) {
    if (denseItems.length >= 3) break;
    const items = [...parent.children].filter((child) => isVisible(child) && child.getBoundingClientRect().height >= 48);
    if (items.length < 3) continue;
    // Cùng loại = cùng thẻ và cùng class đầu: mục đang chọn thêm class trạng thái (`sel`, `lg:bg-…`) vẫn cùng loại.
    const signature = (child) => `${child.tagName}.${(child.getAttribute("class") || "").split(/\s+/)[0]}`;
    const sameKind = items.filter((child) => signature(child) === signature(items[0]));
    if (sameKind.length < 3) continue;
    const lineCounts = sameKind.slice(0, 6).map(countTextLines);
    const maxLines = Math.max(...lineCounts);
    const densest = sameKind[lineCounts.indexOf(maxLines)];
    // Nhóm link điều hướng (gần như mỗi dòng một link, như nhóm mục sidebar) không phải mục dày chữ
    // (báo nhầm 29/09/2026, sidebar của wireframe).
    if (densest.querySelectorAll("a[href], button").length >= maxLines - 1) continue;
    // Cột hay nhóm chứa mục (cột bác sĩ của lưới giờ, nhóm "Sắp tới" của hàng chờ, cột kanban): bên trong có từ
    // hai mục cùng loại cao từ 40px, số dòng là của cả nhóm. Mục thật được xét riêng (báo nhầm 30/09/2026,
    // wireframe lịch hẹn: cột 24 dòng, nhóm 25 dòng).
    const hasNestedItems = [densest, ...densest.querySelectorAll("*")].some((node) => {
      const tallSignatures = [...node.children].filter((child) => child.getBoundingClientRect().height >= 40).map(signature);
      return tallSignatures.some((childSignature, index) => tallSignatures.indexOf(childSignature) !== index);
    });
    if (hasNestedItems) continue;
    if (maxLines >= 5) denseItems.push(`${sameKind.length} mục, nhiều nhất ${maxLines} dòng chữ: ${describe(densest)}`);
  }

  // 18j2. Khối lặp có ảnh (card tin đăng, sản phẩm, việc làm): ba câu của `N12`. Chữ to nhất so với tên mục
  //       (tên = dòng chữ dài nhất), khoảng giữa các dòng chữ (không có khoảng nào từ 6px là không tách nhóm),
  //       tên cắt một dòng. Card số liệu không có ảnh nên không vào đây (con số to là cả khối).
  const repeatedCardIssues = [];
  const checkedCardGroups = new Set();
  for (const parent of allElements) {
    if (repeatedCardIssues.length >= 4) break;
    const items = [...parent.children].filter((child) => isVisible(child) && child.getBoundingClientRect().height >= 120);
    if (items.length < 3) continue;
    const signature = (child) => `${child.tagName}.${(child.getAttribute("class") || "").split(/\s+/)[0]}`;
    const sameKind = items.filter((child) => signature(child) === signature(items[0]));
    const card = sameKind[0];
    const image = card?.querySelector("img");
    if (sameKind.length < 3 || checkedCardGroups.has(signature(card)) || !image || image.getBoundingClientRect().height < 60) continue;
    checkedCardGroups.add(signature(card));
    const lines = [];
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (!text || !isVisible(node.parentElement)) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const style = getComputedStyle(node.parentElement);
      for (const rect of range.getClientRects()) {
        // Chữ đè trên ảnh (badge, số ảnh) không phải phần chữ của card.
        if (rect.width > 2 && rect.top >= image.getBoundingClientRect().bottom - 1) lines.push({ top: rect.top, bottom: rect.bottom, size: parseFloat(style.fontSize), text, element: node.parentElement });
      }
    }
    if (lines.length < 2) continue;
    const title = lines.reduce((longest, line) => (line.text.length > longest.text.length ? line : longest));
    const largest = lines.reduce((biggest, line) => (line.size > biggest.size ? line : biggest));
    const problems = [];
    if (title.text.length >= 15 && largest.size / title.size >= 1.25) problems.push(`"${largest.text.slice(0, 16)}" ${largest.size}px trên tên ${title.size}px, chênh quá một bậc`);
    const rows = [...lines].sort((first, second) => first.top - second.top)
      .filter((line, index, sorted) => index === 0 || line.top - sorted[index - 1].top > 3);
    const gaps = rows.slice(1).map((row, index) => row.top - rows[index].bottom);
    if (rows.length >= 3 && Math.max(...gaps) < 6) problems.push(`${rows.length} dòng chữ cách đều ${Math.round(Math.min(...gaps))}–${Math.round(Math.max(...gaps))}px, không tách nhóm`);
    const titleStyle = getComputedStyle(title.element);
    if (titleStyle.textOverflow === "ellipsis" && titleStyle.whiteSpace === "nowrap") {
      const titleRange = document.createRange();
      titleRange.selectNodeContents(title.element);
      if (titleRange.getBoundingClientRect().width > title.element.getBoundingClientRect().width + 1) problems.push(`tên "${title.text.slice(0, 24)}…" cắt một dòng`);
    }
    if (problems.length > 0) repeatedCardIssues.push(`${sameKind.length} card: ${problems.join("; ")}: ${describe(card)}`);
  }

  // 18l. Hàng control lệch trên dưới: hàng flex ngang chứa nút / ô nhập khác chiều cao mà không `items-center`,
  //      control thấp hơn dính lên đỉnh hàng. Nút "View companies" 32px cạnh nút ⋯ 36px trong ô cuối dòng
  //      bảng: trên 8px, dưới 12px (29/09/2026, wireframe báo cáo). Chỉ xét hàng thấp (một hàng control).
  const misalignedControlRows = [];
  const controlSelector = "button, a[href], input, select, textarea, [role='button'], [role='combobox']";
  const seenControlRows = new Set();
  for (const row of allElements) {
    if (misalignedControlRows.length >= 4) break;
    const rowKind = `${row.tagName}|${row.getAttribute("class") || ""}`;
    if (seenControlRows.has(rowKind)) continue;
    const style = getComputedStyle(row);
    if (!/flex/.test(style.display) || !style.flexDirection.startsWith("row") || /center|baseline/.test(style.alignItems)) continue;
    const rowRect = row.getBoundingClientRect();
    if (rowRect.height > 72 || !isVisible(row)) continue;
    const children = [...row.children].filter((child) => isVisible(child) && getComputedStyle(child).position !== "absolute");
    if (children.length < 2 || !children.some((child) => child.matches(controlSelector))) continue;
    // Khối chữ nhiều dòng (tiêu đề + mô tả) cao hơn control: control bám dòng đầu là đúng (nút ✕
    // header modal, `items-start`), không phải hàng control. Báo nhầm 30/09/2026, design system phòng khám.
    const tallestControl = Math.max(...children.filter((child) => child.matches(controlSelector)).map((child) => child.getBoundingClientRect().height));
    if (children.some((child) => !child.matches(controlSelector) && child.getBoundingClientRect().height > tallestControl + 8)) continue;
    const contentTop = rowRect.top + parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
    const contentBottom = rowRect.bottom - parseFloat(style.paddingBottom) - parseFloat(style.borderBottomWidth);
    const contentCenter = (contentTop + contentBottom) / 2;
    const offsets = children
      .filter((child) => child.matches(controlSelector) && !/center|baseline/.test(getComputedStyle(child).alignSelf))
      .map((child) => {
        const rect = child.getBoundingClientRect();

        return { child, offset: (rect.top + rect.bottom) / 2 - contentCenter, height: rect.height };
      });
    const worst = offsets.sort((first, second) => Math.abs(second.offset) - Math.abs(first.offset))[0];
    if (!worst || Math.abs(worst.offset) < 2) continue;
    seenControlRows.add(rowKind);
    misalignedControlRows.push(`${describe(worst.child)} cao ${Math.round(worst.height)}px trong hàng ${Math.round(contentBottom - contentTop)}px, lệch ${Math.round(Math.abs(worst.offset) * 2)}px trên dưới: ${describe(row)}`);
  }

  // 18n. Khối không theo mẫu control của skill (29/09/2026, wireframe quản lý chi phí): placeholder dài hơn ô
  //      (ô thật cắt mất đuôi), khối trông như ô nhập mà là `div` nên chữ xuống dòng, phân trang chỉ có nút
  //      chữ "Trước / Sau" không số trang (`components/small-controls.md`).
  const textMeasurer = document.createElement("canvas").getContext("2d");
  const overlongPlaceholders = [];
  for (const input of document.querySelectorAll("input[placeholder]")) {
    if (overlongPlaceholders.length >= 4 || !isVisible(input) || /hidden|checkbox|radio|range|file/.test(input.type)) continue;
    const style = getComputedStyle(input);
    textMeasurer.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const available = input.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const needed = textMeasurer.measureText(input.placeholder).width;
    if (needed > available + 1) overlongPlaceholders.push(`"${input.placeholder}" cần ${Math.round(needed)}px, ô còn ${Math.round(available)}px: ${describe(input)}`);
  }
  const fakeFieldWraps = [];
  for (const element of allElements) {
    if (fakeFieldWraps.length >= 4) break;
    if (element.matches("input, textarea, select, [contenteditable='true']") || !isVisible(element)) continue;
    if (!/(^|[-_\s])(input|search|field|searchbox)([-_\s]|$)/i.test(element.getAttribute("class") || "")) continue;
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    if (!(parseFloat(style.borderTopWidth) > 0) || rect.height > 72 || element.querySelector("input, textarea")) continue;
    if (countTextLines(element) >= 2) fakeFieldWraps.push(`cao ${Math.round(rect.height)}px, chữ ${countTextLines(element)} dòng: ${describe(element)}`);
  }
  const textOnlyPagers = [];
  const pagerWords = /^(‹\s*)?(trước|sau|previous|prev|next|trang trước|trang sau)(\s*›)?$/i;
  for (const group of document.querySelectorAll("nav, div, footer")) {
    if (textOnlyPagers.length >= 2 || !isVisible(group)) continue;
    const controls = [...group.children].filter((child) => child.matches("a, button"));
    const wordControls = controls.filter((control) => pagerWords.test(control.textContent.trim()));
    if (wordControls.length < 2 || controls.some((control) => /^\d+$/.test(control.textContent.trim()))) continue;
    textOnlyPagers.push(`${wordControls.map((control) => `"${control.textContent.trim()}" ${Math.round(control.getBoundingClientRect().width)}px`).join(", ")}: ${describe(group)}`);
  }

  // 18o. Thanh header trong suốt nằm trên nền trang xám: các app để header nền trắng; trong suốt thì trông như
  //      chưa xong, dính đỉnh thì nội dung cuộn lên lộ sau chữ (29/09/2026, wireframe khách truy cập).
  const transparentHeaders = [];
  for (const bar of document.querySelectorAll("header, [role='banner']")) {
    if (transparentHeaders.length >= 2 || !isVisible(bar)) continue;
    const rect = bar.getBoundingClientRect();
    if (rect.height < 44 || rect.height > 96 || rect.width < window.innerWidth * 0.4 || rect.top > 8) continue;
    if (readColor(getComputedStyle(bar).backgroundColor).alpha > 0.1) continue;
    let behind = bar.parentElement;
    while (behind && readColor(getComputedStyle(behind).backgroundColor).alpha < 0.9) behind = behind.parentElement;
    const behindColor = readColor(getComputedStyle(behind || document.body).backgroundColor);
    const isGrayBehind = behindColor.alpha > 0.9 && Math.min(behindColor.red, behindColor.green, behindColor.blue) < 250;
    if (isGrayBehind) transparentHeaders.push(`nền sau rgb(${behindColor.red}, ${behindColor.green}, ${behindColor.blue}): ${describe(bar)}`);
  }

  // 18m. Trang wireframe thiếu phần nào của thanh công cụ (`design-process.md` U3): phương án, nút Màu, Khổ,
  //      Trạng thái, khung lý do, số khối. Có lượt wireframe có thanh, có lượt không (29/09/2026). Trong khung
  //      mobile (`frame=1`) thanh ẩn là đúng, không tính.
  const wireframeParams = new URLSearchParams(location.search);
  const countLinksWith = (param) => [...document.querySelectorAll("a[href*='?']")]
    .filter((link) => new URL(link.href, location.href).searchParams.has(param)).length;
  const missingWireframeParts = !/wireframe/i.test(location.pathname) || wireframeParams.has("frame") ? [] : [
    countLinksWith("v") < 2 && "thanh phương án (?v=)",
    countLinksWith("mau") < 1 && "công tắc Màu (mau=)",
    countLinksWith("kho") < 2 && "nút Khổ desktop / mobile (kho=)",
    countLinksWith("tt") < 2 && "nút Trạng thái (tt=)",
    !document.querySelector("[data-wf-reason]") && "khung lý do (data-wf-reason)",
    document.querySelectorAll("[data-wf-block]").length < 2 && "số khối (data-wf-block)",
  ].filter(Boolean);

  // 18m1. Vạch "bây giờ" của lưới giờ (`data-now`) bị ô hẹn đè: ô nằm trên vạch thì lúc đông lịch vạch chỉ lộ ở
  //       khe giữa các ô (đo 30/09/2026, lịch hẹn nha khoa 10:40: hiện 2% bề ngang), không còn là mốc để đọc
  //       "ai đang trễ, ai sắp tới". Đo bằng hit-test dọc vạch, tạm bật pointer-events.
  const coveredNowLines = [];
  for (const marker of document.querySelectorAll("[data-now]")) {
    if (!isVisible(marker) && marker.getBoundingClientRect().width < 40) continue;
    const markerRect = marker.getBoundingClientRect();
    if (markerRect.width < 40 || markerRect.bottom < 0 || markerRect.top > window.innerHeight) continue;
    const touched = [marker, ...marker.querySelectorAll("*")].map((node) => [node, node.style.pointerEvents]);
    for (const [node] of touched) node.style.pointerEvents = "auto";
    const sampleY = markerRect.top + markerRect.height / 2;
    let visibleCount = 0;
    let sampleCount = 0;
    for (let sampleX = markerRect.left + 2; sampleX < markerRect.right - 2; sampleX += 4) {
      sampleCount++;
      if (marker.contains(document.elementFromPoint(sampleX, sampleY))) visibleCount++;
    }
    for (const [node, value] of touched) node.style.pointerEvents = value;
    const visiblePercent = sampleCount ? Math.round((visibleCount / sampleCount) * 100) : 100;
    if (visiblePercent < 60) coveredNowLines.push(`chỉ thấy ${visiblePercent}% bề ngang: ${describe(marker)}`);
  }

  // 18m2. Khung wireframe làm hỏng bản thiết kế (U3, 30/09/2026, wireframe lịch hẹn nha khoa):
  //  - thanh công cụ tràn ngang ở desktop (thêm nhóm Màn, tên nhóm dài): "Trạng thái" bị cắt ở 1280;
  //  - số khối đè chữ hay icon của khối không có padding ("Thứ Ba" thành "ThBa"), hoặc bị khung cuộn cắt mất;
  //  - `[data-wf-block] { position: relative }` không nằm trong layer đè `sticky` của sidebar: sidebar trôi khi cuộn.
  const wireframeChromeProblems = [];
  const wireframeBar = document.querySelector(".wf-bar");
  if (wireframeBar && viewportWidth >= 1280 && wireframeBar.scrollWidth > wireframeBar.clientWidth + 1) {
    wireframeChromeProblems.push(`thanh công cụ tràn ${wireframeBar.scrollWidth - wireframeBar.clientWidth}px ở ${viewportWidth}px: rút nhãn (Màn một hai chữ, Phương án chỉ chữ cái)`);
  }
  const breakpointQueries = { sm: "(min-width: 40rem)", md: "(min-width: 48rem)", lg: "(min-width: 64rem)", xl: "(min-width: 80rem)", "2xl": "(min-width: 96rem)" };
  const isRectOverlap = (first, second) => first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
  for (const block of document.querySelectorAll("[data-wf-block]")) {
    if (!isVisible(block)) continue;
    const blockStyle = getComputedStyle(block);
    const wantedPosition = (block.getAttribute("class") || "").split(/\s+/)
      .map((token) => token.match(/^(?:(sm|md|lg|xl|2xl):)?(sticky|fixed|absolute)$/))
      .filter((match) => match && (!match[1] || matchMedia(breakpointQueries[match[1]]).matches))
      .map((match) => match[2]).pop();
    if (wantedPosition && blockStyle.position !== wantedPosition) {
      wireframeChromeProblems.push(`khối ${block.dataset.wfBlock} có class ${wantedPosition} mà ra ${blockStyle.position}: luật [data-wf-block] đè mất, đặt nó trong @layer base`);
    }
    const badge = getComputedStyle(block, "::before");
    if (badge.content === "none" || badge.display === "none") continue;
    const blockRect = block.getBoundingClientRect();
    const badgeWidth = parseFloat(badge.width) || 18;
    const badgeHeight = parseFloat(badge.height) || 18;
    const badgeLeft = blockRect.left + (parseFloat(badge.left) || 0);
    // Phần tử định vị trả `top` đã tính ra px kể cả khi CSS ghi `top: auto; bottom: 100%` (ra số âm).
    const badgeTop = blockRect.top + (parseFloat(badge.top) || 0);
    const badgeRect = { left: badgeLeft, top: badgeTop, right: badgeLeft + badgeWidth, bottom: badgeTop + badgeHeight };
    const isOutside = badgeRect.top < blockRect.top - 1 || badgeRect.left < blockRect.left - 1;
    if (isOutside && (blockStyle.overflowX !== "visible" || blockStyle.overflowY !== "visible")) {
      wireframeChromeProblems.push(`số khối ${block.dataset.wfBlock} nằm ngoài khối mà khối cắt tràn (overflow ${blockStyle.overflowX}): số bị mất, đặt data-wf-block lên khối bọc không cuộn`);
      continue;
    }
    const contentRects = [...block.querySelectorAll("svg, img")].map((node) => node.getBoundingClientRect());
    const textWalker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    for (let node = textWalker.nextNode(); node; node = textWalker.nextNode()) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      contentRects.push(...range.getClientRects());
    }
    const coveredRect = contentRects.find((rect) => rect.width > 0 && isRectOverlap(rect, badgeRect));
    if (coveredRect) wireframeChromeProblems.push(`số khối ${block.dataset.wfBlock} đè chữ hay icon của khối: dời số lên trên mép khối (data-wf-block-out)`);
  }

  // 19. Chữ dưới 12px: đọc khó ở mọi brand, hay gặp ở dòng phụ trong card và cột bên. Chữ trong biểu đồ
  //     (svg) và nhãn ngắn từ ba ký tự trở xuống ("Mới", "VIP") không tính.
  const tinyTexts = [];
  let tinyTextCount = 0;
  for (const element of allElements) {
    const ownText = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).map((node) => node.textContent).join("").trim();
    if (ownText.length <= 3 || element.closest("svg") || !isVisible(element)) continue;
    const fontSize = parseFloat(getComputedStyle(element).fontSize);
    if (fontSize >= 12) continue;
    tinyTextCount += 1;
    if (tinyTexts.length < 10) tinyTexts.push(`${fontSize}px "${ownText.slice(0, 32)}": ${describe(element)}`);
  }

  return {
    invisibleFrames,
    mismatchedRadii,
    browserDefaultControls,
    brokenRules,
    mismatchedRuleColors,
    unevenHeaderActions,
    squeezedBlocks,
    styledNativeSelects,
    stickyScrollColumns,
    mouseUnreachableScrollers,
    nestedFadeDialogs,
    untransitionedMotion,
    heavySeparators,
    clippedBars,
    denseItems,
    repeatedCardIssues,
    misalignedControlRows,
    missingWireframeParts,
    wireframeChromeProblems,
    coveredNowLines,
    overlongPlaceholders,
    fakeFieldWraps,
    textOnlyPagers,
    transparentHeaders,
    swallowedNumbers,
    floatingContent,
    tinyTexts,
    tinyTextCount,
    autoScrolledAreas,
    clippedBlocks,
    wrappedControls,
    wrappedRows,
    lowContrastTexts: sortedLowContrast.slice(0, 12).map((item) => item.line),
    lowContrastCount: sortedLowContrast.length,
    unmeasuredContrastCount,
    viewportWidth,
    pageScrollWidth,
    unpinnedScrollTables,
    squeezedTableColumns,
    crampedDescriptionLists,
    unevenStatRows,
    brokenMoney: [...new Set(brokenMoney)].slice(0, 10),
    gridChoiceGroups,
    hasHorizontalScroll: pageScrollWidth > viewportWidth + 1,
    overflowingElements,
    truncatedCount: truncatedTexts.length,
    tooShortTexts: tooShortTexts.slice(0, 10),
    tooShortCount: tooShortTexts.length,
    unevenSiblingGroups: unevenSiblingGroups.slice(0, 10),
    misalignedColumns: misalignedColumns.slice(0, 10),
    // Chỗ dưới 24px lên đầu: đó là mức hỏng với mọi brand, 24 tới 31px chỉ là sàn của skill.
    smallTapTargets: smallTapTargets
      .map((item) => ({ ...item, isBelowFloor: Math.min(...item.size.split("×").map(Number)) < 24 }))
      .sort((first, second) => Number(second.isBelowFloor) - Number(first.isBelowFloor))
      .slice(0, 15),
    smallTapCount: smallTapTargets.length,
    orphanPunctuation,
    misalignedFields: misalignedFields.slice(0, 10),
    unevenSeparatorRows: unevenSeparatorRows.slice(0, 10),
    overlappedChartLabels: [...new Set(overlappedChartLabels)].slice(0, 10),
    iconCoveringBadges,
    outsideChartLabels: [...new Set(outsideChartLabels)].slice(0, 10),
  };
}

// Vòng focus vẽ trên phần tử và các con (chữ bọc `<span>` mang `group-focus-visible:ring`): outline thấy được,
// hay bóng dạng vòng `0 0 0 Npx` có màu. Trả chuỗi để so lúc có và không có focus.
function readFocusRingSignature(probeId) {
  const element = document.querySelector(`[data-evon-probe-id="${probeId}"]`);
  if (!element) return null;
  const isVisibleColor = (color) => Boolean(color) && !/rgba\([^)]*,\s*0\)|\/\s*0\)|transparent/.test(color);
  const nodes = [element, ...element.querySelectorAll("span, div, svg")].slice(0, 20);

  return nodes
    .map((node) => {
      const style = getComputedStyle(node);
      // `outline-hidden` của Tailwind v4 là viền 2px trong suốt: không tính.
      const outline = style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0 && isVisibleColor(style.outlineColor)
        ? `outline ${style.outlineWidth} ${style.outlineColor}`
        : "";
      // Tailwind v4 trả màu vòng dạng `oklab(… / 0.5)`: chỉ đọc `rgba()` thì không thấy vòng nào, probe tưởng dự
      // án không vẽ vòng ở đâu nên bỏ luôn phép "Tab tới không thấy gì" (sót 30/09/2026, lịch khám: link sidebar).
      const rings = [...style.boxShadow.matchAll(/((?:rgba?|hsla?|oklab|oklch|lab|lch|color)\([^)]*\))\s+0px\s+0px\s+0px\s+([\d.]+)px/g)]
        .filter((match) => parseFloat(match[2]) > 0 && isVisibleColor(match[1]))
        .map((match) => `ring ${match[2]}px ${match[1]}`);

      return [outline, ...rings].filter(Boolean).join(" ");
    })
    .join("|");
}

// Cả dáng thấy được của phần tử lúc đó: vòng, nền, viền, màu chữ, gạch chân của nó và vài con. Lúc Tab
// tới mà chuỗi này y như lúc không focus thì Tab tới không thấy gì.
function readFocusLookSignature(probeId) {
  const element = document.querySelector(`[data-evon-probe-id="${probeId}"]`);
  if (!element) return null;
  const nodes = [element, ...element.querySelectorAll("span, div, svg")].slice(0, 20);

  return nodes
    .map((node) => {
      const style = getComputedStyle(node);

      const after = getComputedStyle(node, "::after");

      // `outline-none` vẫn để `outline-width` đổi theo `focus-visible:` (1px → 3px) mà không vẽ gì: chỉ so outline
      // khi có vẽ (sót 30/09/2026, lịch khám: link sidebar Tab tới không thấy gì mà probe tưởng có đổi).
      const drawnOutline = style.outlineStyle === "none" ? "none" : `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`;

      return [drawnOutline, style.boxShadow, style.backgroundColor, style.borderColor, style.color, style.textDecorationLine, after.boxShadow, after.outlineStyle, after.opacity, after.borderColor].join(" ");
    })
    .join("|");
}

// Tab qua trang, ghi phần tử còn vẽ vòng focus lúc Tab tới. Skill không vẽ vòng focus (`I13`, chủ dự án chốt
// 28/09/2026). Ô nhập, textarea, select, combobox được viền + ring mờ; mục menu tô nền, không phải vòng.
async function findDrawnFocusRings(page) {
  const candidates = [];
  const checksByKind = new Map();
  let firstFocusedId = null;
  let bodyStreak = 0;

  for (let tabIndex = 0; tabIndex < maxTabStops; tabIndex += 1) {
    await page.keyboard.press("Tab");
    const current = await page.evaluate(() => {
      const element = document.activeElement;
      // Lớp báo lỗi của Next lúc dev (`nextjs-portal`) không phải của trang (báo nhầm 28/09/2026).
      if (!element || element === document.body || element.tagName.startsWith("NEXTJS")) return null;
      if (!element.dataset.evonProbeId) element.dataset.evonProbeId = String(Math.random()).slice(2);
      const label = (element.getAttribute("aria-label") || element.textContent.trim() || element.getAttribute("title") || "").trim().replace(/\s+/g, " ").slice(0, 40);
      const isField = element.matches("input:not([type='checkbox']):not([type='radio']):not([type='range']), textarea, select, [contenteditable='true'], [role='combobox']");

      return { id: element.dataset.evonProbeId, kind: `${element.tagName}|${element.getAttribute("class") || ""}`, element: `${element.tagName.toLowerCase()} "${label}"`, isField };
    });

    // Focus rơi về body: đi hết cuối trang, Tab tiếp sẽ vòng lại đầu. Trang tự focus ô chat lúc tải thì vòng
    // Tab bắt đầu giữa trang; dừng ở body là không bao giờ tới header, sidebar (sót 27/09/2026, dự án mồi).
    if (!current) {
      bodyStreak += 1;
      if (bodyStreak >= 3) break;
      continue;
    }
    bodyStreak = 0;
    if (current.id === firstFocusedId) break;
    if (!firstFocusedId) firstFocusedId = current.id;
    if (current.isField) continue;

    const checkCount = checksByKind.get(current.kind) ?? 0;
    checksByKind.set(current.kind, checkCount + 1);
    if (checkCount >= maxFocusChecksPerKind) continue;
    const focusedSignature = await page.evaluate(readFocusRingSignature, current.id);
    const focusedLook = await page.evaluate(readFocusLookSignature, current.id);
    candidates.push({ ...current, focusedSignature, focusedLook });
  }

  // So với lúc không focus: viền "đang chọn" vẽ bằng ring (card chọn, chip) có sẵn cả lúc thường, không tính.
  const drawnRings = [];
  const unmarkedStops = [];
  for (const candidate of candidates) {
    await page.evaluate(() => document.activeElement?.blur());
    const blurredSignature = await page.evaluate(readFocusRingSignature, candidate.id);
    const blurredLook = await page.evaluate(readFocusLookSignature, candidate.id);
    if (candidate.focusedSignature?.replace(/\|/g, "") && blurredSignature !== candidate.focusedSignature) drawnRings.push(candidate.element);
    else if (blurredLook === candidate.focusedLook) unmarkedStops.push(candidate);
  }

  // Vòng có chuyển động thì lúc vừa Tab tới có thể chưa kịp hiện: focus lại (vẫn đang ở chế độ bàn phím nên
  // khớp `:focus-visible`), chờ hết chuyển động rồi so lần nữa.
  const confirmedUnmarked = [];
  for (const candidate of drawnRings.length >= 2 ? unmarkedStops : []) {
    await page.evaluate((probeId) => document.querySelector(`[data-evon-probe-id="${probeId}"]`)?.focus({ focusVisible: true }), candidate.id);
    await page.waitForTimeout(350);
    const settledLook = await page.evaluate(readFocusLookSignature, candidate.id);
    await page.evaluate(() => document.activeElement?.blur());
    const blurredLook = await page.evaluate(readFocusLookSignature, candidate.id);
    if (settledLook === blurredLook) confirmedUnmarked.push(candidate.element);
  }

  // Ngoại lệ của `I13` (chủ dự án chốt 30/09/2026): dự án tự vẽ vòng ở từ hai chỗ thì chỗ Tab tới không thấy
  // gì là bị đè mất trong hệ của họ (tab đang chọn đặt `box-shadow` viền trong, đè vòng của Button). Dự án
  // không vẽ vòng ở đâu thì theo `I13`, không báo.
  return { drawnRings, unmarkedFocusStops: confirmedUnmarked };
}

// ---------- Trạng thái động: rê chuột, lớp nổi, khối đang đóng ----------
// Ba lỗi 26–27/09/2026 lọt vì chỉ lộ khi rê hoặc chạm: nền rê nút viền #fff → #f8f8fa gần như không
// thấy, tooltip tên tệp 765px tràn khỏi màn 375px, lỗi nằm trong khối accordion đang đóng.

const maxHoverTargets = 80;
const maxPopupTriggers = 20;
const maxTruncatedTaps = 10;

// Đọc màu thật trên màn của một phần tử: nền của nó phủ lên nền đặc gần nhất phía sau. Màu oklab /
// oklch của Tailwind v4 đổi sang rgb qua canvas.
function readHoverState(probeId) {
  const element = document.querySelector(`[data-evon-hover-id="${probeId}"]`);
  if (!element) return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const toRgba = (cssColor) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillStyle = cssColor;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;

    return { red, green, blue, alpha: alpha / 255 };
  };
  const blend = (top, bottom) => ({
    red: Math.round(top.red * top.alpha + bottom.red * (1 - top.alpha)),
    green: Math.round(top.green * top.alpha + bottom.green * (1 - top.alpha)),
    blue: Math.round(top.blue * top.alpha + bottom.blue * (1 - top.alpha)),
    alpha: 1,
  });
  const findOpaqueAncestor = (start) => {
    for (let node = start; node; node = node.parentElement) {
      const color = toRgba(getComputedStyle(node).backgroundColor);
      if (color.alpha > 0.9) return { node, color };
    }

    return { node: document.documentElement, color: { red: 255, green: 255, blue: 255, alpha: 1 } };
  };

  const style = getComputedStyle(element);
  const behind = findOpaqueAncestor(element.parentElement);
  const outside = findOpaqueAncestor(behind.node.parentElement);
  const ownColor = toRgba(style.backgroundColor);
  const rect = element.getBoundingClientRect();
  const cardRect = behind.node.getBoundingClientRect();
  const borderWidth = parseFloat(style.borderTopWidth) || 0;

  // Nền của các khối con (ô icon, badge) để so lúc rê: dòng rê `bg-background` chứa ô icon `bg-background`
  // thì ô icon biến mất lúc rê (đã dính 27/09/2026, bản sửa của dự án mồi phase 2).
  const ownFill = blend(ownColor, behind.color);
  const childFills = [...element.querySelectorAll("*")]
    .filter((child) => {
      const childRect = child.getBoundingClientRect();

      return childRect.width * childRect.height >= 144 && toRgba(getComputedStyle(child).backgroundColor).alpha > 0.9;
    })
    .slice(0, 30)
    .map((child) => toRgba(getComputedStyle(child).backgroundColor));

  return {
    childFills,
    color: ownFill,
    borderColor: borderWidth > 0 ? blend(toRgba(style.borderTopColor), behind.color) : null,
    isBorderTransparent: borderWidth > 0 && toRgba(style.borderTopColor).alpha === 0,
    outsideColor: outside.color,
    behindColor: behind.color,
    // Chạm mép khung đặc phía sau (dòng bảng tràn hai mép card): nền rê gần màu nền ngoài khung là
    // card như bị khuyết một mảng (đã dính 26/09/2026, FAQ trang giá).
    width: rect.width,
    height: rect.height,
    isTableRow: element.tagName === "TR",
    // Khai nền rê (kể cả sau biến thể như `not-checked:hover:bg-`) mà rê vào màu không đổi là nền rê trùng
    // nền phía sau: rê không thấy gì (đã dính 28/09/2026, dòng danh sách rê `bg-muted` nằm trên khung
    // `bg-muted`). Mục đang chọn thì bỏ qua: rê cùng nền đang chọn là đúng.
    // `dark:hover:bg-` chỉ chạy khi trang đang tối: ô Select của shadcn chỉ khai nền rê cho dark, ở light rê
    // không đổi là đúng mẫu (luật khoá 6, báo nhầm 30/09/2026, lịch khám: mọi Select lên danh sách P).
    // `hover:bg-surface` (hay `disabled:hover:bg-surface`) cạnh `bg-surface` là cố ý giữ nền lúc thường, tắt nền
    // rê kế thừa từ variant (nút lọc dạng dropdown không hover, chủ dự án chốt, `components/choice-controls.md`),
    // không phải khai nền rê (báo nhầm 01/10/2026,
    // nút Lọc ở bảng công việc tối).
    declaresHoverFill: (element.getAttribute("class") || "").split(/\s+/).some((token, index, tokens) => {
      const variants = token.split(":");
      const utility = variants.pop();
      const isCancellingInheritedHover = tokens.includes(utility);

      return variants.includes("hover") && /^bg-(?!transparent)/.test(utility) && !isCancellingInheritedHover && (!variants.includes("dark") || document.documentElement.classList.contains("dark"));
    }),
    isSelected: element.matches("[aria-current]:not([aria-current='false']), [aria-selected='true'], [aria-pressed='true'], [data-state='active'], [data-state='on'], [data-state='checked']"),
    touchesCardEdge: behind.node !== document.documentElement && (Math.abs(rect.left - cardRect.left) <= 1 || Math.abs(rect.right - cardRect.right) <= 1),
  };
}

// Lớp nổi đang hiện (tooltip, menu, listbox, popover, khung fixed nhỏ) mà lòi khỏi viewport.
function findOverflowingLayers() {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight;
  const layers = [...document.querySelectorAll("[role='tooltip'], [role='menu'], [role='listbox'], [role='dialog'], dialog[open], body *")].filter((node) => {
    const style = getComputedStyle(node);
    if (style.visibility === "hidden" || style.display === "none" || parseFloat(style.opacity) === 0) return false;
    // Ví dụ ép trạng thái trên trang design system (select, modal mở sẵn trong khung tĩnh, `D9`): không phải
    // lớp nổi thật (báo nhầm 30/09/2026, design system phòng khám bản shadcn).
    if (node.closest("[inert], [data-demo-state]")) return false;
    // Lớp nổi phải tự định vị (fixed / absolute): listbox của bảng lệnh dựng tĩnh làm mẫu trong trang
    // nằm trong dòng chảy, kéo xuống dưới mép màn là chuyện cuộn trang (báo nhầm 27/09/2026, /components).
    const isPositioned = style.position === "fixed" || style.position === "absolute";
    const isLayer = isPositioned && (["tooltip", "menu", "listbox", "dialog"].includes(node.getAttribute("role")) || node.tagName === "DIALOG" || (parseInt(style.zIndex, 10) || 0) >= 20);
    if (!isLayer) return false;
    const rect = node.getBoundingClientRect();

    // Lớp phủ toàn màn (phủ kín cả hai chiều, nằm gọn trong màn) không phải lớp nổi cần đo. Tooltip rộng hơn
    // màn thì vẫn đo: đó chính là lỗi (tooltip tên tệp 765px ở 375px, 27/09/2026). Sheet cao hết màn mà rộng
    // hơn màn cũng vậy: `min-w-[400px]` ở 375px lòi 25px mép trái (sót 30/09/2026, lịch khám, sheet bộ lọc).
    const isFullScreen = rect.left >= -1 && rect.right <= viewportWidth + 1 && rect.width >= viewportWidth - 1 && rect.height >= viewportHeight - 1;
    // Khung nằm hẳn ngoài màn (sidebar đang đóng chờ trượt vào) không phải lớp nổi đang mở: lớp nổi
    // tràn thật luôn còn một phần trong màn (báo nhầm 27/09/2026, sidebar ở 375px).
    const isPartlyVisible = rect.right > 0 && rect.left < viewportWidth && rect.bottom > 0 && rect.top < viewportHeight;
    return rect.width > 0 && rect.height > 0 && !isFullScreen && isPartlyVisible;
  });

  return layers
    .map((node) => {
      const rect = node.getBoundingClientRect();
      const overflowLeft = Math.max(0, -rect.left);
      const overflowRight = Math.max(0, rect.right - viewportWidth);
      // Tràn đáy chỉ tính với khung fixed: khung absolute cuộn theo trang, kéo xuống là thấy.
      const overflowBottom = getComputedStyle(node).position === "fixed" ? Math.max(0, rect.bottom - viewportHeight) : 0;
      const worst = Math.max(overflowLeft, overflowRight, overflowBottom);
      if (worst <= 1) return null;
      const label = (node.getAttribute("role") || node.tagName.toLowerCase()) + ` "${node.textContent.trim().replace(/\s+/g, " ").slice(0, 30)}"`;

      return `${label} rộng ${Math.round(rect.width)}px, lòi ${Math.round(worst)}px khỏi màn`;
    })
    .filter(Boolean);
}

function colorDistance(first, second) {
  return Math.max(Math.abs(first.red - second.red), Math.abs(first.green - second.green), Math.abs(first.blue - second.blue));
}

function formatColor(color) {
  return `#${[color.red, color.green, color.blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

// Vị trí các khối đứng sau phần tử (anh em kế tiếp của nó và của bốn cấp cha): rê vào mà mấy khối này
// dời đi là hover đang thêm hay nở phần tử, cả hàng card bên dưới nhảy theo.
function readFollowerTops(probeId) {
  const element = document.querySelector(`[data-evon-hover-id="${probeId}"]`);
  const tops = [];

  for (let node = element, level = 0; node && node !== document.body && level < 5; node = node.parentElement, level++) {
    let follower = node.nextElementSibling;
    for (let count = 0; follower && count < 3; follower = follower.nextElementSibling, count++) {
      const rect = follower.getBoundingClientRect();
      if (rect.height > 0) tops.push(rect.top);
    }
  }

  return tops;
}

async function probeHoverStates(page) {
  const layoutShifts = [];
  const vanishedChildren = [];
  const weakHovers = [];
  const blendedHovers = [];
  const borderHovers = [];
  const overflowingLayers = new Set();

  const probeIds = await page.evaluate((limit) => {
    const seenSignatures = new Set();
    const ids = [];
    // `.group` và `cursor-pointer`: card bấm được dựng bằng div (onClick) vẫn có hover, hay gặp nhất là
    // `group-hover:` làm hiện thêm dòng trong card. Nhóm này chỉ đo nhảy bố cục, không đo màu rê: checkbox
    // `cursor-pointer` đậm viền lúc rê là kiểu đã duyệt (báo nhầm 27/09/2026, /dashboard).
    const colorProbeSelector = "button, a[href], [role='button'], [role='tab'], [role='menuitem'], [role='option'], tbody tr, summary";
    const candidates = document.querySelectorAll(`${colorProbeSelector}, .group, [class*='cursor-pointer']`);

    for (const element of candidates) {
      const rect = element.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8 || element.closest("[inert], [aria-hidden='true'], [data-demo-state]")) continue;
      if (getComputedStyle(element).visibility === "hidden") continue;
      // Nút đang vô hiệu ("Trang trước" ở trang 1) không rê được: không đổi nền là đúng (báo nhầm 30/09/2026).
      if (element.matches(":disabled, [aria-disabled='true']")) continue;
      // Gộp theo loại: cùng thẻ + cùng class là cùng một kiểu hover, đo một cái là đủ.
      const signature = `${element.tagName}|${element.getAttribute("class") || ""}`;
      if (seenSignatures.has(signature)) continue;
      seenSignatures.add(signature);
      element.dataset.evonHoverId = String(ids.length);
      if (!element.matches(colorProbeSelector)) element.dataset.evonLayoutOnly = "1";
      ids.push(element.dataset.evonHoverId);
      if (ids.length >= limit) break;
    }

    return ids;
  }, maxHoverTargets);

  for (const probeId of probeIds) {
    const locator = page.locator(`[data-evon-hover-id="${probeId}"]`);
    await page.mouse.move(1, 1);
    const isReady = await locator.scrollIntoViewIfNeeded({ timeout: 800 }).then(() => true, () => false);
    if (!isReady) continue;
    const before = await page.evaluate(readHoverState, probeId);
    const followerTopsBefore = await page.evaluate(readFollowerTops, probeId);
    const isHovered = await locator.hover({ timeout: 800, force: true }).then(() => true, () => false);
    if (!before || !isHovered) continue;
    await page.waitForTimeout(60);
    const after = await page.evaluate(readHoverState, probeId);
    const followerTopsAfter = await page.evaluate(readFollowerTops, probeId);
    if (!after) continue;

    for (const layer of await page.evaluate(findOverflowingLayers)) overflowingLayers.add(`rê: ${layer}`);

    const label = await locator.evaluate((element) => {
      const text = (element.getAttribute("aria-label") || element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 32);

      return `${element.tagName.toLowerCase()} "${text}"`;
    });
    const largestShift = followerTopsBefore.length === followerTopsAfter.length
      ? Math.max(0, ...followerTopsBefore.map((top, index) => Math.abs(followerTopsAfter[index] - top)))
      : 0;
    if (largestShift > 2) layoutShifts.push(`${label}: rê vào thì khối phía sau dời ${Math.round(largestShift)}px`);
    const vanishedIndex = before.childFills.findIndex((fill, index) => {
      const afterFill = after.childFills[index];

      return afterFill && colorDistance(before.color, fill) > 3 && colorDistance(after.color, afterFill) <= 3;
    });
    if (vanishedIndex !== -1) {
      vanishedChildren.push(`${label}: nền rê ${formatColor(after.color)} trùng nền khối con bên trong (ô icon, badge), khối con biến mất lúc rê`);
    }
    if (await locator.evaluate((element) => element.dataset.evonLayoutOnly === "1")) continue;

    // Viền xét trước: nút viền đổi màu viền mà nền đứng yên vẫn là ca cần báo.
    // Viền tan hẳn mà nền đổi là nút lặp trên dòng của I4 (rê vào thì viền trong suốt, nền đỏ nhạt,
    // rules-state.md): không báo. Đã báo nhầm 27/09/2026, "Đăng xuất" mỗi dòng ở trang bảo mật.
    const isBorderSwappedForFill = after.isBorderTransparent && colorDistance(before.color, after.color) > 8;
    if (before.borderColor && after.borderColor && !isBorderSwappedForFill && colorDistance(before.borderColor, after.borderColor) > 8) {
      borderHovers.push(`${label}: viền ${formatColor(before.borderColor)} → ${formatColor(after.borderColor)}`);
    }
    const change = colorDistance(before.color, after.color);
    if (change === 0 && before.declaresHoverFill && !before.isSelected) {
      blendedHovers.push(`${label}: khai nền rê mà nền rê trùng nền phía sau ${formatColor(after.color)}, rê không thấy gì`);
    }
    if (change === 0) continue;

    // Dòng bảng và dòng tràn mép khung được nền rê nhạt (#f8f8fa trên card trắng, bảng trong `I10`) vì phủ
    // cả một dải dài. Nút, mục menu, dòng thụt vào thì chênh dưới 8 mức là rê gần như không thấy.
    const isButtonSized = before.width < 320 && before.height < 80;
    const isFullBleedRow = before.isTableRow || before.touchesCardEdge;
    if (change < 8 && (isButtonSized || !isFullBleedRow)) weakHovers.push(`${label}: ${formatColor(before.color)} → ${formatColor(after.color)} (chênh ${change} mức)`);
    if (after.touchesCardEdge && colorDistance(after.color, after.outsideColor) <= 3) {
      blendedHovers.push(`${label}: nền rê ${formatColor(after.color)} gần như bằng nền ngoài khung ${formatColor(after.outsideColor)}, card như bị khuyết`);
    }
    // Nút nổi khỏi nền phía sau lúc đứng yên (nút viền trắng trên nền trang xám) mà rê vào lại về gần đúng
    // màu nền đó: nút như tan vào trang. Đã dính 30/09/2026, nút ‹ Hôm nay › #f1f1f3 trên nền trang #f4f4f6
    // (chênh 3): phép "rê gần như không thấy" không bắt vì trắng → #f1f1f3 vẫn đổi 14 mức. So với nền phía
    // sau LÚC ĐANG RÊ: nút trong dòng thì rê vào dòng cũng chìm về #f4f4f6 (nút "Tiếp đón" cùng màn).
    if (colorDistance(before.color, after.behindColor) > 8 && colorDistance(after.color, after.behindColor) <= 4) {
      blendedHovers.push(`${label}: nền rê ${formatColor(after.color)} gần bằng nền ngay sau nút ${formatColor(after.behindColor)}, nút tan vào nền`);
    }
    if (before.borderColor && colorDistance(after.color, before.borderColor) <= 3) {
      blendedHovers.push(`${label}: nền rê ${formatColor(after.color)} trùng màu viền ${formatColor(before.borderColor)}, nút thành mảng không viền`);
    }
  }
  await page.mouse.move(1, 1);

  return { layoutShifts, vanishedChildren, weakHovers, blendedHovers, borderHovers, overflowingLayers: [...overflowingLayers] };
}

// Mở từng nút có popup (menu, listbox, lịch) và, ở màn chạm, chạm vào chữ bị cắt (nơi hay gắn
// tooltip tên đầy đủ), xem lớp nổi vừa hiện có nằm trong màn không.
// Lớp nổi mà nội dung bên trong hẹp hơn khung: khung rộng bằng nút mở, nội dung bị chặn `max-w` nên bên
// phải còn một dải trống, thanh cuộn nằm lọt giữa (đã dính 27/09/2026, Select dựng lại ở dự án mồi).
function findHollowLayers() {
  const hollowLayers = [];

  for (const node of document.querySelectorAll("body *")) {
    const style = getComputedStyle(node);
    const role = node.getAttribute("role") || "";
    const isPositioned = style.position === "fixed" || style.position === "absolute";
    const isLayer = ["listbox", "menu", "dialog"].includes(role) || (parseInt(style.zIndex, 10) || 0) >= 20;
    if (!isPositioned || !isLayer || style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) continue;
    const rect = node.getBoundingClientRect();
    if (rect.width < 120 || rect.width > 640 || rect.height < 60) continue;

    const children = [...node.children].filter((child) => child.getBoundingClientRect().width > 0);
    if (children.length === 0) continue;
    const innerRight = rect.right - parseFloat(style.paddingRight) - parseFloat(style.borderRightWidth);
    const contentRight = Math.max(...children.map((child) => child.getBoundingClientRect().right));
    const emptyWidth = innerRight - contentRight;
    if (emptyWidth > 24) {
      const label = `${role || node.tagName.toLowerCase()} "${node.textContent.trim().replace(/\s+/g, " ").slice(0, 30)}"`;
      hollowLayers.push(`${label} rộng ${Math.round(rect.width)}px mà nội dung chừa trống ${Math.round(emptyWidth)}px bên phải`);
    }
  }

  return hollowLayers;
}

// Khung và vạch chia của lớp nổi đang mở đậm hơn token `--border` của dự án: menu dựng bằng `border-strong`
// cho cả khung lẫn vạch thì 18h (so vạch với khung) không thấy gì (đã dính 28/09/2026, menu tài khoản:
// khung và hai vạch cùng #eaeaea, mẫu của skill là `border-border` #f7f7f8). Không có `--border` thì bỏ qua.
function findHeavyLayerLines() {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const toLuminance = (cssColor) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillStyle = cssColor;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
    if (alpha === 0) return null;
    const opacity = alpha / 255;

    // Viền nửa trong suốt vẽ lên nền trắng của khung.
    return (0.2126 * (red * opacity + 255 * (1 - opacity)) + 0.7152 * (green * opacity + 255 * (1 - opacity)) + 0.0722 * (blue * opacity + 255 * (1 - opacity))) / 255;
  };
  // Tương phản của đường kẻ trên nền trắng. Viền trang trí của skill ~1.07:1; token viền của dự án cỡ
  // `#e2e8f0` (~1.23:1) cũng là đậm (M14), nên so thêm ngưỡng tuyệt đối, không chỉ so với token.
  const toContrastOnWhite = (cssColor) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillStyle = cssColor;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
    if (alpha === 0) return null;
    const opacity = alpha / 255;
    const toLinear = (channel) => {
      const value = (channel * opacity + 255 * (1 - opacity)) / 255;

      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    const luminance = 0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);

    return 1.05 / (luminance + 0.05);
  };
  const rootStyle = getComputedStyle(document.documentElement);
  const tokenColor = rootStyle.getPropertyValue("--border").trim() || rootStyle.getPropertyValue("--color-border").trim();
  const tokenLuminance = tokenColor ? toLuminance(tokenColor) : null;

  const describeLayer = (element) => `${element.tagName.toLowerCase()}${element.getAttribute("role") ? `[role=${element.getAttribute("role")}]` : ""} "${(element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)}"`;
  const findings = [];
  for (const layer of document.querySelectorAll("[role='menu'], [role='listbox'], [data-radix-popper-content-wrapper] > *, [popover]")) {
    const rect = layer.getBoundingClientRect();
    if (rect.width === 0 || getComputedStyle(layer).visibility === "hidden") continue;
    const lines = [];
    const layerStyle = getComputedStyle(layer);
    if (parseFloat(layerStyle.borderTopWidth) > 0) lines.push({ what: "viền khung", color: layerStyle.borderTopColor });
    const separator = layer.querySelector("hr, [role='separator']");
    if (separator) {
      const separatorStyle = getComputedStyle(separator);
      lines.push({ what: "vạch chia", color: parseFloat(separatorStyle.borderTopWidth) > 0 ? separatorStyle.borderTopColor : separatorStyle.backgroundColor });
    }
    const heavy = lines.filter((line) => {
      const luminance = toLuminance(line.color);
      const contrast = toContrastOnWhite(line.color);
      const isDarkerThanToken = luminance !== null && tokenLuminance !== null && tokenLuminance - luminance > 0.02;

      return isDarkerThanToken || (contrast !== null && contrast >= 1.15);
    });
    if (heavy.length > 0) findings.push(`${heavy.map((line) => `${line.what} ${line.color} (~${toContrastOnWhite(line.color).toFixed(2)}:1 trên trắng)`).join(", ")}, viền trang trí nên ~1.1:1${tokenColor ? `, token --border ${tokenColor}` : ""}: ${describeLayer(layer)}`);
  }

  return findings;
}

// Control gốc của trình duyệt nằm trong lớp nổi: select, ô ngày / giờ, checkbox, radio, thanh trượt, ô chọn
// tệp, ô chọn màu. Phép đo ở trang chỉ thấy thứ đang hiện, nên lớp nổi phải đo riêng (đã dính 29/09/2026,
// checkbox gốc trong menu "Khu khác"; 30/09/2026, select và ô ngày gốc trong dialog "Tạo phiếu" của wireframe
// kho hàng). Hai cách gọi:
// - "hidden": lớp đang ẩn mà vẫn nằm trong DOM (`<dialog>` đóng, popover, `[hidden]`, role dialog / menu /
//   listbox bị ẩn). Style vẫn đọc được dù đang `display: none`.
// - "opened": lớp vừa mở sau cú bấm (modal gắn vào DOM lúc mở). Lớp đã hiện trước khi bấm mang
//   `data-evon-seen-layer` hoặc `data-evon-before`, không tính.
function findNativeControls(mode) {
  const layerSelector = "dialog, [popover], [role='dialog'], [role='menu'], [role='listbox'], [data-radix-popper-content-wrapper], [hidden]";
  const describeLayer = (layer) => `${layer.tagName.toLowerCase()}${layer.getAttribute("role") ? `[role=${layer.getAttribute("role")}]` : ""} "${(layer.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)}"`;
  const isShown = (element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden";

  function kindOf(control) {
    const style = getComputedStyle(control);
    // Input tự vẽ đè lên (sr-only, trong suốt, pointer-events-none) thì không phải control gốc đang lộ.
    if (Number(style.opacity) <= 0.1 || parseFloat(style.width) <= 2 || style.clip === "rect(0px, 0px, 0px, 0px)") return null;
    if (control.tagName === "SELECT") return ["auto", "menulist"].includes(style.appearance) ? "select gốc chưa tô" : `select gốc đã tô (${control.options.length} mục)`;
    if (["date", "time", "datetime-local", "month", "week"].includes(control.type)) return `ô ${control.type} gốc`;
    if (["checkbox", "radio"].includes(control.type)) return style.appearance === "none" ? null : `${control.type} gốc${style.accentColor !== "auto" ? " (chỉ tô accent-color)" : ""}`;
    if (control.type === "range") return style.appearance === "none" || style.pointerEvents === "none" ? null : "thanh trượt gốc";
    if (control.type === "file") return "ô chọn tệp gốc";
    if (control.type === "color") return "ô chọn màu gốc";

    return null;
  }

  const found = new Map();
  for (const control of document.querySelectorAll("select, input")) {
    const layer = control.closest(layerSelector);
    if (!layer) continue;
    const outerLayer = [...document.querySelectorAll(layerSelector)].find((candidate) => candidate.contains(layer) && !candidate.parentElement?.closest(layerSelector)) || layer;
    if (mode === "hidden" && isShown(control)) continue;
    if (mode === "opened" && (!isShown(control) || outerLayer.dataset.evonSeenLayer || outerLayer.dataset.evonBefore)) continue;
    const kind = kindOf(control);
    if (!kind) continue;
    const key = describeLayer(outerLayer);
    found.set(key, [...new Set([...(found.get(key) || []), kind])]);
  }

  return [...found].slice(0, 6).map(([layer, kinds]) => `${kinds.join(", ")} trong ${layer}${mode === "hidden" ? " (đang ẩn)" : ""}`);
}

// Lớp nổi vừa mở: có chuyển động mở không (overlay.md, "Chuyển động"). Menu bật tắt bằng `{isOpen && …}`
// hay `display` hiện ra tức thì. Control gốc bên trong thì `findNativeControls` đo.
function findPopupDetails(freezeCss) {
  // Probe tắt mọi transition để chụp ổn định (freezeMotionCss); lớp nổi gắn vào DOM sau lúc ghi
  // `data-evon-transition`, nên tạm tắt khối đóng băng để đọc style thật, đọc xong bật lại.
  const freezeTags = [...document.querySelectorAll("style")].filter((tag) => tag.textContent === freezeCss);
  for (const tag of freezeTags) tag.media = "not all";
  const describeLayer = (element) => `${element.tagName.toLowerCase()}${element.getAttribute("role") ? `[role=${element.getAttribute("role")}]` : ""} "${(element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)}"`;
  const motionProperties = ["all", "opacity", "transform", "scale", "translate"];
  const motionless = [];
  const scrollyLayers = [];
  for (const layer of document.querySelectorAll("[role='menu'], [role='listbox'], [role='dialog'], [data-radix-popper-content-wrapper] > *, [popover]")) {
    const rect = layer.getBoundingClientRect();
    // Lớp đã hiện sẵn trước khi bấm (listbox nằm trong trang, không phải lớp nổi) không tính.
    if (rect.width === 0 || layer.dataset.evonSeenLayer || getComputedStyle(layer).visibility === "hidden") continue;
    // Lớp nằm trong một lớp khác (listbox trong khung popover của Select) thì khung ngoài mới là lớp nổi.
    if (layer.parentElement?.closest("[role='menu'], [role='listbox'], [role='dialog'], [popover]")) continue;
    // Chuyển động có thể nằm ở khung bọc ngoài: đi ngược lên tới khung nổi (fixed / absolute) gần nhất.
    let hasMotion = false;
    for (let node = layer, depth = 0; node && node !== document.body && depth < 8; node = node.parentElement, depth += 1) {
      const style = getComputedStyle(node);
      const durations = style.transitionDuration.split(",").map((duration) => parseFloat(duration));
      const hasTransition = style.transitionProperty.split(",").some((property, index) => motionProperties.includes(property.trim()) && (durations[index] ?? durations[0]) > 0);
      if (style.animationName !== "none" || hasTransition) {
        hasMotion = true;
        break;
      }
      if (["fixed", "absolute"].includes(style.position)) break;
    }
    if (!hasMotion) motionless.push(describeLayer(layer));
    // Thanh cuộn thừa: lớp nổi cuộn ngang, hay cuộn dọc mà chỉ hụt dưới một hàng (khung gõ tay nhỏ hơn
    // nội dung; `[popover]` gốc có sẵn `overflow: auto`). Listbox dài hụt nhiều hàng thì cuộn là đúng.
    for (const box of [layer, ...layer.querySelectorAll("*")]) {
      const style = getComputedStyle(box);
      const overflowX = box.scrollWidth - box.clientWidth;
      const overflowY = box.scrollHeight - box.clientHeight;
      const isScrollableX = ["auto", "scroll"].includes(style.overflowX) && overflowX > 1;
      const isScrollableY = ["auto", "scroll"].includes(style.overflowY) && overflowY > 1 && overflowY < 40;
      if (!isScrollableX && !isScrollableY) continue;
      scrollyLayers.push(`${describeLayer(layer)}: ${isScrollableX ? `cuộn ngang hụt ${overflowX}px` : ""}${isScrollableX && isScrollableY ? ", " : ""}${isScrollableY ? `cuộn dọc hụt ${overflowY}px` : ""}`);
      break;
    }
  }
  for (const tag of freezeTags) tag.media = "all";

  return { motionless, scrollyLayers };
}

async function probePopupLayers(page, isMobile, isDark = false) {
  const overflowingLayers = new Set();
  const sunkenSelections = new Set();
  const hollowLayers = new Set();
  const checkedHoverChanges = new Set();
  const heavyLayerLines = new Set();
  const motionlessLayers = new Set();
  const nativeChoices = new Set();
  const scrollyLayers = new Set();
  const lostTriggerIcons = new Set();
  const hollowBefore = new Set(await page.evaluate(findHollowLayers));
  const triggerIds = await page.evaluate(({ popupLimit, tapLimit, isTouch }) => {
    const ids = [];
    const popupTriggers = [...document.querySelectorAll("[aria-haspopup]:not([aria-haspopup='false'])")].filter((element) => element.getBoundingClientRect().width > 0).slice(0, popupLimit);
    for (const element of popupTriggers) {
      element.dataset.evonPopupId = `popup-${ids.length}`;
      ids.push(element.dataset.evonPopupId);
    }
    if (isTouch) {
      const truncated = [...document.querySelectorAll("body *")]
        .filter((element) => element.children.length === 0 && element.scrollWidth > element.clientWidth + 1 && getComputedStyle(element).textOverflow === "ellipsis" && !element.closest("a[href]"))
        .slice(0, tapLimit);
      for (const element of truncated) {
        element.dataset.evonPopupId = `tap-${ids.length}`;
        ids.push(element.dataset.evonPopupId);
      }
    }

    return ids;
  }, { popupLimit: maxPopupTriggers, tapLimit: maxTruncatedTaps, isTouch: isMobile });
  // Nút mở nằm trong `<dialog>` đang đóng (select, ô ngày của form tạo mới) thì mở dialog rồi thử luôn:
  // lịch có thanh cuộn, chọn xong mất icon chỉ lộ ở đó (đã dính 30/09/2026, wireframe kho hàng).
  const dialogTriggerIds = await page.evaluate((limit) => {
    const ids = [];
    [...document.querySelectorAll("dialog:not([open])")].slice(0, 2).forEach((dialog, dialogIndex) => {
      for (const element of [...dialog.querySelectorAll("[aria-haspopup]:not([aria-haspopup='false'])")].slice(0, limit)) {
        element.dataset.evonPopupId = `dialog${dialogIndex}-${ids.length}`;
        ids.push(element.dataset.evonPopupId);
      }
    });

    return ids;
  }, maxPopupTriggers);

  for (const triggerId of [...triggerIds, ...dialogTriggerIds]) {
    const locator = page.locator(`[data-evon-popup-id="${triggerId}"]`);
    const isTap = triggerId.startsWith("tap-");
    if (triggerId.startsWith("dialog")) {
      await page.evaluate((id) => {
        const dialog = document.querySelector(`[data-evon-popup-id="${id}"]`)?.closest("dialog");
        if (!dialog || dialog.open) return;
        dialog.showModal();
        dialog.dataset.evonSeenLayer = "1";
        dialog.dataset.evonProbeOpened = "1";
      }, triggerId);
      await page.waitForTimeout(200);
    }
    await page.evaluate(() => {
      for (const layer of document.querySelectorAll("[role='menu'], [role='listbox'], [role='dialog'], [popover]")) {
        if (layer.getBoundingClientRect().width > 0 && Number(getComputedStyle(layer).opacity) > 0.5) layer.dataset.evonSeenLayer = "1";
      }
    });
    const isDone = await (isTap ? locator.tap({ timeout: 800, force: true }) : locator.click({ timeout: 800, force: true })).then(() => true, () => false);
    if (!isDone) continue;
    await page.waitForTimeout(250);
    for (const layer of await page.evaluate(findOverflowingLayers)) overflowingLayers.add(`${isTap ? "chạm chữ bị cắt" : "mở"}: ${layer}`);
    for (const layer of await page.evaluate(findHollowLayers)) if (!hollowBefore.has(layer)) hollowLayers.add(layer);
    // Ô chọn trong lớp nổi (bộ lọc dạng popover) chỉ hiện lúc mở, nên đo rê vào ô đã chọn ở đây nữa.
    if (!isTap && !isMobile) for (const change of await findCheckedHoverChanges(page)) checkedHoverChanges.add(change);
    if (!isTap) for (const line of await page.evaluate(findHeavyLayerLines)) heavyLayerLines.add(line);
    // Lớp nổi vừa mở thường tô sẵn mục đầu (đang trỏ): đo mục đó có khoét lỗ ở nền tối không.
    if (!isTap && isDark) for (const line of await page.evaluate(findSunkenSelections)) sunkenSelections.add(line);
    if (!isTap) {
      const details = await page.evaluate(findPopupDetails, freezeMotionCss);
      for (const layer of details.motionless) motionlessLayers.add(layer);
      for (const control of await page.evaluate(findNativeControls, "opened")) nativeChoices.add(control);
      for (const layer of details.scrollyLayers) scrollyLayers.add(layer);
    }
    // Ô chọn (select, ô ngày): chọn thử một mục hay một ngày rồi xem nút mở còn icon không. Vẽ lại nút
    // sau khi chọn mà quên vẽ icon (wireframe ghi lại `innerHTML` mà không gọi `lucide.createIcons()`) thì
    // chevron / icon lịch mất tới lần mở sau (đã dính 30/09/2026, wireframe kho hàng, cả select lẫn ô ngày).
    if (!isTap) {
      const pickedTrigger = await page.evaluate((id) => {
        const trigger = document.querySelector(`[data-evon-popup-id="${id}"]`);
        const isPicker = trigger?.getAttribute("role") === "combobox" || ["listbox", "dialog", "grid"].includes(trigger?.getAttribute("aria-haspopup"));
        if (!isPicker) return null;
        const isInOpenedLayer = (element) => {
          const layer = element.closest("[role='listbox'], [role='dialog'], [role='grid'], [popover], [data-radix-popper-content-wrapper]");

          return Boolean(layer) && !layer.dataset.evonSeenLayer && element.getClientRects().length > 0;
        };
        const options = [...document.querySelectorAll("[role='option']:not([aria-selected='true']):not([aria-disabled='true'])")].filter(isInOpenedLayer);
        // Ô ngày: nút chỉ có một con số 1–31, chưa chọn, không thuộc tháng khác.
        const days = [...document.querySelectorAll("button:not([disabled])")]
          .filter((button) => isInOpenedLayer(button) && /^\d{1,2}$/.test((button.textContent || "").trim()) && button.getAttribute("aria-selected") !== "true" && !button.closest("[aria-selected='true']") && !/outside/.test(`${button.className} ${button.parentElement?.className || ""}`));
        const pick = options[0] || days[days.length > 15 ? 15 : 0];
        if (!pick) return null;
        pick.click();

        // Ô trống `—` của bảng có icon `calendar-plus` + "Đặt hạn" chỉ cho lúc trống (`layouts/app.md`, "Ô trống
        // một kiểu"): có ngày rồi thì hết icon là đúng mẫu (báo nhầm 01/10/2026, cột hạn chót bảng công việc).
        const isEmptyCellTrigger = (trigger.textContent || "").trim().startsWith("—");

        return { label: `${trigger.tagName.toLowerCase()} "${(trigger.textContent || "").trim().slice(0, 30)}"`, iconCount: isEmptyCellTrigger ? 0 : trigger.querySelectorAll("svg").length };
      }, triggerId);
      if (pickedTrigger) {
        await page.waitForTimeout(250);
        // Mất icon: trước có svg mà giờ không còn, hay còn `<i data-lucide>` chưa vẽ (dấu của wireframe
        // ghi lại innerHTML mà quên `createIcons()`).
        const after = await locator.evaluate((trigger) => ({ iconCount: trigger.querySelectorAll("svg").length, placeholderCount: trigger.querySelectorAll("i[data-lucide]").length })).catch(() => ({ iconCount: 1, placeholderCount: 0 }));
        if (after.placeholderCount > 0 || (pickedTrigger.iconCount > 0 && after.iconCount === 0)) lostTriggerIcons.add(`chọn xong ở ${pickedTrigger.label} thì nút mở mất icon (chevron, lịch) tới lần mở sau${after.placeholderCount > 0 ? ", còn thẻ <i data-lucide> chưa vẽ" : ""}`);
      }
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(120);
  }
  if (dialogTriggerIds.length > 0) {
    await page.evaluate(() => {
      for (const dialog of document.querySelectorAll("dialog[data-evon-probe-opened]")) if (dialog.open) dialog.close();
    });
  }

  return {
    overflowing: [...overflowingLayers],
    hollow: [...hollowLayers],
    checkedHoverChanges: [...checkedHoverChanges],
    heavyLayerLines: [...heavyLayerLines],
    motionless: [...motionlessLayers],
    nativeChoices: [...nativeChoices],
    scrollyLayers: [...scrollyLayers],
    lostTriggerIcons: [...lostTriggerIcons],
    sunkenSelections: [...sunkenSelections],
  };
}

// Mở các khối đang đóng (accordion, mục thu gọn) để đo lại phần bên trong. Bỏ nút có popup (menu,
// lịch) và nút mở sidebar / menu ở màn hẹp: mở ra là che cả trang (đã dính 26/09/2026: lỗi khe
// quanh nút "…" của đường dẫn nằm trong mục accordion đóng sẵn ở /components).
async function expandCollapsedBlocks(page) {
  const count = await page.evaluate(() => {
    let expandedCount = 0;
    for (const button of document.querySelectorAll("[aria-expanded='false'][aria-controls]:not([aria-haspopup])")) {
      const label = `${button.getAttribute("aria-label") || ""} ${button.textContent || ""}`.toLowerCase();
      if (/sidebar|menu|điều hướng|thanh bên/.test(label) || button.getBoundingClientRect().width === 0) continue;
      button.click();
      expandedCount += 1;
    }

    return expandedCount;
  });
  if (count > 0) await page.waitForTimeout(300);

  return count;
}

// ---------- Hình của các trạng thái trên cùng một phần tử ----------
// Lịch gọn 26/09/2026 (lượt hai): rê ra nền ô vuông 46×48 cạnh vòng chọn tròn 32px, Tab tới thì vòng
// focus vuông quanh vòng tròn, bấm chuột xong ô vừa chọn giữ nền vuông chồng lên vòng đen: ba hình
// cho một ô ngày. Mỗi nhóm có mục đang chọn: lấy một mục chưa chọn cùng loại, rê, Tab tới, bấm rồi
// để chuột đứng yên, so hình vẽ ra với hình của mục đang chọn.

const maxStateGroups = 15;

// Những gì phần tử và con cháu (hai tầng) đang vẽ: nền và vòng (outline / box-shadow), kèm kích
// thước, có tròn không, và đường dẫn con (`0` là chính nó) để so trước với sau.
function readStatePaints(probeId) {
  const element = document.querySelector(`[data-evon-state-id="${probeId}"]`);
  if (!element) return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const readAlpha = (cssColor) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillStyle = cssColor;
    context.fillRect(0, 0, 1, 1);

    return context.getImageData(0, 0, 1, 1).data[3] / 255;
  };
  const paints = [];
  const hostRect = element.getBoundingClientRect();
  const visit = (node, path, depth) => {
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    if (rect.width >= 6 && rect.height >= 6) {
      const radiusText = style.borderTopLeftRadius;
      const radius = radiusText.endsWith("%") ? (parseFloat(radiusText) / 100) * rect.width : parseFloat(radiusText) || 0;
      const shape = {
        path,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        // Phần nền phủ trên phần tử: hai tab chữ dài ngắn khác nhau thì rộng khác nhau nhưng cùng phủ
        // kín, không phải khác hình (báo nhầm khi thử, hàng tab Tuần / Tháng).
        coverWidth: rect.width / hostRect.width,
        coverHeight: rect.height / hostRect.height,
        isRound: radius >= Math.min(rect.width, rect.height) / 2 - 1,
      };
      if (readAlpha(style.backgroundColor) > 0.05) paints.push({ kind: "bg", ...shape, paint: style.backgroundColor });
      const hasOutline = style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0;
      if (hasOutline || style.boxShadow !== "none") paints.push({ kind: "ring", ...shape, paint: hasOutline ? `outline ${style.outlineWidth} ${style.outlineColor}` : style.boxShadow });
    }
    if (depth < 2) [...node.children].forEach((child, index) => visit(child, `${path}.${index}`, depth + 1));
  };
  visit(element, "0", 0);

  return paints;
}

function findNewPaints(after, before, kind) {
  const seen = new Set(before.filter((paint) => paint.kind === kind).map((paint) => `${paint.path}|${paint.paint}`));

  return after.filter((paint) => paint.kind === kind && !seen.has(`${paint.path}|${paint.paint}`));
}

function pickLargestPaint(paints) {
  return paints.reduce((largest, paint) => (!largest || paint.width * paint.height > largest.width * largest.height ? paint : largest), null);
}

// Hai phần tử khác nhau (mục chưa chọn với mục đang chọn): so phần phủ. Cùng một phần tử (nền ngoài
// với nền con): so kích thước.
function isDifferentCover(first, second) {
  return first.isRound !== second.isRound || Math.abs(first.coverWidth - second.coverWidth) > 0.1 || Math.abs(first.coverHeight - second.coverHeight) > 0.1;
}

function isDifferentShape(first, second) {
  return first.isRound !== second.isRound || Math.abs(first.width - second.width) > 4 || Math.abs(first.height - second.height) > 4;
}

function describePaint(paint) {
  return `${paint.width}×${paint.height} ${paint.isRound ? "tròn" : "vuông"} ở ${paint.path === "0" ? "cả phần tử" : "con bên trong"}`;
}

async function probeStateShapes(page) {
  const shapeMismatches = [];
  const stuckStates = [];
  const hoverLikeSelected = [];

  const groups = await page.evaluate((limit) => {
    // Ngày hôm nay (`aria-current="date"`) không phải lựa chọn: nó được vẽ khác ngày đang chọn là đúng.
    const selectedSelector = "[aria-pressed='true'], [aria-selected='true'], [aria-current]:not([aria-current='false']):not([aria-current='date'])";
    const isVisible = (element) => {
      const rect = element.getBoundingClientRect();

      return rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== "hidden" && !element.closest("[inert], [aria-hidden='true']");
    };
    const seenGroups = new Set();
    const found = [];

    for (const selected of document.querySelectorAll(selectedSelector)) {
      if (found.length >= limit || !isVisible(selected)) continue;
      const group = selected.closest("[role='group'], [role='grid'], [role='tablist'], [role='listbox'], [role='radiogroup'], nav, ul, ol, table") || selected.parentElement?.parentElement;
      if (!group || seenGroups.has(group)) continue;
      // Mục cùng loại mang cùng thuộc tính trạng thái: chip `aria-pressed` so với chip, không với nút "Hôm nay"
      // cạnh đó (báo nhầm 30/09/2026, hàng chip bác sĩ trong wireframe lịch hẹn, nhóm rơi về ông của chip).
      const stateAttribute = ["aria-pressed", "aria-selected"].find((attribute) => selected.hasAttribute(attribute));
      const sibling = [...group.querySelectorAll(selected.tagName)].find(
        (candidate) =>
          candidate !== selected &&
          candidate.getAttribute("role") === selected.getAttribute("role") &&
          (!stateAttribute || candidate.hasAttribute(stateAttribute)) &&
          !candidate.matches(selectedSelector) &&
          !candidate.matches(":disabled, [aria-disabled='true']") &&
          !candidate.contains(selected) &&
          !selected.contains(candidate) &&
          isVisible(candidate),
      );
      if (!sibling) continue;
      seenGroups.add(group);
      // Link phủ cả dòng (`::after` inset-0) nằm trong tiêu đề: nền đang chọn và nền rê vẽ trên `<li>` bọc
      // ngoài, không trên link. Đo trên dòng (báo sót 28/09/2026, danh sách việc làm).
      const selectedRow = selected.tagName === "A" ? selected.closest("li") : null;
      const siblingRow = selectedRow && group.contains(selectedRow) ? sibling.closest("li") : null;
      (siblingRow ? selectedRow : selected).dataset.evonStateId = `selected-${found.length}`;
      (siblingRow || sibling).dataset.evonStateId = `sibling-${found.length}`;
      // Bấm thử chỉ với nút đổi lựa chọn tại chỗ: link thì chuyển trang, nút submit thì gửi form.
      const isSubmit = sibling.tagName === "BUTTON" && sibling.type === "submit" && sibling.form;
      const canClick = !sibling.closest("a[href]") && !isSubmit;
      const groupName = group.getAttribute("aria-label") || "";
      const text = (selected.getAttribute("aria-label") || selected.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24);
      found.push({ index: found.length, canClick, isTableRow: selected.tagName === "TR", label: `${selected.tagName.toLowerCase()} "${text}"${groupName ? ` trong "${groupName}"` : ""}` });
    }

    return found;
  }, maxStateGroups);

  for (const group of groups) {
    const siblingId = `sibling-${group.index}`;
    const sibling = page.locator(`[data-evon-state-id="${siblingId}"]`);
    await page.mouse.move(1, 1);
    await page.evaluate(() => document.activeElement?.blur());
    const isReady = await sibling.scrollIntoViewIfNeeded({ timeout: 800 }).then(() => true, () => false);
    if (!isReady) continue;

    const selectedPaints = await page.evaluate(readStatePaints, `selected-${group.index}`);
    const selectedShape = pickLargestPaint((selectedPaints || []).filter((paint) => paint.kind === "bg"));
    const restPaints = await page.evaluate(readStatePaints, siblingId);
    if (!selectedPaints || !restPaints) continue;

    // Rê: nền mới hiện ra phải cùng hình với nền của mục đang chọn.
    const isHovered = await sibling.hover({ timeout: 800, force: true }).then(() => true, () => false);
    await page.waitForTimeout(60);
    const hoverPaints = isHovered ? await page.evaluate(readStatePaints, siblingId) : null;
    const hoverShape = hoverPaints && pickLargestPaint(findNewPaints(hoverPaints, restPaints, "bg"));
    if (selectedShape && hoverShape && isDifferentCover(hoverShape, selectedShape)) {
      shapeMismatches.push(`${group.label}: rê ra nền ${describePaint(hoverShape)}, đang chọn là nền ${describePaint(selectedShape)}`);
    }
    // Rê ra đúng màu nền của mục đang chọn: rê qua mục nào cũng trông như vừa chọn nó (danh sách bên trái
    // của bố cục danh sách + chi tiết, 28/09/2026). Dòng bảng tick checkbox cùng nền rê là luật đã chốt
    // (`I10`), không tính.
    if (selectedShape && hoverShape && !group.isTableRow && hoverShape.paint === selectedShape.paint) {
      hoverLikeSelected.push(`${group.label}: rê ra nền ${hoverShape.paint}, trùng nền mục đang chọn`);
    }


    if (!group.canClick) continue;
    // Bấm chuột rồi để chuột đứng yên trên mục vừa chọn: nền rê không được chồng lên nền chọn, và
    // không hiện vòng nào (`I13`).
    const isClicked = await sibling.click({ timeout: 800 }).then(() => true, () => false);
    if (!isClicked) continue;
    await page.waitForTimeout(150);
    const clickedPaints = await page.evaluate(readStatePaints, siblingId);
    if (clickedPaints) {
      const backgrounds = clickedPaints.filter((paint) => paint.kind === "bg");
      for (const outer of backgrounds) {
        const inner = backgrounds.find((paint) => paint.path.startsWith(`${outer.path}.`) && isDifferentShape(paint, outer) && paint.width * paint.height > 0.3 * outer.width * outer.height);
        if (inner) {
          stuckStates.push(`${group.label}: bấm xong đứng yên, nền ${describePaint(outer)} chồng lên nền ${describePaint(inner)}`);
          break;
        }
      }
      const clickRing = pickLargestPaint(findNewPaints(clickedPaints, selectedPaints, "ring").filter((paint) => !restPaints.some((rest) => rest.kind === "ring" && rest.path === paint.path && rest.paint === paint.paint)));
      if (clickRing) stuckStates.push(`${group.label}: bấm chuột mà hiện vòng ${describePaint(clickRing)} (skill không vẽ vòng focus, I13)`);
    }
    await page.keyboard.press("Escape");
  }
  await page.mouse.move(1, 1);

  return { shapeMismatches, stuckStates, hoverLikeSelected, groupCount: groups.length };
}

// Rê vào ô đã chọn (checkbox, radio) mà màu nhấn đổi sang xám: `hover:border-*` đứng sau `checked:` trong CSS
// Tailwind v4 nên đè màu đã chọn (28/09/2026, radio lọc giá). Đo màu viền và nền trước, sau khi rê; màu trước
// có sắc mà sau thành xám, hoặc đổi hẳn sắc, là lỗi.
async function findCheckedHoverChanges(page) {
  const ids = await page.evaluate(() => {
    const controls = [...document.querySelectorAll("input[type='checkbox']:checked, input[type='radio']:checked, [role='checkbox'][aria-checked='true'], [role='radio'][aria-checked='true']")]
      .filter((control) => {
        const rect = control.getBoundingClientRect();

        return rect.width > 0 && rect.height > 0 && !control.closest("[inert], [aria-hidden='true']") && getComputedStyle(control).visibility !== "hidden";
      })
      .slice(0, 4);
    controls.forEach((control, index) => { control.dataset.evonCheckedId = String(index); });

    return controls.map((_, index) => String(index));
  });
  const readPaint = (id) => page.evaluate((checkedId) => {
    const control = document.querySelector(`[data-evon-checked-id="${checkedId}"]`);
    const style = getComputedStyle(control);
    const label = (control.closest("label")?.textContent || control.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 24);

    return { border: style.borderTopColor, background: style.backgroundColor, label: `${control.getAttribute("type") || control.getAttribute("role")} "${label}"` };
  }, id);
  const parseRgb = (color) => (color.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const saturation = (rgb) => (rgb.length < 3 ? 0 : Math.max(...rgb) - Math.min(...rgb));
  const changes = [];
  for (const id of ids) {
    const before = await readPaint(id);
    const isHovered = await page.locator(`[data-evon-checked-id="${id}"]`).hover({ timeout: 800, force: true }).then(() => true, () => false);
    if (!isHovered) continue;
    await page.waitForTimeout(60);
    const after = await readPaint(id);
    for (const key of ["border", "background"]) {
      const beforeRgb = parseRgb(before[key]);
      const afterRgb = parseRgb(after[key]);
      // Xám ngả xanh (`slate`) vẫn lệch kênh ~40, nên so tương đối: sắc tụt dưới 40% của lúc trước.
      if (saturation(beforeRgb) >= 40 && saturation(afterRgb) < saturation(beforeRgb) * 0.4 && before[key] !== after[key]) {
        changes.push(`${before.label}: rê vào ${key === "border" ? "viền" : "nền"} ${before[key]} → ${after[key]}`);
        break;
      }
    }
  }
  await page.mouse.move(1, 1);

  return changes;
}

function mergeMeasurements(base, extra) {
  const merged = { ...base };
  for (const [key, value] of Object.entries(extra)) {
    if (!Array.isArray(value) || !Array.isArray(base[key])) continue;
    const seen = new Set(base[key].map((item) => JSON.stringify(item)));
    merged[key] = [...base[key], ...value.filter((item) => !seen.has(JSON.stringify(item)))];
  }
  // Tự cuộn chỉ đo được lúc chưa ai chạm trang: lần đo lại sau khi mở khối đóng thì trang đã bị cuộn tới
  // khối đó (báo nhầm 27/09/2026, /dashboard 1280).
  merged.autoScrolledAreas = base.autoScrolledAreas;
  merged.hasHorizontalScroll = base.hasHorizontalScroll || extra.hasHorizontalScroll;
  merged.pageScrollWidth = Math.max(base.pageScrollWidth, extra.pageScrollWidth);

  return merged;
}

// ---------- Chạy ----------

// Khung app `h-screen` + cột nội dung `overflow-y-auto`: ảnh fullPage chỉ ra đúng một màn, phần dưới mép cột
// cuộn không bao giờ lên ảnh (ô nhập dính viền mặc định ở cuối trang bị sót, 27/09/2026). Kéo cửa sổ cao
// thêm bằng phần đang khuất của khung cuộn lớn nhất rồi mới chụp, chụp xong trả lại.
function measureHiddenScrollHeight() {
  let hiddenHeight = 0;
  for (const container of document.querySelectorAll("body *")) {
    const overflowY = getComputedStyle(container).overflowY;
    if (!["auto", "scroll"].includes(overflowY) || container.clientHeight < window.innerHeight * 0.6) continue;
    hiddenHeight = Math.max(hiddenHeight, container.scrollHeight - container.clientHeight);
  }

  return hiddenHeight;
}

async function takeFullScreenshot(page, path) {
  const viewport = page.viewportSize();
  const hiddenHeight = await page.evaluate(measureHiddenScrollHeight);
  if (hiddenHeight > 1) {
    await page.setViewportSize({ width: viewport.width, height: Math.min(viewport.height + hiddenHeight, 12000) });
    await page.waitForTimeout(250);
  }
  await page.screenshot({ path, fullPage: true });
  if (hiddenHeight > 1) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(150);
  }
}

async function probeWidth(browser, options, width) {
  const isMobile = width < mobileWidthLimit;
  const context = await browser.newContext({
    viewport: { width, height: isMobile ? 812 : 900 },
    deviceScaleFactor: options.dpr,
    isMobile,
    hasTouch: isMobile,
    colorScheme: options.isDark ? "dark" : "light",
  });
  const page = await context.newPage();
  const consoleErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text().slice(0, 200));
  });
  page.on("pageerror", (error) => consoleErrors.push(String(error).slice(0, 200)));

  await page.goto(options.url, { waitUntil: "load" });
  // Ghi `transition` sau khi trang đã hydrate: gắn thuộc tính trước đó thì React báo lệch HTML (báo nhầm
  // lỗi console 28/09/2026, Next).
  await page.waitForTimeout(options.waitMs);
  await page.evaluate(stampTransitions);
  await page.addStyleTag({ content: freezeMotionCss });
  if (options.isDark) await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.waitForTimeout(150);

  // Đo trước khi chụp: chụp fullPage ở khổ mobile làm trang mất `(pointer: coarse)`, nút
  // `pointer-coarse:size-10` co về 28px và bị báo nhầm là chỗ bấm nhỏ (đã dính 26/09/2026).
  const measurements = await page.evaluate(measureInPage, { minTapSize, isMobile });

  const screenshotPath = join(options.out, `${width}${options.isDark ? "-dark" : ""}.png`);
  await takeFullScreenshot(page, screenshotPath);
  // Đo dark mode ngay sau khi chụp, lúc trang còn đúng như ảnh: các bước rê, bấm, mở lớp nổi bên dưới
  // có thể đổi trang (đã dính 01/10/2026: tới lượt đo thì biểu đồ tổng quan còn 2/10 khối màu nhấn).
  const darkModeProblemSet = new Set(options.isDark ? [...(await page.evaluate(findDarkModeProblems)), ...(await page.evaluate(findSunkenSelections))] : []);

  const { drawnRings: drawnFocusRings, unmarkedFocusStops } = isMobile ? { drawnRings: [], unmarkedFocusStops: [] } : await findDrawnFocusRings(page);

  // Mở khối đang đóng trước khi rê và chạm: cây thư mục nằm trong accordion đóng ở /components thì
  // tooltip tên tệp tràn màn chỉ lộ khi khối đã mở (27/09/2026).
  const expandedCount = await expandCollapsedBlocks(page);
  const allMeasurements = expandedCount > 0 ? mergeMeasurements(measurements, await page.evaluate(measureInPage, { minTapSize, isMobile })) : measurements;
  // Khối vừa mở có thể chứa bản mẫu lớp nổi (hộp xác nhận bày tĩnh có lớp phủ): đo dark mode thêm một lần.
  if (options.isDark && expandedCount > 0) for (const line of [...(await page.evaluate(findDarkModeProblems)), ...(await page.evaluate(findSunkenSelections))]) darkModeProblemSet.add(line);

  // Màn chạm không có rê chuột: chỉ đo nền rê ở khổ desktop.
  const hoverStates = isMobile ? { layoutShifts: [], vanishedChildren: [], weakHovers: [], blendedHovers: [], borderHovers: [], overflowingLayers: [] } : await probeHoverStates(page);
  const popupLayers = await probePopupLayers(page, isMobile, options.isDark);
  for (const line of popupLayers.sunkenSelections) darkModeProblemSet.add(line);
  const darkModeProblems = [...darkModeProblemSet];
  const heavyDecorativeBorders = options.isDark ? [] : await page.evaluate(findHeavyDecorativeBorders);
  const scrollbarStyles = await page.evaluate(findScrollbarStyles);
  const heavyNavLinks = await page.evaluate(findHeavyNavLinks);
  const brokenImages = await page.evaluate(findBrokenImages);
  const misformattedNumbers = await page.evaluate(findMisformattedNumbers);
  const overflowingLayers = [...new Set([...hoverStates.overflowingLayers, ...popupLayers.overflowing])];
  // Chạy sau cùng: bấm thử đổi lựa chọn trên trang (ngày, tab), các phép đo khác phải xong trước.
  const pageCheckedHoverChanges = isMobile ? [] : await findCheckedHoverChanges(page);
  const stateShapes = isMobile ? { shapeMismatches: [], stuckStates: [], hoverLikeSelected: [], groupCount: 0 } : await probeStateShapes(page);
  // Sau cùng thật sự: mỗi lần bấm là một lần tải lại trang.
  const hiddenNativeControls = isMobile ? [] : await page.evaluate(findNativeControls, "hidden");
  const openerLayers = isMobile ? await probeOpenerLayers(page, options, width) : { problems: [], openedShots: [], nativeControls: [] };

  await context.close();

  return {
    width,
    screenshotPath,
    consoleErrors: [...new Set(consoleErrors)],
    ...allMeasurements,
    expandedCount,
    drawnFocusRings,
    unmarkedFocusStops,
    hollowLayers: popupLayers.hollow,
    openerLayerProblems: openerLayers.problems,
    openedLayerShots: openerLayers.openedShots,
    layoutShifts: hoverStates.layoutShifts,
    vanishedChildren: hoverStates.vanishedChildren,
    weakHovers: hoverStates.weakHovers,
    blendedHovers: hoverStates.blendedHovers,
    borderHovers: hoverStates.borderHovers,
    overflowingLayers,
    shapeMismatches: stateShapes.shapeMismatches,
    hoverLikeSelected: stateShapes.hoverLikeSelected,
    checkedHoverChanges: [...new Set([...pageCheckedHoverChanges, ...popupLayers.checkedHoverChanges])],
    heavyLayerLines: popupLayers.heavyLayerLines,
    motionlessLayers: popupLayers.motionless,
    popupNativeChoices: [...new Set([...popupLayers.nativeChoices, ...hiddenNativeControls, ...openerLayers.nativeControls])],
    scrollyLayers: popupLayers.scrollyLayers,
    lostTriggerIcons: popupLayers.lostTriggerIcons,
    heavyDecorativeBorders,
    scrollbarStyles,
    heavyNavLinks,
    brokenImages,
    misformattedNumbers,
    darkModeProblems,
    stuckStates: stateShapes.stuckStates,
    stateGroupCount: stateShapes.groupCount,
  };
}

// Viền trang trí đậm (M14): card, khung bo góc có viền 1px mà đường viền ≥ 1.21:1 trên trắng. Skill ~1.07:1,
// `--border-strong` #eaeaea ~1.20:1 (khung bảng ở dự án mồi, chủ dự án duyệt); token viền kiểu `#e2e8f0`
// (~1.23:1) là mức đã chê đậm, chỉ cho ô nhập, nút viền. Khung bọc ô nhập (ô tìm có icon) không tính.
function findHeavyDecorativeBorders() {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const toContrastOnWhite = (cssColor) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillStyle = cssColor;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
    if (alpha === 0) return null;
    // Viền có sắc (đỏ nhạt của banner lỗi, hổ phách của banner chú ý: `components/banner.md`) là viền mang
    // nghĩa, không phải viền trang trí xám. Đã báo nhầm 30/09/2026: `border-red-200` của khung cảnh báo y khoa.
    if (Math.max(red, green, blue) - Math.min(red, green, blue) > 24) return null;
    const opacity = alpha / 255;
    const toLinear = (channel) => {
      const value = (channel * opacity + 255 * (1 - opacity)) / 255;

      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };

    return 1.05 / (0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue) + 0.05);
  };
  const findings = new Map();
  for (const element of document.querySelectorAll("body *")) {
    if (findings.size >= 6) break;
    if (element.matches("input, textarea, select, button, a, label, [role='button'], [role='textbox'], [role='combobox']")) continue;
    // Ô bày viền focus trên trang design system là ví dụ trạng thái, không phải viền trang trí (`D9`, 30/09/2026).
    if (element.closest("[data-demo-state]")) continue;
    const style = getComputedStyle(element);
    const widths = [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth];
    if (style.borderTopStyle !== "solid" || widths.some((borderWidth) => borderWidth !== "1px") || parseFloat(style.borderTopLeftRadius) < 6) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width < 120 || rect.height < 60 || style.visibility === "hidden") continue;
    const field = element.querySelector("input:not([type='checkbox']):not([type='radio']):not([type='hidden']), textarea, select");
    if (field && field.getBoundingClientRect().height >= rect.height * 0.6) continue;
    const contrast = toContrastOnWhite(style.borderTopColor);
    if (contrast === null || contrast < 1.21 || findings.has(style.borderTopColor)) continue;
    const label = `${element.tagName.toLowerCase()}.${String(element.className).trim().split(/\s+/).slice(0, 4).join(".")}`;
    findings.set(style.borderTopColor, `${style.borderTopColor} (~${contrast.toFixed(2)}:1 trên trắng): ${label} "${(element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)}"`);
  }

  return [...findings.values()];
}

// Mục đang chọn / đang trỏ tô đúng nền trang (`isHighlighted && "bg-background"`, `aria-current` + `bg-background`)
// mà khung chứa nó sáng hơn: ở nền tối nền trang tối hơn card và lớp nổi, mục chọn thành lỗ khoét (M21). Class
// viết trong điều kiện JS nên không grep được `hover:bg-background`; đo màu. Đã dính 01/10/2026, ô chọn và bảng
// lệnh ở /components. Chỉ gọi ở nền tối: nền sáng thì nền trang tối hơn card là đúng chiều.
function findSunkenSelections() {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const readHex = (cssColor) => {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillStyle = cssColor;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;

    return alpha < 240 ? null : `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  };
  const pageHex = readHex(getComputedStyle(document.documentElement).getPropertyValue("--background").trim());
  if (!pageHex) return [];
  const findings = new Set();
  // Thêm vệt khung chờ `animate-pulse`: mẫu cũ tô `bg-background`, ở nền tối thành dãy lỗ đen (01/10/2026).
  const selector = "[role=option], [role=menuitem], [role=menuitemradio], [role=tab], [aria-selected=true], [aria-current]:not([aria-current=false]), [data-highlighted], [data-selected=true], .animate-pulse, [role=progressbar]";
  // Rãnh không có role (hay gặp: `div.h-2.rounded-full` bọc một thanh tô màu): nhận theo hình. Thấp 2–12px, bo
  // tròn đầu, rộng ≥ 60px, có con tô màu khác. Đã dính 01/10/2026, "Doanh thu theo kênh" ở /dashboard/revenue.
  const shapedTracks = [...document.querySelectorAll("div, span")].filter((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.height < 2 || rect.height > 12 || rect.width < 60) return false;
    if (parseFloat(getComputedStyle(element).borderTopLeftRadius) < rect.height / 2 - 0.5) return false;
    const fill = element.firstElementChild;

    return Boolean(fill) && readHex(getComputedStyle(fill).backgroundColor) !== null && fill.getBoundingClientRect().width < rect.width;
  });
  for (const element of shapedTracks) element.dataset.evonTrack = "1";
  for (const element of document.querySelectorAll(`${selector}, [data-evon-track]`)) {
    if (findings.size >= 3) break;
    const rect = element.getBoundingClientRect();
    // Rãnh `h-1`, `h-2` và vệt chờ `h-3` thấp hơn mục chọn: hạ ngưỡng cao riêng cho hai loại đó.
    const minHeight = element.matches(".animate-pulse, [role=progressbar], [data-evon-track]") ? 2 : 16;
    if (rect.width < 24 || rect.height < minHeight || readHex(getComputedStyle(element).backgroundColor) !== pageHex) continue;
    let ancestor = element.parentElement;
    let ancestorHex = null;
    while (ancestor && !ancestorHex) {
      ancestorHex = readHex(getComputedStyle(ancestor).backgroundColor);
      ancestor = ancestor.parentElement;
    }
    if (!ancestorHex || ancestorHex === pageHex) continue;
    const label = (element.textContent || element.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 30);
    const isSkeleton = element.classList.contains("animate-pulse");
    const isTrack = element.getAttribute("role") === "progressbar" || element.dataset.evonTrack === "1";
    findings.add(isSkeleton || isTrack
      ? `${isTrack ? "rãnh thanh tiến độ" : "vệt khung chờ"} tô nền trang ${pageHex}, tối hơn khung ${ancestorHex}, thành vệt đen: dùng bg-foreground/5 (M21${isTrack ? ", components/charts.md" : ", components/empty-state.md"})`
      : `mục đang chọn / đang trỏ tô nền trang ${pageHex}, tối hơn khung ${ancestorHex}, như lỗ khoét: dùng --item-hover (trỏ, rê) hoặc --secondary (đang chọn) (M21): ${element.getAttribute("role") || element.tagName.toLowerCase()} "${label}"`);
  }

  return [...findings];
}

// Chỉ chạy với `--dark` (M21, M31, M32, V4). Bốn kiểu lỗi chỉ người bật tối mới thấy:
// - trang vẫn sáng: dark mode chỉ có khai báo, hoặc `dark:` chạy theo máy mà token theo class;
// - mảng nền sáng giữa màn tối: badge, avatar, banner `-50`/`-100`, toast của thư viện chưa đọc token;
// - ô nhập không viền: `dark:border-transparent`, chỉ còn nền mờ báo vùng gõ;
// - nền rê `bg-background`: ở nền tối nền trang tối hơn card, rê vào chìm xuống gần như không thấy.
// Thêm `color-scheme` không phải dark: thanh cuộn gốc, ô ngày, autofill vẫn vẽ bản sáng.
// Màu nhấn, chữ chính (nút chính, tooltip đảo màu) được phép sáng, không tính.
function findDarkModeProblems() {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const readRgba = (cssColor) => {
    if (!cssColor) return null;
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = "rgba(0,0,0,0)";
    context.fillStyle = cssColor;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;

    return { red, green, blue, alpha: alpha / 255 };
  };
  const readLuminance = ({ red, green, blue }) => {
    const toLinear = (channel) => {
      const value = channel / 255;

      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };

    return 0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);
  };
  const toHex = ({ red, green, blue }) => `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  const describe = (element) => {
    const classNames = String(element.className?.baseVal ?? element.className ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 4);
    const text = (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30);

    return `${element.tagName.toLowerCase()}${classNames.length > 0 ? `.${classNames.join(".")}` : ""}${text ? ` "${text}"` : ""}`;
  };
  const findings = [];

  const pageBackground = [document.body, document.documentElement]
    .map((element) => readRgba(getComputedStyle(element).backgroundColor))
    .find((color) => color && color.alpha > 0.5);
  if (!pageBackground || readLuminance(pageBackground) > 0.4) {
    return [`trang không tối khi bật --dark (nền ${pageBackground ? toHex(pageBackground) : "trong suốt, tức trắng"}): dark mode chỉ có khai báo, coi như chưa có, bỏ lượt tối (V4). Dự án tự dựng dark mode mà ra dòng này thì token không lật theo class \`dark\` trên <html>`];
  }

  const colorScheme = getComputedStyle(document.documentElement).colorScheme;
  if (!/dark/.test(colorScheme)) findings.push(`color-scheme của <html> là "${colorScheme}", không phải dark: thanh cuộn gốc, ô ngày, autofill, <select> vẫn vẽ bản sáng (M31)`);

  const rootStyle = getComputedStyle(document.documentElement);
  // Nền rê nút chính trắng tuyệt đối: khối chói nhất màn tối (M23, đã dính 01/10/2026, ui-ux-dashboard).
  const primaryHover = readRgba(rootStyle.getPropertyValue("--primary-hover").trim());
  if (primaryHover && primaryHover.alpha > 0.5 && readLuminance(primaryHover) > 0.95) {
    findings.push(`--primary-hover là ${toHex(primaryHover)}, nút chính rê vào thành khối trắng tuyệt đối: lệch về phía nền một bậc, ví dụ #cfd5e0 (M23)`);
  }
  const allowedBrights = ["--primary", "--primary-hover", "--foreground"]
    .map((name) => readRgba(rootStyle.getPropertyValue(name).trim()))
    .filter(Boolean)
    .map(toHex);
  const brightColors = new Map();
  const primaryHex = allowedBrights[0];
  const solidAccentBars = [];
  let borderlessFieldCount = 0;
  let sunkenHoverCount = 0;

  for (const element of document.querySelectorAll("body *")) {
    if (element.closest(".force-light, [data-demo-state]")) continue;
    if (element.matches("img, video, canvas, svg, svg *, picture, iframe")) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width < 12 || rect.height < 12) continue;
    const style = getComputedStyle(element);
    if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) continue;

    const className = String(element.className?.baseVal ?? element.className ?? "");
    if (sunkenHoverCount < 3 && /(^|\s)(hover|focus-visible|data-\[highlighted\]|data-\[selected=true\]):bg-background(\s|$)/.test(className)) {
      sunkenHoverCount += 1;
      findings.push(`nền rê \`bg-background\` chìm xuống, ở nền tối gần như không thấy, dùng \`bg-item-hover\` (M21, I10): ${describe(element)}`);
    }

    const background = readRgba(style.backgroundColor);
    // Cột biểu đồ màu nhấn 100%: cao hơn nút (≥ 48px), hẹp như cột. Nút chính cao 40px nên không tính.
    if (background && background.alpha > 0.95 && toHex(background) === primaryHex && rect.height >= 48 && rect.width <= 64) solidAccentBars.push(element);
    // Lớp phủ sáng mờ phủ vùng lớn: `bg-foreground/40` sau modal, ở nền tối foreground gần trắng nên thành màn
    // sương sáng (đã dính 01/10/2026, bản mẫu hộp xác nhận ở /components). Lớp phủ phải là `bg-black/…` (M32).
    if (background && background.alpha >= 0.2 && background.alpha < 0.5 && readLuminance(background) > 0.6 && rect.width >= 300 && rect.height >= 150 && findings.length < 8) {
      findings.push(`lớp phủ sáng mờ ${toHex(background)} ${Math.round(background.alpha * 100)}% phủ ${Math.round(rect.width)}×${Math.round(rect.height)}px: lớp phủ sau modal, panel phải là bg-black/…, không bg-foreground/… (M32): ${describe(element)}`);
    }
    if (background && background.alpha >= 0.5 && readLuminance(background) > 0.6) {
      const hex = toHex(background);
      if (!allowedBrights.includes(hex) && !brightColors.has(hex) && brightColors.size < 5) {
        brightColors.set(hex, `mảng nền sáng ${hex} giữa màn tối, ${Math.round(rect.width)}×${Math.round(rect.height)}px (M32): ${describe(element)}`);
      }
    }

    if (borderlessFieldCount < 3 && element.matches("input:not([type='checkbox']):not([type='radio']):not([type='hidden']):not([type='range']):not([type='file']):not([type='color']), textarea, select") && rect.width >= 60) {
      const border = readRgba(style.borderBottomColor);
      const hasBorder = parseFloat(style.borderBottomWidth) > 0 && border && border.alpha > 0.02;
      if (!hasBorder && background && background.alpha > 0) {
        borderlessFieldCount += 1;
        findings.push(`ô nhập không viền ở nền tối, chỉ còn nền mờ báo vùng gõ: giữ viền --border-strong (M32): ${describe(element)}`);
      }
    }
  }

  // Đã dính 01/10/2026, "Việc xong mỗi tuần" ở ui-ux-dashboard: bảy cột trắng đặc là khối chói nhất màn.
  if (solidAccentBars.length >= 3) {
    findings.push(`${solidAccentBars.length} cột biểu đồ tô màu nhấn 100% (gần trắng), chói nhất màn tối: dùng --chart-fill, nền tối 70% (M32, components/charts.md): ${describe(solidAccentBars[0])}`);
  }

  return [...brightColors.values(), ...findings];
}

// Mục điều hướng dọc (sidebar) chữ đậm: mẫu của skill là chữ thường 400 cho mục thường, chỉ mục đang chọn
// `font-medium` (layouts/app.md). Cả cột 600 thì mục đang chọn không còn khác gì ngoài nền, cột nặng hơn nội
// dung (đã dính 29/09/2026, tim-phong-sua: dựng lại theo nhánh U mà sidebar giữ chữ 600 của CSS cũ).
function findHeavyNavLinks() {
  // Cột điều hướng nhận bằng hình, không bằng thẻ (sidebar hay dựng bằng div): từ 4 link cùng mép trái, cùng
  // bề rộng 150–360px, xếp dọc.
  const columns = new Map();
  for (const link of document.querySelectorAll("a[href], button")) {
    const rect = link.getBoundingClientRect();
    if (rect.width < 150 || rect.width > 360 || rect.height === 0 || rect.height > 64 || (link.textContent || "").trim().length < 2) continue;
    const key = `${Math.round(rect.left / 2)}-${Math.round(rect.width / 2)}`;
    if (!columns.has(key)) columns.set(key, []);
    columns.get(key).push(link);
  }
  const findings = [];
  for (const links of columns.values()) {
    const plainLinks = links.filter((link) => link.getAttribute("aria-current") !== "page");
    if (plainLinks.length < 4) continue;
    // Mục sát nhau: khoảng giữa hai mục kề nhau (cùng nhóm, dưới 12px) nhỏ hơn 3px, nền rê gần dính (gap-1, 30/09/2026).
    const sortedLinks = [...links].sort((first, second) => first.getBoundingClientRect().top - second.getBoundingClientRect().top);
    const linkGaps = sortedLinks.slice(1).map((link, index) => link.getBoundingClientRect().top - sortedLinks[index].getBoundingClientRect().bottom).filter((gap) => gap >= 0 && gap < 12);
    if (linkGaps.length >= 3 && Math.max(...linkGaps) < 3) findings.push(`${links.length} mục cách nhau ${Math.round(Math.max(...linkGaps))}px, cần gap-1 (4px): "${links[0].textContent.trim()}"…`);
    const heavyLinks = plainLinks.filter((link) => parseFloat(getComputedStyle(link).fontWeight) >= 600);
    if (heavyLinks.length / plainLinks.length < 0.6) continue;
    findings.push(`${heavyLinks.length}/${plainLinks.length} mục chữ ${getComputedStyle(heavyLinks[0]).fontWeight}: "${heavyLinks.slice(0, 3).map((link) => link.textContent.trim()).join('", "')}"`);
  }

  return findings.slice(0, 3);
}

// Ảnh không tải được: link Unsplash hay avatar bịa `id`, host chưa khai trong `next.config` (SKILL.md `S16`).
// Chỉ tính ảnh đã tải xong (`complete`), ảnh `loading="lazy"` ngoài màn thì chưa tải, không tính.
function findBrokenImages() {
  return [...document.images]
    .filter((image) => image.complete && image.naturalWidth === 0 && (image.currentSrc || image.src))
    .slice(0, 6)
    .map((image) => (image.currentSrc || image.src).slice(0, 120));
}

// Số viết sai kiểu tiếng Việt (T28): dấu chấm làm dấu thập phân trước đơn vị ("4.5 triệu"), hay số chưa làm
// tròn ("3.333333 triệu"). Chỉ đo trang tiếng Việt (có chữ có dấu). Đã dính 30/09/2026, tim-phong-sua.
function findMisformattedNumbers() {
  const bodyText = document.body.innerText;
  if (!/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(bodyText)) return [];
  const findings = new Set();
  for (const match of bodyText.matchAll(/\d+[.,]\d{4,}(?:\s*(?:triệu|tỷ|nghìn|%|đ|₫))?/g)) findings.add(`chưa làm tròn: "${match[0]}"`);
  for (const match of bodyText.matchAll(/\b\d{1,3}\.\d{1,2}\s*(?:triệu|tỷ|nghìn|tr\b|%)/g)) findings.add(`dấu chấm thập phân: "${match[0]}" (tiếng Việt viết "${match[0].replace(".", ",")}")`);

  return [...findings].slice(0, 5);
}

// Thanh cuộn khác khối scrollbar của tokens.css: rộng quá 4px, hoặc thumb tô màu đặc lúc đứng yên (luôn
// hiện). Đọc luật CSS vì pseudo-element `::-webkit-scrollbar` không đọc được bằng getComputedStyle.
function findScrollbarStyles() {
  const findings = new Set();
  const isOpaque = (value) => Boolean(value) && !/transparent|var\(|rgba\([^)]*,\s*0\)|0 0/.test(value);
  const walk = (rules) => {
    for (const rule of rules) {
      const selector = rule.selectorText || "";
      if (selector.includes("::-webkit-scrollbar")) {
        const isBar = /::-webkit-scrollbar(?![-\w])/.test(selector);
        const width = parseFloat(rule.style.getPropertyValue("width"));
        if (isBar && width > 4) findings.add(`thanh rộng ${width}px (\`${selector}\`)`);
        const background = rule.style.getPropertyValue("background") || rule.style.getPropertyValue("background-color");
        if (selector.includes("-thumb") && !selector.includes(":hover") && isOpaque(background)) findings.add(`thumb luôn hiện màu ${background} (\`${selector}\`)`);
      }
      if (rule.cssRules) walk(rule.cssRules);
    }
  };
  for (const sheet of document.styleSheets) {
    try {
      walk(sheet.cssRules);
    } catch {
      // Stylesheet khác origin không đọc được luật, bỏ qua.
    }
  }

  return [...findings].slice(0, 4);
}

// ---------- Lớp nổi mở bằng nút thường, ở màn hẹp ----------

// Hộp chọn, menu tự dựng thường không có aria-haspopup nên mục trên không mở tới (sót menu tràn mép và
// hộp chọn cao quá màn, 27/09/2026, dự án mồi phase 2). Chỉ bấm thứ TRÔNG NHƯ nút mở: có aria-expanded /
// aria-controls, nhãn kiểu "menu", "lọc", icon kiểu chuông, ba chấm, chevron. Nút chỉ có icon không nhãn
// và dòng `div` bấm được (onClick) cũng tính, vì app thật hay viết vậy (nút chỉ có icon, dòng chọn có dấu ">" ở
// vòng 2 dự án mồi). Bỏ mọi thứ có nhãn hay icon hành động để không lỡ tay xoá, lưu, gửi trên app thật. Link thì
// không bấm. Bấm xong mỗi thứ thì tải lại trang cho sạch.
// Nút tạo mới ("Tạo phiếu", "Thêm sản phẩm", icon dấu cộng) gần như luôn mở form trong dialog hay sheet, và
// form chỉ ghi khi bấm nút gửi bên trong, nên cũng bấm (sót dialog tràn mép ở 375, 30/09/2026, dự án mồi kho
// hàng vòng 2). Nút dấu cộng nằm trong hàng số lượng, giỏ hàng thì vẫn không bấm.
const openerLabelSource = "menu|lọc|filter|thông báo|notification|chọn|select|sắp xếp|sort|tuỳ chọn|tùy chọn|option|more|tài khoản|account|ngôn ngữ|language";
const createLabelSource = "^(tạo|thêm|new|create|add)\\b";
const createIconSource = "lucide-(plus|circle-plus|square-plus)\\b";
const skipCreateLabelSource = "giỏ|cart|số lượng|quantity|tăng|increase";
const actionLabelSource = "xoá|xóa|delete|remove|huỷ|hủy|cancel|đăng xuất|logout|sign out|gửi|send|submit|thanh toán|pay|mua|buy|lưu|save|đặt|thích|like|theo dõi|follow";
// Tên icon lucide (class `lucide-<tên>`): nhóm mở lớp nổi, và nhóm hành động không được bấm.
const openerIconSource = "lucide-(bell|menu|ellipsis|more-|filter|list-filter|sliders|chevron-down|chevron-right|chevrons-up-down|circle-user|user-round|user\\b|settings|globe|languages|calendar)";
const actionIconSource = "lucide-(trash|heart|star|bookmark|send|save|check|plus|x\\b|log-out|share|copy|download|upload|thumbs)";
const maxOpenerButtons = 10;

function markOpenerButtons({ limit, openerSource, actionSource, openerIconPattern, actionIconPattern, createSource, createIconPattern, skipCreateSource }) {
  const openerPattern = new RegExp(openerSource, "i");
  const actionPattern = new RegExp(actionSource, "i");
  const openerIcon = new RegExp(openerIconPattern);
  const actionIcon = new RegExp(actionIconPattern);
  const createPattern = new RegExp(createSource, "i");
  const createIcon = new RegExp(createIconPattern);
  const skipCreatePattern = new RegExp(skipCreateSource, "i");
  const openers = [];
  const seenKeys = new Set();

  const candidates = document.querySelectorAll("button, [role='button'], div[class*='cursor-pointer'], li[class*='cursor-pointer']");
  for (const candidate of candidates) {
    if (openers.length >= limit) break;
    if (candidate.closest("a[href]") || candidate.getBoundingClientRect().width === 0) continue;
    if (candidate.disabled || (candidate.type === "submit" && candidate.form) || candidate.hasAttribute("aria-haspopup")) continue;
    // Khối bấm được mà bọc cả nút khác bên trong (card) thì không phải một nút mở.
    if (candidate.tagName !== "BUTTON" && candidate.querySelector("button, a[href]")) continue;

    const label = `${candidate.getAttribute("aria-label") || ""} ${candidate.getAttribute("title") || ""} ${candidate.textContent || ""}`.replace(/\s+/g, " ").trim();
    const iconNames = [...candidate.querySelectorAll("svg")].map((icon) => icon.getAttribute("class") || "").join(" ");
    const isCreateButton = (createPattern.test(label) || (createIcon.test(iconNames) && label.length > 0)) && !actionPattern.test(label) && !skipCreatePattern.test(label);
    if (!isCreateButton && (actionPattern.test(label) || actionIcon.test(iconNames))) continue;

    const hasOpenerIcon = openerIcon.test(iconNames) || /[▾▼⌄›>]\s*$/.test(label);
    const looksLikeOpener = isCreateButton || candidate.hasAttribute("aria-expanded") || candidate.hasAttribute("aria-controls") || hasOpenerIcon || openerPattern.test(label);
    if (!looksLikeOpener) continue;

    const key = `${candidate.tagName}|${candidate.getAttribute("class") || ""}|${label.slice(0, 12)}`;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);

    candidate.dataset.evonOpenerId = String(openers.length);
    openers.push(label.slice(0, 30) || `${candidate.tagName.toLowerCase()} chỉ có icon (${(iconNames.match(/lucide-[a-z-]+/) || ["?"])[0]})`);
  }

  return openers;
}

function markVisibleLayers() {
  for (const node of document.querySelectorAll("body *")) {
    const style = getComputedStyle(node);
    const isPositioned = style.position === "fixed" || style.position === "absolute";
    const rect = node.getBoundingClientRect();
    if (isPositioned && rect.width * rect.height > 0 && style.visibility !== "hidden" && style.display !== "none") node.dataset.evonBefore = "1";
  }
}

// Lớp mới hiện sau khi bấm: lòi khỏi mép trái / phải, hay (với lớp fixed) cao quá màn mà không có khung
// nào cuộn được để kéo phần bị mất vào.
function findOpenedLayerProblems(triggerLabel) {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight;
  const problems = [];

  function isShown(node) {
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();

    return style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 && rect.width * rect.height >= 5000;
  }

  function hasScrollerBetween(node, root, axis) {
    for (let current = node; current; current = current.parentElement) {
      const style = getComputedStyle(current);
      const overflow = axis === "x" ? style.overflowX : style.overflowY;
      const canScroll = axis === "x" ? current.scrollWidth > current.clientWidth + 1 : current.scrollHeight > current.clientHeight + 1;
      if (["auto", "scroll"].includes(overflow) && canScroll) return true;
      if (axis === "x" && ["hidden", "clip"].includes(overflow) && current !== node) return true;
      if (current === root) break;
    }

    return false;
  }

  const newLayers = [...document.querySelectorAll("body *")].filter((node) => {
    const style = getComputedStyle(node);

    return !node.dataset.evonBefore && (style.position === "fixed" || style.position === "absolute") && isShown(node);
  });
  const roots = newLayers.filter((node) => !newLayers.some((other) => other !== node && other.contains(node)));

  for (const root of roots) {
    const isFixed = getComputedStyle(root).position === "fixed";
    const boxes = [root, ...root.querySelectorAll("*")].filter(isShown);

    const sideOverflow = boxes.find((box) => {
      const rect = box.getBoundingClientRect();

      const isInsideScroller = box !== root && hasScrollerBetween(box.parentElement, root, "x");

      return (rect.left < -1 || rect.right > viewportWidth + 1) && !isInsideScroller;
    });
    if (sideOverflow) {
      const rect = sideOverflow.getBoundingClientRect();
      const overflow = Math.round(Math.max(-rect.left, rect.right - viewportWidth));
      problems.push(`bấm "${triggerLabel}": lớp nổi rộng ${Math.round(rect.width)}px lòi ${overflow}px khỏi mép màn`);
    }

    if (!isFixed) continue;
    const tallBox = boxes.find((box) => {
      const rect = box.getBoundingClientRect();

      return (rect.top < -1 || rect.bottom > viewportHeight + 1) && !hasScrollerBetween(box, root, "y");
    });
    if (tallBox) {
      const rect = tallBox.getBoundingClientRect();
      const hidden = Math.round(Math.max(0, -rect.top) + Math.max(0, rect.bottom - viewportHeight));
      problems.push(`bấm "${triggerLabel}": hộp cao ${Math.round(rect.height)}px trên màn ${viewportHeight}px, mất ${hidden}px mà không cuộn được`);
    }
  }

  return { problems, openedCount: roots.length };
}

async function reloadForProbe(page, options) {
  await page.goto(options.url, { waitUntil: "load" });
  await page.addStyleTag({ content: freezeMotionCss });
  if (options.isDark) await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.waitForTimeout(options.waitMs);
}

async function probeOpenerLayers(page, options, width) {
  const markArgs = {
    limit: maxOpenerButtons,
    openerSource: openerLabelSource,
    actionSource: actionLabelSource,
    openerIconPattern: openerIconSource,
    actionIconPattern: actionIconSource,
    createSource: createLabelSource,
    createIconPattern: createIconSource,
    skipCreateSource: skipCreateLabelSource,
  };
  const openerLabels = await page.evaluate(markOpenerButtons, markArgs);
  const problems = [];
  const openedShots = [];
  const nativeControls = new Set();

  for (const [index, triggerLabel] of openerLabels.entries()) {
    await reloadForProbe(page, options);
    await page.evaluate(markOpenerButtons, markArgs);
    await page.evaluate(markVisibleLayers);
    const isClicked = await page.locator(`[data-evon-opener-id="${index}"]`).click({ timeout: 800, force: true }).then(() => true, () => false);
    if (!isClicked) continue;
    await page.waitForTimeout(300);

    const opened = await page.evaluate(findOpenedLayerProblems, triggerLabel);
    if (opened.openedCount === 0) continue;
    for (const control of await page.evaluate(findNativeControls, "opened")) nativeControls.add(`bấm "${triggerLabel}": ${control}`);
    const shotPath = join(options.out, `${width}${options.isDark ? "-dark" : ""}-mo-${index}.png`);
    await page.screenshot({ path: shotPath });
    openedShots.push(`"${triggerLabel}": ${shotPath}`);
    problems.push(...opened.problems);
  }

  if (openerLabels.length > 0) await reloadForProbe(page, options);

  return { problems, openedShots, nativeControls: [...nativeControls] };
}

// Kéo bề rộng từ lớn xuống nhỏ trên cùng một trang, đo nhẹ và chụp ở từng bước. Cửa sổ desktop suốt
// lượt quét (không giả lập màn chạm): lượt này chỉ tìm chỗ vỡ bố cục, cỡ bấm đã đo ở các khổ cố định.
async function sweepWidths(browser, options) {
  const { from, to, step } = options.sweep;
  const context = await browser.newContext({
    viewport: { width: from, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: options.isDark ? "dark" : "light",
  });
  const page = await context.newPage();
  const sweepDir = join(options.out, options.isDark ? "sweep-dark" : "sweep");
  mkdirSync(sweepDir, { recursive: true });

  await page.goto(options.url, { waitUntil: "load" });
  await page.addStyleTag({ content: freezeMotionCss });
  if (options.isDark) await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.waitForTimeout(options.waitMs);

  const sweepWidthList = [];
  for (let width = from; width > to; width -= step) sweepWidthList.push(width);
  sweepWidthList.push(to);

  const steps = [];
  for (const width of sweepWidthList) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(150);
    const measurements = await page.evaluate(measureInPage, { minTapSize, isMobile: false, isSweep: true });
    const screenshotPath = join(sweepDir, `${width}.png`);
    await takeFullScreenshot(page, screenshotPath);
    steps.push({ width, screenshotPath, ...measurements });
  }

  await context.close();

  return steps;
}

// Gom bề rộng liền bước thành khoảng: [1000, 980, 960, 700] → "960–1000px, 700px".
function formatWidthRanges(widths, step) {
  const sortedWidths = [...new Set(widths)].sort((first, second) => second - first);
  const ranges = [];
  for (const width of sortedWidths) {
    const lastRange = ranges.at(-1);
    if (lastRange && lastRange.low - width <= step) lastRange.low = width;
    else ranges.push({ low: width, high: width });
  }

  return ranges.map((range) => (range.low === range.high ? `${range.low}px` : `${range.low}–${range.high}px`)).join(", ");
}

// Mọi thứ probe đo ra mà V1 (references/review.md) xếp Hỏng, gộp theo phần tử qua các khổ và lượt quét,
// đánh mã P1, P2… để bảng giao đối chiếu. Vòng 1 và 2 của dự án mồi phase 2: nhiều mục probe đã đo ra mà
// bảng giao không có, vì các mục nằm rải trong báo cáo dài.
function listMustReportItems(results, sweepSteps) {
  const itemsByKey = new Map();
  function addItem(width, text) {
    if (!itemsByKey.has(text)) itemsByKey.set(text, []);
    itemsByKey.get(text).push(width);
  }

  for (const result of results) {
    const width = result.width;
    for (const area of result.autoScrolledAreas) addItem(width, `trang tự cuộn khi vừa tải: ${area.replace(/ đã cuộn \d+px$/, "")}`);
    if (result.hasHorizontalScroll) addItem(width, `cuộn ngang, lòi ra: ${result.overflowingElements[0]?.element ?? "(không rõ phần tử)"}`);
    for (const layer of result.overflowingLayers) addItem(width, `lớp nổi lòi khỏi màn: ${layer.replace(/ lòi \d+px khỏi màn$/, "")}`);
    for (const problem of result.openerLayerProblems) addItem(width, `lớp nổi mở bằng nút bị vỡ: ${problem}`);
    for (const shift of result.layoutShifts) addItem(width, `rê chuột làm nhảy bố cục: ${shift.replace(/ dời \d+px$/, "")}`);
    for (const line of result.lowContrastTexts) addItem(width, `tương phản thấp: ${line}`);
    for (const item of result.clippedBlocks) addItem(width, `khung giấu mất chữ: ${item.element}`);
    for (const item of result.tooShortTexts) addItem(width, `chữ cắt còn quá ngắn: ${item.element}`);
    for (const element of result.wrappedControls) addItem(width, `chữ trong nút xuống dòng: ${element}`);
    for (const element of result.wrappedRows) addItem(width, `hàng rớt dòng (xem ảnh để xếp hạng): ${element}`);
    for (const item of result.overlappedChartLabels) addItem(width, `nhãn số đè lên đường biểu đồ: ${item}`);
    for (const item of result.iconCoveringBadges || []) addItem(width, `badge đè mất icon: ${item}`);
    for (const item of result.squeezedBlocks) addItem(width, `khối bị bóp chiều cao: ${item}`);
    for (const item of result.squeezedTableColumns || []) addItem(width, `cột chữ của bảng bị ép: ${item.replace(/ rộng \d+px, \d+\/\d+ dòng/, "")}`);
    for (const item of result.crampedDescriptionLists || []) addItem(width, `nhãn–giá trị hai cột trong khối hẹp: ${item.replace(/^<dl> \d+px, .*?: /, "")}`);
    for (const item of result.mismatchedRuleColors) addItem(width, `đường ngăn thẳng hàng mà khác màu: ${item}`);
    // Khoá theo phần tử: hẹp dần thì phần bị giấu đổi, ô vẫn là một.
    for (const item of result.swallowedNumbers) addItem(width, `chữ cắt nuốt mất số: ${item.replace(/^giấu ".*?" của /, "")}`);
    for (const item of result.hoverLikeSelected || []) addItem(width, `rê ra đúng màu mục đang chọn: ${item}`);
    for (const item of result.checkedHoverChanges || []) addItem(width, `rê vào ô đã chọn làm mất màu nhấn: ${item}`);
    for (const item of result.mouseUnreachableScrollers || []) addItem(width, `hàng cuộn ngang chuột không tới được: ${item.replace(/, nội dung .*?: /, ": ")}`);
    // Nền rê yếu: cổng 3 lúc dựng phải sửa, bảng soi thì xếp Gu (review.md, sau bảng V1, 30/09/2026).
    for (const item of result.weakHovers || []) addItem(width, `nền rê gần như không thấy (soi: Gu): ${item}`);
    // Nút viền rê thành nút đặc cùng màu viền là kiểu hay gặp, không vỡ gì: giữ ở Gu.
    for (const item of (result.blendedHovers || []).filter((line) => !line.includes("trùng màu viền"))) addItem(width, `nền rê tan vào nền khác (soi: Gu): ${item}`);
    // Dark mode làm dở là Hỏng (V4): mảng sáng giữa màn tối. Trang không lật thì dark mode chỉ có khai
    // báo, V4 bảo bỏ lượt tối chứ không báo lỗi, nên không vào đây.
    for (const item of (result.darkModeProblems || []).filter((line) => /^(mảng nền sáng|lớp phủ sáng mờ)/.test(line))) addItem(width, `dark mode làm dở: ${item.replace(/, \d+×\d+px/, "")}`);
    for (const item of result.untransitionedMotion || []) addItem(width, `scale / translate / rotate không chạy chuyển động: ${item}`);
    for (const item of result.smallTapTargets.filter((target) => target.isBelowFloor)) addItem(width, `chỗ bấm dưới 24px: ${item.element}`);
  }

  for (const step of sweepSteps) {
    if (step.hasHorizontalScroll) addItem(step.width, `cuộn ngang, lòi ra: ${step.overflowingElements[0]?.element ?? "(không rõ phần tử)"}`);
    for (const item of step.clippedBlocks) addItem(step.width, `khung giấu mất chữ: ${item.element}`);
    for (const element of step.wrappedControls) addItem(step.width, `chữ trong nút xuống dòng: ${element}`);
    for (const element of step.wrappedRows) addItem(step.width, `hàng rớt dòng (xem ảnh để xếp hạng): ${element}`);
    for (const item of step.tooShortTexts) addItem(step.width, `chữ cắt còn quá ngắn: ${item.element}`);
    for (const item of step.swallowedNumbers) addItem(step.width, `chữ cắt nuốt mất số: ${item.replace(/^giấu ".*?" của /, "")}`);
  }

  return [...itemsByKey.entries()].map(([text, widths]) => ({ text, widths }));
}

function formatMustReportList(items, step) {
  const lines = [`\n# Việc phải đối chiếu: ${items.length} mục probe xếp Hỏng`];
  if (items.length === 0) return `${lines[0]}\nKhông có mục nào.`;
  lines.push("Mỗi mục thành một dòng trong bảng giao (cột Nguồn ghi mã, ví dụ `đo P3`; cùng gốc thì gộp nhiều mã một dòng),");
  lines.push("hoặc một dòng dưới bảng nói vì sao loại. Không mục nào được biến mất im lặng (V5 trong review.md).");
  items.slice(0, 50).forEach((item, index) => lines.push(`P${index + 1} [${formatWidthRanges(item.widths, step)}] ${item.text}`));
  if (items.length > 50) lines.push(`(Còn ${items.length - 50} mục, xem report.json.)`);

  return lines.join("\n");
}

function listSweepSignals(step) {
  const signals = [];

  if (step.hasHorizontalScroll) signals.push(`cuộn ngang, lòi ra: ${step.overflowingElements[0]?.element ?? "(không rõ phần tử)"}`);
  // Khoá theo khung, không theo chữ bị giấu: hẹp dần thì chữ bị giấu đầu tiên đổi, khung vẫn là một.
  for (const item of step.clippedBlocks) signals.push(`khung giấu mất chữ: ${item.element}`);
  for (const item of step.wrappedControls) signals.push(`chữ trong nút xuống dòng: ${item}`);
  for (const item of step.wrappedRows) signals.push(`hàng rớt dòng: ${item}`);
  for (const item of step.tooShortTexts) signals.push(`chữ cắt còn quá ngắn: ${item.element}`);
  for (const item of step.swallowedNumbers) signals.push(`chữ cắt nuốt mất số: ${item.replace(/^giấu ".*?" của /, "")}`);

  return signals;
}

function formatSweepReport(steps, step) {
  const widthsBySignal = new Map();
  const changedFrames = [];
  let previousKey = null;

  for (const sweepStep of steps) {
    const signals = listSweepSignals(sweepStep);
    for (const signal of signals) {
      if (!widthsBySignal.has(signal)) widthsBySignal.set(signal, []);
      widthsBySignal.get(signal).push(sweepStep.width);
    }

    const signalKey = signals.join("|");
    if (previousKey !== null && signalKey !== previousKey) changedFrames.push(sweepStep.screenshotPath);
    previousKey = signalKey;
  }

  const lines = [`\n# Quét bề rộng ${steps[0].width} → ${steps.at(-1).width}px, bước ${step}px (${steps.length} ảnh ở ${dirname(steps[0].screenshotPath)})`];
  if (widthsBySignal.size === 0) lines.push("Không đo ra chỗ vỡ ở bề rộng nào. Vẫn mở vài ảnh ở giữa hai khổ cố định mà xem.");
  for (const [signal, widths] of widthsBySignal) lines.push(`${formatWidthRanges(widths, step)}: ${signal}`);
  if (changedFrames.length > 0) {
    lines.push("Khung đáng xem (tín hiệu đổi so với bước trước):");
    for (const framePath of changedFrames.slice(0, 12)) lines.push(`  ${framePath}`);
  }
  lines.push("Máy không thấy chồng lấn, lệch hàng, khoảng trắng vô lý. Xem thêm các ảnh quanh ngưỡng sidebar thu và ngưỡng lưới đổi cột.");

  return lines.join("\n");
}

function formatReport(results) {
  const lines = [];
  let problemCount = 0;

  for (const result of results) {
    const problems = [];

    if (result.hasHorizontalScroll) {
      problems.push(`CUỘN NGANG: trang rộng ${result.pageScrollWidth}px trên màn ${result.viewportWidth}px.`);
      for (const item of result.overflowingElements) problems.push(`  lòi ra tới ${item.right}px: ${item.element}`);
    }
    if (result.unpinnedScrollTables.length > 0) {
      problems.push(`BẢNG CUỘN NGANG MẤT CỘT (${result.unpinnedScrollTables.length} bảng, R9):`);
      for (const item of result.unpinnedScrollTables.slice(0, 5)) problems.push(`  ${item}`);
    }
    if (result.squeezedTableColumns.length > 0) {
      problems.push(`CỘT CHỮ CỦA BẢNG BỊ ÉP XUỐNG DÒNG (${result.squeezedTableColumns.length} cột; ẩn cột phụ theo @container của card, layouts/app.md "Bảng dữ liệu"):`);
      for (const item of result.squeezedTableColumns.slice(0, 5)) problems.push(`  ${item}`);
    }
    if (result.crampedDescriptionLists.length > 0) {
      problems.push(`NHÃN–GIÁ TRỊ HAI CỘT TRONG KHỐI HẸP (${result.crampedDescriptionLists.length} khối; dưới 384px nhãn trên giá trị dưới, @container, description-list.md):`);
      for (const item of result.crampedDescriptionLists.slice(0, 5)) problems.push(`  ${item}`);
    }
    if (result.brokenMoney.length > 0) {
      problems.push(`SỐ TIỀN NGẮT DÒNG (${result.brokenMoney.length} chỗ, số + đơn vị phải nowrap, nhãn bên cạnh co lại, T16):`);
      for (const item of result.brokenMoney.slice(0, 5)) problems.push(`  ${item}`);
    }
    if (result.unevenStatRows.length > 0) {
      problems.push(`SỐ TRONG HÀNG Ô SỐ LIỆU KHÔNG THẲNG (${result.unevenStatRows.length} hàng, ô dùng grid-rows-subgrid):`);
      for (const item of result.unevenStatRows.slice(0, 5)) problems.push(`  ${item}`);
    }
    if (result.gridChoiceGroups.length > 0) {
      problems.push(`NHÓM LỰA CHỌN XẾP LƯỚI (${result.gridChoiceGroups.length} nhóm, đọc chữ Z; một hàng hoặc một cột):`);
      for (const item of result.gridChoiceGroups.slice(0, 5)) problems.push(`  ${item}`);
    }
    if (result.consoleErrors.length > 0) {
      problems.push(`LỖI CONSOLE (${result.consoleErrors.length}):`);
      for (const message of result.consoleErrors.slice(0, 5)) problems.push(`  ${message}`);
    }
    if (result.tooShortCount > 0) {
      problems.push(`CHỮ CẮT CÒN QUÁ NGẮN (${result.tooShortCount} chỗ, dưới 10 ký tự đọc được):`);
      for (const item of result.tooShortTexts.slice(0, 5)) problems.push(`  rộng ${item.width}px, đọc được ~${item.visibleChars}/${item.fullText.length} ký tự "${item.fullText.slice(0, 40)}": ${item.element}`);
    }
    if (result.unevenSiblingGroups.length > 0) {
      problems.push(`CAO GẦN BẰNG MÀ KHÔNG BẰNG (lệch 1-4px, thường là khe baseline hoặc padding lệch):`);
      for (const item of result.unevenSiblingGroups.slice(0, 5)) problems.push(`  ${item.count} phần tử, đa số cao ${item.commonHeight}px, có cái ${item.otherHeights.join(", ")}px: ${item.element}`);
    }
    if (result.misalignedColumns.length > 0) {
      problems.push(`CHỮ CÙNG CỘT LỆCH MÉP (hai kiểu căn trộn nhau):`);
      for (const item of result.misalignedColumns.slice(0, 5)) problems.push(`  lệch ${item.leftSpread}px, ${item.example}: ${item.element}`);
    }
    if (result.smallTapCount > 0) {
      problems.push(`CHỖ BẤM DƯỚI ${minTapSize}px (${result.smallTapCount} chỗ, không có vùng bấm nới ra):`);
      for (const item of result.smallTapTargets.slice(0, 10)) problems.push(`  ${item.size}${item.isBelowFloor ? " (dưới 24px)" : ""}: ${item.element}`);
    }
    if (result.orphanPunctuation.length > 0) {
      problems.push(`DẤU CÂU RƠI XUỐNG ĐẦU DÒNG (${result.orphanPunctuation.length} chỗ, dấu phải dính chữ đứng trước):`);
      for (const item of result.orphanPunctuation.slice(0, 5)) problems.push(`  dòng mở đầu "${item.lineStart}": ${item.element}`);
    }
    if (result.misalignedFields.length > 0) {
      problems.push(`Ô NHẬP LỆCH MÉP VỚI NÚT RỘNG HẾT KHUNG (${result.misalignedFields.length} khung, ô và nút phải cùng mép trái phải):`);
      for (const item of result.misalignedFields.slice(0, 5)) problems.push(`  ô ${item.field}, nút ${item.button}: ${item.element}`);
    }
    if (result.unevenSeparatorRows.length > 0) {
      problems.push(`DẤU NGĂN CÁCH KHÔNG ĐỀU (${result.unevenSeparatorRows.length} hàng, nét dấu › tới nét chữ hay icon kế bên phải bằng nhau):`);
      for (const item of result.unevenSeparatorRows.slice(0, 5)) problems.push(`  khe ${item.gaps}: ${item.element}`);
    }
    if ((result.iconCoveringBadges || []).length > 0) {
      problems.push(`BADGE ĐÈ MẤT ICON (${result.iconCoveringBadges.length} chỗ, dời badge ra góc, cỡ nhỏ lại, hoặc dùng icon đã khoét chỗ như BellDot):`);
      for (const item of result.iconCoveringBadges) problems.push(`  ${item}`);
    }
    if (result.overlappedChartLabels.length > 0) {
      problems.push(`NHÃN SỐ ĐÈ LÊN ĐƯỜNG BIỂU ĐỒ (${result.overlappedChartLabels.length} chỗ, đặt nhãn về phía không có đường):`);
      for (const element of result.overlappedChartLabels.slice(0, 5)) problems.push(`  ${element}`);
    }
    if (result.outsideChartLabels.length > 0) {
      problems.push(`NHÃN SỐ LÒI RA NGOÀI VÙNG VẼ (${result.outsideChartLabels.length} chỗ, rơi vào hàng nhãn trục hoặc trên đỉnh):`);
      for (const element of result.outsideChartLabels.slice(0, 5)) problems.push(`  ${element}`);
    }
    if (result.weakHovers.length > 0) {
      problems.push(`NỀN RÊ GẦN NHƯ KHÔNG THẤY (${result.weakHovers.length} loại, chênh dưới 8 mức với lúc thường):`);
      for (const item of result.weakHovers.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.blendedHovers.length > 0) {
      problems.push(`NỀN RÊ TAN VÀO NỀN KHÁC (${result.blendedHovers.length} chỗ):`);
      for (const item of result.blendedHovers.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.borderHovers.length > 0) {
      problems.push(`VIỀN ĐỔI MÀU LÚC RÊ (${result.borderHovers.length} loại, skill chỉ đổi nền, xem button.md):`);
      for (const item of result.borderHovers.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.overflowingLayers.length > 0) {
      problems.push(`LỚP NỔI LÒI KHỎI MÀN (${result.overflowingLayers.length} chỗ, tooltip / menu / popover mở ra phải nằm trong màn):`);
      for (const item of result.overflowingLayers.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.checkedHoverChanges?.length > 0) {
      problems.push(`RÊ VÀO Ô ĐÃ CHỌN LÀM MẤT MÀU NHẤN (${result.checkedHoverChanges.length} ô, hover: đè checked:, dùng not-checked:hover:):`);
      for (const item of result.checkedHoverChanges) problems.push(`  ${item}`);
    }
    if (result.hoverLikeSelected?.length > 0) {
      problems.push(`RÊ RA ĐÚNG MÀU MỤC ĐANG CHỌN (${result.hoverLikeSelected.length} nhóm, rê qua mục nào cũng trông như đã chọn nó):`);
      for (const item of result.hoverLikeSelected) problems.push(`  ${item}`);
    }
    if (result.shapeMismatches.length > 0) {
      problems.push(`RÊ / FOCUS KHÁC HÌNH MỤC ĐANG CHỌN (${result.shapeMismatches.length} chỗ, mọi trạng thái vẽ trên cùng một hình):`);
      for (const item of result.shapeMismatches.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.stuckStates.length > 0) {
      problems.push(`BẤM XONG CÒN DẤU THỪA (${result.stuckStates.length} chỗ, chuột đứng yên trên mục vừa chọn):`);
      for (const item of result.stuckStates.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.unmarkedFocusStops?.length > 0) {
      problems.push(`TAB TỚI KHÔNG THẤY GÌ (${result.unmarkedFocusStops.length} chỗ, trong khi dự án vẽ vòng focus ở ${result.drawnFocusRings.length} chỗ khác; Lệch hệ, ngoại lệ của I13):`);
      for (const element of result.unmarkedFocusStops.slice(0, 8)) problems.push(`  ${element}`);
    }
    if (result.drawnFocusRings?.length > 0) {
      problems.push(`TAB TỚI CÒN VẼ VÒNG FOCUS (${result.drawnFocusRings.length} chỗ, skill không vẽ vòng focus, I13):`);
      for (const element of result.drawnFocusRings.slice(0, 8)) problems.push(`  ${element}`);
    }
    if (result.mismatchedRuleColors.length > 0) {
      problems.push(`ĐƯỜNG NGĂN HAI CỘT THẲNG HÀNG MÀ KHÁC MÀU (${result.mismatchedRuleColors.length} cặp, một đường mà nửa nhạt nửa đậm):`);
      for (const item of result.mismatchedRuleColors) problems.push(`  ${item}`);
    }
    if (result.unevenHeaderActions.length > 0) {
      problems.push(`HÀNG NÚT TRÊN HEADER KHÔNG ĐỒNG CỠ (layouts/app.md, "Nhóm nút bên phải thanh header"):`);
      for (const item of result.unevenHeaderActions) problems.push(`  ${item}`);
    }
    if (result.brokenRules.length > 0) {
      problems.push(`ĐƯỜNG NGĂN HAI CỘT KỀ NHAU LỆCH (${result.brokenRules.length} cặp, nhìn thành một đường gãy):`);
      for (const item of result.brokenRules) problems.push(`  ${item}`);
    }
    if (result.untransitionedMotion?.length > 0) {
      problems.push(`SCALE / TRANSLATE / ROTATE KHÔNG CHẠY CHUYỂN ĐỘNG (${result.untransitionedMotion.length} chỗ, Tailwind v4: dùng transition-transform hoặc transition-[opacity,scale,translate], W10):`);
      for (const item of result.untransitionedMotion) problems.push(`  ${item}`);
    }
    if (result.heavyLayerLines?.length > 0) {
      problems.push(`KHUNG / VẠCH CỦA LỚP NỔI ĐẬM HƠN TOKEN VIỀN (${result.heavyLayerLines.length} lớp, dùng border-border như mẫu overlay.md):`);
      for (const item of result.heavyLayerLines) problems.push(`  ${item}`);
    }
    if (result.motionlessLayers?.length > 0) {
      problems.push(`LỚP NỔI BẬT TẮT KHÔNG CHUYỂN ĐỘNG (${result.motionlessLayers.length} lớp, \`{isOpen && …}\` hay \`display\` thì hiện tức thì; nhịp theo "Chuyển động" ở layouts/overlay.md):`);
      for (const item of result.motionlessLayers) problems.push(`  ${item}`);
    }
    if (result.scrollyLayers?.length > 0) {
      problems.push(`LỚP NỔI CÓ THANH CUỘN THỪA (${result.scrollyLayers.length} lớp, khung nhỏ hơn nội dung; co theo nội dung, layouts/overlay.md):`);
      for (const item of result.scrollyLayers) problems.push(`  ${item}`);
    }
    if (result.lostTriggerIcons?.length > 0) {
      problems.push(`CHỌN XONG MẤT ICON (${result.lostTriggerIcons.length} ô, vẽ lại nút phải vẽ lại icon):`);
      for (const item of result.lostTriggerIcons) problems.push(`  ${item}`);
    }
    if (result.popupNativeChoices?.length > 0) {
      problems.push(`CONTROL GỐC TRONG LỚP NỔI (${result.popupNativeChoices.length} lớp: select, ô ngày, checkbox, thanh trượt…; chế độ soi: select, ô ngày gốc đã tô thì bỏ qua như trên trang; wireframe và dựng lại: dựng theo components/choice-controls.md, select gốc chỉ giữ khi lớp đó chỉ có trên mobile):`);
      for (const item of result.popupNativeChoices) problems.push(`  ${item}`);
    }
    if (result.heavyDecorativeBorders?.length > 0) {
      problems.push(`VIỀN TRANG TRÍ ĐẬM (${result.heavyDecorativeBorders.length} màu, card và khung nhạt hơn #e4e4e7, bậc xám nhạt nhất của dự án, M14):`);
      for (const item of result.heavyDecorativeBorders) problems.push(`  ${item}`);
    }
    if (result.scrollbarStyles?.length > 0) {
      problems.push(`THANH CUỘN KHÁC MẪU (${result.scrollbarStyles.length} luật, dùng khối scrollbar của tokens.css: 4px, ẩn tới khi rê hay cuộn):`);
      for (const item of result.scrollbarStyles) problems.push(`  ${item}`);
    }
    if (result.misformattedNumbers?.length > 0) {
      problems.push(`SỐ VIẾT SAI KIỂU TIẾNG VIỆT (${result.misformattedNumbers.length} chỗ, dấu phẩy thập phân, làm tròn, T28 trong rules-type.md):`);
      for (const item of result.misformattedNumbers) problems.push(`  ${item}`);
    }
    if (result.darkModeProblems?.length > 0) {
      problems.push(`DARK MODE (${result.darkModeProblems.length} chỗ, rules-color.md M21, M31–M33):`);
      for (const item of result.darkModeProblems) problems.push(`  ${item}`);
    }
    if (result.brokenImages?.length > 0) {
      problems.push(`ẢNH KHÔNG TẢI ĐƯỢC (${result.brokenImages.length} ảnh, thay link khác hoặc khai host trong next.config, SKILL.md S16):`);
      for (const item of result.brokenImages) problems.push(`  ${item}`);
    }
    if (result.heavyNavLinks?.length > 0) {
      problems.push(`SIDEBAR CHỮ ĐẬM HAY MỤC SÁT NHAU (${result.heavyNavLinks.length} chỗ, mục thường chữ 400 text-foreground/70, chỉ mục đang chọn font-medium, các mục cách gap-1, layouts/app.md):`);
      for (const item of result.heavyNavLinks) problems.push(`  ${item}`);
    }
    if (result.heavySeparators?.length > 0) {
      problems.push(`VẠCH CHIA TRONG MENU ĐẬM HƠN VIỀN KHUNG (${result.heavySeparators.length} menu):`);
      for (const item of result.heavySeparators) problems.push(`  ${item}`);
    }
    if (result.overlongPlaceholders?.length > 0) {
      problems.push(`PLACEHOLDER DÀI HƠN Ô (${result.overlongPlaceholders.length} ô, rút chữ cho vừa, ô thật cắt mất đuôi):`);
      for (const item of result.overlongPlaceholders) problems.push(`  ${item}`);
    }
    if (result.fakeFieldWraps?.length > 0) {
      problems.push(`KHỐI TRÔNG NHƯ Ô NHẬP MÀ CHỮ XUỐNG DÒNG (${result.fakeFieldWraps.length} khối, dùng <input> thật theo components/input.md):`);
      for (const item of result.fakeFieldWraps) problems.push(`  ${item}`);
    }
    if (result.transparentHeaders?.length > 0) {
      problems.push(`THANH HEADER TRONG SUỐT TRÊN NỀN XÁM (${result.transparentHeaders.length} thanh, nền --surface theo layouts/app.md):`);
      for (const item of result.transparentHeaders) problems.push(`  ${item}`);
    }
    if (result.textOnlyPagers?.length > 0) {
      problems.push(`PHÂN TRANG CHỈ CÓ NÚT CHỮ (${result.textOnlyPagers.length} chỗ, dựng ‹ 1 2 3 … › theo components/small-controls.md):`);
      for (const item of result.textOnlyPagers) problems.push(`  ${item}`);
    }
    if (result.missingWireframeParts?.length > 0) {
      problems.push(`WIREFRAME THIẾU PHẦN CỦA THANH CÔNG CỤ (design-process.md, U3): ${result.missingWireframeParts.join(", ")}`);
    }
    if (result.coveredNowLines?.length > 0) {
      problems.push(`VẠCH "BÂY GIỜ" BỊ Ô ĐÈ (layouts/app.md, "Lưới giờ trong ngày": vạch vẽ trên ô):`);
      for (const item of result.coveredNowLines) problems.push(`  ${item}`);
    }
    if (result.wireframeChromeProblems?.length > 0) {
      problems.push(`KHUNG WIREFRAME LÀM HỎNG BẢN THIẾT KẾ (design-process.md, U3):`);
      for (const item of result.wireframeChromeProblems.slice(0, 8)) problems.push(`  ${item}`);
    }
    if (result.misalignedControlRows?.length > 0) {
      problems.push(`HÀNG CONTROL LỆCH TRÊN DƯỚI (${result.misalignedControlRows.length} hàng, thêm items-center; nút cạnh nhau cùng chiều cao):`);
      for (const item of result.misalignedControlRows) problems.push(`  ${item}`);
    }
    if (result.repeatedCardIssues?.length > 0) {
      problems.push(`KHỐI LẶP: THỨ BẬC, NHỊP, TÊN BỊ CẮT (${result.repeatedCardIssues.length} nhóm, N12 trong principles.md):`);
      for (const item of result.repeatedCardIssues) problems.push(`  ${item}`);
    }
    if (result.denseItems?.length > 0) {
      problems.push(`MỤC LẶP DÀY CHỮ (từ 5 dòng mỗi mục; danh sách + chi tiết thì mục trái tối đa 3 dòng, layouts/app.md):`);
      for (const item of result.denseItems) problems.push(`  ${item}`);
    }
    if (result.clippedBars?.length > 0) {
      problems.push(`VẠCH TRÁI BỊ BO GÓC KHUNG CẮT (${result.clippedBars.length} chỗ):`);
      for (const item of result.clippedBars) problems.push(`  ${item}`);
    }
    if (result.nestedFadeDialogs?.length > 0) {
      problems.push(`KHUNG HỘP THOẠI MỜ LỒNG TRONG LỚP NỀN MỜ (${result.nestedFadeDialogs.length} chỗ, độ mờ nhân nhau, khung tan nhanh hơn nền):`);
      for (const item of result.nestedFadeDialogs) problems.push(`  ${item}`);
    }
    if (result.mouseUnreachableScrollers?.length > 0) {
      problems.push(`HÀNG CUỘN NGANG CHUỘT KHÔNG TỚI ĐƯỢC (${result.mouseUnreachableScrollers.length} hàng, thanh cuộn ẩn, không nút mũi tên; responsive.md sau R10):`);
      for (const item of result.mouseUnreachableScrollers) problems.push(`  ${item}`);
    }
    if (result.stickyScrollColumns.length > 0) {
      problems.push(`CỘT DÍNH MÀ CUỘN RIÊNG (${result.stickyScrollColumns.length} cột, thanh cuộn riêng hiện thường trực; cột dài hơn màn thì để cuộn theo trang):`);
      for (const item of result.stickyScrollColumns) problems.push(`  ${item}`);
    }
    if (result.swallowedNumbers.length > 0) {
      problems.push(`CHỮ CẮT NUỐT MẤT SỐ (${result.swallowedNumbers.length} chỗ, số kèm đơn vị nằm sau dấu …):`);
      for (const item of result.swallowedNumbers) problems.push(`  ${item}`);
    }
    if (result.floatingContent.length > 0) {
      problems.push(`NỘI DUNG TRÔI GIỮA MÀN RỘNG (khối chính căn giữa, hở hai bên):`);
      for (const item of result.floatingContent) problems.push(`  ${item}`);
    }
    if (result.styledNativeSelects.length > 0) {
      problems.push(`SELECT, Ô NGÀY GỐC TRÊN DESKTOP (${result.styledNativeSelects.length} ô; chế độ soi bỏ qua, wireframe và dựng lại thì thay bằng mẫu choice-controls.md):`);
      for (const item of result.styledNativeSelects) problems.push(`  ${item}`);
    }
    if (result.squeezedBlocks.length > 0) {
      problems.push(`KHỐI BỊ BÓP CHIỀU CAO (${result.squeezedBlocks.length} khối, thường thiếu shrink-0 trong khung flex dọc):`);
      for (const item of result.squeezedBlocks) problems.push(`  ${item}`);
    }
    if (result.tinyTextCount > 0) {
      problems.push(`CHỮ DƯỚI 12px (${result.tinyTextCount} chỗ):`);
      for (const item of result.tinyTexts) problems.push(`  ${item}`);
    }
    if (result.browserDefaultControls.length > 0) {
      problems.push(`CONTROL CÒN KIỂU MẶC ĐỊNH CỦA TRÌNH DUYỆT (${result.browserDefaultControls.length} chỗ, dự án thiếu reset hay control chưa tự reset):`);
      for (const item of result.browserDefaultControls) problems.push(`  ${item}`);
    }
    if (result.mismatchedRadii?.length > 0) {
      problems.push(`KHỐI CÙNG COMPONENT BO GÓC KHÁC NHAU (${result.mismatchedRadii.length} khối, Lệch hệ: bị đè bo góc riêng):`);
      for (const item of result.mismatchedRadii) problems.push(`  ${item}`);
    }
    if (result.invisibleFrames.length > 0) {
      problems.push(`KHUNG KHAI VIỀN MÀ VIỀN KHÔNG THẤY (${result.invisibleFrames.length} khung, nền trong, viền, nền ngoài gần như một màu):`);
      for (const item of result.invisibleFrames) problems.push(`  ${item}`);
    }
    if (result.hollowLayers.length > 0) {
      problems.push(`LỚP NỔI CÓ DẢI TRỐNG (${result.hollowLayers.length} chỗ, khung rộng hơn nội dung bên trong, thường do \`max-w\` chặn nội dung):`);
      for (const item of result.hollowLayers) problems.push(`  ${item}`);
    }
    if (result.vanishedChildren.length > 0) {
      problems.push(`KHỐI CON BIẾN MẤT LÚC RÊ (${result.vanishedChildren.length} chỗ):`);
      for (const item of result.vanishedChildren.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.autoScrolledAreas.length > 0) {
      problems.push(`TRANG TỰ CUỘN KHI VỪA TẢI (${result.autoScrolledAreas.length} chỗ, người dùng chưa chạm mà đầu trang đã khuất):`);
      for (const item of result.autoScrolledAreas) problems.push(`  ${item}`);
    }
    if (result.openerLayerProblems.length > 0) {
      problems.push(`LỚP NỔI MỞ BẰNG NÚT BỊ VỠ (${result.openerLayerProblems.length} chỗ):`);
      for (const item of result.openerLayerProblems.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.layoutShifts.length > 0) {
      problems.push(`RÊ CHUỘT LÀM NHẢY BỐ CỤC (${result.layoutShifts.length} chỗ, hover thêm hay nở phần tử, khối bên dưới dời theo):`);
      for (const item of result.layoutShifts.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.lowContrastCount > 0) {
      problems.push(`TƯƠNG PHẢN CHỮ DƯỚI NGƯỠNG (${result.lowContrastCount} cặp màu, chữ thường 4.5:1, chữ lớn 3:1):`);
      for (const item of result.lowContrastTexts) problems.push(`  ${item}`);
    }
    if (result.clippedBlocks.length > 0) {
      problems.push(`KHUNG GIẤU MẤT CHỮ (${result.clippedBlocks.length} khung overflow hidden, chữ nằm ngoài khung; xem ảnh xác nhận):`);
      for (const item of result.clippedBlocks) problems.push(`  giấu "${item.hiddenText}": ${item.element}`);
    }
    if (result.wrappedControls.length > 0) {
      problems.push(`CHỮ TRONG NÚT / LINK / TAB XUỐNG DÒNG (${result.wrappedControls.length} chỗ, nút bị bóp):`);
      for (const item of result.wrappedControls) problems.push(`  ${item}`);
    }
    if (result.wrappedRows.length > 0) {
      problems.push(`HÀNG RỚT DÒNG (header, nav, thanh tab, hàng nút) (${result.wrappedRows.length} hàng):`);
      for (const item of result.wrappedRows) problems.push(`  ${item}`);
    }

    problemCount += problems.filter((line) => !line.startsWith("  ")).length;
    lines.push(`\n## ${result.width}px  (ảnh: ${result.screenshotPath})`);
    lines.push(problems.length > 0 ? problems.join("\n") : "Không đo ra lỗi.");
    if (result.expandedCount > 0) lines.push(`(Đã mở ${result.expandedCount} khối đang đóng rồi đo lại phần bên trong.)`);
    if (result.stateGroupCount > 0) lines.push(`(Đã thử rê, Tab, bấm ${result.stateGroupCount} nhóm có mục đang chọn.)`);
    if (result.truncatedCount > 0) lines.push(`(Có ${result.truncatedCount} chỗ chữ bị cắt có dấu …: xem ảnh xem có chỗ nào cắt mất ý không.)`);
    if (result.openedLayerShots.length > 0) {
      lines.push(`(Đã bấm mở ${result.openedLayerShots.length} lớp nổi, ảnh từng lớp — mở ra xem:)`);
      for (const shot of result.openedLayerShots) lines.push(`  ${shot}`);
    }
    if (result.unmeasuredContrastCount > 0) lines.push(`(Có ${result.unmeasuredContrastCount} chỗ chữ trên ảnh / gradient, máy không đo được tương phản: xem ảnh.)`);
  }

  lines.unshift(problemCount > 0 ? `# Probe: ${problemCount} nhóm lỗi đo được` : "# Probe: không đo ra lỗi");
  lines.push(
    "\nMáy chỉ đo được lỗi đo được. Mở từng ảnh ra xem: thứ nặng nhất có đáng nặng không, việc chính của trang có thấy ngay không, chỗ nào chật dồn cục.",
  );

  return lines.join("\n");
}

// ---------- So bản dựng với wireframe đã chọn (--wireframe) ----------
// Wireframe là bản đặc tả tới từng px (design-process.md, U4): khoảng cách, cỡ, chữ. Neo theo chữ: mỗi đoạn chữ và
// placeholder có ở cả hai trang là một điểm neo. Một khoảng phía trên sai thì mọi neo phía dưới lệch cùng một số, nên
// không so toạ độ tuyệt đối mà so khoảng giữa mỗi neo với neo gần nhất phía trên cùng cột (bên trái cùng dòng): khoảng
// nào khác là đúng chỗ phải sửa. Đã dính 30/09/2026, tìm phòng: ô tìm của bản dựng thấp hơn wireframe 17px, hàng chip
// thêm 3px, lưới card thêm 1px; kéo thanh so sánh qua lại thì mọi khối nhảy.
const wireframeCompareWidths = [1440, 375];
const wireframeTolerancePx = 2;
const maxWireframeDiffLines = 15;

async function collectLayoutAnchors(page) {
  return page.evaluate(() => {
    // Thanh công cụ và khung lý do của trang wireframe nằm ngoài bản thiết kế.
    for (const chrome of document.querySelectorAll(".wf-bar, .wf-reason, [data-wf-reason]")) chrome.remove();

    const anchors = [];
    const countsByText = new Map();
    // Màu đọc qua canvas để oklch, hex, rgb cùng ra một dạng so được.
    const colorContext = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    function normalizeColor(color) {
      colorContext.clearRect(0, 0, 1, 1);
      colorContext.fillStyle = "#000";
      colorContext.fillStyle = color;
      colorContext.fillRect(0, 0, 1, 1);
      const [red, green, blue, alpha] = colorContext.getImageData(0, 0, 1, 1).data;

      return alpha === 0 ? "transparent" : `rgb(${red} ${green} ${blue}${alpha < 255 ? ` / ${(alpha / 255).toFixed(2)}` : ""})`;
    }
    function findBackground(element) {
      for (let current = element; current; current = current.parentElement) {
        const background = normalizeColor(getComputedStyle(current).backgroundColor);
        if (background !== "transparent") return background;
      }

      return "transparent";
    }

    function addAnchor(text, rect, fontSize, style = {}) {
      if (rect.width === 0 || rect.height === 0) return;

      const occurrence = (countsByText.get(text) ?? 0) + 1;
      countsByText.set(text, occurrence);
      anchors.push({
        key: `${text}#${occurrence}`,
        text,
        x: Math.round(rect.left + scrollX),
        y: Math.round(rect.top + scrollY),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize,
        ...style,
      });
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent.replace(/\s+/g, " ").trim();
      const parent = node.parentElement;
      if (!text || !parent || parent.closest("script, style, noscript, template")) continue;
      if (getComputedStyle(parent).visibility === "hidden") continue;

      range.selectNodeContents(node);
      const parentStyle = getComputedStyle(parent);
      addAnchor(text, range.getBoundingClientRect(), parentStyle.fontSize, {
        color: normalizeColor(parentStyle.color),
        fontWeight: parentStyle.fontWeight,
        background: findBackground(parent),
      });
    }
    for (const field of document.querySelectorAll("input[placeholder], textarea[placeholder]")) {
      addAnchor(`placeholder "${field.placeholder.trim()}"`, field.getBoundingClientRect(), getComputedStyle(field).fontSize, {
        color: normalizeColor(getComputedStyle(field, "::placeholder").color),
        background: findBackground(field),
      });
    }
    // Icon không có chữ nên neo theo tên lucide (cả lucide CDN lẫn lucide-react gắn class lucide-<tên>). Bắt icon
    // wireframe có mà bản dựng bỏ, như nút tim trên header (30/09/2026). Cỡ icon so bằng bề rộng, không bằng cỡ chữ.
    for (const icon of document.querySelectorAll("svg[class*='lucide-']")) {
      const iconName = [...icon.classList].find((className) => className.startsWith("lucide-") && className !== "lucide-icon");
      if (!iconName) continue;

      const iconRect = icon.getBoundingClientRect();
      addAnchor(`icon ${iconName.replace(/^lucide-|-icon$/g, "")}`, iconRect, `${Math.round(iconRect.width)}px icon`, {
        color: normalizeColor(getComputedStyle(icon).color),
      });
    }

    return anchors;
  });
}

function isSameColumn(first, second) {
  return first.x < second.x + second.width && second.x < first.x + first.width;
}

function isSameLine(first, second) {
  return first.y < second.y + second.height && second.y < first.y + first.height;
}

function quoteAnchor(text) {
  return `«${text.length > 40 ? `${text.slice(0, 39)}…` : text}»`;
}

function parseRgb(color) {
  const channels = color.match(/[\d.]+/g)?.map(Number) ?? [];

  return color === "transparent" ? [0, 0, 0, 0] : [channels[0], channels[1], channels[2], channels[3] ?? 1];
}

// Lệch vài đơn vị mỗi kênh là làm tròn khi đổi hệ màu, không phải hai màu khác nhau.
function isSameColor(firstColor, secondColor) {
  const firstChannels = parseRgb(firstColor);
  const secondChannels = parseRgb(secondColor);

  return firstChannels.slice(0, 3).every((channel, index) => Math.abs(channel - secondChannels[index]) <= 6)
    && Math.abs(firstChannels[3] - secondChannels[3]) <= 0.05;
}

function diffLayoutAnchors(wireframeAnchors, buildAnchors, shouldCompareColors) {
  const buildByKey = new Map(buildAnchors.map((anchor) => [anchor.key, anchor]));
  const wireframeKeys = new Set(wireframeAnchors.map((anchor) => anchor.key));
  const pairs = wireframeAnchors
    .filter((anchor) => buildByKey.has(anchor.key))
    .map((anchor) => ({ wireframe: anchor, build: buildByKey.get(anchor.key) }))
    .sort((first, second) => first.wireframe.y - second.wireframe.y || first.wireframe.x - second.wireframe.x);

  // Neo gần nhất phía trên cùng cột (bên trái cùng dòng) tìm trong mọi neo của wireframe. Neo đó không có ở bản dựng
  // (chữ đổi, khối bị bỏ) thì bỏ qua khoảng này: lỗi đã nằm ở dòng "chữ wireframe có mà bản dựng không có", khoảng lệch
  // chỉ là hệ quả (chữ mới ngắn hơn nên ít dòng hơn).
  const pairByKey = new Map(pairs.map((pair) => [pair.wireframe.key, pair]));
  function findNeighborPair(anchor, isNeighbor, farEdge) {
    const neighbor = wireframeAnchors
      .filter((other) => other !== anchor && isNeighbor(other, anchor))
      .sort((first, second) => farEdge(second) - farEdge(first))[0];
    if (!neighbor) return { isEdge: true };

    return pairByKey.get(neighbor.key) ?? null;
  }

  const gapDiffs = [];
  // Một token sai thì hàng chục chữ sai cùng một cặp màu: gom theo cặp, kèm vài chữ làm ví dụ.
  const styleDiffsByKey = new Map();
  function addStyleDiff(label, wireframeValue, buildValue, text) {
    const key = `${label}|${wireframeValue}|${buildValue}`;
    if (!styleDiffsByKey.has(key)) styleDiffsByKey.set(key, { label, wireframeValue, buildValue, texts: [] });
    styleDiffsByKey.get(key).texts.push(text);
  }
  function checkVerticalGap(pair, abovePair) {
    const wireframeGap = abovePair ? pair.wireframe.y - (abovePair.wireframe.y + abovePair.wireframe.height) : pair.wireframe.y;
    const buildGap = abovePair ? pair.build.y - (abovePair.build.y + abovePair.build.height) : pair.build.y;
    if (Math.abs(buildGap - wireframeGap) > wireframeTolerancePx) {
      const fromLabel = abovePair ? quoteAnchor(abovePair.wireframe.text) : "mép trên trang";
      gapDiffs.push(`dọc: ${fromLabel} → ${quoteAnchor(pair.wireframe.text)} bản dựng ${buildGap}px, wireframe ${wireframeGap}px (${buildGap > wireframeGap ? "+" : ""}${buildGap - wireframeGap})`);
    }
  }

  function checkHorizontalGap(pair, leftPair) {
    const wireframeLeftGap = leftPair ? pair.wireframe.x - (leftPair.wireframe.x + leftPair.wireframe.width) : pair.wireframe.x;
    const buildLeftGap = leftPair ? pair.build.x - (leftPair.build.x + leftPair.build.width) : pair.build.x;
    if (Math.abs(buildLeftGap - wireframeLeftGap) > wireframeTolerancePx) {
      const fromLabel = leftPair ? quoteAnchor(leftPair.wireframe.text) : "mép trái trang";
      gapDiffs.push(`ngang: ${fromLabel} → ${quoteAnchor(pair.wireframe.text)} bản dựng ${buildLeftGap}px, wireframe ${wireframeLeftGap}px (${buildLeftGap > wireframeLeftGap ? "+" : ""}${buildLeftGap - wireframeLeftGap})`);
    }
  }

  for (const pair of pairs) {
    const abovePair = findNeighborPair(
      pair.wireframe,
      (other, anchor) => other.y + other.height <= anchor.y + 1 && isSameColumn(other, anchor),
      (other) => other.y + other.height,
    );
    if (abovePair) checkVerticalGap(pair, abovePair.isEdge ? null : abovePair);

    const leftPair = findNeighborPair(
      pair.wireframe,
      (other, anchor) => other.x + other.width <= anchor.x + 1 && isSameLine(other, anchor),
      (other) => other.x + other.width,
    );
    if (leftPair) checkHorizontalGap(pair, leftPair.isEdge ? null : leftPair);

    if (pair.wireframe.fontWeight && pair.build.fontWeight !== pair.wireframe.fontWeight) {
      addStyleDiff("độ đậm", pair.wireframe.fontWeight, pair.build.fontWeight, pair.wireframe.text);
    }
    if (shouldCompareColors && pair.wireframe.color && !isSameColor(pair.wireframe.color, pair.build.color)) {
      addStyleDiff(pair.wireframe.text.startsWith("icon ") ? "màu icon" : "màu chữ", pair.wireframe.color, pair.build.color, pair.wireframe.text);
    }
    if (shouldCompareColors && pair.wireframe.background && !isSameColor(pair.wireframe.background, pair.build.background)) {
      addStyleDiff("nền dưới chữ", pair.wireframe.background, pair.build.background, pair.wireframe.text);
    }

    if (pair.build.fontSize !== pair.wireframe.fontSize) {
      const sizeLabel = pair.wireframe.text.startsWith("icon ") ? "cỡ icon" : "cỡ chữ";
      gapDiffs.push(`${sizeLabel}: ${quoteAnchor(pair.wireframe.text)} bản dựng ${pair.build.fontSize.replace(" icon", "")}, wireframe ${pair.wireframe.fontSize.replace(" icon", "")}`);
    }
  }

  const uniqueTexts = (anchors) => [...new Set(anchors.map((anchor) => anchor.text))];

  return {
    matchedCount: pairs.length,
    wireframeCount: wireframeAnchors.length,
    gapDiffs,
    styleDiffs: [...styleDiffsByKey.values()].map(({ label, wireframeValue, buildValue, texts }) => {
      const examples = [...new Set(texts)].slice(0, 3).map(quoteAnchor).join(", ");
      return `${label}: bản dựng ${buildValue}, wireframe ${wireframeValue}, ${texts.length} chỗ (${examples})`;
    }),
    missingTexts: uniqueTexts(wireframeAnchors.filter((anchor) => !buildByKey.has(anchor.key))),
    extraTexts: uniqueTexts(buildAnchors.filter((anchor) => !wireframeKeys.has(anchor.key))),
  };
}

async function openForAnchors(browser, options, url, width, screenshotPath) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: options.isDark ? "dark" : "light",
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "load" });
  await page.addStyleTag({ content: freezeMotionCss });
  await page.waitForTimeout(options.waitMs);
  const anchors = await collectLayoutAnchors(page);
  await takeFullScreenshot(page, screenshotPath);
  await context.close();

  return anchors;
}

async function compareWithWireframe(browser, options) {
  const comparisons = [];
  // Nấc Xám cố ý bỏ màu nhấn nên chỉ so màu khi link wireframe mở ở nấc Màu (U3, công tắc Màu).
  const shouldCompareColors = new URL(options.wireframeUrl).searchParams.get("mau") === "mau";

  for (const width of wireframeCompareWidths) {
    const wireframeAnchors = await openForAnchors(browser, options, options.wireframeUrl, width, join(options.out, `wireframe-${width}.png`));
    const buildAnchors = await openForAnchors(browser, options, options.url, width, join(options.out, `ban-dung-${width}.png`));
    comparisons.push({ width, shouldCompareColors, ...diffLayoutAnchors(wireframeAnchors, buildAnchors, shouldCompareColors) });
  }

  return comparisons;
}

function formatWireframeReport(comparisons) {
  const lines = ["\n# So với wireframe (design-process.md, U4: khoảng cách, cỡ, chữ chép nguyên từ wireframe)"];

  for (const comparison of comparisons) {
    lines.push(`\n## ${comparison.width}px: khớp ${comparison.matchedCount}/${comparison.wireframeCount} neo (chữ, placeholder, icon)`);
    if (!comparison.shouldCompareColors) lines.push("Chưa so màu: link wireframe không có mau=mau (nấc Màu).");
    if (comparison.gapDiffs.length === 0 && comparison.styleDiffs.length === 0 && comparison.missingTexts.length === 0 && comparison.extraTexts.length === 0) {
      lines.push("Khớp wireframe.");
      continue;
    }

    if (comparison.gapDiffs.length > 0) {
      lines.push(`KHOẢNG KHÁC WIREFRAME (${comparison.gapDiffs.length} chỗ, lấy đúng class spacing của khối đó trong wireframe):`);
      for (const item of comparison.gapDiffs.slice(0, maxWireframeDiffLines)) lines.push(`  ${item}`);
      if (comparison.gapDiffs.length > maxWireframeDiffLines) lines.push(`  (còn ${comparison.gapDiffs.length - maxWireframeDiffLines} chỗ, thường do chỗ đầu tiên, sửa rồi chạy lại)`);
    }
    if (comparison.styleDiffs.length > 0) {
      lines.push(`MÀU, ĐỘ ĐẬM KHÁC WIREFRAME (${comparison.styleDiffs.length} cặp, lấy đúng token và class của wireframe):`);
      for (const item of comparison.styleDiffs.slice(0, maxWireframeDiffLines)) lines.push(`  ${item}`);
    }
    if (comparison.missingTexts.length > 0) {
      lines.push(`CHỮ, ICON WIREFRAME CÓ MÀ BẢN DỰNG KHÔNG CÓ (${comparison.missingTexts.length}, chép nguyên chữ, hoặc ghi lý do lúc giao):`);
      for (const text of comparison.missingTexts.slice(0, maxWireframeDiffLines)) lines.push(`  ${quoteAnchor(text)}`);
    }
    if (comparison.extraTexts.length > 0) {
      lines.push(`CHỮ, ICON BẢN DỰNG CÓ MÀ WIREFRAME KHÔNG CÓ (${comparison.extraTexts.length}):`);
      for (const text of comparison.extraTexts.slice(0, maxWireframeDiffLines)) lines.push(`  ${quoteAnchor(text)}`);
    }
  }

  return lines.join("\n");
}

function listWireframeMustReportItems(comparisons) {
  const items = [];

  for (const comparison of comparisons) {
    for (const item of comparison.gapDiffs.slice(0, maxWireframeDiffLines)) items.push({ widths: [comparison.width], text: `khác wireframe, ${item}` });
    for (const item of comparison.styleDiffs.slice(0, maxWireframeDiffLines)) items.push({ widths: [comparison.width], text: `khác wireframe, ${item}` });
    for (const text of comparison.missingTexts.slice(0, maxWireframeDiffLines)) items.push({ widths: [comparison.width], text: `wireframe có mà bản dựng không có: ${quoteAnchor(text)}` });
    for (const text of comparison.extraTexts.slice(0, maxWireframeDiffLines)) items.push({ widths: [comparison.width], text: `bản dựng thêm thứ wireframe không có: ${quoteAnchor(text)}` });
  }

  return items;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!options.url) {
    console.error("Thiếu URL. Ví dụ: node probe.mjs http://localhost:5173/dashboard");
    process.exit(2);
  }

  const playwright = loadPlaywright(options.playwrightDir);
  if (!playwright) {
    console.error('Chưa có playwright. Cài vào thư mục tạm, không vào dự án:\n  npm i --prefix "$TMPDIR/evon-probe" playwright\nrồi chạy lại với --pw "$TMPDIR/evon-probe".');
    process.exit(2);
  }

  let browser;
  try {
    browser = await launchBrowser(playwright.chromium);
  } catch {
    console.error("Không mở được trình duyệt. Chạy: npx playwright install chromium (trong thư mục có playwright).");
    process.exit(2);
  }

  mkdirSync(options.out, { recursive: true });
  const results = [];
  let sweepSteps = [];
  let wireframeComparisons = [];

  try {
    for (const width of options.widths) results.push(await probeWidth(browser, options, width));
    if (options.sweep) sweepSteps = await sweepWidths(browser, options);
    if (options.wireframeUrl) wireframeComparisons = await compareWithWireframe(browser, options);
  } catch (error) {
    console.error(`Không mở được ${options.url}: ${error.message.split("\n")[0]}. Dev server đã chạy chưa?`);
    process.exit(2);
  } finally {
    await browser.close();
  }

  writeFileSync(join(options.out, "report.json"), JSON.stringify({ widths: results, sweep: sweepSteps, wireframe: wireframeComparisons }, null, 2));
  console.log(formatReport(results));
  if (sweepSteps.length > 0) console.log(formatSweepReport(sweepSteps, options.sweep.step));
  if (wireframeComparisons.length > 0) console.log(formatWireframeReport(wireframeComparisons));
  const mustReportItems = [...listMustReportItems(results, sweepSteps), ...listWireframeMustReportItems(wireframeComparisons)];
  console.log(formatMustReportList(mustReportItems, options.sweep?.step ?? 20));
  console.log(`\nChi tiết: ${join(options.out, "report.json")}`);
}

main();
