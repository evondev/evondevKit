#!/usr/bin/env node
// Đo skill nặng bao nhiêu: mỗi file bao nhiêu KB, ước bao nhiêu token, và một đề điển hình phải nạp
// bao nhiêu trước khi viết dòng code đầu tiên. Dùng để so trước và sau khi tách file.
// Token chỉ là ước lượng (số byte chia 3, tiếng Việt có dấu tốn token hơn tiếng Anh), đủ để so tương đối.
//
//   node skills/ui-ux/scripts/measure-skill.mjs          bảng file lớn nhất và các đề điển hình
//
// Chạy từ gốc repo evondevKit.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const skillDir = "skills/ui-ux";
const bytesPerToken = 3;

// Những file SKILL.md bắt mở ở mọi task (mục 2, bảng "Luôn mở"). "file#chữ" là chỉ đọc từ dòng có
// chữ đó tới hết file: dự án đã có token thì tokens.css chỉ lấy khối thanh cuộn.
const alwaysOpenFiles = [
  "SKILL.md",
  "references/principles.md",
  "references/budgets.md",
  "references/brand-tokens.md",
  "references/tokens.css#THANH CUỘN TỰ ẨN",
  "references/checklist.md",
  "references/locked-rules.md",
];

// Đề điển hình: những file một lượt làm phải đọc, cộng thêm vào bộ luôn mở.
const appDashboardFiles = [
  "references/styles.md",
  "references/layouts/app.md",
  "references/layouts/app/shell.md",
  "references/layouts/app/dashboard.md",
];
const typicalTasks = [
  { name: "Bộ luôn mở (mọi task)", files: [] },
  {
    name: "Lượt brief, cổng 1 (nhánh U)",
    files: ["SKILL.md", "references/design-process.md", "references/industry-patterns.md"],
    skipsAlwaysOpen: true,
  },
  {
    name: "Dựng dashboard có wireframe (nhánh U)",
    files: ["references/design-process.md", "references/wireframe.md", ...appDashboardFiles],
  },
  { name: "Dựng luôn dashboard", files: ["references/design-process.md", ...appDashboardFiles] },
  {
    name: "Dựng app điện thoại (nhánh U)",
    files: [
      "references/design-process.md",
      "references/wireframe.md",
      "references/mobile.md",
      "references/mobile/faces.md",
      "references/layouts/mobile-app.html",
    ],
  },
  { name: "Soi UI đang có (nhánh V)", files: ["references/review.md"] },
];

function listFiles(directory) {
  return readdirSync(directory).flatMap((entryName) => {
    const entryPath = join(directory, entryName);

    return statSync(entryPath).isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

function formatSize(byteCount) {
  const kilobytes = (byteCount / 1024).toFixed(0).padStart(5);
  const tokens = `~${Math.round(byteCount / bytesPerToken / 1000)}k token`.padStart(12);

  return `${kilobytes} KB ${tokens}`;
}

function countPartBytes(filePath) {
  const [relativePath, startMarker] = filePath.split("#");
  const fullPath = join(skillDir, relativePath);

  if (!startMarker) return statSync(fullPath).size;

  const content = readFileSync(fullPath, "utf8");
  const startIndex = content.indexOf(startMarker);

  return Buffer.byteLength(startIndex === -1 ? content : content.slice(startIndex));
}

function sumBytes(filePaths) {
  return filePaths.reduce((total, filePath) => total + countPartBytes(filePath), 0);
}

const allFiles = listFiles(skillDir)
  .filter((filePath) => /\.(md|css|html)$/.test(filePath))
  .map((filePath) => ({ path: relative(skillDir, filePath), bytes: statSync(filePath).size }))
  .sort((first, second) => second.bytes - first.bytes);

console.log("File lớn nhất:");
for (const file of allFiles.slice(0, 15)) console.log(`${formatSize(file.bytes)}  ${file.path}`);

console.log("\nMột đề phải nạp trước khi dựng:");
for (const task of typicalTasks) {
  const taskBytes = sumBytes(task.skipsAlwaysOpen ? task.files : [...alwaysOpenFiles, ...task.files]);

  console.log(`${formatSize(taskBytes)}  ${task.name}`);
}
