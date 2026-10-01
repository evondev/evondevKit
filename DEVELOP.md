# Phát triển evondevKit

Ghi chú cho người sửa skill. Người dùng skill đọc `README.md`.

## Cấu trúc

```
.claude-plugin/
├── plugin.json           khai báo plugin "evon"
└── marketplace.json      marketplace "evondevkit", cài được cả local lẫn GitHub
skills/
├── ui-ux/                → gọi bằng /evon:ui-ux
│   ├── SKILL.md          bộ định tuyến: 4 câu hỏi vào việc, luật phạm vi, bảng mở doc
│   ├── scripts/
│   │   ├── probe.mjs     mở trang thật ở 6 bề rộng, đo lỗi đo được, chụp ảnh, quét bề rộng
│   │   └── lint-skill.mjs soát câu chữ của skill trước khi commit
│   └── references/
│       ├── principles.md           N — mười hai nguyên tắc đứng sau mọi luật, phép thử cho thứ chưa có mẫu
│       ├── review.md               V — soi UI đang có, ba chế độ, bảng trước/sau
│       ├── design-process.md       U — thiết kế từ đầu: brief, việc chính, wireframe, dựng
│       ├── locked-rules.md         luật chủ dự án đã chốt, lý lẽ đã bị bác
│       ├── rules-color.md          M — màu, viền, bóng, dark mode, token
│       ├── rules-type.md           T — chữ, font, xuống dòng, cắt chữ, copy, tiếng Anh
│       ├── rules-form.md           F — khối, lưới, bo góc, khoảng thở, icon
│       ├── rules-state.md          I — nút, hover, focus, danh sách, modal
│       ├── responsive.md           R — màn hẹp, ngưỡng 375px
│       ├── system.md               D — đề nhiều hơn một màn, dựng design system trước (D9)
│       ├── refactor.md             L — refactor codebase đã có
│       ├── tailwind-v4-traps.md    W — bẫy Tailwind v4 khi có CSS cũ
│       ├── styles.md               P — phong cách: flat, nổi, glass, gradient, tối; tương phản
│       ├── budgets.md              ngân sách, nhịp, thang cỡ chữ
│       ├── brand-tokens.md         bảng màu, font, cách đổi thương hiệu
│       ├── tokens.css              bộ token copy thẳng được
│       ├── checklist.md            3 cổng kiểm
│       ├── components/             24 khối code thật
│       └── layouts/                thư viện bố cục + code mẫu đã duyệt
└── landing/              → gọi bằng /evon:landing, dùng chung token, component, probe của ui-ux qua ../ui-ux/
    ├── SKILL.md          lối, ba câu hỏi (câu 3: mục tiêu của trang), bốn bước E1–E4
    └── references/
        ├── goals.md      G — mục tiêu → section nào bật, thứ tự, chữ nút chính, pricing
        ├── sections.md   K — chín loại section, mỗi loại 1–3 biến thể có code
        └── page-rules.md H — CTA, khung và nhịp, thang chữ, chữ hero, ảnh sản phẩm, dữ liệu giả
archive/                  nhánh landing cũ đã gỡ khỏi ui-ux, giữ lại để tham khảo
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

Skill đã có người dùng (01/10/2026): **lần push nào cũng tăng `version`**, không gom đợt.

| Thay đổi | Tăng | Ví dụ |
| --- | --- | --- |
| Sửa luật, thêm component, sửa lỗi, thêm câu báo | patch: `0.2.1 → 0.2.2` | thêm drawer, sửa dropdown |
| Mốc lớn: nhánh mới, cả một mảng mới, đổi cấu trúc skill | minor: `0.2.x → 0.3.0` | dark mode, nhánh soi, design system trước |

1. Commit bình thường. Commit chưa push thì chưa tới tay người dùng.
2. Trước khi push, tăng `version` một nấc theo bảng, tính cho **cả các commit chưa push**:
   trong đó có một mốc lớn thì tăng minor. Commit tăng version kèm luôn commit cuối, hoặc
   một commit riêng.
3. Push xong thì gắn tag và tạo GitHub Release, người bấm Watch → Releases sẽ được báo:

   ```bash
   git tag v0.3.1 && git push origin v0.3.1
   gh release create v0.3.1 --title "0.3.1" --notes "…"
   ```

   Ghi chú 2–4 dòng viết cho người dùng: họ thấy gì khác, không chép log commit. Máy chưa có
   `gh` thì `brew install gh` rồi `gh auth login`, hoặc tạo Release trên web từ tag vừa push.
4. Người dùng lấy bản mới bằng `/plugin marketplace update evondevkit` (hoặc tự lấy nếu đã bật
   auto-update), bên Cursor / Codex / OpenCode bằng `npx skills update`.

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
- `system.md` (`D`) chưa chạy đề nhiều màn. Lối dựng design system trước (`D9`) mới viết, chưa test.
- Chưa có thư viện ảnh đối chiếu (`BACKLOG.md`).
- Mọi vòng test mới chạy trên Claude. Codex, Antigravity chưa thử.
