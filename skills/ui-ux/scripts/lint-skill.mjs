#!/usr/bin/env node
// Soát câu chữ của skill trước khi giao: bắt những câu nói màu, mức nặng của nút mà không trỏ về
// luật gốc, và những lý lẽ chủ dự án đã bác (references/locked-rules.md) quay lại trong spec.
// Máy chỉ bắt được chữ, không hiểu nghĩa: không báo gì chưa chắc là đúng, báo thì phải đọc lại.
//
//   node skills/ui-ux/scripts/lint-skill.mjs              chỉ các dòng mới thêm/sửa so với HEAD
//   node skills/ui-ux/scripts/lint-skill.mjs --all        toàn bộ file .md của skill (để rà lại)
//   node skills/ui-ux/scripts/lint-skill.mjs <file.md>…   toàn bộ các file chỉ định
//
// Chạy từ gốc repo evondevKit. Có lỗi thì thoát mã 1.

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const skillDir = "skills/ui-ux";

// Lý lẽ từng dẫn tới bản sai (locked-rules.md, dòng 1 và 3).
const rejectedArgumentPattern =
  /không mất (dữ liệu|gì)|lấy lại được|nối lại được|dùng (được )?tới hết kỳ|nhiều app (để|làm)|số đông (để|làm) (nó )?trung tính/i;
// Câu đang hạ một việc xuống trung tính.
const downgradePattern = /không đỏ|trung tính|không `?rose|icon xám|nút (xác nhận )?`?primary`? đen/i;
// Câu đang ghi lại chính lý lẽ đó để bác nó, không phải dùng nó.
const rebuttalPattern = /bác|đã dính|chưa đủ|không làm .{0,40}hết nguy hiểm|vẫn đỏ|đừng dùng lại|không lật/i;

// Câu quyết màu nguy hiểm cho một nút hay một hộp.
const dangerDecisionPattern =
  /không đỏ|nút nguy hiểm|isDestructive|nền `?rose-500\/1[05]|chữ `?rose-700|đỏ như hộp xoá|không `?rose/i;
// Câu chọn nút nền đặc.
// Chỉ câu gán vai nút chính ("là `primary`", "một nút `primary`", nút `primary` "Nhãn"), không câu mô tả
// ("đứng cạnh nút `primary`", "nút `primary` đổi sang `primary-hover`": báo nhầm 27/09/2026).
const primaryDecisionPattern = /(là|thành|sang|dùng) (nút )?`primary`(?!-)|(một|duy nhất) nút `primary`|nút `primary` (duy nhất|["“])|`primary` "/;
// "Không đỏ" của một thứ không phải hành động (tiêu đề lỗi, chấm chưa đọc, câu "đã dừng") dựa vào luật màu
// mang nghĩa (M4, M7, M30), không phải I4: gắn I4 vào đó là sai nghĩa.
const dangerRulePattern = /\bI4\b|\bM(4|7|30)\b|locked-rules/;
const primaryRulePattern = /\bI[23]\b|ngoại lệ có tên|locked-rules/;

function listSkillMarkdown(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);

    if (statSync(path).isDirectory()) return listSkillMarkdown(path);

    return path.endsWith(".md") ? [path] : [];
  });
}

// Số dòng (tính từ 1) đã thêm hoặc sửa trong mỗi file so với HEAD, kể cả file chưa track.
function collectChangedLines() {
  const changedLines = new Map();
  const diff = execFileSync("git", ["diff", "HEAD", "--unified=0", "--no-color", "--", skillDir], {
    encoding: "utf8",
  });
  let currentFile = "";

  for (const line of diff.split("\n")) {
    if (line.startsWith("+++ ")) {
      currentFile = line.slice(4).replace(/^b\//, "");
      continue;
    }

    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);

    if (hunk && currentFile.endsWith(".md")) {
      const start = Number(hunk[1]);
      const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
      const lines = changedLines.get(currentFile) ?? new Set();

      for (let offset = 0; offset < count; offset++) lines.add(start + offset);
      changedLines.set(currentFile, lines);
    }
  }

  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "--", skillDir], {
    encoding: "utf8",
  })
    .split("\n")
    .filter((path) => path.endsWith(".md"));

  for (const path of untracked) changedLines.set(path, "all");

  return changedLines;
}

// Chia file thành khối: một gạch đầu dòng (kể cả các dòng thụt nối theo), một dòng bảng, hoặc
// một đoạn văn. Luật và lý do thường nằm cùng khối, không cùng dòng. Mỗi khối mang thêm chữ của
// các khối cha (đoạn dẫn ngay trên danh sách, gạch đầu dòng thụt ít hơn): gạch con dưới dòng
// "Lý lẽ đã bị bác:" hay dưới một gạch đã ghi `I4` thì đọc cả phần cha.
function splitBlocks(text) {
  const blocks = [];
  let current = null;
  let parents = [];
  // Luật hay mục đang đứng trong (dòng "**I4. …**" hoặc tiêu đề #): bảng và đoạn nằm trong
  // chính luật I4 thì đã ở đúng chỗ, không cần ghi lại mã.
  let sectionText = "";
  let isInCodeFence = false;

  text.split("\n").forEach((line, index) => {
    const lineNumber = index + 1;

    if (/^\s*```/.test(line)) {
      isInCodeFence = !isInCodeFence;
      current = null;
      parents = [];
      return;
    }

    if (isInCodeFence) return;

    if (!line.trim()) {
      current = null;
      parents = [];
      return;
    }

    if (/^\*\*[A-Z]\d+[a-z]?\.|^#/.test(line)) sectionText = line;

    const isBullet = /^\s*([-*]|\d+\.)\s/.test(line);
    const isBlockStart = isBullet || /^\s*\||^#/.test(line);

    if (isBlockStart || !current) {
      // Đoạn văn đứng trước mọi gạch đầu dòng, nên thụt -1.
      const indent = isBullet ? line.match(/^\s*/)[0].length : -1;

      parents = parents.filter((parent) => parent.indent < indent);
      current = {
        startLine: lineNumber,
        endLine: lineNumber,
        text: line,
        indent,
        contextText: [sectionText, ...parents.map((parent) => parent.text)].join("\n"),
      };
      blocks.push(current);
      parents.push(current);
      return;
    }

    current.endLine = lineNumber;
    current.text += `\n${line}`;
  });

  return blocks;
}

function lintBlock(block) {
  const problems = [];
  const { text } = block;
  const fullText = `${block.contextText}\n${text}`;
  // "Không dùng khuôn … nút `primary` đen" là câu bác, không phải câu chọn primary.
  const textWithoutNegatedPrimary = text.replace(/không[^.;:]{0,60}`primary`/gi, "");

  if (rejectedArgumentPattern.test(text) && downgradePattern.test(text) && !rebuttalPattern.test(fullText)) {
    problems.push(
      'Dùng lý lẽ đã bị bác để hạ một việc xuống trung tính ("không mất dữ liệu", "lấy lại được", "tới hết kỳ"…). Xét lại ba câu của I4, xem locked-rules.md.',
    );
  }

  if (dangerDecisionPattern.test(text) && !dangerRulePattern.test(fullText)) {
    problems.push("Quyết màu nguy hiểm (đỏ hay không đỏ) mà không ghi mã I4 trong khối này hay khối cha.");
  }

  if (primaryDecisionPattern.test(textWithoutNegatedPrimary) && !primaryRulePattern.test(fullText)) {
    problems.push('Chọn nút `primary` mà không ghi I2/I3 (hay "ngoại lệ có tên") trong khối này hay khối cha.');
  }

  return problems;
}

function lintFile(path, changedLines) {
  const blocks = splitBlocks(readFileSync(path, "utf8"));
  const findings = [];

  for (const block of blocks) {
    if (changedLines !== "all") {
      let isTouched = false;

      for (let line = block.startLine; line <= block.endLine; line++) {
        if (changedLines.has(line)) isTouched = true;
      }

      if (!isTouched) continue;
    }

    for (const problem of lintBlock(block)) findings.push({ path, line: block.startLine, problem, text: block.text });
  }

  return findings;
}

const args = process.argv.slice(2);
const isAll = args.includes("--all");
const explicitFiles = args.filter((arg) => !arg.startsWith("--"));
let targets;

if (explicitFiles.length) targets = new Map(explicitFiles.map((path) => [path, "all"]));
else if (isAll) targets = new Map(listSkillMarkdown(skillDir).map((path) => [path, "all"]));
else targets = collectChangedLines();

// locked-rules.md là chỗ ghi các lý lẽ đã bác, chính nó không phải spec.
const findings = [...targets]
  .filter(([path]) => !path.endsWith("locked-rules.md"))
  .flatMap(([path, changedLines]) => lintFile(path, changedLines));

if (!findings.length) {
  console.log(`lint-skill: không bắt được câu nào (${targets.size} file). Máy chỉ đọc chữ, vẫn phải tự đọc lại.`);
  process.exit(0);
}

for (const finding of findings) {
  const excerpt = finding.text.replace(/\s+/g, " ").slice(0, 220);

  console.log(`${relative(process.cwd(), finding.path)}:${finding.line}\n  ${finding.problem}\n  > ${excerpt}\n`);
}

console.log(`lint-skill: ${findings.length} chỗ cần đọc lại.`);
process.exit(1);
