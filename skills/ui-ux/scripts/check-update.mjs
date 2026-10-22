#!/usr/bin/env node
// Báo khi skill có bản mới, cho người cài bằng `npx skills add` (Cursor, Codex, OpenCode…): họ không
// có marketplace tự cập nhật như plugin Claude Code. Chỉ báo, không tự cài.
//
//   node <thư mục skill>/scripts/check-update.mjs
//
// Có bản mới thì in đúng một dòng "UPDATE <đang dùng> -> <mới nhất> | <lệnh cập nhật>", không thì
// không in gì. Luôn thoát mã 0: mất mạng, lỗi gì cũng im, không được chặn việc chính.
// - Chỉ đọc một file công khai trên GitHub (VERSION ở nhánh master), không gửi gì đi.
// - Hỏi mạng tối đa 24 giờ một lần; mỗi bản mới chỉ báo một lần cho mỗi chỗ cài.
// - Tắt hẳn: đặt biến môi trường EVONDEVKIT_NO_UPDATE_CHECK=1.
// So với master chứ không với GitHub Releases: release không ra theo mỗi lần push, còn VERSION thì có.

import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const latestVersionUrl = "https://raw.githubusercontent.com/evondev/evondevKit/master/skills/ui-ux/VERSION";
const checkIntervalMs = 24 * 60 * 60 * 1000;
const fetchTimeoutMs = 2000;

const skillDir = realpathSync(dirname(dirname(fileURLToPath(import.meta.url))));
const cacheDir = join(process.env.XDG_CACHE_HOME || join(homedir(), ".cache"), "evondevkit");
const cachePath = join(cacheDir, "update-check.json");

// "0.3.27" → [0, 3, 27]; chuỗi lạ thì null.
function parseVersion(text) {
  const match = String(text ?? "").trim().match(/^v?(\d+)\.(\d+)\.(\d+)$/);

  return match ? match.slice(1).map(Number) : null;
}

function isNewerVersion(candidate, current) {
  for (let i = 0; i < 3; i++) {
    if (candidate[i] !== current[i]) return candidate[i] > current[i];
  }

  return false;
}

function readCache() {
  try {
    return JSON.parse(readFileSync(cachePath, "utf8"));
  } catch {
    return { checkedAt: 0, latest: null, notified: {} };
  }
}

function writeCache(cache) {
  try {
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  } catch {
    // Không ghi được cache thì lần sau hỏi mạng lại, không sao.
  }
}

async function fetchLatestVersion() {
  try {
    const response = await fetch(latestVersionUrl, { signal: AbortSignal.timeout(fetchTimeoutMs) });

    return response.ok ? (await response.text()).trim() : null;
  } catch {
    return null;
  }
}

// `npx skills add` chép skill vào <gốc>/.<công cụ>/skills/ui-ux: gốc là thư mục home thì là bản cài -g.
function buildUpdateCommand() {
  const installRoot = dirname(dirname(dirname(skillDir)));
  const scopeFlag = installRoot === realpathSync(homedir()) ? "-g" : "-p";

  return `npx skills update ui-ux ${scopeFlag}`;
}

async function main() {
  if (process.env.EVONDEVKIT_NO_UPDATE_CHECK) return;

  // Cài bằng plugin Claude Code (hay chạy ngay trong repo): marketplace đã lo cập nhật.
  if (existsSync(join(skillDir, "..", "..", ".claude-plugin", "plugin.json"))) return;

  const installedVersion = parseVersion(readFileSync(join(skillDir, "VERSION"), "utf8"));

  if (!installedVersion) return;

  const cache = readCache();
  cache.notified ??= {};

  if (Date.now() - (cache.checkedAt ?? 0) > checkIntervalMs) {
    const latestText = await fetchLatestVersion();

    // Hỏi hỏng vẫn ghi giờ hỏi, để máy offline không hỏi lại mỗi lần gọi skill.
    cache.checkedAt = Date.now();
    if (parseVersion(latestText)) cache.latest = latestText;
  }

  const latestVersion = parseVersion(cache.latest);
  const shouldNotify =
    latestVersion && isNewerVersion(latestVersion, installedVersion) && cache.notified[skillDir] !== cache.latest;

  if (shouldNotify) {
    cache.notified[skillDir] = cache.latest;
    console.log(`UPDATE ${installedVersion.join(".")} -> ${cache.latest} | ${buildUpdateCommand()}`);
  }

  writeCache(cache);
}

main().catch(() => {});
