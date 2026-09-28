# Phát triển evondevKit

Ghi chú cho người sửa skill. Người dùng skill đọc `README.md`.

## Cấu trúc

```
.claude-plugin/
├── plugin.json           khai báo plugin "evon"
└── marketplace.json      marketplace "evondevkit", cài được cả local lẫn GitHub
skills/
└── ui-ux/                → gọi bằng /evon:ui-ux
    ├── SKILL.md          bộ định tuyến: 4 câu hỏi vào việc, luật phạm vi, bảng mở doc
    ├── scripts/
    │   ├── probe.mjs     mở trang thật ở 6 bề rộng, đo lỗi đo được, chụp ảnh, quét bề rộng
    │   └── lint-skill.mjs soát câu chữ của skill trước khi commit
    └── references/
        ├── principles.md           N — mười nguyên tắc đứng sau mọi luật, phép thử cho thứ chưa có mẫu
        ├── review.md               V — soi UI đang có, ba chế độ, bảng trước/sau
        ├── design-process.md       U — thiết kế từ đầu: brief, việc chính, wireframe, dựng
        ├── locked-rules.md         luật chủ dự án đã chốt, lý lẽ đã bị bác
        ├── rules-color.md          M — màu, viền, bóng, dark mode, token
        ├── rules-type.md           T — chữ, font, xuống dòng, cắt chữ, copy, tiếng Anh
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
        ├── components/             24 khối code thật
        └── layouts/                thư viện bố cục + code mẫu đã duyệt
archive/                  nhánh landing đã gỡ khỏi skill, giữ lại để tham khảo
```

Tài liệu làm việc: `TESTS.md` (đề test và kết quả), `REVIEW.md` (quy trình rà trang),
`BACKLOG.md` (phase 2, phase 3, việc để sau), `DARKMODE.md`.

## Test ở máy

```bash
/plugin marketplace add ~/dev/evondevKit
/plugin install evon@evondevkit
```

Hoặc gọi thẳng, không cài:

> đọc `~/dev/evondevKit/skills/ui-ux/SKILL.md` rồi dựng lại màn danh sách theo đúng đó

Test ở máy đọc thẳng `~/dev/evondevKit` nên không bị cache, không cần tăng `version`.

Trước khi commit chạy `node skills/ui-ux/scripts/lint-skill.mjs` từ gốc repo.

## Ra bản mới

Người đã cài chỉ nhận bản mới khi `version` trong `.claude-plugin/plugin.json` tăng. Push
mà không tăng thì họ vẫn chạy bản cũ trong cache.

| Thay đổi | Tăng | Ví dụ |
| --- | --- | --- |
| Sửa luật, thêm component, sửa lỗi | patch: `0.1.0 → 0.1.1` | thêm drawer, sửa dropdown |
| Mốc lớn: nhánh mới, đổi cấu trúc skill | minor: `0.1.x → 0.2.0` | nhánh soi, nhánh thiết kế từ đầu |

1. Commit bình thường, không đụng `version`. Phần đang làm dở chưa tới tay người dùng.
2. Một loạt thay đổi đã ổn (chạy lại vài đề ✅ trong `TESTS.md` không vỡ) thì tăng
   `version` trong một commit riêng rồi push.
3. Người dùng lấy bản mới bằng `/plugin marketplace update evondevkit`.

Thêm plugin thứ hai thì tạo thư mục riêng cho nó, thêm một mục vào `plugins` trong
`.claude-plugin/marketplace.json`, và đổi `source` của `evon` từ `"./"` sang thư mục của nó.

## Một luật một chỗ

`SKILL.md` cố ý giữ mỏng và **chỉ trỏ số hiệu luật**, không chép lại nội dung. Mỗi luật
sống ở đúng một file. Thấy hai chỗ cùng nói một luật thì một trong hai chỗ là sai. Quy tắc
thêm luật ở mục 4 của `SKILL.md`.

Mười ba nhóm, không nhóm nào trùng ký tự:

`S` phạm vi · `N` nguyên tắc · `M` màu · `T` chữ · `F` hình khối · `I` trạng thái ·
`R` màn hẹp · `D` nhiều màn · `V` soi UI · `U` thiết kế từ đầu · `L` refactor ·
`W` bẫy Tailwind · `P` phong cách

## Nguồn

Luật đến từ hai nơi, hai nơi đá nhau thì **dự án thật thắng**:

- Các vòng test dựng file HTML rời và dự án mồi (xem `TESTS.md`, `BACKLOG.md`)
- Đợt refactor một dự án thật 09/2026: Next 16 + React 19, 237k dòng TS/TSX, 14.218 dòng
  CSS, có tiền thật chạy qua

Ba chỗ đã đảo luật so với bản cũ, mỗi chỗ có khối ⚠️ trong file tương ứng:

| | Luật cũ | Luật hiện tại |
| --- | --- | --- |
| Viền card | không viền, tách bằng chênh lệch nền | đường tóc 1px + bo góc (`M13`) |
| Nút mặc định | `primary` đặc, không icon | viền + icon lucide bên trái (`I1`) |
| Bóng | card `shadow-sm` | **chỉ** cho lớp nổi: modal, dropdown (`M15`) |

## Còn thiếu

- Nhánh refactor (`L`) mới viết, chưa chạy vòng test nào ở dạng skill.
- Nhánh soi (`V`) mới test trên một dự án mồi. Còn hai dự án mồi nữa (`BACKLOG.md`, "Phase 2").
- Nhánh thiết kế từ đầu (`U`) mới chạy một vòng (`BACKLOG.md`, "Phase 3").
- `system.md` (`D`) chưa chạy đề nhiều màn.
- Chưa có thư viện ảnh đối chiếu (`BACKLOG.md`).
- Mọi vòng test mới chạy trên Claude. Codex, Antigravity chưa thử.
