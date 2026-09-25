# evondevKit

Bộ skill Claude Code của evondev. Hiện có một plugin: **`evon`**, chứa skill
**`ui-ux`** — gu UI/UX cho hệ thống dashboard.

```
.claude-plugin/
├── plugin.json           khai báo plugin "evon"
└── marketplace.json      marketplace "evondevkit", cài được cả local lẫn GitHub
skills/
└── ui-ux/                → gọi bằng /evon:ui-ux
    ├── SKILL.md          bộ định tuyến: 4 câu hỏi vào việc, luật phạm vi, bảng mở doc
    └── references/
        ├── rules-color.md          M — màu, viền, bóng, dark mode, token
        ├── rules-type.md           T — chữ, font, xuống dòng, cắt chữ, copy
        ├── rules-form.md           F — khối, lưới, bo góc, khoảng thở, icon
        ├── rules-state.md          I — nút, hover, focus, danh sách, modal
        ├── responsive.md           R — màn hẹp, ngưỡng 375px
        ├── system.md               D — đề nhiều hơn một màn
        ├── refactor.md             L — refactor codebase đã có
        ├── tailwind-v4-traps.md    W — bẫy Tailwind v4 khi có CSS cũ
        ├── styles.md               P — phong cách: flat, nổi, glass, gradient, tối; tương phản
        ├── budgets.md              ngân sách, nhịp, thang cỡ chữ
        ├── brand-tokens.md         bảng màu, font, cách đổi thương hiệu
        ├── tokens.css              bộ token copy thẳng được
        ├── checklist.md            3 cổng kiểm
        ├── components/             7 khối code thật
        └── layouts/                thư viện bố cục + code mẫu đã duyệt
archive/                  nhánh landing đã gỡ khỏi skill, giữ lại để tham khảo
```

---

## Cài

**Từ GitHub** (sau khi đã push):

```bash
/plugin marketplace add evondev/evondevKit
/plugin install evon@evondevkit
```

**Từ máy**, để test trước khi push:

```bash
/plugin marketplace add ~/dev/evondevKit
/plugin install evon@evondevkit
```

Cả hai cách đều gọi skill bằng `/evon:ui-ux`.

| Thứ | Tên |
| --- | --- |
| Repo | `evondev/evondevKit` |
| Marketplace | `evondevkit` |
| Plugin | `evon` |
| Skill | `ui-ux` → gọi `/evon:ui-ux` |

Thêm plugin thứ hai sau này thì tạo thư mục riêng cho nó rồi thêm một mục vào
`plugins` trong `.claude-plugin/marketplace.json`, và đổi `source` của `evon`
từ `"./"` sang đường dẫn thư mục của nó.

### Hoặc gọi thẳng, không cài

> đọc `~/dev/evondevKit/skills/ui-ux/SKILL.md` rồi dựng lại màn danh sách theo đúng đó

### Cài cho Codex, Antigravity

Skill theo định dạng Agent Skills (thư mục có `SKILL.md` + `references/`), nên
agent khác đọc được. Chỉ phần plugin (`.claude-plugin/`, `/plugin install`, lệnh
`/evon:ui-ux`) là riêng Claude Code. Tool khác thì chép (hoặc symlink) thư mục
`skills/ui-ux` vào chỗ tool đó tìm skill:

| Tool | Theo dự án | Dùng chung mọi dự án |
| --- | --- | --- |
| Codex | `.agents/skills/ui-ux/` hoặc `.codex/skills/ui-ux/` | `~/.codex/skills/ui-ux/` |
| Antigravity | `.agents/skills/ui-ux/` | xem [docs Antigravity](https://antigravity.google/docs/skills/) |

`.agents/skills/` trong dự án được **cả Codex lẫn Antigravity** đọc, một bản dùng
cho hai tool:

```bash
# trong thư mục dự án
mkdir -p .agents/skills
cp -R ~/dev/evondevKit/skills/ui-ux .agents/skills/
# hoặc symlink để sửa skill ở evondevKit là dự án thấy ngay:
# ln -s ~/dev/evondevKit/skills/ui-ux .agents/skills/ui-ux
```

Bên đó không có lệnh `/evon:ui-ux`: agent tự bật skill khi đề khớp `description`,
hoặc nhắc thẳng "dùng skill ui-ux". Codex đổi thư mục skill thì khởi động lại.

⚠️ Mọi vòng test trong `TESTS.md` mới chạy trên Claude. Skill dựa vào việc agent
tự mở đúng file trong bảng "Mở doc nào khi nào"; mô hình khác có thể bỏ bước
audit hoặc không mở file component. Chạy thử vài đề đã ✅ rồi so ảnh trước khi tin.

### Ra bản mới

Người đã cài chỉ nhận bản mới khi `version` trong `.claude-plugin/plugin.json`
tăng. Push mà không tăng thì họ vẫn chạy bản cũ trong cache.

| Thay đổi | Tăng | Ví dụ |
| --- | --- | --- |
| Sửa luật, thêm component, sửa lỗi | patch: `0.1.0 → 0.1.1` | thêm drawer, sửa dropdown |
| Mốc lớn: nhánh mới, đổi cấu trúc skill | minor: `0.1.x → 0.2.0` | làm trang |

1. Commit bình thường, không đụng `version`. Phần đang làm dở chưa tới tay người dùng.
2. Một loạt thay đổi đã ổn (chạy lại vài đề ✅ trong `TESTS.md` không vỡ) thì tăng
   `version` trong một commit riêng rồi push.
3. Người dùng lấy bản mới bằng `/plugin marketplace update evondevkit`.

Test ở máy đọc thẳng `~/dev/evondevKit` nên không bị cache, không cần tăng
`version` để thấy thay đổi của mình.

---

## Skill này làm gì

**Phạm vi: màn hình trong app.** Dashboard, danh sách, bảng, form, cài đặt,
modal. Nhánh landing đã gỡ (nằm trong `archive/`).

Hai lối vào, và câu hỏi **đầu tiên** của skill là hỏi bro đang ở lối nào:

| Lối vào | Nội dung |
| --- | --- |
| **Dựng mới** | Tìm codebase dùng gì → hỏi muốn UI trông thế nào (chưa biết thì đưa 3 hướng) → đưa 2–3 bố cục rồi **dừng chờ chọn** → dựng |
| **Refactor codebase đã có** | Đo trước khi kết luận → chụp ảnh before → đổi class → **xoá CSS cũ** → chụp after → đối chiếu → grep sót → ghi nhật ký |

Skill **bám theo codebase của dự án**, không áp bộ công cụ của mình lên:

- Mặc định là Tailwind. Không dùng Tailwind thì theo quy ước của họ.
- Có shadcn / Radix / MUI / Ant / bộ nội bộ thì **dùng component của họ**, chỉ chỉnh token cho khớp.
- Chưa có component nào thì gợi ý code từ `references/components/`.
- **Không có `package.json`** — HTML thuần, WordPress, PHP, Rails — thì dịch mẫu sang
  HTML + class rồi mới đưa. Luật `M` `T` `F` `I` `R` là quyết định thiết kế, không
  phụ thuộc framework; chỉ tầng code mẫu mới cần dịch.

Skill chi phối **token, nhịp, bố cục, và phạm vi**. Nó không quy định bro lấy
`<Button>` ở đâu.

### Phong cách: mặc định flat, làm được cái khác khi được chọn

Mặc định là **flat đường tóc**: nền xám nhạt, card trắng viền mảnh, không bóng.

- Người dùng tự nêu phong cách ("kiểu glassmorphism") → làm theo luôn.
- Audit thấy dự án đang dùng glass, gradient, nổi hay nền tối → **hỏi một câu**: flat, hay theo dự án.
- Không có gì → flat, không hỏi.

Luật được chia hai loại, ghi ở `P2`:

- **Gu flat** (11 luật như không gradient, không bóng, không glass): phong cách khác được đè. Mỗi luật loại này có dòng *"Gu flat"* ngay tại chỗ.
- **Nguyên tắc** (một nút chính, một màu nhấn, tương phản, 375px, toàn bộ luật chữ và tương tác): không phong cách nào đè được.

Tức là skill **theo phong cách của dự án, nhưng không theo lỗi của dự án**.

---

## Một luật một chỗ

`SKILL.md` cố ý giữ mỏng và **chỉ trỏ số hiệu luật**, không chép lại nội dung.
Mỗi luật sống ở đúng một file. Thấy hai chỗ cùng nói một luật thì một trong hai
chỗ là sai.

Mười nhóm, không nhóm nào trùng ký tự với nhóm nào:

`S` phạm vi · `M` màu · `T` chữ · `F` hình khối · `I` trạng thái · `R` màn hẹp ·
`D` nhiều màn · `L` refactor · `W` bẫy Tailwind · `P` phong cách

---

## Nguồn

Luật trong skill này đến từ hai nơi, và khi hai nơi đá nhau thì **dự án thật
thắng**, vì đó là bản đã sống 4,5 tháng trên sản phẩm thật:

- **21 vòng test** dựng file HTML rời (xem `TESTS.md`)
- **Đợt refactor một dự án thật 09/2026** — Next 16 + React 19, 237k dòng TS/TSX, 14.218 dòng CSS, có tiền thật chạy qua

Ba chỗ đã đảo luật so với bản cũ, mỗi chỗ có khối ⚠️ ghi rõ trong file tương ứng:

| | Luật cũ | Luật hiện tại |
| --- | --- | --- |
| Viền card | không viền, tách bằng chênh lệch nền | đường tóc 1px + bo góc (`M13`) |
| Nút mặc định | `primary` đặc, không icon | viền + icon lucide bên trái (`I1`) |
| Bóng | card `shadow-sm` | **chỉ** cho lớp nổi: modal, dropdown (`M15`) |

---

## Còn thiếu

- Nhánh **refactor** (`L`) mới viết, chưa chạy vòng test nào ở dạng skill.
- Ba hướng UI ở câu 3 của mục 0 chưa test — chưa biết AI có thật sự dừng lại chờ chọn không.
- `system.md` (`D`) viết từ chẩn đoán trong `BACKLOG.md`, chưa chạy đề nhiều màn.
- Chưa có thư viện ảnh đối chiếu, xem `BACKLOG.md`.
