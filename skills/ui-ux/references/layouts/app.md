# Bố cục màn hình trong app

> **Chốt loại màn hình trước, mở file này sau.** Có sẵn code mẫu kanban thì rất
> dễ đọc mọi đề mơ hồ thành kanban. Xem luật `S10` và `S11` trong `../../SKILL.md`.


Không có wireframe thì dựng bố cục mặc định (hoặc cái mà điều kiện trong đề
chọn), báo một dòng lúc giao. Xem câu 4 trong `../../SKILL.md`. Nhịp ở đây là nhịp app:
`p-5`, `gap-3`, `text-sm`, viền mảnh, bóng gần như không.

---

## Dashboard

**A. Hàng số liệu trên, lưới widget dưới** (mặc định)

```
┌─────────────────────────────────────┐
│ header pill: lời chào      [Cài đặt]│
├───────┬───────┬───────┬─────────────┤
│ số 1  │ số 2  │ số 3  │ số 4        │  <- 1 khối chia kẻ, KHÔNG 4 card
├───────┴───────┴───┬─────────────────┤
│ widget chính      │ widget phụ      │  <- widget chính col-span-2
│ (col-span-2)      ├─────────────────┤
│                   │ widget phụ      │
└───────────────────┴─────────────────┘
```

Không chia đều ba cột. Widget quan trọng nhất chiếm gấp đôi.
Bốn ô số liệu dùng **một màu duy nhất**, khác nhau ở con số chứ không ở màu.

**Các khối thường có trên một màn tổng quan.** Đề để hở thì dựng **bộ mặc định**
dưới đây, không hỏi (`S5`). Bộ mặc định: **hàng ô số liệu + biểu đồ xu hướng
(widget chính) + danh sách tiến độ + việc cần làm hôm nay** — bốn khối. Có nhiều
người cùng làm thì thêm hoạt động gần đây. Lúc giao liệt kê các khối đã dựng.

| Khối | Khi nào đáng có |
| --- | --- |
| Hàng ô số liệu | Gần như luôn. Bốn ô là vừa, sáu ô là bắt đầu loãng. Mobile 2×2, xem `../components/charts.md` |
| Biểu đồ xu hướng theo thời gian | Khi có dữ liệu tích luỹ theo tuần hoặc tháng |
| Danh sách tiến độ theo nhóm | Khi công việc chia được thành dự án hoặc nhóm |
| Việc cần làm hôm nay | Khi người dùng vào đây để bắt tay làm, không phải để xem báo cáo |
| Hoạt động gần đây | Khi có nhiều người cùng làm và cần biết ai vừa đụng gì |
| Bảng chi tiết | Khi màn này thay luôn cả trang danh sách. Có bảng rồi thì bỏ bớt widget |

Ba khối là mỏng cho một màn tổng quan. Bốn tới năm là vừa. Đề đòi quá sáu khối
thì vẫn dựng, lúc giao gợi ý một câu khối nào nên tách sang màn riêng.

Xem `../components/charts.md` cho công thức biểu đồ và luật màu.

**Chi tiết từng khối** (rà `/dashboard` 26/09/2026):

- **Widget chính đếm theo kỳ thì là biểu đồ cột, không phải đường.** "Việc xong mỗi tuần", "đơn mỗi ngày" là số đếm rời của từng kỳ; cột có số trên đầu đọc được cả 8 tuần một lượt, đường chỉ ghi số ở điểm cuối, muốn biết tuần 24/08 bao nhiêu phải rê chuột từng điểm (đã dính 26/09/2026). Chọn loại theo bảng "Cột hay đường" ở `../components/charts.md`.
- **Danh sách tiến độ: thanh luôn `bg-primary`, chỉ cụm "2 việc quá hạn" tô hổ phách.** Quá hạn là một chuyện khác với phần trăm xong; tô cả thanh 93% màu hổ phách đọc ra "tiến độ đang có vấn đề", và hai trên bốn thanh cam thành thứ nặng nhất màn. Tô cả dòng phụ "112 / 120 việc · 2 việc quá hạn" cũng sai: khối việc hôm nay ngay bên cạnh chỉ tô cụm "Quá hạn 2 ngày", hai khối một màn hai cách (`N5`, đã dính 26/09/2026). Chi tiết ở "Thanh tiến độ trong danh sách", `../components/charts.md`.
- **Hoạt động gần đây là luồng tin của cả workspace, không phải dòng thời gian của một bản ghi.** Đừng bê `../components/timeline.md` (vòng icon theo loại việc, đường nối, nhãn loại việc đậm, người làm dòng cuối cỡ nhỏ): câu hỏi ở đây là "**ai** vừa đụng **gì**", mà khuôn timeline đưa loại việc lên chữ đậm, tên việc xám, người làm xuống dòng mờ nhất. Mỗi mục bốn dòng, sáu mục cao 820px (đã dính 26/09/2026). Khuôn, như các app quản lý dự án phổ biến:

  ```
  (TK)  Tuấn Khang hoàn thành Cập nhật ảnh đội ngũ trên trang giới thiệu
        Website Evondev Studio · 09:37
  ```

  - Avatar người làm `size-8` bên trái (`avatar.md`), không vòng icon loại việc, không đường nối (các mục không phải các bước của một thứ).
  - Một câu `text-sm text-muted line-clamp-2`: **tên người** `font-medium text-foreground`, động từ xám, **tên đối tượng** `text-foreground` và là link sang đối tượng đó (`N8`; cả khối không link nào là trang cụt, như "Bản ghi khác nhắc tới trên trang là link" ở dưới).
  - Dòng phụ `text-xs text-muted`: dự án · giờ. Hôm nay ghi giờ, hôm qua ghi "Hôm qua", cũ hơn ghi ngày. Dự án dài `truncate`, giờ `shrink-0`.
  - **5 mục**, header có "Xem tất cả" như các khối danh sách khác trên màn (`card.md`). Đã thử trên trang: trang cao 1512px còn ~1150px, hai cột kết thúc gần ngang nhau.
- **Hai cột lưới phải kết thúc gần ngang nhau.** Khối việc hôm nay `self-start` (đúng, không kéo card trắng rỗng), nhưng cột phải dài gấp đôi thì dưới cột trái là một mảng xám 450px. Chữa bằng cách **cắt số hàng của khối dài** (luồng hoạt động 5 mục, việc hôm nay tối đa 8 rồi "Xem tất cả"), không kéo khối ngắn, không đổi thứ tự khối.
- **Workspace mới (chưa có dự án nào): một khối chào thay cả lưới, có nút chính.** Đừng dựng đủ năm khối rồi cho mỗi khối một câu "Chưa có…": năm khung cùng nói một ý (`N3`), khung biểu đồ cao 340px chỉ chứa một dòng chữ, và cả màn **không có lối đi tiếp** nào (`N6`, đã dính 26/09/2026). Khối chào: tiêu đề `text-base font-semibold` ("Bắt đầu với dự án đầu tiên"), một câu vì sao, nút `primary` "+ Tạo dự án", có thể thêm một nút viền "Mời thành viên". Nằm trong một card trắng như mọi khối khác, không nền trong suốt. Từ lúc có một dự án thì lưới trở lại, khối nào chưa có số thì theo ca rỗng của khối đó (biểu đồ một điểm, việc hôm nay trống).
- **Khối không có dữ liệu thì bỏ "Xem tất cả"**, nút dẫn sang một danh sách rỗng là thừa. "Hôm nay không có việc nào đến hạn" chỉ đúng khi có việc mà không việc nào đến hạn hôm nay; chưa có việc nào thì câu là "Chưa có việc nào được giao cho bạn".
- **Câu rỗng của các khối cùng hàng cùng căn một kiểu.** Khung biểu đồ căn câu giữa theo chiều dọc, khung tiến độ bên cạnh để câu sát đầu: cùng hàng hai vị trí (`N5`). Cả hai căn giữa khung.

**B. Cột trái điều hướng, nội dung phải** (khi có từ 5 mục điều hướng trở lên)

Xem mục **Khung app có sidebar** bên dưới cho công thức đầy đủ.

---

## Khung app có sidebar

```
 nền trắng --surface     nền xám --background
┌──────────────┐░┌──────────────────────────────────────┐
│ ◐ Tổ chức    │░│ Trang / Mục hiện tại  [chuông][avatar] │
├──────────────┤░├──────────────────────────────────────┤  <- một đường kẻ ngang, chạy liền qua cả hai cột
│ [tìm     ⌘K] │░│                                      │
│              │░│                                      │
│ ⌂ Trang chủ  │░│                                      │
│ ✉ Hộp thư  20│░│  <- số đếm căn phải, số trơn          │
│ ☑ Việc       │░│                                      │
│              │░│  <- giữa các nhóm chỉ khoảng trắng    │
│ CÔNG VIỆC  ⌄ │░│  <- nhãn nhóm IN HOA, bấm để thu gọn  │
│ ▤ Dự án    4 │░│                                      │
│ ▦ Tài liệu   │░│                                      │
│              │░│                                      │
│ KINH DOANH › │░│  <- nhóm đang thu gọn                 │
│              │░│                                      │
│ ⚙ Cài đặt    │░│                                      │
│ ◐ Tên người ⇕│░│  <- ghim đáy (bỏ nếu avatar ở header) │
└──────────────┘░└──────────────────────────────────────┘
                ↑ KHÔNG có đường kẻ dọc: trắng cạnh xám đã là ranh giới
```

- **Sidebar nền trắng `--surface`, KHÔNG `border-r`** khi vùng nội dung là nền trang xám `--background`: trắng cạnh xám đã là ranh giới, thêm đường kẻ là hai tín hiệu cho một ý (`N3`; bỏ 23/09/2026, chủ dự án). Chỉ kẻ `border-r border-border-strong` khi vùng nội dung cũng trắng. **Đừng để sidebar trong suốt** ăn theo `--background` của trang: sidebar xám trùng nền trang thì cả màn thành một mảng xám, không còn ranh giới nào (đã dính 21/09/2026).
- **Rộng `w-60` tới `w-64`**, cố định, `shrink-0`.
- **Hover và đang chọn CÙNG một nền mờ** `--background` (bậc xám nhạt nhất). Mục đang chọn phân biệt bằng chữ `font-medium` và việc nền **đứng yên**, không bằng nền đậm hơn. Đừng dùng `--secondary` cho mục đang chọn: trên sidebar trắng nó đậm quá, thành một mảng xám nặng (đã dính 21/09/2026). **Không tô màu nhấn**, không viền.
- **Mỗi link cao 40px** (`h-10`, `px-3`), bo `rounded-xl` 12px theo luật bo-theo-chiều-cao `F1`. Link 36px trông chật, nền hover lọt thỏm; 40px thì hàng thoáng và bấm trúng dễ hơn.
- **Icon và chữ đi cùng nhau.** Lúc thường cả hai `text-foreground/70`: dịu hơn chữ chính nhưng **không mờ tới `--muted`**, xám `--muted` trên nền trắng là đọc không ra tên mục. Hover hay đang chọn thì **cả icon lẫn chữ** lên `text-foreground`. Đặt màu trên phần tử `<a>`, icon dùng `currentColor`, đừng gán màu riêng cho icon, nếu không hover chỉ sáng mỗi chữ.
- **Nhãn nhóm IN HOA, chữ XÁM**: `text-xs font-medium uppercase tracking-wide text-muted`, hover mới lên `text-foreground`. IN HOA đã đủ tách nhãn khỏi link, nên nhãn phải **nhạt hơn** mục con, không đậm hơn: nhãn đen `--foreground` cộng IN HOA thì nặng nhất cột, lấn cả mục đang chọn (đã dính 21/09/2026). Viết thường thì nhãn nhóm trông y như một mục nav nhạt màu, mắt không tách được đâu là tiêu đề, đâu là link (đã dính 21/09/2026). Chữ trong dữ liệu vẫn viết thường ("Công việc"), IN HOA bằng CSS, để screen reader không đánh vần từng chữ.
- **Giữa các nhóm KHÔNG kẻ đường chia**, tách bằng khoảng trắng `mt-4` và nhãn nhóm. Nhãn IN HOA xám + chevron đã đủ báo "nhóm mới bắt đầu" kể cả khi sidebar cuộn; thêm đường kẻ là ba tín hiệu cho một ý (`N3`). Các app quản lý lớn đều không kẻ. Bản cũ kẻ `border-t` trên mỗi nhóm, tới khi token viền đậm lên `#e4e4e7` thì ba đường kẻ chạy ngang cột thành thứ nặng nhất sidebar (bỏ 23/09/2026, chủ dự án: "đường line hơi đậm").
- **Sidebar chỉ còn một đường kẻ `--border-strong`**: dưới đầu sidebar (tên workspace). Trên nền trắng, `--border` (`#f7f7f8`) gần như tàng hình, đường chia mất tác dụng (đã dính 21/09/2026). Cả sidebar một màu viền, không chỗ rõ chỗ mờ.
- **Đường kẻ chạy HẾT bề ngang sidebar, mép chạm mép.** Không để padding của vùng nav cắt cụt hai đầu đường. Cách làm: vùng nav chỉ có padding dọc (`py-3`), padding ngang đặt trên **từng nhóm** (`px-3`), đường kẻ nằm trên phần tử nhóm nên tự dài hết. Đừng vá bằng `-mx-3`: đổi padding một chỗ là đường lệch. **Vùng nav cuộn được thì thanh cuộn không được giữ chỗ** (`scrollbar-gutter: auto`, thanh cuộn tự ẩn theo `I18`): giữ gutter 4px là mọi đường kẻ nhóm cụt cách mép phải 4px, trong khi đường dưới tên workspace và đường trên Cài đặt (nằm ngoài vùng cuộn) vẫn chạy hết (đã dính 23/09/2026, lộ ra khi viền đậm lên `#e4e4e7`).
- **Sidebar nhiều link thì nhóm thu gọn được.** Từ **3 nhóm có nhãn trở lên**, hoặc tổng số mục đủ để sidebar phải cuộn: nhãn nhóm thành một **nút rộng hết hàng** (`I29`), chevron ở mép phải (`ChevronDown` `size-4`, xoay `-rotate-90` khi đóng), có `aria-expanded`. Hover nhãn là nền `--background` như mục nav.
  - **Nút nhãn cùng khuôn với mục con**: cùng `h-10 px-3`, cùng `rounded-xl`. Đặt chiều cao bằng `h-10` chứ không bằng `py`, vì chữ `text-xs` của nhãn thấp hơn chữ `text-sm` của link, dùng `py` là nút nhãn lùn hơn hàng con. Mép trái chữ nhãn thẳng mép icon con, chevron thẳng mép phải badge.
  - **Mục con không thụt vào, không đường dọc.** Nhóm ở đây là *phân khu*, các mục con ngang hàng nhau và đã có icon riêng. Thụt vào cộng đường dọc là ngôn ngữ của **cây lồng nhau**, và nó ăn mất 16-20px của cột vốn đã hẹp, chữ dài bị cắt sớm hơn.
  - Chỉ thụt + đường dọc khi đó là **menu con của một link** (Dự án ▸ Dự án A, Dự án B): mục con **không icon**, thụt để chữ thẳng mép chữ của link cha, đường dọc `border-l border-border-strong` chạy ở tâm icon cha. Mục con đang chọn thì đoạn đường dọc của nó đậm lên `--foreground`.
  - **Mở/đóng có animation trượt**, không chớp giật: `grid` với `grid-rows-[1fr]` ↔ `grid-rows-[0fr]`, con bọc `overflow-hidden min-h-0`, `transition-[grid-template-rows] duration-200 ease-out`. Chevron xoay cùng `duration-200`. Không đo chiều cao bằng JS. Thêm `motion-reduce:transition-none`. Nhóm đang đóng gắn `inert` để Tab không lọt vào link đã ẩn.
  - Nhóm đầu không nhãn (Tổng quan, Hộp thư) thì luôn mở, không thu gọn.
  - Mặc định **mở hết**. Nhóm chứa trang đang xem thì **không được đóng lúc tải trang**, nếu không người ta không thấy mình đang ở đâu.
- **Thanh cuộn của sidebar tự ẩn** theo `I18`: đứng yên không thấy, rê vào hoặc đang cuộn mới hiện, 4px. Thanh cuộn xám đứng yên chạy dọc sidebar trắng là thứ nặng nhất trên cột, nặng hơn cả chữ (đã dính 21/09/2026).
- **Số đếm căn phải, là số trơn** `text-xs tabular-nums text-muted`, không pill, không viền. Năm pill viền cạnh nhau trên một cột là năm khung nhỏ kéo mắt (bỏ pill ngày 23/09/2026). Mục đang chọn thì số lên `text-foreground` cùng chữ. **Không badge màu brand**, xem `../components/small-controls.md`.

```tsx
<Link
  href={item.href}
  className={cn(
    "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 text-sm text-foreground/70 transition-colors",
    "hover:bg-background hover:text-foreground",
    isActive && "bg-background font-medium text-foreground",
  )}
>
  <Inbox className="size-4 shrink-0" />
  {item.label}
  {item.unread > 0 && (
    <span className="ml-auto rounded-full border border-border-strong bg-surface px-2 py-0.5 text-xs font-medium tabular-nums text-muted">
      {item.unread > 99 ? "99+" : item.unread}
    </span>
  )}
</Link>
```

Nhóm thu gọn được: nút nhãn cùng khuôn mục con, trượt bằng `grid-rows`.

```tsx
// Vùng nav: `flex flex-col gap-3 py-3`, KHÔNG px, để đường kẻ dài hết bề ngang.
<div className="border-t border-border-strong px-3 pt-3 first:border-t-0 first:pt-0">
  <button
    type="button"
    aria-expanded={isOpen}
    aria-controls={groupId}
    onClick={() => setIsOpen(!isOpen)}
    className="flex h-10 w-full cursor-pointer items-center rounded-xl px-3 text-xs font-medium uppercase tracking-wide text-muted transition-colors hover:bg-background hover:text-foreground"
  >
    {group.label}
    <ChevronDown
      className={cn(
        "ml-auto size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
        !isOpen && "-rotate-90",
      )}
    />
  </button>

  <div
    id={groupId}
    inert={!isOpen}
    className={cn(
      "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
      isOpen && "grid-rows-[1fr]",
      !isOpen && "grid-rows-[0fr]",
    )}
  >
    <div className="flex min-h-0 flex-col gap-1 overflow-hidden">
      {group.items.map((item) => <SidebarNavLink key={item.href} item={item} />)}
    </div>
  </div>
</div>
```

`h-10` = đúng chiều cao link con, nên nhãn và link cùng khuôn. Nút nhãn dùng
`<button>` thuần ở đây cho gọn ví dụ; dự án có `Button` dùng chung thì dùng nó.

- **Khối tài khoản ghim đáy, nằm TRONG một khung**, xem mục **Chân sidebar** bên dưới.
- **Ô tìm ở đầu sidebar** có gợi ý phím tắt `/` hoặc `⌘K` ở mép phải.
- **Tên mục bị cắt thì rê vào hiện đủ tên**, cả lúc sidebar đang mở: "Báo cáo tài chính theo q…" phải có tooltip "Báo cáo tài chính theo quý". Dùng lại tooltip của chế độ thu gọn, chỉ bật khi chữ **thật sự bị cắt** (đo theo `T14`: bề rộng chữ bằng `Range`, không bằng `scrollWidth`), mục ngắn không bật. Bản dựng 25/09/2026 chỉ bật tooltip lúc thu gọn, lúc mở thì tên dài cụt hẳn, không có cách nào đọc được.
- **Dưới `lg`, sidebar là panel trượt từ TRÁI, cùng khuôn với panel trượt ở `overlay.md`, chỉ đổi phía**: lớp phủ `bg-black/15` (không `/30`, đó là của modal), vào **500ms** / ra **350ms** `cubic-bezier(0.32,0.72,0,1)`, lớp phủ cùng nhịp; chỉ `translate`, không `scale`, không `opacity` trên panel. Đầu sidebar có nút ✕ ở mép phải, Escape và bấm lớp phủ cũng đóng; bấm một link thì đóng. Mọi khối trượt từ mép trong app dùng **một** lớp phủ và **một** đường cong (`N5`). Bản dựng 25/09/2026 tự chọn `bg-black/30` + 200ms `ease-out` vì spec chỉ ghi "trượt từ trái".

### Thu gọn sidebar (từ `lg` trở lên)

```
Mở                                 Thu gọn
┌──────────────────┐               ┌──────┐
│ ◐ Evondev Studio │               │  ◐   │
├──────────────────┤               ├──────┤
│ ⌂ Tổng quan      │               │  ⌂   │
│ ✉ Hộp thư    99+ │               │  ✉•  │  <- chấm chỉ cho số "cần xử lý"
│ ▦ Lịch           │               │  ▦   │
│                  │               │      │
│ CÔNG VIỆC      ⌄ │               │  ─   │  <- nhãn mờ đi TẠI CHỖ, thay bằng gạch ngắn
│ ▣ Dự án        4 │               │  ▣   │  <- nhóm đang mở: icon vẫn hiện, đứng yên
│ ☰ Việc của tôi 12│               │  ☰   │
│                  │               │      │
│ KINH DOANH     › │               │  ─   │  <- nhóm đang đóng: vẫn đóng, chỉ còn gạch
│                  │               │      │
│ ⚙ Cài đặt        │               │  ⚙   │
│ ◐ Tên người    ⇕ │               │  ◐   │  <- chỉ avatar, vẫn mở menu
└──────────────────┘               └──────┘
```

Mặc định là **thu về dải icon**, không ẩn hẳn. Ẩn hẳn (bề rộng về 0) chỉ làm khi
người dùng yêu cầu.

- **Mục nào đang hiện lúc mở thì lúc thu vẫn hiện, thành icon.** Nhóm đang mở giữ nguyên icon các mục con; nhóm đang đóng thì vẫn đóng. Như chế độ `collapsible="icon"` của sidebar shadcn. Bản cũ chỉ giữ nhóm đầu (3 icon) còn mọi nhóm có nhãn đều ẩn: mở thấy 13 mục, thu còn 3, người dùng tưởng mất mục, và trang đang xem nằm trong nhóm bị ẩn thì dải icon không có mục nào đang chọn (bỏ 23/09/2026, chủ dự án).
  - **Chỉ nhãn nhóm và chevron mờ đi tại chỗ** (`opacity-0` + `inert`), hàng nhãn vẫn giữ chiều cao. Khoảng trống nhãn để lại chính là chỗ tách nhóm trong dải icon, và mọi icon **đứng yên đúng vị trí** lúc thu và lúc mở (luật icon đứng yên bên dưới). Gỡ hàng nhãn ra thì icon bên dưới nhảy lên.
  - **Hàng nhãn lúc thu có một gạch ngắn** thay cho chữ: `w-4 h-px bg-border-strong`, nằm giữa hàng theo chiều dọc, **thẳng tâm icon** (hàng nhãn `px-3` nên gạch tự rơi vào 24–40px, tâm 32px, không `justify-center`). Như số đếm, gạch và chữ là **hai bản chuyển bằng opacity**: chữ + chevron `opacity-0`, gạch `opacity-100`, cả hai luôn trong DOM; gạch `aria-hidden`. Chỉ khoảng trống thì một nhóm đang đóng thành một lỗ trống giữa dải icon: đóng Kinh doanh rồi thu gọn, giữa Tài liệu và Thành viên trống 156px, gần gấp ba khoảng thường, không ai biết ở đó có một nhóm (đã dính 25/09/2026, chủ dự án duyệt gạch ngắn). Có gạch thì mỗi khoảng trống đọc ra là ranh giới nhóm, hai gạch liền nhau là có nhóm đang đóng ở giữa.
  - **Vùng nav cuộn được cả lúc thu** (dải icon có thể dài hơn màn). Lúc thu thì **ẩn hẳn thanh cuộn** (`[scrollbar-width:none]`), vẫn cuộn bằng chuột, phím, cảm ứng: thanh cuộn 4px giữ chỗ làm ô icon 40px còn 36px và lệch khỏi tâm (đã dính 23/09/2026).
  - **Đổi trang thì cuộn mục đang chọn vào tầm nhìn** (`scrollIntoView({ block: "nearest" })`): màn thấp, mục ở gần đáy bị mép dưới cắt mất nửa, không biết mình đang ở đâu (đã dính 23/09/2026).
  - **Mép vùng nav mờ dần khi còn mục bị khuất** (cả lúc mở lẫn lúc thu, vì thanh cuộn tự ẩn hoặc ẩn hẳn): `mask-image` gradient **32px** ở mép trên khi đã cuộn khỏi đầu, ở mép dưới khi còn mục phía dưới, không cuộn được thì không mờ. Tính hai cờ từ `scrollTop`, `scrollHeight`, `clientHeight` lúc cuộn và khi đổi kích thước (`ResizeObserver`), đưa vào biến CSS để mask đổi ngay: `[mask-image:linear-gradient(to_bottom,transparent,#000_var(--fade-top),#000_calc(100%-var(--fade-bottom)),transparent)]`, `--fade-top`/`--fade-bottom` là `0px` hoặc `32px`. **Dài 32px, gần bằng một hàng `h-10`**, không 16px: tự cuộn xong thường còn một hàng bị cắt ló ở mép, 16px thì phần ló vẫn đậm 70–80%, thành mấy vệt vụn (đáy icon, dấu chấm của "ị") dính ngay dưới hàng Tìm kiếm như rác (đã dính 25/09/2026). Mục đang chọn tự cuộn vào thì dừng **ngoài** dải mờ: `scroll-my-8` trên link, khớp độ dài mờ. Mask chứ không đè một lớp gradient trắng: đè lớp màu thì hover và nền mục đang chọn ở mép bị phủ trắng lệch màu. Không mờ thì màn thấp 600px sau khi tự cuộn tới Thành viên: Lịch dính ngay dưới icon Tìm, Tổng quan và Hộp thư khuất phía trên, Phòng ban khuất phía dưới, không có dấu gì báo còn mục (đã dính 25/09/2026).
  - **Chấm ở góc icon chỉ cho số "cần xử lý"** (chưa đọc, chờ duyệt, quá hạn). Số đếm tổng như "Dự án 4", "Thành viên 18" lúc thu thì bỏ, không chấm: mười chấm trên một cột là mười tín hiệu vô nghĩa. Số vẫn nằm trong tooltip.
- **Chân sidebar giữ lại**: Cài đặt thành icon, hàng profile thành **chỉ avatar**, bấm vẫn mở menu tài khoản như cũ.
  - **Lúc thu, rê vào avatar không tô nền ô vuông**, mà hiện vòng quanh chính avatar: `ring-2 ring-foreground/10` (menu đang mở thì giữ vòng). Avatar là hình tròn có nền màu riêng; tô thêm một ô xám bo góc quanh nó là tròn trong vuông, hai nền nhạt lồng nhau, trông như một cục mờ (đã dính 23/09/2026). Cùng lý do với ngoại lệ ảnh ở `I15`. Lúc mở thì hàng có chữ, tô nền cả hàng như link là đúng.
- **Mỗi icon có tooltip** là tên mục, hiện bên phải. Link giữ `aria-label` bằng tên mục vì chữ đã ẩn.
- **Dải rộng `w-16` (64px)**. Link vẫn là link cũ, `h-10 w-full px-3 rounded-xl`, chỉ bị bề rộng sidebar bóp lại còn 40px, thành ô vuông. Hover và đang chọn như link thường.
- **Icon đứng YÊN một chỗ ở cả hai trạng thái. Không bao giờ `justify-center`.** Thu gọn mà căn giữa, mở ra lại căn trái, thì lúc bấm mở icon và logo nhảy từ giữa sang trái rồi chữ mới bật ra, cả sidebar như "bung từ giữa", khựng (đã dính 21/09/2026). Cách làm: mọi thứ **căn trái**, và padding tính sao cho tâm icon rơi đúng **32px** (giữa dải 64px) ngay khi căn trái:

  | Phần tử | Tính | Tâm |
  | --- | --- | --- |
  | Icon link `size-4` | nav `px-3` 12 + link `px-3` 12 + nửa icon 8 | 32 |
  | Logo `size-8` ở đầu sidebar | header `px-4` 16 + nửa logo 16 | 32 |
  | Avatar `size-8` trong hàng profile | chân `px-3` 12 + hàng `px-1` 4 + nửa avatar 16 | 32 |

  Hàng profile **cao `h-10` như link**, không `h-12`: thu gọn về dải 40px thì `h-12` thành ô 40×48 đứng dọc, lệch khỏi mọi ô icon vuông 40×40 bên trên. Lúc mở và lúc thu dùng **cùng** các padding này, không đổi padding theo trạng thái.
- **Lúc thu, số đếm "cần xử lý" thành một chấm** (số đếm tổng thì bỏ, xem trên) `size-1.5 rounded-full bg-foreground/50` ở góc trên phải icon — **xám, không màu nhấn**: chấm lúc thu là bản thu nhỏ của số "99+" lúc mở, số đó xám `text-muted` thì chấm cũng xám, hai trạng thái cùng độ đậm (`N5`); sidebar không có badge màu brand (`I15`). Muốn chưa đọc nổi hơn thì đổi **cả hai trạng thái cùng lúc**, không riêng chấm (`absolute left-6 top-2`, neo theo icon). Số trơn cỡ nhỏ đè góc icon thì không đọc được; số thật nằm trong tooltip ("Hộp thư · 99+") và trong `aria-label` của link.
- **Đường kẻ dưới đầu sidebar vẫn chạy hết bề ngang dải.**
- **Chuyển động: chỉ bề rộng chạy, bố cục bên trong không đổi.** `<aside>` `overflow-hidden`, `transition-[width] duration-200 ease-out motion-reduce:transition-none`, `w-64` ↔ `w-16`.
  - **Chữ luôn nằm trong DOM**, `whitespace-nowrap`, bị mép sidebar **cắt dần** khi thu và **lộ dần** khi mở, như kéo rèm. Không `hidden`, không render có điều kiện: gỡ chữ ra rồi gắn lại là nó bật "phựt" một cái, và bố cục tính lại làm icon xê dịch.
  - Chữ, tên workspace, badge cạnh chữ, nhãn nhóm thêm `transition-opacity duration-150`, thu thì `opacity-0`. Mờ đi cùng lúc bị cắt thì không thấy nửa chữ lơ lửng ở mép.
  - **Số đếm có HAI bản, chuyển bằng opacity**: số trơn cạnh chữ (`ml-auto`) mờ đi, chấm đè góc icon (`absolute`) hiện lên. Đừng di chuyển một badge từ chỗ này sang chỗ kia, nó sẽ bay chéo qua sidebar. **Cả hai bản `aria-hidden`**, số đọc cho trình đọc màn hình nằm trong một `<span className="sr-only">, 20 chưa đọc</span>` duy nhất: `opacity-0` không gỡ chữ khỏi cây truy cập, để nguyên thì nó đọc "Hộp thư 99+ 99+"; lúc thu, `aria-label` của link cũng phải kèm số.
  - **Nhãn nhóm mờ đi tại chỗ** (`opacity-0` + `inert` trên nút nhãn), không gỡ ra. Gỡ ra thì chiều cao nav đổi, icon và thanh cuộn nhảy.
- Có nhớ trạng thái thu/mở hay không, có phím tắt hay không là việc của người dùng. Nếu đề có phím tắt thì ghi nó trong tooltip của nút toggle.
- **Nút toggle ở đầu header vùng nội dung**, icon `PanelLeftClose` khi đang mở, `PanelLeftOpen` khi đang thu. Nút ghost `size-10 rounded-xl`, có `aria-label` và `aria-expanded`. Focus theo `I13`: `outline-hidden` + vòng mờ `focus-visible`. Viền xám dày hiện ra **ngay sau khi bấm chuột** là outline mặc định của trình duyệt lọt ra (dùng `focus` thay vì `focus-visible`), không phải thiết kế (đã dính 21/09/2026).

```tsx
// MỘT link cho cả hai trạng thái. Không justify-center, không đổi padding:
// icon đứng yên, chỉ chữ bị mép sidebar cắt dần.
<Link
  to={item.href}
  aria-label={isCollapsed ? getSidebarLinkLabel(item) : undefined} // "Hộp thư, 20 chưa đọc"
  className="relative flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm whitespace-nowrap text-foreground/70 hover:bg-background hover:text-foreground"
>
  <item.icon className="size-4 shrink-0" aria-hidden />
  <span className={cn("min-w-0 flex-1 truncate transition-opacity duration-150", isCollapsed && "opacity-0")}>
    {item.label}
  </span>

  {hasCount && (
    <>
      {/* Lúc mở: số trơn. */}
      <span aria-hidden className={cn("shrink-0 text-xs tabular-nums text-muted transition-opacity duration-150", isCollapsed && "opacity-0")}>
        {formatSidebarCount(item.count)}
      </span>
      {/* Lúc thu: một chấm ở góc icon, CHỈ cho số cần xử lý (chưa đọc, chờ duyệt). Số trong tooltip và aria-label. */}
      {item.isActionable && (
        <span aria-hidden className={cn("absolute left-6 top-2 size-1.5 rounded-full bg-foreground/50 transition-opacity duration-150", !isCollapsed && "opacity-0")} />
      )}
    </>
  )}
</Link>
```

### Chân sidebar

```
│ ⚙ Cài đặt                │  <- mục nav thường, cùng style các mục trên
│ ╭──────────────────────╮ │
│ │ ◐  Trần Nguyễn A…  ⇕ │ │  <- một hàng không viền, cả hàng là nút, bấm ra menu
│ ╰──────────────────────╯ │
```

- **Profile là một hàng bấm được, không khung viền**: `h-10 w-full rounded-xl px-1 hover:bg-background`, như `NavUser` của sidebar shadcn. Avatar `size-8` (theo `avatar.md` nhưng **bỏ viền của avatar**), tên `text-sm font-medium truncate`, icon **`ChevronsUpDown`** `size-4 text-muted` ở mép phải. Bản cũ (21/09) bọc khung viền `--border-strong` quanh avatar vốn đã có viền: hai đường viền lồng nhau, avatar dính sát mép khung vì `p-[3px]`, tên bị cắt sớm. Token viền đậm lên thì khung thành cục nặng nhất đáy sidebar (bỏ 23/09/2026, chủ dự án: "footer profile bị xấu").
- **Dấu hiệu bấm được là icon `ChevronsUpDown` + nền khi rê**, không phải khung. Lỗi 21/09/2026 (avatar và tên trôi tự do, không ai biết bấm được) là do **không có icon nào**; có icon mở menu thì hết.
- **Tâm avatar thẳng tâm icon các link** khi sidebar thu gọn: hàng `px-1` + avatar `size-8` ra tâm 20px, đúng bằng link `px-3` + icon `size-4`.
- **Cả hàng là một `<button>`**, là trigger của dropdown/popover (`I29`). Đừng làm riêng nút nhỏ ở góc: bấm vào tên mà không có gì xảy ra là người ta tưởng app bị đơ.
- **Trong hàng chỉ có avatar + tên**, `truncate`. Email đưa lên **đầu menu**, một dòng, **cắt phần trước `@`, giữ nguyên tên miền** theo "Cắt email" ở `overlay.md`. Email là thứ để biết mình đang ở tài khoản nào (`N8`); cắt ở cuối "tran.nguyen.anh.tuan.khang@evond…" là mất đúng phần tên miền cần đọc (đã dính 23/09/2026). Bản sửa đầu tiên cho xuống dòng (`[overflow-wrap:anywhere]`): trình duyệt bẻ giữa tên miền "…@ev / ondev…", và dòng thứ hai trông như một mục riêng (bỏ 24/09/2026).
- **Tài khoản chỉ có một lối vào**: app có avatar trên header thì không có hàng profile ở đây, và ngược lại (`overlay.md`, "Menu tài khoản").
- **Menu mở lên trên** (`side="top"`, `align="start"`), **rộng đúng bằng hàng profile** (`w-(--radix-dropdown-menu-trigger-width)`), không lòi qua mép sidebar sang vùng nội dung, portal ra `body` (`I22`). Mục trong menu **cao 40px, bo 12px**, khung `rounded-2xl p-1`, xem `overlay.md`. Trong menu: email ở đầu (`text-xs text-muted`), rồi Hồ sơ, Giao diện, Cài đặt; **Đăng xuất ở cuối**, cách bằng đường chia, lúc thường trung tính, **rê vào thì đỏ** `rose` (`I4`).
- **Cài đặt ở trên khung là mục nav thường**, cùng style với các mục ở đầu sidebar (`foreground/70`, hover mờ). Đừng cho nó xám `--muted` hay tách riêng bằng đường kẻ.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex h-10 w-full cursor-pointer items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-xl px-1 text-left hover:bg-background"
    >
      <Avatar name={user.name} src={user.avatarUrl} className="size-8" />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {user.name}
      </span>
      <ChevronsUpDown className="size-4 shrink-0 text-muted" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent side="top" align="start" className="w-(--radix-dropdown-menu-trigger-width) rounded-2xl p-1">
    {/* Mỗi DropdownMenuItem: h-10 rounded-xl px-3, như link sidebar. */}
    {/* Email một dòng, cắt phần trước @, giữ tên miền: khuôn "Cắt email" ở overlay.md. */}
    <DropdownMenuLabel className="px-3 py-2 font-normal"><AccountEmail email={user.email} /></DropdownMenuLabel>
    <DropdownMenuSeparator />
    {/* Hồ sơ, Giao diện, Cài đặt… */}
    <DropdownMenuSeparator />
    {/* Đăng xuất */}
  </DropdownMenuContent>
</DropdownMenu>
```

Vùng nội dung có **thanh tiêu đề riêng** ở trên: đường dẫn ở trái, nhóm nút ở
phải. Thanh đó tách bằng đường kẻ ngang `--border-strong`, **cùng độ cao `h-16` và cùng màu với đường dưới đầu sidebar** để thành một đường liền chạy ngang cả màn, không tách bằng nền. Đường ngang này **không kéo theo đường kẻ dọc** cho sidebar: kẻ dọc chỉ có khi vùng nội dung cũng trắng (xem đầu mục). Bản cũ ghi "cùng màu với kẻ dọc của sidebar" sót lại sau khi kẻ dọc đã bỏ, và bản dựng đọc câu đó rồi thêm lại `border-r` (đã dính 25/09/2026).

```
┌──────┐░┌─────────────────────────────┐
│ w-60 │░│ header h-16                 │
├──────┤░├─────────────────────────────┤  <- hai đoạn cùng một đường
│ nav  │░│ nội dung                    │
└──────┘░└─────────────────────────────┘
        ↑ không kẻ dọc khi nội dung nền xám
```

### Đầu trang trong vùng nội dung

```
Khách hàng  ›  Khách hàng doanh nghiệp          <- chỉ các cấp CHA, là link
Công ty TNHH Minh Phát              [⤓ Xuất file] [+ Tạo đơn hàng]
Khách hàng từ 3/2024, 18 đơn hàng, doanh thu 1.284.500.000 đ
```

```tsx
<header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
  {/* flex-1: khối chữ lấy hết chỗ còn lại, không co theo dòng dài nhất */}
  <div className="min-w-0 flex-1">
    <nav aria-label="Đường dẫn">{/* text-sm text-muted, link hover:text-foreground, ChevronRight size-4 */}</nav>
    <h1 className="mt-1 text-xl font-semibold text-balance">{title}</h1>
    <p className="mt-1 max-w-[55ch] text-sm text-pretty text-muted">{description}</p>
  </div>
  <div className="flex shrink-0 gap-2">{actions}</div>
</header>
```

- **Đường dẫn chỉ ghi các cấp cha, không ghi trang đang đứng.** Tên trang nằm ngay dưới, ghi lại là lặp ("Cài đặt › Thành viên" rồi "Thành viên"). Ghi một chữ khác tên trang còn tệ hơn: "Khách hàng › Hồ sơ" trên đầu "Công ty TNHH Minh Phát", người đọc không biết mình đang ở đâu (đã dính 22/09/2026). Mỗi mục cha là link. Mục dài thì `max-w-48 truncate` kèm `title`.
- **Đường dẫn đặt ở MỘT chỗ.** App đã có đường dẫn trên thanh header `h-16` thì đầu trang không lặp lại, chỉ còn tên, mô tả, nút.
- **Một trang đúng một `<h1>`, và tên trang chỉ ghi MỘT chỗ.** Hai `<h1>` thì trình đọc màn hình không biết trang này tên gì (đã dính 23/09/2026: "Việc của tôi" trên header và "Tạo công việc mới" cùng là `<h1>`); không `<h1>` nào thì cũng vậy (đã dính 25/09/2026: trang khách hàng bỏ đầu trang để khỏi lặp "Khách hàng", mất luôn `<h1>`). Chia theo loại trang:
  - **Trang không có đầu trang riêng** (danh sách, bảng quản lý, tổng quan, kanban): tên trên thanh header `h-16` **chính là `<h1>`**, giữ nguyên cỡ chữ của thanh (`text-base font-bold`, cỡ chữ không đổi theo thẻ). Vùng nội dung không lặp lại tên; nút chính ("+ Thêm khách hàng") nằm cuối hàng công cụ cạnh ô tìm.
  - **Trang có đầu trang riêng** (chi tiết bản ghi, form tạo, trang có mô tả hay nút riêng cho bản ghi): `<h1>` là tên trong đầu trang; thanh header chỉ ghi **cấp cha** ("Khách hàng" là link), bằng `<p>`/`<nav>`, không ghi lại tên trang.
  - Khung app nhận tên trang từ route rồi tự chọn thẻ: có đầu trang riêng thì `<p>`, không thì `<h1>`. Đừng để mỗi trang tự nhớ.
- **Tên trang `text-xl`**, trang chi tiết của một bản ghi (khách hàng, đơn, dự án) thì `text-lg` theo `T9`. Không `text-2xl`, `text-3xl`: đó là cỡ hero (`budgets.md`). `text-balance` để tên dài xuống dòng đều.
- **Khối chữ `min-w-0 flex-1`.** Thiếu `flex-1` thì khối co theo dòng dài nhất (thường là đường dẫn), mô tả bị ép xuống dòng ở nửa khung dù bên phải còn trống (đã dính 22/09/2026, sửa `max-w` không ăn vì bề rộng đã bị flex bóp trước).
- **Tên trang `font-semibold`, không `tracking-tight`** ở cỡ `lg`/`xl`. Tên trang là chữ đậm nhất vùng nội dung; nhạt hơn tiêu đề khối bên dưới là đảo thứ bậc.
- **Mô tả `max-w-[55ch] text-pretty`**: đủ rộng để một câu ngắn nằm một dòng, câu dài vẫn dưới 75 ký tự mỗi dòng (`T11`). Bản cũ `max-w-2xl` ghi là dưới 75 nhưng ở `text-sm` thực tế ~99 ký tự.
- **Nút bên phải, bám mép trên** (`sm:items-start`), `shrink-0`. Tối đa một nút `primary` (hành động chính của trang), còn lại nút viền có icon (`I1`). Từ nút thứ ba thì gom vào nút `MoreHorizontal`.
- **Màn hẹp**: nút xuống dưới chữ, căn trái, giữ trên một hàng, không để hai nút trên một nút dưới (`../responsive.md`).
- Không có mô tả, không có nút thì đầu trang chỉ còn tên, không chừa chỗ trống.

---

## Trang chi tiết bản ghi

```
thanh header:  ☰  Khách hàng                                  🔔  (T)
┌──────────────────────────────────────────────────────────────────────┐
│ (N) Nguyễn Minh Anh  <h1> text-lg              [✉ Email] [+ Tạo đơn] ⋯│
│     ● Đang giao dịch  Lumen Studio                                    │
│                                                                       │
│ 12 tháng gần nhất, so với 12 tháng trước         ┌ Liên hệ ─────────┐ │
│ ┌ Doanh thu ┬ Đơn đã giao ┬ Giá trị ┬ Hoàn ┐     │ Email   ✉ ⧉      │ │
│ └───────────┴─────────────┴─────────┴──────┘     │ Điện thoại ☎ ⧉   │ │
│ ┌ Đơn hàng 24 · Tin nhắn · Tệp 4 · Hoạt động ┐   └──────────────────┘ │
│ │ DH-10412  20/09  3 SP  ● Đã giao  12,6 tr │   ┌ Phân loại ───────┐ │
│ │ ...                                       │   │ Nhãn, phụ trách   │ │
│ │ Xem tất cả 24 đơn →                       │   └──────────────────┘ │
│ └───────────────────────────────────────────┘                        │
└──────────────────────────────────────────────────────────────────────┘
  từ xl: cột chính minmax(0,1fr) + cột phải 22rem; dưới xl một cột:
  số liệu → hai card (md trở lên đứng cạnh nhau) → khối tab
```

Đầu trang theo mục trên (`<h1>` `text-lg`, thanh header chỉ ghi cấp cha). Hàng số liệu theo
`../components/charts.md`, card Liên hệ / Phân loại theo `../components/description-list.md`
(xếp chồng, cột phải hẹp), dòng thời gian theo `../components/timeline.md`.

- **Trang chi tiết không phải panel xem nhanh phóng to.** Panel để liếc một khách giữa danh sách; trang để làm việc với khách đó, và việc chính là xem, mở **các bản ghi con**. Mượn khuôn của panel (hàng tên, ô số, danh sách mô tả) được, bê nguyên bộ tab của panel thì không (`../principles.md`, "Dựng một thứ chưa có mẫu").
- **Tab đầu tiên là bản ghi con chính**: khách hàng → Đơn hàng, dự án → Công việc, công ty → Người liên hệ. Tiếp theo mới tới Tin nhắn, Tệp, Hoạt động. Đã dính 25/09/2026: trang khách chép tab Tin nhắn / Tệp / Hoạt động của panel, ô số ghi 24 đơn, nút chính là "Tạo đơn", mà muốn xem đơn phải lội tab Hoạt động, nơi 24 đơn chỉ là 24 dòng "Đơn đã giao" lẫn với "Gắn nhãn VIP", không lọc, không mở được đơn nào.
- **Tab bản ghi con là bảng gọn**, không phải dòng thời gian: Mã đơn (`font-mono`, link sang đơn), Ngày đặt, Số sản phẩm, Trạng thái (badge `M7`), Tổng tiền căn phải `tabular-nums`. Mới nhất lên đầu, 10 dòng, cuối bảng là link "Xem tất cả 24 đơn" sang danh sách đơn đã lọc sẵn theo khách này, **căn trái thẳng mép chữ cột đầu**, cùng phía với "Xem hoạt động cũ hơn" ở tab Hoạt động: đổi tab mà lối "xem thêm" nhảy từ mép phải sang mép trái là mắt phải đi tìm lại (đã dính 25/09/2026). Không phân trang trong tab. Dưới `sm` thành danh sách dòng như bảng quản lý (mục "Bảng dữ liệu").
- **Tab bản ghi con có số đếm, tab dòng chảy thì không**: "Đơn hàng 24", "Tệp 4", còn "Tin nhắn", "Hoạt động" để chữ trơn. Dữ liệu có sẵn số nên đây là ca được thêm số của `../components/small-controls.md`; khách mới nhìn hàng tab là biết tab nào rỗng, khỏi bấm từng tab. Số tin nhắn, số hoạt động thì lớn dần mãi, đọc không ra gì.
- **Hai số cùng đếm một thứ mà khác kỳ thì ô số ghi kỳ ngay trong nhãn.** Số trên tab đếm từ trước tới nay (bảng liệt kê đủ), hàng số liệu tính 12 tháng như panel (`N5`). Ô nào đếm cùng thứ với tab thì nhãn là "Đơn đã giao · 12 tháng", các ô khác giữ nhãn trơn, dòng kỳ trên hàng vẫn ghi một lần. Đã dính 25/09/2026: "Đơn đã giao 24" và "Đơn hàng 42" cách nhau 100px, dòng "12 tháng gần nhất" ở trên hàng không đủ gỡ, người đọc tưởng số sai. Không đổi hàng số sang trọn đời: panel và trang của cùng một khách sẽ ra hai bộ số.
- **Bản ghi khác nhắc tới trên trang là link**: mã đơn trong dòng hoạt động, mã đơn trong bảng, tên tệp. Cả vùng nội dung không có link nào là trang cụt: thấy "Đơn DH-10412" mà không mở được.
- **Hành động gắn với một giá trị thì nằm cạnh giá trị đó**, không vào menu ⋯ đầu trang. Email là link `mailto:`, số điện thoại là link `tel:`, rê vào hàng thì hiện icon button sao chép (`description-list.md`). Menu ⋯ chỉ còn việc với cả bản ghi: Sửa thông tin, rồi Xoá sau đường chia (`I11`). Đã dính 25/09/2026: "Gọi điện" và "Sao chép email" nằm trong menu ⋯ ở góc trên, còn số điện thoại và email ngay bên dưới là chữ chết.
- **Khách chưa có đơn nào thì bỏ hẳn hàng số liệu.** Tab Đơn hàng rỗng đã nói "Chưa có đơn nào", nút "Tạo đơn" đã ở đầu trang; giữ thêm khung "Chưa có đơn nào. Số liệu hiện sau đơn đầu tiên" là hai khối cùng nói một ý (`N3`). Khung gọn đó chỉ dành cho panel, nơi không có tab Đơn hàng (`../components/charts.md`).
- **Không tìm thấy bản ghi** (id sai, đã xoá): vẫn là đầu trang có `<h1>` "Không tìm thấy khách hàng", một câu vì sao, một lối về danh sách (`N6`). Thanh header vẫn ghi cấp cha.

---

## Bảng kanban

```
○ Cần làm  4      ◉ Đang làm  3     ⋯ Chờ duyệt  2    ✓ Xong      3
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ tiêu đề việc │  │ tiêu đề việc │  │ tiêu đề việc │  │ tiêu đề việc │
│ dự án · hạn  │  │ dự án · hạn  │  │ dự án · hạn  │  │ dự án · xong │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│ ...          │  │ ...          │
└──────────────┘  └──────────────┘
```

- **Cột không tô màu riêng.** Đầu cột là icon trạng thái + tên + số đếm, icon và màu icon lấy đúng bảng trạng thái ở `M7` (`circle`, `circle-dot`, `circle-ellipsis`, `circle-check`), cùng hình với hàng nhóm của view danh sách (`D2`). Màu chỉ ở icon `size-4`; nền cột, viền cột, chữ tên cột không màu. Bốn cột bốn nền màu là dấu hiệu chưa quyết định được cái nào quan trọng, và nó phá luật một màu nhấn.
- **Thẻ ở cột Xong không thêm ✓ trước tiêu đề.** Đầu cột đã có `circle-check`, ✓ trên từng thẻ là nói một ý hai lần (`M6`), lại đẩy tiêu đề lệch cột so với thẻ các cột khác (bỏ 24/09/2026). Cột Xong khác ở dòng phụ: "xong 18/09" thay cho hạn chót.
- **Thẻ là card thật**, đây là ngoại lệ hợp lệ của luật `F3`: thẻ kanban là vật kéo thả được, không phải một dòng trong danh sách.
- **Thẻ `p-4`, gap giữa thẻ `gap-3`, gap giữa cột `gap-4`.** Xem `budgets.md`. Đừng hạ xuống `p-3`, chật.
- **Tiêu đề việc không `truncate`**, cho xuống tối đa hai dòng rồi mới cắt. Thẻ hẹp mà cắt một dòng thì đọc không ra việc gì.
- **Cột `w-[248px] shrink-0 grow max-w-[320px]`, hàng bên trong `flex w-max min-w-full`.** Bốn cột vừa khít ở 1366px trở lên khi sidebar mở, rộng hơn thì cột giãn đều tới 320px; hẹp hơn thì cột giữ 248px và cuộn ngang. Cột cứng `w-[280px]` cần 1216px, mà khung nội dung ở 1440px (sidebar `w-64`) chỉ có 1184px: cột Xong hụt 8px ở mép phải, ở 1366px hụt 32px, đúng hai bề rộng laptop hay gặp nhất, trông như lỗi chứ không như "còn nữa" (đã dính 26/09/2026). `w-max` giữ lề phải khi cuộn, `min-w-full` cho hàng đủ rộng để cột giãn. Sidebar hoặc lề trang khác thì tính lại: 4 × bề rộng cột + 3 khe + 2 lề ≤ bề rộng khung ở 1366px.
- **Màn hẹp thì cuộn ngang trong khung**, không wrap thành hai hàng. Xem luật `R6` trong `../responsive.md`. Lề đặt trên hàng bên trong (`flex gap-4 px-3`), không đặt trên khung cuộn, nếu không cột cuối dính sát mép. **Khung cuộn của board không `scrollbar-clean`**: dùng thanh tự ẩn (`I18`) và mép mờ (`R10`). `scrollbar-clean` chỉ dành cho hàng chip, hàng tab (`rules-state.md`); board ẩn hẳn thanh thì người dùng chuột không có bánh xe ngang (Windows) chỉ còn Shift + lăn để thấy cột bị khuất.
- **Nút ⋯ trên thẻ: hiện khi rê hoặc Tab vào thẻ**, như các app board lớn: 16 thẻ là 16 dấu ⋯ đứng yên, nhiễu hơn cả tên việc. `opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 aria-expanded:opacity-100 [@media(hover:none)]:opacity-100` trên chính nút, thẻ là `group` (chỗ vẫn giữ, avatar không nhảy). Khác bảng (`I11`): bảng dò theo cột nên nút luôn hiện, thẻ thì không có cột.
- **Nút ⋯ nằm ở hàng cuối thẻ, ngay trước avatar**, không ở góc trên phải. Hàng cuối `flex h-8 items-center justify-between`: ưu tiên bên trái, bên phải một cụm `flex items-center gap-1` gồm nút ⋯ `size-8` rồi avatar `size-6`. Hàng cuối chỉ có ưu tiên (chữ ngắn) nên dư chỗ; góc trên phải là chỗ của tên việc. Hai cách đã thử và bỏ (đo 26/09/2026, cột 248px): nút ở góc trên, tiêu đề `pr-8` giữ chỗ thì 5/15 tên bị cắt "…", còn cho 3 dòng thì ra chữ mồ côi ở dòng 3 kèm một khoảng trống 32px bên phải dòng 1–2; nút đè lên chữ không giữ chỗ (kiểu nút sửa hiện lên khi rê) thì nền nút cắt đôi một chữ ("doanh thu c⋯"). Ở hàng cuối: 1/15 tên bị cắt (tên thật sự dài), thẻ chỉ cao thêm 8px. Không kéo `-my-*` để giữ hàng `h-6`: Button có `max-w-full`, margin âm làm khối bọc co và bóp nút (đã dính 26/09/2026, nút còn 24×32, `N11`).
- **Đầu cột có nút `plus` thêm việc vào cột đó**: icon button ghost `size-8` ở cuối hàng đầu cột (`ml-auto`), `aria-label="Thêm việc vào Cần làm"`, mở form tạo với trạng thái của cột. Board nào cũng có lối thêm ngay tại cột; chỉ có nút ở đầu trang thì thêm xong còn phải kéo thẻ sang cột đúng.
- **Cột rỗng vẫn phải chiếm chỗ**, xem `../components/empty-state.md`.
- Quá năm cột thì hỏi xem có nên gộp bớt trạng thái không.

### Kéo thả thẻ

Kéo thẻ sang cột khác là đổi trạng thái. Dựng đủ ba đường vào, không chỉ chuột:

- **Chuột: nhích quá 4px mới tính là kéo**, không thì cú bấm run tay thành kéo, và bấm thẻ để mở chi tiết không được.
- **Tay: giữ yên 250ms mới nhấc**, ngón trôi quá 8px trong lúc chờ là đang cuộn, bỏ kéo. Vuốt ngay phải là cuộn board như thường. Thẻ `select-none [-webkit-touch-callout:none]`, không thì giữ lâu ra menu chép chữ của iOS.
- **Bàn phím: thẻ vào được bằng Tab**, `aria-roledescription="thẻ kéo thả được"`, `aria-describedby` trỏ tới câu hướng dẫn `sr-only`: Space nhấc, ← → đổi cột, Space hoặc Enter thả, Esc huỷ. Mỗi bước đọc qua một vùng `aria-live="polite"`: "Đã nhấc … ở cột Cần làm", "Cột Đang làm", "Đã chuyển … sang Đang làm", "Đã huỷ kéo, … vẫn ở Cần làm". Thả xong tiêu điểm vẫn ở thẻ.
- **Thẻ đang cầm là một bản sao nổi**: portal ra `body`, `fixed`, bay theo con trỏ bằng `transform` gắn thẳng vào DOM (không render lại cả board mỗi lần nhích), giữ đúng điểm đã nắm trên thẻ. Viền `--border-strong` + `shadow-lg` vì nó là lớp nổi (`M15`). Không nghiêng, không phóng to (`F22`). Bản sao `inert`, thẻ thật vẫn ở trong cột cho trình đọc màn hình. Nhấc bằng phím thì chính thẻ đó mang viền + bóng này, cùng một ý "đang cầm".
- **Chỗ thả là khung viền đứt `border-foreground/40`, cao đúng bằng thẻ**, đứng đúng vị trí thẻ sẽ nằm theo khoá sắp xếp của cột (cột xếp theo hạn chót thì khung nằm giữa 28/09 và 05/10, không nằm dưới con trỏ). Đậm hơn khung cột rỗng (`foreground/15`): cột rỗng là "chỗ trống", khung này là "rơi vào đây" (`N2`). Số đếm ở đầu hai cột đổi ngay lúc kéo.
- **Cả dải dọc của cột là vùng thả**, tính theo tọa độ ngang, không riêng phần có thẻ: cột ngắn thì thả vào khoảng trống bên dưới vẫn được.
- **Kéo tới mép khung thì board tự cuộn ngang**, nhanh dần khi càng sát mép. Không có thì cột bị khuất không bao giờ thả tới được ở 375px.
- **Nhấc bằng phím mà đổi sang cột đang khuất thì cuộn cả cột đích vào khung**, không chỉ cuộn cho có. Khung cuộn `scroll-px-8` (bằng bề rộng mép mờ `R10`), rồi **chỉ cuộn ngang** khung board: so mép `<section>` của cột với mép khung trừ `scroll-padding`, `scroller.scrollBy({ left })` phần hụt; sau đó `card.scrollIntoView({ block: "nearest", inline: "nearest" })` cho chiều dọc. Đừng `scrollIntoView` trên cả cột: cột cao hơn màn thì trình duyệt canh đỉnh cột, trang nhảy dọc mỗi lần bấm mũi tên (bên dựng bắt được 26/09/2026). Đã dính 26/09/2026 ở 1280px: sang cột Xong, board dừng ở 40 trên 64px, thẻ đang cầm mất vòng focus và mép phải, nằm dưới mép mờ.
- **Thả xong bản sao bay về chỗ mới** 200ms, `cubic-bezier(0.32, 0.72, 0, 1)` như panel trượt (`overlay.md`), `motion-reduce` thì đặt thẳng. Kéo sang cột Xong thì dòng phụ đổi sang "xong dd/mm" ngay.

**Code mẫu đã duyệt: `app-kanban.html`.** Chép cấu trúc từ đó, đừng dịch lại từ
mấy gạch đầu dòng trên. File đó đã qua vòng tra tấn 375px, cuộn ngang có lề hai
đầu, chip cuộn ngang, thẻ `p-4`, chip lọc `h-9`. File tĩnh, không có menu ⋯ và kéo
thả: hai thứ đó theo các gạch đầu dòng trên và mục "Kéo thả thẻ".

---

## Danh sách có bộ lọc

```
┌─────────────────────────────────────┐
│ tab  [tab]  tab   [tìm    ] [+ Thêm]│  <- chọn một: tab; chọn nhiều: chip
│                                     │     tên trang là <h1> trên thanh header, không lặp ở đây
├─────────────────────────────────────┤
│ ⬤ nội dung dòng      giá trị  ⋯ ⋯  │  <- hành động phụ ẩn, hiện khi hover
│ ⬤ nội dung dòng      giá trị       │
│ ⬤ nội dung dòng      giá trị       │
└─────────────────────────────────────┘
```

Xem `../components/list-row.md` cho công thức từng dòng. Danh sách là **một khối
chia đường kẻ**, không phải mỗi dòng một card.

---

## Bảng dữ liệu

> **Kiểm thư viện trước.** Dự án có `@tanstack/react-table`, `ag-grid`, danh
> sách ảo (`@tanstack/react-virtual`, `react-window`, `react-virtuoso`) thì dùng
> nó cho phần sắp xếp, chọn dòng, cuộn ảo; skill chỉ lo hình. Chưa có thì dựng
> theo mục này, lúc giao đề xuất một dòng nếu bảng cần cuộn nhiều nghìn dòng.

Bảng quản lý (khách hàng, đơn hàng, thành viên…) có tìm, lọc, phân trang, chọn
nhiều dòng. Bộ mặc định, dựng đủ không hỏi:

```
(tên trang "Khách hàng" là <h1> trên thanh header, không lặp ở đây)
[Tất cả 32] Đang giao dịch 18  Tiềm năng 9  Ngừng 5  [tìm…] [Lọc] [+ Thêm khách hàng]
┌──────────────────────────────────────────────────────────────────┐
│ ☐  Khách hàng ↕     Công ty      Trạng thái      Doanh thu ↕   ⋯ │
├──────────────────────────────────────────────────────────────────┤
│ ☐  ⬤ Tên            Công ty      (● Đang GD)     184.500.000 đ  ⋯ │
│ ☐  ⬤ Tên            Công ty      (● Tiềm năng)             0 đ  ⋯ │
├──────────────────────────────────────────────────────────────────┤
│ 1 tới 10 trong 32 khách hàng        Mỗi trang [10▾]  ‹ 1 2 3 4 › │
└──────────────────────────────────────────────────────────────────┘

Khi có dòng được chọn, hàng tab + tìm + nút thêm được THAY bằng:
[Đã chọn 3 · Bỏ chọn]                                     [Xoá 3 dòng]
```

- **Tab trạng thái** ở trên bảng theo "Thanh tab" trong `../components/small-controls.md` — mở file đó lấy variant và class, đừng chép lại ở đây. Bảng này thường có thêm hàng chip lọc ngay dưới hàng tab, và khi đó tab dùng `underline`. "Bộ lọc" trong đề không chỉ là hàng tab: các trường khác (công ty, người phụ trách, khoảng ngày) vào nút **Lọc** mở popover, dựng theo "Popover lọc" trong `overlay.md`.
- **Dưới `sm`, tab trạng thái không vừa một hàng thì thành một nút dropdown**, không cuộn ngang: nút viền `h-10` ghi **nhãn "Trạng thái:" (`text-muted`) rồi trạng thái đang chọn kèm số** ("Trạng thái: Tất cả · 32") và `ChevronDown`; thiếu nhãn thì nút "Tất cả · 32" đứng một mình trông như ô nhập hay nút lạ, không biết đang lọc theo gì (chủ dự án chốt 25/09/2026). Nút mở ra là danh sách đủ các trạng thái, mỗi mục kèm số, mục đang chọn có dấu check (khuôn Select ở `../components/choice-controls.md`, danh sách mở ra theo Dropdown ở `overlay.md`). Đây là bước 3 của `R10`: hàng tab cuộn ngang làm tab cuối nằm **hẳn** ngoài khung ("Ngừng giao dịch 6" bắt đầu ở 370px trong khung 367px), mép mờ không có gì để mờ, người dùng tưởng chỉ có ba trạng thái (đã dính 25/09/2026). Rút chữ ("Đang GD") thì mất nghĩa. Nút **căn trái, rộng theo nội dung** (`w-fit`), đứng riêng một hàng: nó là bộ lọc, đọc từ trái như hàng chip bên dưới và ô tìm bên trên; căn phải thì một nút lẻ trôi giữa khoảng trống, tách khỏi hàng chip nó đi cùng. Không kéo rộng hết hàng: trông như ô nhập. Hàng chip vẫn cuộn ngang, có mép mờ (`R10`; vạch chỉ vị trí chỉ khi người dùng chọn): chip là lọc thêm, thấy một phần là đủ biết còn.
- **Hover dòng `hover:bg-surface-hover`**, không `hover:bg-background` (`I10`). Dòng chạm hai mép khung trắng mà tô màu nền trang là trông như thủng.
- **Cột trạng thái là badge màu** theo `M7`, không chấm xám + chữ đen. **Trạng thái mà gần hết các dòng giống nhau thì không làm cột**: dòng thường không có dấu, chỉ dòng ngoại lệ có badge cạnh tên (thành viên "Đang hoạt động" / lời mời "Chờ chấp nhận", xem "Trang thành viên và phân quyền").
- **Nút gỡ lọc ghi "Xoá lọc", không ghi "Bỏ chọn".** Khi đang chọn dòng, thanh trên cùng đã có "Bỏ chọn" (bỏ tick dòng); cuối hàng chip mà cũng "Bỏ chọn" thì một màn có hai nút cùng chữ khác việc (`N6`, đã dính 23/09/2026). **"Xoá lọc" cuối hàng chip chỉ hiện khi có chip đang chọn** (bấm là gỡ hết: chip, từ khoá, tab về Tất cả). Chỉ có từ khoá thì không hiện: ô tìm đã có nút `X` riêng, khối rỗng đã có "Xoá tìm kiếm"; thêm nút này là **ba nút cùng gỡ một từ khoá** trên một màn, và ở 375px nó chiếm một phần ba hàng chip (đã dính 25/09/2026, sau khi thử cho nó hiện với mọi bộ lọc).
- **Cột chữ tự co giãn, đừng khoá `max-w` khi bảng còn dư chỗ.** Cột tên và cột công ty để co theo bảng, `truncate` chỉ bật khi thật sự hết chỗ. Khoá cứng thì ra cảnh tên bị cắt "Tôn Nữ Thị Phương Thảo N…" trong khi giữa bảng còn một mảng trắng (đã dính 23/09/2026).
- **Đếm cột trước khi dựng**: khung còn ~970px ở 1280px khi sidebar mở, quá ~6 cột là bắt đầu chật. Thử theo thứ tự: gộp cột (email xuống dưới tên), ẩn cột ít dùng sau nút "Hiển thị cột", rồi mới cho cuộn ngang trong khung với cột đầu ghim `sticky left-0` (`R9`). Bảng 7–9 cột cuộn ngang ở các sản phẩm lớn vẫn có, cuộn không sai; sai là cuộn khi chưa thử gộp.
- **Cột tiền là đúng ca cần `tabular-nums`** (`T16`). Font không có bảng `tnum` thì class chỉ là chữ chết, các mốc nghìn không thẳng cột: báo người dùng một dòng lúc giao, đổi font là việc của họ (`N10`).
- **Hành động dòng** theo `I11`: 1–2 cái thì icon button luôn hiện ở cột cuối; từ 3 cái hoặc có xoá thì một nút `MoreHorizontal` ra dropdown. Cột cuối hẹp `w-12`, căn phải, không tiêu đề (có `<span class="sr-only">Thao tác</span>`).
- **Chọn nhiều dòng:** checkbox đầu dòng, checkbox tiêu đề có ba trạng thái (không / một phần / tất cả trong trang). Không có dòng nào (rỗng, rỗng do lọc, đang tải, lỗi) thì **ẩn checkbox tiêu đề**, giữ chỗ để cột không xê dịch. Có dòng được chọn thì **thanh hành động hàng loạt thay chỗ** hàng tab, cùng chiều cao để bảng không nhảy. Xoá hàng loạt luôn qua hộp xác nhận (`../layouts/overlay.md`), nói rõ số dòng.
- **Mỗi ô một dòng.** Tên công ty dài thì `truncate` (`min-w-0`) và `title` đầy đủ, bề rộng do bảng chia chứ không khoá `max-w`, không cho xuống ba dòng: một dòng cao gấp ba làm cả bảng mất nhịp. Ô hai tầng (tên + email) là ngoại lệ duy nhất, và mọi dòng đều hai tầng như nhau.
- **Giá trị trống thống nhất một kiểu**: `—` màu `text-muted`. Không chỗ "Chưa có", chỗ "Khách lẻ", chỗ để trống.
- **Số căn phải, `tabular-nums`**, tiêu đề cột số cũng căn phải. Cột số, ngày có sắp xếp thì tiêu đề là nút có icon mũi tên, dựng theo `../components/sortable-header.md` (không nền hover, dưới `sm` thành nút "Sắp xếp:").
- **Dòng tiêu đề bảng** `text-xs font-medium text-muted`, nền `--surface`, chia với thân bằng `--border`.
- Phân trang có tổng số và vị trí đang xem (`I16`), dựng theo "Phân trang" trong `../components/small-controls.md`: một trang thì ẩn nav, không có dòng thì ẩn cả footer. Màn hẹp xem gạch dưới.
- **Dưới `sm`, bảng quản lý thành danh sách dòng, không cuộn ngang.** Mỗi dòng theo `../components/list-row.md`: checkbox · avatar · tên (`font-medium truncate`) trên email (`text-xs text-muted truncate`) · nút ⋯ ở mép phải; hàng dưới cùng thụt thẳng mép chữ tên là **badge trạng thái** bên trái, **số chính** (doanh thu) căn phải `tabular-nums`. Cột phụ (công ty, ngày tạo) không hiện, xem ở trang/drawer chi tiết. Hàng tab, chip, thanh hàng loạt, phân trang giữ nguyên. Bảng 6 cột ở 375px mà cuộn ngang thì cột tên (271px trong khung 341px) trôi mất ngay nhịp cuộn đầu, còn lại "Công ty —, Đang giao dịch" không biết của ai; ghim cột tên cũng chỉ chừa ~70px để cuộn (đã dính 25/09/2026). Các app quản lý lớn trên điện thoại đều đổi sang dòng.
- **Từ `sm` tới hết bề rộng mà bảng vẫn phải cuộn ngang thì bắt buộc ghim cột đầu** `sticky left-0 bg-surface` (dòng hover/đang chọn thì ô ghim đổi nền theo), cột ghim không quá ~40% khung, mép phải cột ghim có mép mờ theo `R10` khi đang cuộn.


### Bảng nhóm theo trạng thái (danh sách công việc)

```
[Danh sách] Kanban                                        [+ Thêm việc]
┌──────────────────────────────────────────────────────────────────────┐
│ Công việc                     Ưu tiên    Người phụ trách   Hạn chót ↑ │
├──────────────────────────────────────────────────────────────────────┤
│ ⌄ ○ Cần làm  5                                                        │  <- hàng nhóm: nút rộng hết hàng
├──────────────────────────────────────────────────────────────────────┤
│ Tiêu đề việc                  ! Khẩn cấp  ⬤ Trần Nguyễn Anh Tuấn  Quá hạn 3 ngày ⋯ │
│ Dự án                                                                 │
│ Tiêu đề việc                  ▂▄ Cao      ⬤ Đỗ Khánh Linh   Hôm nay  ⋯ │
│ Tiêu đề việc                  ▂ Thấp      —                 —        ⋯ │
├──────────────────────────────────────────────────────────────────────┤
│ › ◉ Đang làm  4                                                       │  <- đang thu
│ ⌄ ⋯ Chờ duyệt  0                                                      │
│   Chưa có việc nào ở nhóm này                                         │
└──────────────────────────────────────────────────────────────────────┘
```

- **Hàng nhóm là icon trạng thái + tên + số, không pill** (`D2`, `M7`). Ba nhóm pill xám một nhóm pill xanh thì liếc không biết mình đang ở nhóm nào (đã dính 24/09/2026). Tên `text-sm font-medium`, số `text-muted`. Cả hàng là một `<button aria-expanded>` rộng hết hàng (`I29`), chevron `size-4` đầu hàng, xoay `-rotate-90` khi thu.
- **Trong nhóm phải xếp theo một khoá, và khoá đó hiện ở tiêu đề cột.** Mặc định hạn chót tăng dần: quá hạn lên đầu, hôm nay, rồi ngày xa, không có hạn xuống cuối. Nhóm Xong xếp ngày xong giảm dần. Tiêu đề cột đang sắp có mũi tên (`arrow-up` `size-3.5`, `../components/sortable-header.md`). Để thứ tự dữ liệu mẫu thì ra "Hôm nay" nằm dưới "28/09" và dưới một việc không hạn, người đọc tưởng bảng xếp theo thứ gì đó mà dò không ra (đã dính 24/09/2026).
- **Mọi cột ngắn co theo nội dung dài nhất, cột tiêu đề nhận phần dư.** Ưu tiên, người phụ trách, hạn chót, cột ⋯: `<th class="w-px">` và ô `whitespace-nowrap`; ô tiêu đề `w-full`. Chỉ `w-px` mà quên `nowrap` ở một cột thì cột đó bị bóp tới chữ đầu tiên ("Trung", "Trần N…", đã dính 24/09/2026 ở cột ưu tiên). Tên tiếng Việt cắt đuôi là mất **tên gọi**, phần duy nhất phân biệt người này với người kia: "Trần Nguyễn Anh Tuấ…", "Nguyễn Thị Phương T…" trong khi cột công việc bên trái dư cả nửa bảng (`N8`, đã dính 24/09/2026). Chỉ cắt khi cả bảng hết chỗ, lúc đó rút cột tiêu đề trước: tiêu đề `min-w-0` + `truncate` (hoặc `line-clamp-1`) bên trong ô, không để tràn đè sang cột bên.
- **Thu nhóm trong `<table>`: mỗi nhóm một `<tbody>`, thu thì ẩn `<tr>`, không khối trượt.** Hàng nhóm là `<tr>` đầu `<tbody>`, trong đó `<th scope="rowgroup" colSpan={số cột}>` chứa nút `aria-expanded`; thu thì các `<tr>` dòng việc `hidden`. Khối trượt `grid-rows` của sidebar (`I29`, mục thu nhóm sidebar ở trên) **không** dùng được trong bảng: `<div>` bọc quanh `<tr>` là HTML sai, trình duyệt đẩy nó ra khỏi bảng hoặc tính lại bề rộng cột theo khối đó, cột giữa bị bóp và tên việc dài tràn đè sang cột bên (đã dính 24/09/2026). Bảng không trượt chiều cao; muốn có chuyển động thì chỉ xoay chevron.
- **Ô trống một kiểu `—` ở mọi cột, kể cả hạn chót.** Người phụ trách trống ghi `—` mà hạn chót trống ghi "Đặt hạn" là hai kiểu trống trên một hàng; "Đặt hạn" xám còn trông như một giá trị. Ô sửa được tại chỗ thì cả ô là nút mở date picker / chọn người (dấu bấm được chỉ hiện lúc rê vì đây là ô phụ; ô là việc chính của trang thì dấu luôn hiện, xem "Trang thành viên và phân quyền"): lúc thường `—`, rê vào hoặc Tab tới thì nền `bg-foreground/8 rounded-lg` và đổi thành icon `calendar-plus` + "Đặt hạn". **Không `bg-surface-hover`**: đó cũng là nền của cả dòng lúc rê, ô nằm trên dòng đang rê thì nền ô trùng nền dòng, không nổi lên (bên dựng bắt được 24/09/2026). `foreground/8` chồng lên nền dòng đang rê vẫn đậm hơn rõ một bậc (`I10`; `/5` gần trùng nền dòng). Ô có giá trị ("Hôm nay", "28/09") cùng công thức; lúc lịch đang mở giữ nền này (`aria-expanded:bg-foreground/8`). Nút ô `-mx-2 px-2` để chữ vẫn thẳng cột với tiêu đề cột. Máy không có chuột thì `—` vẫn bấm được. Lịch mở từ ô theo mục "mở từ một ô trong bảng" trong `../components/choice-controls.md`: bấm ngày là lưu, có "Xoá hạn" khi ô đang có hạn.
- **Nhóm rỗng** mở ra là một dòng `text-sm text-muted` "Chưa có việc nào ở nhóm này", thụt thẳng cột tiêu đề (`../components/empty-state.md`). Cả bảng rỗng thì giữ hàng tiêu đề cột, một dòng chữ mờ căn giữa.
- **Khung chờ có cả hàng nhóm.** Dòng đầu của bảng thật là hàng nhóm; khung chờ bắt đầu thẳng bằng dòng việc thì lúc dữ liệu về cả bảng tụt xuống một hàng (`I19`). Khung chờ: một hàng nhóm (chevron + thanh `w-24`), rồi các dòng việc.
- **Nút "Thêm việc" nằm cuối hàng chuyển view**, căn phải, cả hai view dùng chung (`primary`, icon `plus`). Trang không có nút nào dẫn tới form tạo việc là trang chỉ xem được, không làm được (đã dính 26/09/2026: `/tasks/new` có form nhưng không chỗ nào trên trang công việc dẫn tới).
- **Tên view: "Danh sách" / "Kanban", không "Bảng".** Theo `S10` "bảng" là table, mà view danh sách ở đây chính là table: ghi "Bảng" cho view kanban là một chữ hai nghĩa trên cùng một màn. Chuyển view là `segmented` trong "Thanh tab" (`../components/small-controls.md`), mỗi view kèm icon `list` / `square-kanban` được.
- Hành động dòng, hover, badge ưu tiên, màu hạn chót theo các mục trên và `../components/list-row.md`. Menu dòng đang mở thì dòng giữ nền hover.

---

## Danh sách rỗng

Một dòng chữ mờ, `py-6`, không hình, không nút. Xem `../components/empty-state.md`.

Chỉ dựng empty state có hình và CTA khi đó là màn hình chính của cả app và người
dùng lần đầu vào chưa có gì để làm.

---

## Trang cài đặt

**A. Một cột, chia mục có tiêu đề** (mặc định, dưới 15 tuỳ chọn)

```
Tài khoản
┌─────────────────────────────────────┐
│ Tên hiển thị          [ô nhập     ] │
│ ─────────────────────────────────── │
│ Email                 name@mail.com │
└─────────────────────────────────────┘

Giao diện
┌─────────────────────────────────────┐
│ Chế độ tối                    [   ○]│
└─────────────────────────────────────┘

Vùng nguy hiểm
┌─────────────────────────────────────┐
│ Xoá tài khoản              [Xoá]    │
└─────────────────────────────────────┘
```

- Mỗi mục là **một khối chia kẻ**, không phải mỗi tuỳ chọn một card.
- Nhãn trái, điều khiển phải, cùng một hàng.
- **Nhãn thẳng hàng với ô, không với cả khối bên phải.** Hàng có chữ gợi ý hoặc lỗi dưới ô thì khối phải cao hơn ô; nhãn căn giữa cả hàng là tụt xuống lưng chừng giữa ô và dòng chữ. Grid mặc định kéo ô nhãn cao bằng cả hàng (`stretch`), nên `min-h` + `items-center` trên ô nhãn không đủ, phải có `sm:items-start` trên hàng (đã dính 25/09/2026, trang hồ sơ: nhãn "Múi giờ" và nhãn của ô đang báo lỗi lệch xuống 11px so với ô):

  ```html
  <div class="grid gap-2 px-4 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-6 sm:px-5">
    <!-- min-h bằng chiều cao ô: nhãn một dòng nằm đúng tâm ô -->
    <div class="flex min-w-0 flex-wrap items-center gap-x-2 sm:min-h-11 md:min-h-10">
      <label for="timezone" class="text-sm font-medium">Múi giờ</label>
      <!-- dấu "Đã lưu" ở đây -->
    </div>
    <div class="flex min-w-0 flex-col gap-2">
      <!-- ô, rồi chữ gợi ý hoặc lỗi -->
    </div>
  </div>
  ```

  Hàng **chữ chỉ đọc + nút** (Email, Mật khẩu) cũng `sm:items-start`: nhãn và nút nằm ở dải cao bằng ô đầu hàng, chữ giá trị `sm:py-2.5` để dòng đầu thẳng nhãn. Căn giữa thì giá trị dài bốn dòng (email xuống dòng + dòng "Đang chờ xác nhận…") làm nhãn "Email" trôi xuống giữa dòng 2 và 3 (đã dính 25/09/2026). Chỉ hàng ảnh đại diện căn giữa (`sm:items-center`): avatar cao 64px, không có dòng đầu nào để thẳng theo.
- Không viết chữ giải thích dưới mọi dòng. Chỉ giải thích thứ thật sự khó đoán.
- Vùng nguy hiểm tách xuống cuối cùng.
- **Mặc định dựng kiểu không có nút "Lưu thay đổi" tổng**: mỗi dòng chừa chỗ cho một dấu "Đã lưu" nhỏ cạnh điều khiển. Lưu lúc nào, gọi gì là việc của người dùng, skill chỉ để handler rỗng (`onChange`). **Toggle, select áp ngay; ô chữ thì lưu khi rời ô, hoặc có nút Lưu riêng của đúng khối đó** (mỗi card cài đặt có ô chữ thì có nút Lưu ở chân card). Cái cần tránh là **một nút Lưu tổng cho cả trang** trong khi có toggle tự áp: người dùng không biết bật xong có phải bấm Lưu không. Nút Lưu của khối khoá khi chưa có gì đổi.

- **Hàng cài đặt có mô tả thì câu lỗi và câu lý do khoá thay chỗ mô tả, giữ cỡ `text-sm` của mô tả.** `text-xs` chỉ dành cho dòng nằm dưới ô trong form, cạnh chữ gợi ý cũng `text-xs`. Trong khung chia kẻ, mô tả các hàng đều `text-sm`; câu "Bật Email ở trên để nhận bản tin." `text-xs` đứng giữa chúng thì hàng khoá trông như chữ chú thích lạc vào, và hàng cao thấp đổi theo lúc bật tắt Email (đã dính 26/09/2026, trang cài đặt thông báo: lý do khoá và lỗi "Chưa lưu được…" 12px giữa các mô tả 14px).
- **Câu mô tả của công tắc mở khu phải đọc được khi khu đang đóng.** "Không gửi… trong khung giờ này" khi hai ô giờ còn giấu thì "khung giờ này" trỏ vào thứ chưa thấy. Viết cho lúc tắt: "Không gửi email và thông báo trình duyệt vào khung giờ bạn chọn." (đã dính 26/09/2026).

### Khu cài đặt có nhiều trang

App có từ hai trang cài đặt trở lên (Hồ sơ, Thông báo, Bảo mật…) thì chúng là **một khu** có
điều hướng riêng, không phải mấy route rời chỉ gõ được bằng tay. Đã dính 26/09/2026: sidebar
"Cài đặt" và đường dẫn "Cài đặt" trên header đều dẫn tới `/dashboard/settings` là trang trắng,
trang Thông báo và Bảo mật không có lối vào nào ngoài gõ địa chỉ.

```
header h-16:  Cài đặt                           <- là <h1>, tên khu
              Hồ sơ   Thông báo   Bảo mật       <- tab underline, mỗi tab một route
              ─────── ━━━━━━━━━ ────────────
              Kênh nhận                         <- vào thẳng mục đầu, không đầu trang riêng
              ┌──────────────────────────────┐
```

- **Route gốc không bao giờ trống**: `/settings` chuyển thẳng (replace, không thêm lịch sử) tới trang con đầu. Mục "Cài đặt" ở sidebar sáng ở mọi trang con (`aria-current` theo tiền tố route).
- **Dưới 6 trang: hàng tab `underline` trên cùng vùng nội dung**, rộng bằng cột nội dung (`max-w-2xl`), chữ tab đầu thẳng cột với tiêu đề mục bên dưới. Tab là `<Link>` có `aria-current="page"`, không `role="tablist"`: mỗi tab là một trang, nút Back phải quay về tab trước. Không dùng `solid`: trang cài đặt đầy công tắc bật đã tô `--primary`, thêm viên đen ở đầu trang là hai loại khối đen tranh nhau, và chữ trong viên thụt `px-3` lệch cột với nội dung (thử trên trang 26/09/2026).
- **Từ 6 trang trở lên: cột nav dọc bên trái** (kiểu B), `w-48 shrink-0`, mục `h-9 rounded-lg px-3`, đang chọn `bg-foreground/5 font-medium`, như link sidebar. Dưới `lg` cột đó thành hàng tab `underline` cuộn ngang ở trên (`../responsive.md`).
- **Tên khu ở thanh header là `<h1>`, trang con không có đầu trang riêng.** Tab đang sáng đã nói đang ở trang nào; thêm tiêu đề "Thông báo" + một câu mô tả dưới hàng tab là ghi tên trang hai lần (luật "một trang đúng một `<h1>`" ở "Đầu trang trong vùng nội dung"). Trang trạng thái (`/settings/…/states`) giữ đường dẫn cha như cũ.
- **Hồ sơ cá nhân là tab đầu của khu**, không phải route riêng ngoài khu. Mục "Hồ sơ" trong menu tài khoản dẫn tới đúng tab đó.
- **Đường kẻ dưới hàng tab nằm ở khung ngoài rộng đúng bằng cột nội dung**, không ở hàng tab đã lùi `-mx-2`: kẻ ở hàng thì đường kẻ thò ra 8px hai bên so với mép card bên dưới. Màu `border-border-strong`, cùng màu đường kẻ dưới header `h-16`; đừng tự pha `border-foreground/10` (trên nền trang ra `#e1e1e3`, đậm hơn đường header `#eaeaea` ngay phía trên, đo 26/09/2026). Vạch 2px của tab đang chọn vẫn đè lên đường kẻ này.
- Màn hẹp: hàng tab cuộn ngang theo `small-controls.md` ("Hàng chip ở màn hẹp"), không xuống dòng, không đổi thành select.

**B. Tab dọc bên trái** (từ 15 tuỳ chọn trên một trang, hoặc từ 6 trang cài đặt trở lên): xem mục "Khu cài đặt có nhiều trang" ngay trên.

### Trang tuỳ chọn thông báo

Là trang cài đặt kiểu A. Bộ mục mặc định: **Kênh nhận** (trình duyệt, email, email tổng hợp),
**Báo cho bạn khi** (mỗi loại việc một công tắc, cuối là mốc nhắc hạn chót), **Không làm phiền**
(công tắc mở khung giờ trượt ngay dưới, cùng hàng).

- **Nói rõ công tắc loại việc có áp cho chuông trong app hay không, ở MỘT chỗ.** Mục Kênh nhận ghi "Chuông luôn nhận đủ" mà mục bên dưới ghi "Áp dụng cho mọi kênh đang bật" thì tắt "Có bình luận mới" xong người dùng không biết chuông còn báo không (đã dính 26/09/2026). Mặc định: chuông nhận đủ, công tắc loại việc chỉ áp cho kênh gửi ra ngoài, và câu mô tả mục ghi đúng vậy: "Áp dụng cho trình duyệt và email."
- Nhiều loại việc × nhiều kênh mà cần chọn riêng từng ô (ví dụ bình luận chỉ qua email) thì mới dựng bảng lưới việc × kênh bằng checkbox. Mặc định không: ba mục trên đủ cho hầu hết app.
- Hàng có ô chọn cùng khuôn hàng công tắc (nhãn trái, ô phải `sm:w-48`); dưới `sm` ô xuống dưới chữ, rộng hết hàng.
- Trình duyệt đang chặn quyền thông báo: công tắc khoá ở trạng thái tắt, câu lý do nói chỗ mở lại (biểu tượng ổ khoá cạnh địa chỉ trang). Email tắt thì email tổng hợp khoá theo, lý do "Bật Email ở trên để nhận bản tin."

---

## Trang hồ sơ cá nhân

Là trang cài đặt kiểu A ở trên, không phải khuôn riêng. Bộ mục mặc định:

| Mục | Hàng | Lưu |
| --- | --- | --- |
| Thông tin cá nhân | Ảnh đại diện, Họ và tên, Chức danh, Số điện thoại | Ô chữ: nút Lưu ở chân card. Ảnh: áp ngay khi tải xong |
| Đăng nhập | Email, Mật khẩu: chữ chỉ đọc + nút viền "Đổi email", "Đổi mật khẩu" | Luồng riêng (modal) |
| Tuỳ chọn | Ngôn ngữ, Múi giờ | Áp ngay, dấu "Đã lưu" cạnh nhãn |
| Vùng nguy hiểm | Xoá tài khoản | Hộp xác nhận (`overlay.md`) |

- **Avatar trên trang là cùng component, cùng seed màu với avatar ở header / chân sidebar** (`../components/avatar.md`). Đã dính 25/09/2026: header nền chàm, trang hồ sơ nền hổ phách, cùng chữ "T" của cùng một người. Nhìn hai chỗ tưởng hai tài khoản.
- **Avatar và tên ở header vẽ theo giá trị đã lưu, không theo ô đang gõ.** Xoá trống ô họ tên thì avatar vẫn là "T", không thành "?" (đã dính 25/09/2026). Lưu xong mới đổi, header và trang đổi cùng lúc.
- **Hàng ảnh đại diện có bốn trạng thái:**
  - Chưa có ảnh: chữ cái đầu, nút "Tải ảnh lên", dòng gợi ý `text-xs text-muted` "JPG hoặc PNG, tối đa 2 MB".
  - Có ảnh: "Đổi ảnh" và "Xoá ảnh" **đều là nút `outline`**. Xoá ảnh **không đỏ, không hộp xác nhận**: bấm là xoá ngay, avatar về chữ cái đầu, kèm toast "Đã xoá ảnh đại diện" có nút **Hoàn tác** (`D3`: xoá mà lấy lại được thì xoá ngay + hoàn tác). Có hoàn tác thì không mất gì, nên không phải việc phá huỷ (`rose` của `I4` dành cho thứ mất hẳn: xoá tài khoản, xoá dự án). Hai nút cùng `outline`, không để Xoá ảnh `secondary` nền xám: nó thành nút nặng hơn Đổi ảnh, trong khi đổi ảnh mới là việc người ta hay làm. **Không dùng `ghost`**: chữ `text-muted` đứng cạnh nút viền đọc ra là nút đang khoá, và lúc khoá thật (đang tải ảnh) thì gần như không khác gì (đã dính 25/09/2026: "Xoá ảnh" `#828282`, cùng xám với dòng gợi ý bên dưới).
  - Đang tải: avatar mờ `opacity-50` với spinner giữa, nút "Tải ảnh lên" khoá.
  - Lỗi: chữ đỏ **thay chỗ** dòng gợi ý, không thêm dòng. Nói số thật và cách sửa: "Ảnh nặng 4,8 MB, chọn ảnh dưới 2 MB".
- **Ảnh áp ngay khi tải xong**, như select, không tính vào nút Lưu của card. Người dùng chọn ảnh xong thấy ảnh mới trên avatar là nghĩ đã xong; bắt bấm Lưu nữa thì rời trang là mất ảnh.
- **Email và mật khẩu không sửa tại chỗ.** Đổi email phải xác nhận địa chỉ mới, đổi mật khẩu phải nhập mật khẩu cũ, nên hàng chỉ đọc + nút mở luồng riêng. Email đang chờ xác nhận thì dưới email hiện một dòng `text-sm text-muted`: "Đang chờ xác nhận **moi@…** · Gửi lại · Huỷ" ("Gửi lại", "Huỷ" là nút chữ `font-medium text-foreground hover:underline underline-offset-2`, như "Thử lại" ở `../components/file-upload.md`), email cũ vẫn là email đăng nhập tới lúc xác nhận.
- Mật khẩu ghi mốc đổi gần nhất `text-muted` ("Đổi lần cuối 12/06/2026"), không ghi chuỗi `••••••••`: chấm tròn không nói gì mà trông như ô nhập được.
- **Trang trạng thái** (dựng tĩnh cạnh nhau) đủ các ca: chưa sửa (Lưu khoá), vừa sửa, đang lưu, vừa lưu, lỗi nhập, ảnh quá dung lượng, **có ảnh**, **đang tải ảnh**, **email chờ xác nhận**, tên và chức danh rất dài, vừa đổi múi giờ, hộp xác nhận xoá tài khoản. Hộp xác nhận xem thêm ở 375px: email dài phải xuống dòng ở sau `@` (`../components/description-list.md`).

---

## Trang bảo mật

Là trang cài đặt kiểu A ở trên. Bộ mục mặc định:

| Mục | Hàng | Lưu |
| --- | --- | --- |
| Xác thực hai lớp | Dòng trạng thái + nút mở luồng; đã bật thì thêm hàng Phương thức, Mã dự phòng | Luồng riêng (modal), không công tắc |
| Phiên đăng nhập | Mỗi thiết bị một dòng, phiên đang dùng đứng đầu; chân khung có nút đăng xuất hàng loạt | Làm ngay, toast báo xong |

Mật khẩu đã có ở trang hồ sơ (mục Đăng nhập) thì không lặp lại ở đây. App không có
trang hồ sơ thì hàng Mật khẩu đứng đầu trang này, dựng y như bên hồ sơ.

```
Xác thực hai lớp
┌──────────────────────────────────────────────────────────┐
│ Chưa bật                              [Bật xác thực hai lớp] │  <- chưa bật
│ Ngoài mật khẩu, nhập thêm mã 6 số từ ứng dụng xác thực.  │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│ ✓ Đã bật từ 12/06/2026                            [Tắt]  │  <- đã bật
│ ──────────────────────────────────────────────────────── │
│ Ứng dụng xác thực   Google Authenticator          [Đổi]  │
│ ──────────────────────────────────────────────────────── │
│ Mã dự phòng         Còn 8 / 10 mã           [Tạo mã mới] │
└──────────────────────────────────────────────────────────┘

Phiên đăng nhập
Thấy thiết bị lạ thì đăng xuất thiết bị đó rồi đổi mật khẩu.
┌──────────────────────────────────────────────────────────┐
│ [▭] Chrome trên macOS  Thiết bị này                      │
│     Hà Nội, Việt Nam                                     │
│ ──────────────────────────────────────────────────────── │
│ [▯] Safari trên iPhone                     [Đăng xuất]   │
│     Hà Nội, Việt Nam · 2 giờ trước                       │
│ ──────────────────────────────────────────────────────── │
│                          [Đăng xuất 4 thiết bị khác]     │  <- cùng cỡ, cùng dạng nút dòng
└──────────────────────────────────────────────────────────┘
```

- **Xác thực hai lớp không phải công tắc** (`../components/choice-controls.md`, "Hàng cài
  đặt"). Bật phải qua ba bước: quét mã QR (hoặc chép khoá), nhập mã 6 số để thử, lưu mã
  dự phòng. Tắt phải nhập lại mật khẩu. Nên là dòng trạng thái + nút mở luồng.
  Đã dính 26/09/2026: công tắc "Yêu cầu mã khi đăng nhập", gạt là hiện "Đã lưu", trong khi
  chưa quét mã nào; và lúc đã bật thì không còn chỗ cho phương thức và mã dự phòng.
  - Chưa bật: chữ "Chưa bật" `text-sm font-medium` + câu hệ quả `text-muted`, nút **`primary`**
    "Bật xác thực hai lớp" bên phải (dưới `sm` xuống dưới chữ, căn trái). Lý do nền nhấn
    (`I2`): đây là việc trang muốn người dùng làm, và là nút chính duy nhất của trang. Đã dính 26/09/2026:
    bản nút viền đứng ngang hàng bốn nút "Đăng xuất", việc nên làm nhất trang không nổi hơn
    việc gì (chủ dự án: "bật xác thực hai lớp tôi nghĩ nền đen"). Không tô chữ "Chưa bật"
    vàng hay đỏ: nút đặc đã đủ kéo mắt, trang cài đặt không phải chỗ doạ người dùng (`M7`).
  - Đã bật: dòng đầu icon `check` `text-emerald-600` + "Đã bật từ 12/06/2026", nút
    `outline` "Tắt" (không `rose`: tắt không mất dữ liệu, bật lại được, `I4`). Dưới là hai
    hàng kiểu A: Ứng dụng xác thực (nút "Đổi"), Mã dự phòng ghi số mã còn lại (nút "Tạo mã
    mới"). Còn từ 2 mã trở xuống thì câu phụ `text-muted` "Sắp hết mã, tạo mã mới rồi cất
    ở chỗ an toàn." Mất điện thoại mà không có mã dự phòng là mất tài khoản, nên hàng này
    không giấu vào luồng khác.
  - Luồng bật, luồng tắt: skill để handler rỗng (`onEnable`, `onDisable`), trang chỉ đổi
    hình theo trạng thái máy chủ trả về (`N10`).
- **Dòng phiên** theo `../components/list-row.md`: icon loại thiết bị trong ô `size-10
  rounded-lg bg-background`, tên thiết bị `text-sm font-medium truncate`, dòng phụ `text-xs
  text-muted` "vị trí · lần hoạt động cuối", nút `outline` "Đăng xuất" cỡ nút form (`h-11 md:h-10 rounded-xl`, như nút "Bật xác thực hai lớp"),
  **rê vào / Tab tới thì đỏ** (dạng "nút lặp lại trên từng dòng" của `I4`), `aria-label` có
  tên thiết bị. Phiên đang dùng đứng đầu, nhãn `text-xs text-muted` "Thiết bị
  này" cạnh tên, **không nút** (tự đăng xuất đi qua menu tài khoản). Dưới `sm` nút xuống
  dưới chữ, căn trái.
- **Đăng xuất một thiết bị làm ngay**, không hỏi, toast "Đã đăng xuất thiết bị" với tên
  thiết bị ở dòng dưới. Không có Hoàn tác: phiên đã thu hồi thì không gọi về được.
- **Đăng xuất hàng loạt: nút nguy hiểm đứng riêng** (nền `rose-500/10`, chữ `rose-700`,
  `I4`), **cùng cỡ nút dòng** (`h-11 md:h-10 rounded-xl`), ở chân khung, chỉ hiện khi còn thiết bị
  khác. Đỏ vì nó đá mọi thiết bị khác ra cùng lúc và không gọi lại được, kể cả máy của
  chính mình đang dùng dở; đăng xuất ở skill này là việc nguy hiểm (`I4`, chủ dự án chốt).
  **Hỏi lại trước** (`D3`: nhiều thiết bị một lúc) bằng hộp xác nhận đỏ như hộp xoá (icon
  `log-out` nền `rose-500/10`, nút xác nhận `rose`).
  Đã dính 26/09/2026, hai lần: bản đầu nút `rose` cao 40px (44px ở 375) đứng dưới bốn nút
  viền 32px, hai cỡ nút chồng nhau trong một khung; skill sửa thành nút viền trung tính
  (lý do "không mất dữ liệu"), chủ dự án chỉ ra đăng xuất hàng loạt là việc nguy hiểm, và
  cả trang không còn gì nói "cẩn thận" nữa. Giữ cùng cỡ nút dòng, trả lại màu `rose`.
- **Cả trang một cỡ nút** (`h-11 md:h-10`), không `h-8` cho nút trong dòng phiên. Ở 1280px
  dòng không cao thêm (ô icon `size-10` đã cao 40px, nút cao bằng ô icon); ở 375px mỗi dòng
  cao thêm 12px nhưng nút đạt 44px, cỡ bấm tối thiểu khuyến nghị cho màn cảm ứng (nút 32px
  thì hụt). Đã dính 26/09/2026: nút dòng và nút hàng loạt `h-8` đứng dưới nút "Bật xác thực
  hai lớp" `h-10`, một trang hai cỡ nút (chủ dự án: "để h-10 luôn cho đồng bộ").
- **Gỡ dòng xong thì chuyển focus** (`I31`): đăng xuất một thiết bị thì focus sang nút
  "Đăng xuất" của dòng kế (hết dòng thì dòng trên); đăng xuất hàng loạt xong thì focus lên
  tiêu đề mục "Phiên đăng nhập" (`tabIndex={-1}`). Đã dính 26/09/2026: cả hai lần focus rơi
  về `<body>`, trình đọc màn hình mất chỗ.
- **Khung chờ**: dòng đầu là phiên đang dùng nên **không có khối nút**, các dòng sau có
  (`I19`: khung chờ đúng hình).
- **Trang trạng thái** đủ các ca: xác thực hai lớp chưa bật, đã bật, đã bật mà sắp hết mã
  dự phòng; danh sách đang tải, lỗi tải, đang đăng xuất một dòng (spinner trong nút, nút
  giữ cỡ), chỉ còn thiết bị này (không chân khung), tên thiết bị rất dài; hộp xác nhận
  đăng xuất hàng loạt; hai toast.

---

## Trang thành viên và phân quyền

Là bảng quản lý ở mục "Bảng dữ liệu" trên, khác ở những chỗ dưới đây. Hai việc
chính của trang là **mời** và **đổi vai trò**, nên cả hai phải thấy được ngay khi
nhìn, không nằm sau lúc rê chuột hay trong menu ⋯.

```
[Tất cả 18] Đang hoạt động 14  Chờ chấp nhận 4     [tìm…] [Vai trò ▾] [+ Mời thành viên]
┌──────────────────────────────────────────────────────────────────────────┐
│ ☐  Thành viên                                   Vai trò          Ngày tham gia  │
├──────────────────────────────────────────────────────────────────────────┤
│    ⬤ Trần Nguyễn Anh Tuấn Khang  Bạn            Chủ sở hữu       04/03/2024     │ <- khoá: chữ trơn, không ⌄, không ⋯
│       tran.khang@evondev-studio.com                                             │
│ ☐  ⬤ Lê Minh Anh                                Quản trị viên ⌄  17/06/2024   ⋯ │
│       minhanh.le@evondev-studio.com                                             │
│ ☐  ⬤ hoang.long.pham@gmail.com (Chờ chấp nhận)  Thành viên ⌄     —            ⋯ │ <- ngoại lệ mới có badge
│       Đã mời 24/09                                                              │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Ô vai trò đổi được thì luôn có `ChevronDown` `size-3.5 text-muted` sau chữ**, không chỉ hiện nền lúc rê. Chỉ có nền lúc rê thì ô "Quản trị viên" đứng yên trông y hệt ô "Chủ sở hữu" không đổi được, và việc đề bài đòi ("đổi vai trò") không ai tìm ra (đã dính 25/09/2026: phải rê đúng vào chữ mới biết bấm được). Các app quản lý thành viên phổ biến đều để mũi tên luôn hiện ở cột vai trò. Dòng khoá (chủ sở hữu, chính mình) là chữ trơn không mũi tên: **có mũi tên hay không chính là tín hiệu đổi được hay không**, không cần thêm icon khoá. Nút ô `-mx-2 px-2`, nền rê `bg-foreground/8`, giữ nền lúc danh sách mở (`aria-expanded:bg-foreground/8`) như ô sửa tại chỗ ở bảng công việc (`I10`: nút trong dòng đang rê dùng `/8`, `/5` gần trùng nền dòng).
  - **Mũi tên thẳng một cột**: nút rộng bằng **nhãn dài nhất** trong danh sách vai trò, mũi tên `ml-auto` bám mép phải nút. Để nút co theo chữ thì "Chỉ xem ⌄", "Thành viên ⌄", "Quản trị viên ⌄" mỗi dòng mũi tên một chỗ, cột trông lệch (đã dính 25/09/2026, lệch 12px giữa hai vai trò). Không cần đo bằng JS: trong nút đặt một `grid`, mọi nhãn chồng lên cùng một ô (`col-start-1 row-start-1`), nhãn đang chọn hiện, các nhãn còn lại `invisible` + `aria-hidden`; ô grid tự rộng bằng nhãn dài nhất. Không khoá `w-36` cứng: đổi tên vai trò hay đổi sang tiếng Anh là lệch lại.
  - Khác bảng công việc (mục "Bảng nhóm theo trạng thái"): ở đó mỗi dòng ba bốn ô sửa được, mũi tên khắp nơi là nhiễu, nên dấu bấm được chỉ hiện lúc rê. Luật chung: **ô sửa tại chỗ là việc chính của trang thì dấu bấm được luôn hiện; ô sửa tại chỗ phụ thì hiện lúc rê.**
  - Danh sách mở ra theo Select ở `../components/choice-controls.md`: mỗi vai trò một dòng tên + một câu nói làm được gì, vai trò đang có có dấu check. Chọn là lưu và đóng, toast "Đã đổi vai trò" kèm **Hoàn tác** (`D3`), không hộp xác nhận: đổi vai trò đổi lại được. Chủ sở hữu không nằm trong danh sách (chuyển quyền sở hữu là luồng riêng có xác nhận).
- **Không có cột Trạng thái.** "Đang hoạt động" là trạng thái thường của thành viên; một cột badge xanh lặp trên 14/18 dòng là một câu nói 14 lần (`N3`). **Chỉ dòng ngoại lệ mới có dấu**: lời mời chưa chấp nhận có badge xám "Chờ chấp nhận" ngay sau email ở tầng trên (chỗ của nhãn "Bạn"), tầng dưới "Đã mời 24/09", ngày tham gia `—`. Thành viên bị tạm ngưng (nếu dự án có) cũng là ngoại lệ, cùng cách. Tab trạng thái vẫn giữ để lọc. Bỏ cột thì dưới `sm` mỗi dòng còn hai tầng (tên + email bên trái, vai trò bên phải) thay vì ba tầng vì badge chiếm riêng một hàng (đã dính 25/09/2026).
- **Lọc vai trò là một nút dropdown "Vai trò" cạnh ô tìm, không phải hàng chip.** Menu có checkbox, chọn được nhiều; đang lọc một vai trò thì nút ghi tên vai trò đó ("Quản trị viên"), nhiều vai trò thì "Vai trò · 2", `ChevronDown` cuối nút. Nút này là ô Select: không hover, lúc mở viền `border-focus` + `ring-2`, nền giữ trắng (`../components/button.md`). Hàng chip dưới hàng tab dành cho bảng mà lọc là cách đi chính (khách hàng theo nhãn). Ở đây vai trò đã hiện ở cột, lọc theo vai trò là việc ít làm, mà hàng chip chiếm nguyên một hàng trên bảng: hai hàng lọc cho 18 người (đã dính 25/09/2026). Các app quản lý thành viên phổ biến đều lọc vai trò bằng một dropdown. Dưới `sm` nút này đứng cùng hàng với nút "Trạng thái:".
- **Email đứng ở tầng trên (lời mời chưa có tên) thì cắt phần trước `@`, giữ tên miền** (`AccountEmail` ở `overlay.md`, `N8`): với lời mời, tên miền nói người này trong công ty hay ngoài công ty. Đã dính 25/09/2026: "nguyen.thi.thuy.duong.ketoan.chinhanh.hcm@co…" mất hẳn tên miền. Email ở tầng dưới của thành viên đã có tên thì cắt cuối như thường: cả bảng chung một tên miền, phần phân biệt là phần trước `@`.
- **Menu ⋯ chỉ còn việc không nằm ở ô nào**: thành viên có "Xoá khỏi workspace"; lời mời có "Gửi lại lời mời", "Thu hồi lời mời". Đổi vai trò không lặp trong menu (đã ở ô). Dòng khoá không có checkbox, không có ⋯.
- **Thanh hàng loạt có "Đổi vai trò" (dropdown) cạnh "Xoá N thành viên"**: đổi vai trò cho cả nhóm người mới vào là việc hay làm hơn xoá hàng loạt. Đổi xong một toast gộp kèm Hoàn tác.
- **Modal mời nhận nhiều email một lần**: ô email là tag input (`../components/tag-input.md`), dán cả danh sách, một vai trò cho cả lô, nút ghi số ("Gửi 3 lời mời"). Ô một email thì mời năm người phải mở modal năm lần. Các app quản lý thành viên phổ biến đều cho mời nhiều người một lần. Chọn vai trò trong modal dùng cùng danh sách có câu mô tả như ở ô bảng.
  - **Email trùng nói đúng ca, đỏ ở đúng thẻ đó:** đã là thành viên thì "Đã là thành viên"; đã mời mà chưa chấp nhận thì "Đã mời 24/09, chưa chấp nhận". Không gộp hai ca thành "Email này đã có trong workspace": người đang chờ chấp nhận chưa ở trong workspace, và việc người mời cần làm là gửi lại lời mời chứ không phải bỏ cuộc (đã dính 25/09/2026).
