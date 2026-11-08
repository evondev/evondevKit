#!/usr/bin/env bash
# Audit câu 2 của SKILL.md: dự án dùng gì, thứ sắp dựng đã có chưa, đang theo phong cách nào.
# Chạy ở gốc dự án đang làm (không phải repo skill). Truyền tên thứ sắp dựng để dò tầng 2:
#
#   bash <thư mục skill>/scripts/audit.sh avatar dropdown
#
# Chỉ đọc, không sửa gì. Kết quả ngắn để đọc thẳng, rồi báo dòng `Audit:`.

# Thư mục thư viện và bản build: CSS build ra có sẵn --blur-*, --shadow-* của Tailwind, đếm vào là sai phong cách.
skipPattern='node_modules|/dist/|/build/|/\.next/|/out/|/\.output/|/coverage/'

echo "== Tầng 0 — DESIGN.md"
head -60 DESIGN.md 2>/dev/null || echo "(không có)"

echo
echo "== Tầng 1 — stack"
ls package.json 2>/dev/null || echo "KHÔNG CÓ package.json — xem dòng cuối bảng câu 2"
grep -E '"(tailwindcss|@radix-ui|@mui|antd|@chakra|bootstrap)"' package.json 2>/dev/null
ls -d components/ui src/components/ui 2>/dev/null   # dấu hiệu shadcn
# app điện thoại: React Native / Expo, Flutter (J9 trong references/mobile/native-code.md)
grep -E '"(react-native|expo|nativewind|@react-navigation/[a-z-]+|@gorhom/bottom-sheet|react-native-safe-area-context)"' package.json 2>/dev/null
ls pubspec.yaml lib/main.dart 2>/dev/null && grep -E "^\s+(flutter|cupertino_icons|go_router|google_fonts):" pubspec.yaml
# thư viện chuyên dụng: biểu đồ, lịch/ngày, bảng, danh sách ảo
grep -E '"(recharts|chart\.js|react-chartjs-2|echarts[a-z-]*|@tremor/react|@nivo/[a-z]+|victory|react-apexcharts|react-day-picker|react-datepicker|@mantine/dates|@fullcalendar/[a-z]+|react-big-calendar|date-fns|dayjs|@tanstack/react-table|@tanstack/react-virtual|react-window|react-virtuoso|ag-grid-react)"' package.json 2>/dev/null
# không có `@import "tailwindcss"` = không preflight, W9
grep -rn "@import\|@theme\|--primary\|--brand\|font-family" \
  app/globals.css src/index.css tailwind.config.* 2>/dev/null | head
echo "-- Tailwind có preflight không (W9, tailwind-v4-traps.md): không có dòng @import \"tailwindcss\" hay preflight.css = không reset"
grep -rn '@import "tailwindcss' --include='*.css' . 2>/dev/null | grep -vE "$skipPattern" | head -3
echo "-- i18n, ngôn ngữ copy (T24)"
ls -d messages locales i18n src/i18n public/locales 2>/dev/null
grep -E '"(next-intl|react-i18next|i18next|vue-i18n|@lingui/[a-z]+)"' package.json 2>/dev/null

echo
echo "== Tầng 2 — thứ sắp dựng đã có chưa"
if [ "$#" -eq 0 ]; then
  echo "(chưa truyền tên, chạy lại kèm tên: audit.sh avatar dropdown)"
fi
for componentName in "$@"; do
  echo "-- $componentName"
  find . -iname "*$componentName*" 2>/dev/null | grep -vE "$skipPattern" | head
  grep -rliE "function $componentName|const $componentName|export.*$componentName" --include="*.tsx" --include="*.jsx" \
    --include="*.vue" --include="*.svelte" . 2>/dev/null | grep -vE "$skipPattern" | head
done

echo
echo "== Tầng 3 — phong cách (số FILE có tín hiệu, đọc theo P4 trong references/styles.md)"
# Cố ý bỏ qua file dialog, dropdown, toast…: M15 cho lớp nổi có bóng và blur.
count_files() {
  grep -rlE "$1" --include='*.tsx' --include='*.jsx' --include='*.vue' --include='*.svelte' \
    --include='*.html' --include='*.css' --include='*.scss' . 2>/dev/null \
    | grep -vE "$skipPattern" \
    | grep -viE 'dialog|modal|popover|dropdown|menu|select|toast|tooltip|sheet|drawer|command' \
    | wc -l | tr -d ' '
}
echo "glass:    $(count_files 'backdrop-blur|backdrop-filter')"
echo "gradient: $(count_files 'bg-gradient-|bg-linear-|bg-radial-|linear-gradient\(|radial-gradient\(')"
echo "nổi:      $(count_files 'shadow-(md|lg|xl|2xl)')"
# Màu: nền / viền / chữ có sắc dùng làm trang trí hay phân vai, không phải trạng thái
echo "màu:      $(count_files '(bg|border|ring)-(blue|sky|indigo|violet|purple|fuchsia|pink|cyan|teal)-(50|100|200)|bg-primary/(5|10|15|20)|bg-(accent|brand)')"
echo "-- thang màu biểu đồ có sẵn (shadcn sinh --chart-1..5)"
grep -rHoE -- '--(chart|categorical|category)-[a-z0-9-]*' --include='*.css' . 2>/dev/null | grep -vE "$skipPattern" | cut -d: -f2- | sort -u | head
echo "-- tối: chỉ cần MỘT file, là layout gốc"
grep -rlE '<(body|html)[^>]*(bg-black|bg-(zinc|neutral|slate|gray|stone)-9[0-9]{2})|color-scheme: *dark' \
  --include='*.tsx' --include='*.jsx' --include='*.html' --include='*.css' . 2>/dev/null | grep -vE "$skipPattern" | head -3
echo "-- token phong cách: có là có chủ đích, dù đếm file ra ít"
grep -rHoE -- '--(glass|gradient|shadow|blur)[a-z0-9-]*' --include='*.css' . 2>/dev/null | grep -vE "$skipPattern" | cut -d: -f2- | sort -u | head
echo "-- thanh cuộn đã có chưa (I18)"
grep -rl "::-webkit-scrollbar" --include='*.css' --include='*.scss' . 2>/dev/null | grep -vE "$skipPattern" | head -3
