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
    ├── VERSION           version cho người cài bằng npx skills, phải khớp plugin.json
    ├── scripts/
    │   ├── audit.sh      audit câu 2: DESIGN.md, stack, thứ sắp dựng đã có chưa, phong cách
    │   ├── measure-skill.mjs đo skill nặng bao nhiêu token, file nào lớn, một đề nạp bao nhiêu
    │   ├── probe.mjs     mở trang thật ở 6 bề rộng, đo lỗi đo được, chụp ảnh, quét bề rộng, --stress bơm dữ liệu khó
    │   ├── lint-skill.mjs soát câu chữ của skill, và VERSION khớp plugin.json, trước khi commit
    │   └── check-update.mjs báo bản mới cho người cài bằng npx skills (so VERSION với master)
    └── references/
        ├── principles.md           N — mười hai nguyên tắc đứng sau mọi luật, phép thử cho thứ chưa có mẫu
        ├── review.md               V — soi UI đang có, ba chế độ, bảng trước/sau
        ├── design-process.md       U — thiết kế từ đầu: brief, việc chính, dựng; U6 phân tích sản phẩm
        ├── wireframe.md            U3 — wireframe phương án, chỉ mở sau cổng 1
        ├── flows.md                O — luồng qua nhiều màn, onboarding, lối soi luồng
        ├── industry-patterns.md    quy ước màn theo ngành, đo thật, dùng ở U2 và U6
        ├── mock-photos.md          S16 — ảnh thật cho dữ liệu giả
        ├── locked-rules.md         luật chủ dự án đã chốt, lý lẽ đã bị bác
        ├── rules-color.md          M — màu, viền, bóng, dark mode, token
        ├── rules-type.md           T — chữ, font, xuống dòng, cắt chữ, copy, tiếng Anh
        ├── rules-form.md           F — khối, lưới, bo góc, khoảng thở, icon
        ├── rules-state.md          I — nút, hover, focus, danh sách, modal
        ├── responsive.md           R — màn hẹp, ngưỡng 375px
        ├── system.md               D — đề nhiều hơn một màn, dựng design system trước (D9), DESIGN.md (D10)
        ├── refactor.md             L — refactor codebase đã có
        ├── tailwind-v4-traps.md    W — bẫy Tailwind v4 khi có CSS cũ
        ├── styles.md               P — phong cách: flat, nổi, glass, gradient, tối; tương phản
        ├── budgets.md              ngân sách, nhịp, thang cỡ chữ
        ├── brand-tokens.md         bảng màu, font, cách đổi thương hiệu
        ├── tokens.css              bộ token copy thẳng được
        ├── checklist.md            3 cổng kiểm
        ├── components/             24 khối code thật
        └── layouts/                thư viện bố cục + code mẫu đã duyệt
            ├── app.md              mục lục màn trong app, tra mục theo tên
            └── app/                mỗi loại màn một file; shell.md là khung, shell-*.md các kiểu khung
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

Skill đã có người dùng (01/10/2026): **lần push nào cũng tăng `version`**, không gom đợt.

| Thay đổi | Tăng | Ví dụ |
| --- | --- | --- |
| Sửa luật, thêm component, sửa lỗi, thêm câu báo | patch: `0.2.1 → 0.2.2` | thêm drawer, sửa dropdown |
| Mốc lớn: nhánh mới, cả một mảng mới, đổi cấu trúc skill | minor: `0.2.x → 0.3.0` | dark mode, nhánh soi, design system trước |

1. Commit bình thường. Commit chưa push thì chưa tới tay người dùng.
2. Trước khi push, tăng `version` một nấc theo bảng, ở **cả** `plugin.json` lẫn
   `skills/ui-ux/VERSION` (lint báo nếu lệch), tính cho **cả các commit chưa push**:
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
thêm luật ở mục "Thêm luật mới" ngay dưới.

## Thêm luật mới

Skill này đã có lần **tệ đi vì thêm luật**. Luật viết để chữa một triệu chứng
thường đẻ ra triệu chứng khác ở lần dựng sau.

- Mỗi đợt tối đa **5 luật mới**.
- Mỗi luật mới phải nói rõ nó **thay thế** hay **mâu thuẫn** với luật nào đang có. Đảo một luật cũ thì để lại một khối ⚠️ ghi rõ "luật cũ đã bỏ, đừng hồi sinh" và vì sao.
- Luật phải kèm **điều kiện áp dụng**. "Trong app thì X, khi refactor thì Y" chứ không phải "luôn luôn X".
- Luật nào chưa từng bắt được lỗi thật sau 3 vòng test thì bỏ.
- **Một luật một chỗ.** Thêm luật vào đúng file của nhóm nó. `SKILL.md` chỉ được trỏ số hiệu.
- **Thêm luật xong thì rà lại file mẫu trong `layouts/` và `components/`** xem chúng có vi phạm luật vừa thêm không. Code mẫu được chép nguyên, nên một lỗi nằm trong đó sẽ đi khắp nơi. Đã xảy ra thật hai lần.
- **Skill ghi luật và lý do, không ghi lịch sử.** Không ngày tháng, không tên trang hay dự án test, không "lượt hai", không kể các bản đã thử. Bản sai mà AI dễ tự làm lại thì một câu "Đừng X: hậu quả". Ngày và chỗ dính ghi trong commit message. Quyết định của chủ dự án giữ đúng động từ gốc ("chốt", "bỏ", "chọn"…), không kèm ngày, không tự nâng thành "chốt". Ngày tháng duy nhất được ghi trong skill là cột "Chốt ngày" của `locked-rules.md`.
- **Đánh số liền mạch trong nhóm.** Đừng đẻ `15b`, `15c`, `17d` chen vào giữa.
- **Luật chưa qua vòng test nào thì gắn dấu ⚑**, để người dùng biết đang dùng thứ chưa ai thử.
- **Giữ skill nhẹ.** `SKILL.md` và các file "luôn mở" bị nạp ở mọi task. Luật chỉ cần cho một loại
  việc thì đặt vào file của loại việc đó, `SKILL.md` chỉ trỏ tới. Đo bằng
  `node skills/ui-ux/scripts/measure-skill.mjs` trước và sau khi thêm.

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
