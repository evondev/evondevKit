#!/usr/bin/env node
// Mở trang thật ở nhiều bề rộng, đo những lỗi máy đo được, chụp ảnh để mắt soi phần còn lại.
// Dùng ở cổng 3 của checklist (references/checklist.md). Chỉ đọc trang, không sửa gì.
//
//   node probe.mjs <url> [--widths 375,768,1024,1280,1440] [--out <thư mục>] [--dark] [--wait 800] [--dpr 1]
//                        [--sweep [1440,375,20]]
//
// --sweep: đo xong các khổ cố định thì kéo bề rộng từ 1440 xuống 375, mỗi bước 20px, chụp từng bước và
// báo khoảng bề rộng có lỗi (cuộn ngang, khung giấu chữ, chữ trong nút xuống dòng, hàng rớt dòng). Bắt
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

const defaultWidths = [375, 768, 1024, 1280, 1440];
const defaultSweep = [1440, 375, 20];
const mobileWidthLimit = 640;
// Sàn cỡ bấm của skill: nút h-8 trong bảng dày là nhỏ nhất được phép (list-row.md).
const minTapSize = 32;
// Số lần bấm Tab tối đa, và số phần tử cùng kiểu (cùng thẻ + class) được chụp so: nút thứ ba trở đi của
// 8 card giống nhau thì Tab lướt qua, để trang nhiều card vẫn đi tới được nút nổi ở cuối trang.
const maxTabStops = 160;
const maxFocusChecksPerKind = 2;

function parseArgs(argv) {
  const options = { url: "", widths: defaultWidths, out: "", isDark: false, waitMs: 800, dpr: 1, playwrightDir: "", sweep: null };
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

function measureInPage({ minTapSize, isMobile, isSweep = false }) {
  const viewportWidth = document.documentElement.clientWidth;

  // 0. Trang tự cuộn khi vừa tải: cửa sổ hay khung cuộn chính (cao từ 60% màn) đã rời đầu trang trước
  //    khi ai chạm vào. Khung nhỏ cuộn sẵn xuống đáy (danh sách tin nhắn) là cố ý, không tính.
  const autoScrolledAreas = [];
  if (window.scrollY > 0) autoScrolledAreas.push(`cửa sổ đã cuộn ${Math.round(window.scrollY)}px`);
  for (const container of document.querySelectorAll("body *")) {
    const overflowY = getComputedStyle(container).overflowY;
    if (!["auto", "scroll"].includes(overflowY) || container.scrollTop <= 0 || container.clientHeight < window.innerHeight * 0.6) continue;
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

  const allElements = [...document.body.querySelectorAll("*")].filter((element) => !["SCRIPT", "STYLE", "svg", "path"].includes(element.tagName));

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

    const children = [...row.children].filter(isVisible).map((child) => child.getBoundingClientRect());
    if (children.length < 2) continue;
    const shortestHeight = Math.min(...children.map((rect) => rect.height));
    const topSpread = Math.max(...children.map((rect) => rect.top)) - Math.min(...children.map((rect) => rect.top));
    if (topSpread > shortestHeight / 2) wrappedRows.push(describe(row));
  }

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
    };
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

      return { element: describe(element), fullText, visibleChars: Math.floor(fullText.length * visibleRatio), width: Math.round(element.clientWidth) };
    });
  const tooShortTexts = truncatedTexts.filter((item) => item.visibleChars < 10 && item.fullText.length > item.visibleChars + 3);

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
      if (!isVisible(element) || element.closest("[inert], [aria-hidden='true']")) continue;
      if (element.tagName === "A" && getComputedStyle(element).display === "inline") continue;
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

  // 9. Vòng focus vẽ trên một con (group-focus-visible:ring) mà không bọc hết thứ nhìn thấy của
  //    link, nút: "‹ Bảo mật" có vòng quanh riêng chữ, dấu ‹ đứng ngoài (đo 26/09/2026). Đọc class
  //    chứ không Tab, nên đo được cả màn hẹp, nơi bước Tab bị bỏ qua.
  const partialFocusRings = [];
  for (const ringNode of document.querySelectorAll("[class*='group-focus-visible:ring']")) {
    const focusable = ringNode.parentElement?.closest("a, button, [tabindex]");
    if (!focusable || !isVisible(focusable) || !isVisible(ringNode)) continue;

    const ringRect = ringNode.getBoundingClientRect();
    const visibleParts = [...focusable.querySelectorAll("svg, span, img")].filter(
      (part) => isVisible(part) && !ringNode.contains(part) && !part.contains(ringNode),
    );
    const outsidePart = visibleParts.find((part) => {
      const partRect = part.getBoundingClientRect();

      return partRect.left < ringRect.left - 1 || partRect.right > ringRect.right + 1;
    });

    if (outsidePart) partialFocusRings.push(describe(focusable));
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
  //     các cha tới lớp nền đặc. Chữ trên ảnh, video hay gradient không đo được, chỉ đếm. Chữ trong
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

  // Nền thật dưới chữ: lớp phủ định vị tuyệt đối (panel, ảnh bìa) không phải cha trong DOM của chữ.
  function readBackdrop(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const isInViewport = centerX >= 0 && centerY >= 0 && centerX < innerWidth && centerY < innerHeight;
    if (!isInViewport) return readAncestorBackdrop(element);

    // Lớp đứng TRÊN chữ (thanh điều hướng cố định che mất chữ lúc chụp) không phải nền của chữ: chỉ
    // xét các lớp nằm sau chữ trong chồng. Đã đo nhầm một nút nền xanh ra 1:1 vì thanh dưới đáy màu trắng che nút
    // (27/09/2026, dự án mồi phase 2). Chữ bị che hẳn thì đi theo các cha trong DOM.
    const stack = document.elementsFromPoint(centerX, centerY);
    const textIndex = stack.findIndex((layer) => layer === element || element.contains(layer));
    if (textIndex === -1) return readAncestorBackdrop(element);

    for (const layer of stack.slice(textIndex)) {
      if (layer === element || element.contains(layer)) continue;
      if (layer.contains(element)) break;
      if (["IMG", "VIDEO", "CANVAS", "svg"].includes(layer.tagName) || getComputedStyle(layer).backgroundImage !== "none") return null;
      if (readColor(getComputedStyle(layer).backgroundColor).alpha > 0) return readAncestorBackdrop(layer);
    }

    return readAncestorBackdrop(element);
  }

  function readOpacityChain(element) {
    let opacity = 1;
    for (let node = element; node; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);

    return opacity;
  }

  const lowContrastTexts = new Map();
  let unmeasuredContrastCount = 0;

  function checkContrast(element, cssColor, sample) {
    const backdrop = readBackdrop(element);
    if (!backdrop) {
      unmeasuredContrastCount++;
      return;
    }

    const style = getComputedStyle(element);
    const textColor = readColor(cssColor);
    textColor.alpha *= readOpacityChain(element);
    const shownColor = blendColors(textColor, backdrop);
    const fontSize = parseFloat(style.fontSize);
    const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && Number(style.fontWeight) >= 700);
    const requiredRatio = isLargeText ? 3 : 4.5;
    const ratio = readContrastRatio(shownColor, backdrop);
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

  // 17b. Select gốc đã tô ở khổ desktop: lúc đóng khớp app, bấm vào vẫn bung menu của hệ điều hành. Chế độ
  //      soi bỏ qua, hai chế độ dựng lại thay bằng Select dựng (review.md V1, 28/09/2026).
  const styledNativeSelects = isMobile ? [] : [...document.querySelectorAll("select")]
    .filter((select) => isVisible(select) && !["auto", "menulist"].includes(getComputedStyle(select).appearance))
    .slice(0, 6)
    .map((select) => `${select.options.length} mục: ${describe(select)}`);

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
      if (isDrawn) horizontalRules.push({ element, edgeY, left: rect.left, right: rect.right });
    }
  }
  const brokenRules = [];
  for (const first of horizontalRules) {
    for (const second of horizontalRules) {
      if (brokenRules.length >= 6) break;
      const isSideBySide = Math.abs(first.right - second.left) <= 4;
      const offset = Math.abs(first.edgeY - second.edgeY);
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
    browserDefaultControls,
    brokenRules,
    squeezedBlocks,
    styledNativeSelects,
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
    partialFocusRings: [...new Set(partialFocusRings)].slice(0, 10),
    overlappedChartLabels: [...new Set(overlappedChartLabels)].slice(0, 10),
    outsideChartLabels: [...new Set(outsideChartLabels)].slice(0, 10),
  };
}

// Chụp dấu hiệu nhìn thấy của một phần tử và hai cấp cha, để so lúc có và không có focus.
function snapshotFocusStyles(element) {
  const chain = [element, element.parentElement, element.parentElement?.parentElement].filter(Boolean);

  return chain
    .map((node) => {
      const style = getComputedStyle(node);
      // `outline-hidden` của Tailwind v4 là viền 2px trong suốt: đổi style mà mắt không thấy gì.
      const isOutlineInvisible = style.outlineStyle === "none" || parseFloat(style.outlineWidth) === 0 || /rgba\(.*,\s*0\)|transparent/.test(style.outlineColor);
      const outline = isOutlineInvisible ? "none" : [style.outlineStyle, style.outlineWidth, style.outlineColor].join(" ");

      return [outline, style.boxShadow, style.borderColor, style.backgroundColor, style.color, style.textDecorationLine].join("|");
    })
    .join("||");
}

// Chụp đúng vùng của phần tử (nới 8px cho vòng focus) để so điểm ảnh lúc có và không có focus.
// Dấu focus có thể vẽ ở phần tử anh em (chấm của biểu đồ, nhãn bọc ngoài), đọc style không thấy,
// nhìn ảnh thì thấy. Phần tử ra ngoài màn thì bỏ, trả null.
async function captureFocusArea(page, probeId) {
  const rect = await page.evaluate((id) => {
    const element = document.querySelector(`[data-evon-probe-id="${id}"]`);
    if (!element) return null;
    let box = element.getBoundingClientRect();
    // Ô ẩn `sr-only` (input file trong khung thả tệp) chỉ 1px: vòng focus vẽ trên <label> bọc ngoài,
    // chụp đúng ô 1px thì không thấy gì đổi, báo nhầm (27/09/2026, /dashboard/projects/documents).
    if (box.width <= 2 || box.height <= 2) {
      const holder = element.closest("label") || element.parentElement;
      if (holder) box = holder.getBoundingClientRect();
    }

    return { x: box.left, y: box.top, width: box.width, height: box.height };
  }, probeId);
  const viewport = page.viewportSize();
  if (!rect || rect.width === 0 || rect.height === 0) return null;

  const clip = {
    x: Math.max(0, rect.x - 8),
    y: Math.max(0, rect.y - 8),
    width: Math.min(viewport.width, rect.x + rect.width + 8) - Math.max(0, rect.x - 8),
    height: Math.min(viewport.height, rect.y + rect.height + 8) - Math.max(0, rect.y - 8),
  };
  if (clip.width <= 0 || clip.height <= 0) return null;

  const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));

  return { clip, scroll, pixels: await page.screenshot({ clip }) };
}

// Chụp lại vùng của phần tử vừa rời focus ở đúng chỗ cuộn lúc nó có focus. Tab sang phần tử sau
// làm trang dài cuộn đi, vùng chụp lệch thì không so được (đã dính 27/09/2026, trang /states có
// tám biểu đồ xếp dọc: báo nhầm cả tám).
async function captureBlurredArea(page, probeId, focusedArea) {
  const currentScroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
  await page.evaluate(({ x, y }) => window.scrollTo(x, y), focusedArea.scroll);
  const blurredArea = await captureFocusArea(page, probeId);
  await page.evaluate(({ x, y }) => window.scrollTo(x, y), currentScroll);

  return blurredArea;
}

async function findMissingFocusRings(page) {
  const missingFocusRings = [];
  const checksByKind = new Map();
  let firstFocusedId = null;
  let previous = null;
  let bodyStreak = 0;

  for (let tabIndex = 0; tabIndex < maxTabStops; tabIndex += 1) {
    await page.keyboard.press("Tab");

    const current = await page.evaluate((snapshotSource) => {
      const snapshot = new Function(`return (${snapshotSource})`)();
      const element = document.activeElement;
      if (!element || element === document.body) return null;
      if (!element.dataset.evonProbeId) element.dataset.evonProbeId = String(Math.random()).slice(2);
      const imageAlt = element.querySelector("img[alt]")?.getAttribute("alt") || "";
      const iconName = (element.querySelector("svg")?.getAttribute("class") || "").match(/lucide-[a-z-]+/)?.[0] || "";
      const label = (element.getAttribute("aria-label") || element.textContent.trim() || element.getAttribute("title") || imageAlt || element.getAttribute("placeholder") || (iconName && `icon ${iconName}`) || "").trim().replace(/\s+/g, " ").slice(0, 40);

      return {
        id: element.dataset.evonProbeId,
        kind: `${element.tagName}|${element.getAttribute("class") || ""}`,
        element: `${element.tagName.toLowerCase()} "${label}"`,
        focusedStyles: snapshot(element),
      };
    }, snapshotFocusStyles.toString());

    if (previous) {
      const blurredStyles = await page.evaluate(
        ({ probeId, snapshotSource }) => {
          const snapshot = new Function(`return (${snapshotSource})`)();
          const element = document.querySelector(`[data-evon-probe-id="${probeId}"]`);

          return element ? snapshot(element) : null;
        },
        { probeId: previous.id, snapshotSource: snapshotFocusStyles.toString() },
      );
      const blurredArea = previous.focusedArea ? await captureBlurredArea(page, previous.id, previous.focusedArea) : null;
      const isSameArea = blurredArea && JSON.stringify(blurredArea.clip) === JSON.stringify(previous.focusedArea.clip);
      const isStyleUnchanged = Boolean(blurredStyles) && blurredStyles === previous.focusedStyles;
      // So được ảnh thì tin ảnh: dấu focus vẽ ở phần tử anh em (chấm biểu đồ) thì style của chính
      // nó không đổi mà ảnh đổi. Không so được (cuộn đi, ra khỏi màn) mới dựa vào style.
      const isMissing = isSameArea ? blurredArea.pixels.equals(previous.focusedArea.pixels) : isStyleUnchanged;

      if (isMissing) missingFocusRings.push(previous.element);
    }

    // Focus rơi về body: đi hết cuối trang, Tab tiếp sẽ vòng lại đầu. Trang tự focus ô chat lúc tải thì vòng
    // Tab bắt đầu giữa trang; dừng ở body là không bao giờ tới header, sidebar (sót 27/09/2026, dự án mồi).
    if (!current) {
      bodyStreak += 1;
      previous = null;
      if (bodyStreak >= 3) break;
      continue;
    }
    bodyStreak = 0;
    if (current.id === firstFocusedId) break;
    if (!firstFocusedId) firstFocusedId = current.id;

    const checkCount = checksByKind.get(current.kind) ?? 0;
    checksByKind.set(current.kind, checkCount + 1);
    if (checkCount >= maxFocusChecksPerKind) {
      previous = null;
      continue;
    }

    current.focusedArea = await captureFocusArea(page, current.id);
    previous = current;
  }

  return missingFocusRings;
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
    // Chạm mép khung đặc phía sau (dòng bảng tràn hai mép card): nền rê gần màu nền ngoài khung là
    // card như bị khuyết một mảng (đã dính 26/09/2026, FAQ trang giá).
    width: rect.width,
    height: rect.height,
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
    // Lớp nổi phải tự định vị (fixed / absolute): listbox của bảng lệnh dựng tĩnh làm mẫu trong trang
    // nằm trong dòng chảy, kéo xuống dưới mép màn là chuyện cuộn trang (báo nhầm 27/09/2026, /components).
    const isPositioned = style.position === "fixed" || style.position === "absolute";
    const isLayer = isPositioned && (["tooltip", "menu", "listbox", "dialog"].includes(node.getAttribute("role")) || node.tagName === "DIALOG" || (parseInt(style.zIndex, 10) || 0) >= 20);
    if (!isLayer) return false;
    const rect = node.getBoundingClientRect();

    // Lớp phủ toàn màn (phủ kín cả hai chiều) không phải lớp nổi cần đo. Tooltip rộng hơn màn thì
    // vẫn đo: đó chính là lỗi (tooltip tên tệp 765px ở 375px, 27/09/2026).
    const isFullScreen = rect.width >= viewportWidth - 1 && rect.height >= viewportHeight - 1;
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
      if (rect.width < 8 || rect.height < 8 || element.closest("[inert], [aria-hidden='true']")) continue;
      if (getComputedStyle(element).visibility === "hidden") continue;
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
    if (change === 0) continue;

    // Chỉ xét phần tử cỡ nút: dòng bảng, dòng danh sách rộng thì nền rê nhạt (#f8f8fa trên card trắng,
    // `I10`) vẫn thấy vì phủ cả một mảng rộng.
    const isButtonSized = before.width < 320 && before.height < 80;
    if (change < 8 && isButtonSized) weakHovers.push(`${label}: ${formatColor(before.color)} → ${formatColor(after.color)} (chênh ${change} mức)`);
    if (after.touchesCardEdge && colorDistance(after.color, after.outsideColor) <= 3) {
      blendedHovers.push(`${label}: nền rê ${formatColor(after.color)} gần như bằng nền ngoài khung ${formatColor(after.outsideColor)}, card như bị khuyết`);
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

async function probePopupLayers(page, isMobile) {
  const overflowingLayers = new Set();
  const hollowLayers = new Set();
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

  for (const triggerId of triggerIds) {
    const locator = page.locator(`[data-evon-popup-id="${triggerId}"]`);
    const isTap = triggerId.startsWith("tap-");
    const isDone = await (isTap ? locator.tap({ timeout: 800, force: true }) : locator.click({ timeout: 800, force: true })).then(() => true, () => false);
    if (!isDone) continue;
    await page.waitForTimeout(250);
    for (const layer of await page.evaluate(findOverflowingLayers)) overflowingLayers.add(`${isTap ? "chạm chữ bị cắt" : "mở"}: ${layer}`);
    for (const layer of await page.evaluate(findHollowLayers)) if (!hollowBefore.has(layer)) hollowLayers.add(layer);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(120);
  }

  return { overflowing: [...overflowingLayers], hollow: [...hollowLayers] };
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
      const sibling = [...group.querySelectorAll(selected.tagName)].find(
        (candidate) =>
          candidate !== selected &&
          candidate.getAttribute("role") === selected.getAttribute("role") &&
          !candidate.matches(selectedSelector) &&
          !candidate.matches(":disabled, [aria-disabled='true']") &&
          !candidate.contains(selected) &&
          !selected.contains(candidate) &&
          isVisible(candidate),
      );
      if (!sibling) continue;
      seenGroups.add(group);
      selected.dataset.evonStateId = `selected-${found.length}`;
      sibling.dataset.evonStateId = `sibling-${found.length}`;
      // Bấm thử chỉ với nút đổi lựa chọn tại chỗ: link thì chuyển trang, nút submit thì gửi form.
      const isSubmit = sibling.tagName === "BUTTON" && sibling.type === "submit" && sibling.form;
      const canClick = !sibling.closest("a[href]") && !isSubmit;
      const groupName = group.getAttribute("aria-label") || "";
      const text = (selected.getAttribute("aria-label") || selected.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24);
      found.push({ index: found.length, canClick, label: `${selected.tagName.toLowerCase()} "${text}"${groupName ? ` trong "${groupName}"` : ""}` });
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

    // Tab tới: phím vừa bấm làm focus bằng code cũng tính là focus bàn phím (`:focus-visible`).
    await page.mouse.move(1, 1);
    await page.keyboard.press("Shift");
    await sibling.focus({ timeout: 800 }).catch(() => {});
    await page.waitForTimeout(60);
    const focusPaints = await page.evaluate(readStatePaints, siblingId);
    const ringShape = focusPaints && pickLargestPaint(findNewPaints(focusPaints, restPaints, "ring"));
    if (selectedShape && ringShape && isDifferentCover(ringShape, selectedShape)) {
      shapeMismatches.push(`${group.label}: vòng focus ${describePaint(ringShape)}, đang chọn là nền ${describePaint(selectedShape)}`);
    }
    await page.evaluate(() => document.activeElement?.blur());

    if (!group.canClick) continue;
    // Bấm chuột rồi để chuột đứng yên trên mục vừa chọn: nền rê không được chồng lên nền chọn, và
    // vòng focus không hiện vì đây là chuột (`I13`).
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
      if (clickRing) stuckStates.push(`${group.label}: bấm chuột mà hiện vòng ${describePaint(clickRing)} (vòng focus chỉ khi dùng bàn phím, I13)`);
    }
    await page.keyboard.press("Escape");
  }
  await page.mouse.move(1, 1);

  return { shapeMismatches, stuckStates, groupCount: groups.length };
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
  await page.addStyleTag({ content: freezeMotionCss });
  if (options.isDark) await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.waitForTimeout(options.waitMs);

  // Đo trước khi chụp: chụp fullPage ở khổ mobile làm trang mất `(pointer: coarse)`, nút
  // `pointer-coarse:size-10` co về 28px và bị báo nhầm là chỗ bấm nhỏ (đã dính 26/09/2026).
  const measurements = await page.evaluate(measureInPage, { minTapSize, isMobile });

  const screenshotPath = join(options.out, `${width}${options.isDark ? "-dark" : ""}.png`);
  await takeFullScreenshot(page, screenshotPath);

  const missingFocusRings = isMobile ? [] : await findMissingFocusRings(page);

  // Mở khối đang đóng trước khi rê và chạm: cây thư mục nằm trong accordion đóng ở /components thì
  // tooltip tên tệp tràn màn chỉ lộ khi khối đã mở (27/09/2026).
  const expandedCount = await expandCollapsedBlocks(page);
  const allMeasurements = expandedCount > 0 ? mergeMeasurements(measurements, await page.evaluate(measureInPage, { minTapSize, isMobile })) : measurements;

  // Màn chạm không có rê chuột: chỉ đo nền rê ở khổ desktop.
  const hoverStates = isMobile ? { layoutShifts: [], vanishedChildren: [], weakHovers: [], blendedHovers: [], borderHovers: [], overflowingLayers: [] } : await probeHoverStates(page);
  const popupLayers = await probePopupLayers(page, isMobile);
  const overflowingLayers = [...new Set([...hoverStates.overflowingLayers, ...popupLayers.overflowing])];
  // Chạy sau cùng: bấm thử đổi lựa chọn trên trang (ngày, tab), các phép đo khác phải xong trước.
  const stateShapes = isMobile ? { shapeMismatches: [], stuckStates: [], groupCount: 0 } : await probeStateShapes(page);
  // Sau cùng thật sự: mỗi lần bấm là một lần tải lại trang.
  const openerLayers = isMobile ? await probeOpenerLayers(page, options, width) : { problems: [], openedShots: [] };

  await context.close();

  return {
    width,
    screenshotPath,
    consoleErrors: [...new Set(consoleErrors)],
    ...allMeasurements,
    expandedCount,
    missingFocusRings,
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
    stuckStates: stateShapes.stuckStates,
    stateGroupCount: stateShapes.groupCount,
  };
}

// ---------- Lớp nổi mở bằng nút thường, ở màn hẹp ----------

// Hộp chọn, menu tự dựng thường không có aria-haspopup nên mục trên không mở tới (sót menu tràn mép và
// hộp chọn cao quá màn, 27/09/2026, dự án mồi phase 2). Chỉ bấm thứ TRÔNG NHƯ nút mở: có aria-expanded /
// aria-controls, nhãn kiểu "menu", "lọc", icon kiểu chuông, ba chấm, chevron. Nút chỉ có icon không nhãn
// và dòng `div` bấm được (onClick) cũng tính, vì app thật hay viết vậy (nút chỉ có icon, dòng chọn có dấu ">" ở
// vòng 2 dự án mồi). Bỏ mọi thứ có nhãn hay icon hành động để không lỡ tay xoá, lưu, gửi trên app thật. Link thì
// không bấm. Bấm xong mỗi thứ thì tải lại trang cho sạch.
const openerLabelSource = "menu|lọc|filter|thông báo|notification|chọn|select|sắp xếp|sort|tuỳ chọn|tùy chọn|option|more|tài khoản|account|ngôn ngữ|language";
const actionLabelSource = "xoá|xóa|delete|remove|huỷ|hủy|cancel|đăng xuất|logout|sign out|gửi|send|submit|thanh toán|pay|mua|buy|lưu|save|đặt|thích|like|theo dõi|follow";
// Tên icon lucide (class `lucide-<tên>`): nhóm mở lớp nổi, và nhóm hành động không được bấm.
const openerIconSource = "lucide-(bell|menu|ellipsis|more-|filter|list-filter|sliders|chevron-down|chevron-right|chevrons-up-down|circle-user|user-round|user\\b|settings|globe|languages|calendar)";
const actionIconSource = "lucide-(trash|heart|star|bookmark|send|save|check|plus|x\\b|log-out|share|copy|download|upload|thumbs)";
const maxOpenerButtons = 10;

function markOpenerButtons({ limit, openerSource, actionSource, openerIconPattern, actionIconPattern }) {
  const openerPattern = new RegExp(openerSource, "i");
  const actionPattern = new RegExp(actionSource, "i");
  const openerIcon = new RegExp(openerIconPattern);
  const actionIcon = new RegExp(actionIconPattern);
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
    if (actionPattern.test(label) || actionIcon.test(iconNames)) continue;

    const hasOpenerIcon = openerIcon.test(iconNames) || /[▾▼⌄›>]\s*$/.test(label);
    const looksLikeOpener = candidate.hasAttribute("aria-expanded") || candidate.hasAttribute("aria-controls") || hasOpenerIcon || openerPattern.test(label);
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
  };
  const openerLabels = await page.evaluate(markOpenerButtons, markArgs);
  const problems = [];
  const openedShots = [];

  for (const [index, triggerLabel] of openerLabels.entries()) {
    await reloadForProbe(page, options);
    await page.evaluate(markOpenerButtons, markArgs);
    await page.evaluate(markVisibleLayers);
    const isClicked = await page.locator(`[data-evon-opener-id="${index}"]`).click({ timeout: 800, force: true }).then(() => true, () => false);
    if (!isClicked) continue;
    await page.waitForTimeout(300);

    const opened = await page.evaluate(findOpenedLayerProblems, triggerLabel);
    if (opened.openedCount === 0) continue;
    const shotPath = join(options.out, `${width}${options.isDark ? "-dark" : ""}-mo-${index}.png`);
    await page.screenshot({ path: shotPath });
    openedShots.push(`"${triggerLabel}": ${shotPath}`);
    problems.push(...opened.problems);
  }

  if (openerLabels.length > 0) await reloadForProbe(page, options);

  return { problems, openedShots };
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
    for (const element of result.missingFocusRings) addItem(width, `tab tới không thấy focus: ${element}`);
    for (const line of result.lowContrastTexts) addItem(width, `tương phản thấp: ${line}`);
    for (const item of result.clippedBlocks) addItem(width, `khung giấu mất chữ: ${item.element}`);
    for (const item of result.tooShortTexts) addItem(width, `chữ cắt còn quá ngắn: ${item.element}`);
    for (const element of result.wrappedControls) addItem(width, `chữ trong nút xuống dòng: ${element}`);
    for (const element of result.wrappedRows) addItem(width, `hàng rớt dòng (xem ảnh để xếp hạng): ${element}`);
    for (const item of result.overlappedChartLabels) addItem(width, `nhãn số đè lên đường biểu đồ: ${item}`);
    for (const item of result.squeezedBlocks) addItem(width, `khối bị bóp chiều cao: ${item}`);
    for (const item of result.smallTapTargets.filter((target) => target.isBelowFloor)) addItem(width, `chỗ bấm dưới 24px: ${item.element}`);
  }

  for (const step of sweepSteps) {
    if (step.hasHorizontalScroll) addItem(step.width, `cuộn ngang, lòi ra: ${step.overflowingElements[0]?.element ?? "(không rõ phần tử)"}`);
    for (const item of step.clippedBlocks) addItem(step.width, `khung giấu mất chữ: ${item.element}`);
    for (const element of step.wrappedControls) addItem(step.width, `chữ trong nút xuống dòng: ${element}`);
    for (const element of step.wrappedRows) addItem(step.width, `hàng rớt dòng (xem ảnh để xếp hạng): ${element}`);
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
    if (result.partialFocusRings.length > 0) {
      problems.push(`VÒNG FOCUS KHÔNG BỌC HẾT LINK (${result.partialFocusRings.length} chỗ, icon hay chữ của cùng link nằm ngoài vòng):`);
      for (const element of result.partialFocusRings.slice(0, 5)) problems.push(`  ${element}`);
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
    if (result.shapeMismatches.length > 0) {
      problems.push(`RÊ / FOCUS KHÁC HÌNH MỤC ĐANG CHỌN (${result.shapeMismatches.length} chỗ, mọi trạng thái vẽ trên cùng một hình):`);
      for (const item of result.shapeMismatches.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.stuckStates.length > 0) {
      problems.push(`BẤM XONG CÒN DẤU THỪA (${result.stuckStates.length} chỗ, chuột đứng yên trên mục vừa chọn):`);
      for (const item of result.stuckStates.slice(0, 6)) problems.push(`  ${item}`);
    }
    if (result.missingFocusRings.length > 0) {
      problems.push(`TAB TỚI MÀ KHÔNG THẤY GÌ ĐỔI (${result.missingFocusRings.length} chỗ):`);
      for (const element of result.missingFocusRings.slice(0, 8)) problems.push(`  ${element}`);
    }
    if (result.brokenRules.length > 0) {
      problems.push(`ĐƯỜNG NGĂN HAI CỘT KỀ NHAU LỆCH (${result.brokenRules.length} cặp, nhìn thành một đường gãy):`);
      for (const item of result.brokenRules) problems.push(`  ${item}`);
    }
    if (result.styledNativeSelects.length > 0) {
      problems.push(`SELECT GỐC ĐÃ TÔ TRÊN DESKTOP (${result.styledNativeSelects.length} ô; chế độ soi bỏ qua, dựng lại thì thay):`);
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
      problems.push(`HÀNG TRONG HEADER / NAV / THANH TAB RỚT DÒNG (${result.wrappedRows.length} hàng):`);
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

  try {
    for (const width of options.widths) results.push(await probeWidth(browser, options, width));
    if (options.sweep) sweepSteps = await sweepWidths(browser, options);
  } catch (error) {
    console.error(`Không mở được ${options.url}: ${error.message.split("\n")[0]}. Dev server đã chạy chưa?`);
    process.exit(2);
  } finally {
    await browser.close();
  }

  writeFileSync(join(options.out, "report.json"), JSON.stringify({ widths: results, sweep: sweepSteps }, null, 2));
  console.log(formatReport(results));
  if (sweepSteps.length > 0) console.log(formatSweepReport(sweepSteps, options.sweep.step));
  console.log(formatMustReportList(listMustReportItems(results, sweepSteps), options.sweep?.step ?? 20));
  console.log(`\nChi tiết: ${join(options.out, "report.json")}`);
}

main();
