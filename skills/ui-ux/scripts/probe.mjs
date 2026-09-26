#!/usr/bin/env node
// Mở trang thật ở nhiều bề rộng, đo những lỗi máy đo được, chụp ảnh để mắt soi phần còn lại.
// Dùng ở cổng 3 của checklist (references/checklist.md). Chỉ đọc trang, không sửa gì.
//
//   node probe.mjs <url> [--widths 375,768,1024,1280] [--out <thư mục>] [--dark] [--wait 800] [--dpr 1]
//
// Playwright tìm theo thứ tự: --pw <thư mục có node_modules/playwright>, thư mục đang đứng, thư mục script.
// Chưa có thì cài vào một thư mục tạm, đừng cài vào dự án:
//   npm i --prefix "$TMPDIR/evon-probe" playwright && node probe.mjs <url> --pw "$TMPDIR/evon-probe"

import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultWidths = [375, 768, 1024, 1280];
const mobileWidthLimit = 640;
// Sàn cỡ bấm của skill: nút h-8 trong bảng dày là nhỏ nhất được phép (list-row.md).
const minTapSize = 32;
const maxTabStops = 60;

function parseArgs(argv) {
  const options = { url: "", widths: defaultWidths, out: "", isDark: false, waitMs: 800, dpr: 1, playwrightDir: "" };
  const rest = [...argv];

  while (rest.length > 0) {
    const arg = rest.shift();

    if (arg === "--widths") options.widths = rest.shift().split(",").map(Number);
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

function measureInPage({ minTapSize, isMobile }) {
  const viewportWidth = document.documentElement.clientWidth;

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

    return { left: rect.left, right: rect.right, width: rect.width, text: text.trim().slice(0, 12) };
  }

  const allElements = [...document.body.querySelectorAll("*")].filter((element) => !["SCRIPT", "STYLE", "svg", "path"].includes(element.tagName));

  // 1. Cuộn ngang: trang rộng hơn màn, và phần tử nào lòi ra ngoài mép phải.
  const pageScrollWidth = document.documentElement.scrollWidth;
  const overflowingElements = allElements
    .filter((element) => isVisible(element) && element.getBoundingClientRect().right > viewportWidth + 1 && !isClippedHorizontally(element))
    .map((element) => ({ element: describe(element), right: Math.round(element.getBoundingClientRect().right) }))
    .slice(0, 8);

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

    for (const siblings of groups.values()) {
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
        cellsByColumn.get(columnKey).push({
          cell,
          leftOffset: textRect.left - cellRect.left,
          rightOffset: cellRect.right - textRect.right,
          centerDelta: textRect.left + textRect.width / 2 - (cellRect.left + cellRect.width / 2),
          text: textRect.text,
        });
      }
    }

    for (const cells of cellsByColumn.values()) {
      // Ô căn giữa cả ô (lịch chọn ngày) thì mép chữ lệch theo độ dài là đúng, bỏ qua.
      const startAlignedCells = cells.filter((item) => Math.abs(item.centerDelta) > 2);
      if (startAlignedCells.length < 3) continue;

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
    const interactiveElements = [...document.querySelectorAll('button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="tab"], [role="checkbox"], [role="switch"], [role="menuitem"]')];

    for (const element of interactiveElements) {
      if (!isVisible(element) || element.closest("[inert], [aria-hidden='true']")) continue;
      if (element.tagName === "A" && getComputedStyle(element).display === "inline") continue;

      const rect = element.getBoundingClientRect();
      if (rect.width >= minTapSize && rect.height >= minTapSize) continue;

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

    window.scrollTo(0, 0);
  }

  return {
    viewportWidth,
    pageScrollWidth,
    hasHorizontalScroll: pageScrollWidth > viewportWidth + 1,
    overflowingElements,
    truncatedCount: truncatedTexts.length,
    tooShortTexts: tooShortTexts.slice(0, 10),
    tooShortCount: tooShortTexts.length,
    unevenSiblingGroups: unevenSiblingGroups.slice(0, 10),
    misalignedColumns: misalignedColumns.slice(0, 10),
    smallTapTargets: smallTapTargets.slice(0, 15),
    smallTapCount: smallTapTargets.length,
  };
}

// Chụp dấu hiệu nhìn thấy của một phần tử và hai cấp cha, để so lúc có và không có focus.
function snapshotFocusStyles(element) {
  const chain = [element, element.parentElement, element.parentElement?.parentElement].filter(Boolean);

  return chain
    .map((node) => {
      const style = getComputedStyle(node);

      return [style.outlineStyle, style.outlineWidth, style.outlineColor, style.boxShadow, style.borderColor, style.backgroundColor, style.color, style.textDecorationLine].join("|");
    })
    .join("||");
}

async function findMissingFocusRings(page) {
  const missingFocusRings = [];
  let firstFocusedId = null;
  let previous = null;

  for (let tabIndex = 0; tabIndex < maxTabStops; tabIndex += 1) {
    await page.keyboard.press("Tab");

    const current = await page.evaluate((snapshotSource) => {
      const snapshot = new Function(`return (${snapshotSource})`)();
      const element = document.activeElement;
      if (!element || element === document.body) return null;
      if (!element.dataset.evonProbeId) element.dataset.evonProbeId = String(Math.random()).slice(2);
      const label = (element.getAttribute("aria-label") || element.textContent || element.getAttribute("placeholder") || "").trim().replace(/\s+/g, " ").slice(0, 40);

      return { id: element.dataset.evonProbeId, element: `${element.tagName.toLowerCase()} "${label}"`, focusedStyles: snapshot(element) };
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

      if (blurredStyles && blurredStyles === previous.focusedStyles) missingFocusRings.push(previous.element);
    }

    if (!current || current.id === firstFocusedId) break;
    if (!firstFocusedId) firstFocusedId = current.id;
    previous = current;
  }

  return missingFocusRings;
}

// ---------- Chạy ----------

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

  const screenshotPath = join(options.out, `${width}${options.isDark ? "-dark" : ""}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const measurements = await page.evaluate(measureInPage, { minTapSize, isMobile });
  const missingFocusRings = isMobile ? [] : await findMissingFocusRings(page);

  await context.close();

  return { width, screenshotPath, consoleErrors: [...new Set(consoleErrors)], ...measurements, missingFocusRings };
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
      for (const item of result.smallTapTargets.slice(0, 8)) problems.push(`  ${item.size}: ${item.element}`);
    }
    if (result.missingFocusRings.length > 0) {
      problems.push(`TAB TỚI MÀ KHÔNG THẤY GÌ ĐỔI (${result.missingFocusRings.length} chỗ):`);
      for (const element of result.missingFocusRings.slice(0, 8)) problems.push(`  ${element}`);
    }

    problemCount += problems.filter((line) => !line.startsWith("  ")).length;
    lines.push(`\n## ${result.width}px  (ảnh: ${result.screenshotPath})`);
    lines.push(problems.length > 0 ? problems.join("\n") : "Không đo ra lỗi.");
    if (result.truncatedCount > 0) lines.push(`(Có ${result.truncatedCount} chỗ chữ bị cắt có dấu …: xem ảnh xem có chỗ nào cắt mất ý không.)`);
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

  try {
    for (const width of options.widths) results.push(await probeWidth(browser, options, width));
  } catch (error) {
    console.error(`Không mở được ${options.url}: ${error.message.split("\n")[0]}. Dev server đã chạy chưa?`);
    process.exit(2);
  } finally {
    await browser.close();
  }

  writeFileSync(join(options.out, "report.json"), JSON.stringify(results, null, 2));
  console.log(formatReport(results));
  console.log(`\nChi tiết: ${join(options.out, "report.json")}`);
}

main();
