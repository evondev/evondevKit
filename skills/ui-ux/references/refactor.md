# Refactor codebase đã có — luật L

Mở file này khi việc là **sửa giao diện một dự án đang chạy**, không phải dựng
màn mới. Hai việc khác hẳn nhau về rủi ro và về thứ tự các bước.

Đúc rút từ đợt refactor focus.camp (09/2026): Next 16 + React 19, 237k dòng
TS/TSX, 14.218 dòng CSS, 4,5 tháng tuổi, có tiền thật chạy qua.

---

## Bốn mặc định trước khi gõ dòng đầu tiên

Không hỏi. Lấy mặc định dưới đây, **nói lại cả bốn ở đầu lúc giao**. Đề nói khác
thì theo đề.

1. **Mục tiêu mặc định là "chụp lại hiện trạng", không "đổi diện mạo".** Đề có chữ "làm lại giao diện", "cho đẹp hơn", "theo gu" thì mới là đổi diện mạo. Hai việc khác hẳn nhau về rủi ro.
2. **Mặc định giữ pixel.** Mọi bước refactor không được đổi giao diện; thấy chỗ trái luật skill thì ghi vào danh sách "đề xuất sửa" lúc giao, không tự sửa trong cùng đợt. Đây là ràng buộc quyết định cách chọn token.
3. **Người duyệt "trông vẫn đúng" mặc định là người giao việc.** Lúc giao đưa danh sách màn cần họ mở ra đối chiếu, kèm ảnh trước/sau nếu chụp được.
4. **Tài liệu hiện có: không xoá, chỉ đánh dấu chỗ sai.** Ở focus.camp, `design-system.md` mô tả Discord chứ không mô tả sản phẩm — nhưng vẫn có một mục là kiến thức thật, xoá trắng là mất.

---

## L1. Đo trước khi kết luận. Luôn luôn.

Cảm giác "code loạn quá" gần như luôn **đúng về triệu chứng** và gần như luôn
**sai về nguyên nhân**. Ở đợt focus.camp, mọi giả định ban đầu đều lệch sau khi đo:

| Tưởng là | Đo ra |
| --- | --- |
| "Không có design system" | Có 3 tầng: tài liệu 20KB + `tokens.css` 304 dòng + 93 biến màu |
| "`globals.css` là chỗ chứa CSS" | Kho thật là `prototype.css` — 8.668 dòng, gấp 2,4 lần |
| "Không ai dùng token" | 2.245 lần dùng `var(--…)`, tỉ lệ token/màu-thô 3.6:1 |
| "Tailwind chưa cài" | Cài rồi, `@import` rồi, chỉ thiếu `@theme` |
| "Code ẩu" | Comment ghi rõ ngày + nguyên nhân + vì sao cách sửa hiển nhiên là sai |

Bộ lệnh đo mở màn, chạy **trước khi mở file nào**:

```bash
# CSS nằm ở đâu, bao nhiêu
find app components src -name "*.css" 2>/dev/null | xargs wc -l | sort -rn | head

# mức tuân thủ token
grep -roE 'var\(--' --include='*.css' . | wc -l          # dùng đúng
grep -roE '#[0-9a-fA-F]{3,8}\b' --include='*.css' . | wc -l  # màu thô

# nợ ở tầng component — đổi *.tsx cho khớp dự án:
# .vue, .svelte, .html, .php, .erb... Ra 0 vì grep sai đuôi file
# thì kết luận "sạch" là sai.
grep -rl "<button" --include="*.tsx" . | wc -l
grep -rl "style={{\|style=\"" --include="*.tsx" --include="*.html" . | wc -l

# selector trùng = dấu hiệu bồi đắp
grep -hoE '^\s*\.[a-zA-Z][a-zA-Z0-9_-]*\s*\{' $(find . -name '*.css') \
  | tr -d ' {' | sort | uniq -d | wc -l
```

---

## L2. Phân biệt nợ kỷ luật với nợ kiến trúc

Nợ **kỷ luật** = người viết ẩu. Nợ **kiến trúc** = người viết **không có chỗ nào
khác để đặt code**.

Dấu hiệu nhận biết nợ kiến trúc: **comment trong code chất lượng cao nhưng cấu
trúc vẫn tệ**. Người viết biết mình đang làm gì, họ chỉ hết đường.

Gặp nợ kiến trúc thì chửi người viết là vô ích và sai. Phải **dựng chỗ chứa
trước** — tầng primitive, CSS Module, thư mục component — rồi mới dọn được.

---

## L3. Đừng tin tài liệu. Tin CSS đã build.

Ở focus.camp, ba nguồn cùng mô tả một thang chữ, cả ba khác nhau:

| Token | `docs/design-system.md` | `AGENTS.md` | file token (chạy thật) |
| --- | --- | ---: | ---: |
| `--text-sm` | *(mô tả Discord)* | 13px | **15px** |
| `--text-base` | *(mô tả Discord)* | 14px | **16px** |

Cách kiểm chân lý duy nhất — đọc CSS mà **trình duyệt thật nhận được**:

```bash
CSS=$(curl -s localhost:3000/ | grep -oE '/_next/static/[^"]+\.css' | head -1)
curl -s "localhost:3000$CSS" | grep -oE '\-\-text-sm: *[^;]*'
```

Bước này bắt được lỗi mà đọc code không bao giờ thấy. Xem `tailwind-v4-traps.md`.

Hệ quả cho cách làm việc: khi tài liệu và code đá nhau, **sửa tài liệu**, đừng
sửa code cho khớp tài liệu.

---

## L4. Ảnh "trước" không dựng lại được

Xoá CSS cũ xong là mất luôn khả năng render trạng thái cũ. Không có ảnh thì không
còn căn cứ nào để cãi *"trông vẫn ổn mà"*.

Chụp **trước khi gõ dòng đầu tiên**, ở đủ các khổ màn (ít nhất 375px và desktop).

⚠️ Chờ thêm **~1,2 giây sau `networkidle2`** — ảnh nền và webfont vào sau, chụp
sớm ra khung xám và bro sẽ so hai cái khung xám với nhau.

---

## L5. Quy trình cho từng trang, tám bước

```
1. Chụp trước     ảnh before, đủ khổ màn
2. Thay class     class cũ → utility trong .tsx
3. XOÁ CSS cũ     gỡ đúng rule vừa thành thừa khỏi file CSS cũ
4. Chụp sau       ảnh after, cùng khổ màn
5. Đối chiếu      đặt hai ảnh cạnh nhau, người duyệt xem
6. Kiểm sót       grep tiền tố class cũ trong toàn repo
7. Test + commit  commit RIÊNG từng trang
8. Ghi nhật ký    một mục vào đầu file nhật ký của ngày hôm nay
```

**Bước 3 là bước hay bị bỏ nhất.** Không xoá thì CSS chỉ phình thêm, mà giảm nó
mới là mục tiêu. Chỉ số theo dõi dễ nhất: **số dòng file CSS lớn nhất, mỗi tuần**.

**Bước 6 dễ quên.** Class cũ còn sót ở component khác thì xoá CSS sẽ làm vỡ một
trang mà bro không mở.

```bash
grep -rn "dc-" --include="*.tsx" app components   # tiền tố của trang vừa làm
```

---

## L6. Migrate tăng dần chỉ an toàn khi hai hệ BẰNG NHAU về giá trị

Sai lầm suýt mắc ở focus.camp: định đổi tên **3.419 chỗ** để tách hai không gian
tên biến.

Không cần. Chỉ cần khai **đúng giá trị dự án đang chạy** vào hệ mới. Khi đó trang
đã migrate và trang chưa migrate **giống hệt nhau**. Việc "lấy đúng thang chuẩn"
lùi về bước cuối, khi không còn CSS cũ nào đọc biến đó — lúc ấy là một lần đổi có
kiểm soát, không phải rủi ro rải suốt đường.

**Ưu tiên hoà giá trị hơn là tách tên.**

---

## L7. Đừng "sửa" một token đang là `transparent`

Ở focus.camp, `--border-subtle` và `--border-strong` đều là `transparent`, nghĩa
là hàng trăm rule CSS cũ dạng `border: 1px solid var(--border-subtle)` đang vẽ
ra… không gì cả.

Gán màu cho hai biến đó để "sửa" = **bật viền cho hàng trăm chỗ cùng một lúc**,
không ai duyệt nổi.

Cách đúng: trang nào refactor thì viết viền thẳng ở đó, xoá dần rule cũ. Khi
không còn ai đọc hai biến kia nữa thì xoá luôn chúng.

Cùng loại bẫy: một khối `NO-BORDER CLEANUP` **635 dòng** sinh ra vì set
`--border-subtle: transparent` làm hỏng mọi chỗ dùng token đó làm *nền*. Sửa tận
gốc thì phải tách token viền khỏi token nền — tới giờ vẫn chưa làm.

**Bài học chung: một token mang hai vai thì không sửa được vai nào.** Xem `M25`.

---

## L8. Đi từ ít liên đới nhất tới nhiều nhất

1. Khối đã tự gom theo feature (`.sp-*` sales page 667 dòng, pinned posts 173)
2. Trang có ít selector (Discovery, 57 selector `dc-*`)
3. Trang lớn (Challenge 297 `ch-*`, Marketplace 131 `mk-*`)
4. Thứ dùng chung khắp nơi — shell, sidebar, modal (làm cuối, hoặc không làm)

Đếm quy mô trước khi chọn:

```bash
grep -hoE '^\s*\.[a-z][a-z0-9-]*' $(find . -name '*.css') | tr -d ' .' \
  | sed 's/-.*//' | sort | uniq -c | sort -rn | head -15
```

---

## L9. CSS cũ trong `@layer base` thua utility — đừng vá bằng `!important`

Dính thật 14/09/2026: viết rule CSS theo class cha để điều khiển một component
đã sang utility. CSS cũ nằm trong `@layer base` nên **thua** utility, phải rải
`!important` khắp nơi để thắng lại.

Cách đúng: khai một **variant** trong hệ utility (ví dụ một variant
`rail-collapsed:`) rồi dùng nó ngay trên component. Để lại trong CSS cũ đúng
phần nào utility không làm được — thường chỉ là bề rộng của khung ngoài.

---

## L10. Ghi nhật ký, và ghi VÌ SAO

Mỗi lần thêm/sửa/xoá gì đều ghi một mục. Mục đích: **ba tháng nữa nhìn lại vẫn
biết vì sao đã làm thế**, không chỉ là đã làm gì — phần "vì sao" mới là thứ
`git log` không kể được đầy đủ.

Quy ước ghi: **Ngày · Việc** → *thay đổi gì* · *vì sao* · *cái gì suýt sai*.

Vận hành file nhật ký:

- Tách **theo ngày**, mục mới lên **đầu** file của ngày hôm nay. Một file chung sẽ chạm ngưỡng không đọc nổi chỉ sau hai ngày.
- Ngày nào dài quá ~620 dòng thì cắt thành `<ngày>-part-N.md`. **Part 1 là sớm nhất**, mục mới luôn vào part số cao nhất — đánh số theo chiều đó thì part cũ đứng yên vĩnh viễn; đánh ngược lại là part 1 phình mãi và mọi link tới nó lệch dần.
- Giữ một file mục lục riêng, chỉ chứa link.
- Bài học rút ra thì gom vào một file riêng — chính là file bro đang đọc.

---

## L11. Đọc code UI trước khi bịa dữ liệu

Thẻ cộng đồng hiện `_count.memberships`, không phải cột `memberCount`. Seed
`memberCount: 761` thì thẻ vẫn hiện **0**.

Trước khi seed, grep xem component **thật sự đọc field nào**. Đừng suy từ tên cột.

Và seed phải phủ **ca biên**, không phải dữ liệu đẹp: giá 9 chữ số, tên tràn 2
dòng, thiếu ảnh, thiếu mô tả, số 1 chữ số, danh sách rỗng. Dữ liệu đẹp làm CSS
trông ổn cho tới lúc gặp khách thật.

---

## L12. Lỗi môi trường đội lốt lỗi code

Test đang xanh mà đột nhiên đỏ sau khi đụng vào môi trường → **nghi môi trường
trước khi nghi code**. Kiểm bằng cách chạy đúng file test đó riêng.

Ba ca đã dính trong một tuần ở focus.camp, không cái nào là lỗi code: package
manager sai phiên bản; shell nạp nvm sai đường; và thiếu partial index vì
`db push` bỏ qua **im lặng** những thứ không diễn đạt nổi trong schema (partial
index `WHERE`, trigger, generated column) — dựng lại DB local xong phải grep
migration tìm `CREATE UNIQUE INDEX` / `CREATE TRIGGER` / `GENERATED` rồi chạy tay
phần thiếu.

---

## L13. Đo tác động thật, không chỉ đo số dòng

Chỗ này focus.camp **chưa làm được**, ghi ra để không quên: chưa có số Lighthouse
trước/sau, nên chưa chứng minh được refactor cải thiện gì ngoài số dòng CSS.

Số dòng CSS giảm là một chỉ số **dễ đo**, không phải chỉ số **quan trọng**. Nếu
chốt được một chỉ số thật ngay từ đầu (thời gian tải, CLS, số lần phải prompt
chỉnh lại) thì đợt refactor có cách để nói nó đã xong.
