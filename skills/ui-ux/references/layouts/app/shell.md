# Khung app có sidebar

```
 nền trắng --surface     nền xám --background
┌──────────────┐░┌──────────────────────────────────────┐
│ ◐ Tổ chức    │░│ Trang / Mục hiện tại  [chuông][avatar] │
├──────────────┤░├──────────────────────────────────────┤  <- một đường kẻ ngang border-border, chạy liền qua cả hai cột
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

- **Sidebar nền trắng `--surface`, KHÔNG `border-r`** khi vùng nội dung là nền trang xám `--background`: trắng cạnh xám đã là ranh giới, thêm đường kẻ là hai tín hiệu cho một ý (`N3`; chủ dự án bỏ). Chỉ kẻ `border-r border-border-strong` khi vùng nội dung cũng trắng. **Đừng để sidebar trong suốt** ăn theo `--background` của trang: sidebar xám trùng nền trang thì cả màn thành một mảng xám, không còn ranh giới nào.
- **Rộng `w-60` tới `w-64`**, cố định, `shrink-0`.
- **Màu nhấn có sắc (Cam, Xanh dương… của `brand-tokens.md`) thì mục đang chọn tô màu brand**: nền `bg-primary-light`, icon, chữ và số đếm `text-primary`, `font-medium` (chủ dự án chốt 07/11/2026, trên bản dựng thử brand Cam). Rê vẫn `hover:bg-item-hover`. Đây cũng là màu mục đang chọn của thanh dưới trên mobile, nên hai cỡ màn một kiểu. **Màu nhấn gần đen (mặc định) giữ luật dưới**: `--primary-light` của màu gần đen ra xám bẩn (`brand-tokens.md`), mục đang chọn mất hẳn.
- **Rê là `hover:bg-item-hover`, đang chọn đậm hơn một bậc `bg-secondary` + `font-medium`** (màu nhấn gần đen). Hai nền phải khác nhau: rê ra đúng nền đang chọn thì rê qua mục nào cũng trông như vừa chọn nó, không còn biết mình đang ở trang nào (`I10`; chủ dự án chốt). "Rê và đã chọn cùng một nền mờ" chỉ còn cho dòng bảng tick checkbox, vì ở đó checkbox đã là dấu chọn. **Không tô màu nhấn**, không viền.
- **Mỗi link cao 40px** (`h-10`, `px-3`), bo `rounded-xl` 12px theo luật bo-theo-chiều-cao `F1`. Link 36px trông chật, nền hover lọt thỏm; 40px thì hàng thoáng và bấm trúng dễ hơn.
- **Icon và chữ đi cùng nhau.** Lúc thường cả hai `text-foreground/70`: dịu hơn chữ chính nhưng **không mờ tới `--muted`**, xám `--muted` trên nền trắng là đọc không ra tên mục. Hover hay đang chọn thì **cả icon lẫn chữ** lên `text-foreground`. Đặt màu trên phần tử `<a>`, icon dùng `currentColor`, đừng gán màu riêng cho icon, nếu không hover chỉ sáng mỗi chữ.
- **Nhãn nhóm IN HOA, chữ XÁM**: `text-xs font-medium uppercase tracking-wide text-muted`, hover mới lên `text-foreground`. IN HOA đã đủ tách nhãn khỏi link, nên nhãn phải **nhạt hơn** mục con, không đậm hơn: nhãn đen `--foreground` cộng IN HOA thì nặng nhất cột, lấn cả mục đang chọn. Viết thường thì nhãn nhóm trông y như một mục nav nhạt màu, mắt không tách được đâu là tiêu đề, đâu là link. Chữ trong dữ liệu vẫn viết thường ("Công việc"), IN HOA bằng CSS, để screen reader không đánh vần từng chữ.
- **Giữa các nhóm KHÔNG kẻ đường chia**, tách bằng khoảng trắng `mt-4` và nhãn nhóm. Nhãn IN HOA xám + chevron đã đủ báo "nhóm mới bắt đầu" kể cả khi sidebar cuộn; thêm đường kẻ là ba tín hiệu cho một ý (`N3`). Các app quản lý lớn đều không kẻ. Đừng kẻ `border-t` trên mỗi nhóm: ba đường kẻ chạy ngang cột thành thứ nặng nhất sidebar (chủ dự án bỏ: "đường line hơi đậm").
- **Sidebar chỉ còn một đường kẻ `border-border`**: dưới đầu sidebar (tên workspace), cùng màu đường kẻ dưới header và vạch chia trong menu, popover (`overlay.md`). Cả khung app một màu đường kẻ: đầu sidebar `#eaeaea` mà vạch trong menu tài khoản `#f7f7f8` thì nhìn ra hai màu kẻ cho cùng một việc (chủ dự án chốt; đừng dùng lại `--border-strong` với lý do `--border` "gần như tàng hình"). Đường kẻ khung chỉ là nét gợi, khối tách nhau bằng nền trắng cạnh xám.
- **Đường kẻ dưới đầu sidebar chạy HẾT bề ngang, mép chạm mép.** Đặt nó trên phần tử đầu sidebar, không trong vùng có padding ngang. Đừng vá bằng `-mx-3`: đổi padding một chỗ là đường lệch. **Vùng nav cuộn được thì thanh cuộn không được giữ chỗ** (`scrollbar-gutter: auto`, thanh cuộn tự ẩn theo `I18`): giữ gutter 4px là nền rê của mọi mục trong vùng cuộn hụt 4px ở mép phải so với Cài đặt và hàng profile nằm ngoài vùng cuộn.
- **Sidebar nhiều link thì nhóm thu gọn được.** Từ **3 nhóm có nhãn trở lên**, hoặc tổng số mục đủ để sidebar phải cuộn: nhãn nhóm thành một **nút rộng hết hàng** (`I29`), chevron ở mép phải (`ChevronDown` `size-4`, xoay `-rotate-90` khi đóng), có `aria-expanded`. Hover nhãn là nền `--background` như mục nav.
  - **Nút nhãn cùng khuôn với mục con**: cùng `h-10 px-3`, cùng `rounded-xl`. Đặt chiều cao bằng `h-10` chứ không bằng `py`, vì chữ `text-xs` của nhãn thấp hơn chữ `text-sm` của link, dùng `py` là nút nhãn lùn hơn hàng con. Mép trái chữ nhãn thẳng mép icon con, chevron thẳng mép phải badge.
  - **Mục con không thụt vào, không đường dọc.** Nhóm ở đây là *phân khu*, các mục con ngang hàng nhau và đã có icon riêng. Thụt vào cộng đường dọc là ngôn ngữ của **cây lồng nhau**, và nó ăn mất 16-20px của cột vốn đã hẹp, chữ dài bị cắt sớm hơn.
  - Chỉ thụt + đường dọc khi đó là **menu con của một link** (Dự án ▸ Dự án A, Dự án B): mục con **không icon**, thụt để chữ thẳng mép chữ của link cha, đường dọc `border-l border-border-strong` chạy ở tâm icon cha. Mục con đang chọn thì đoạn đường dọc của nó đậm lên `--foreground`.
  - **Mở/đóng có animation trượt**, không chớp giật: `grid` với `grid-rows-[1fr]` ↔ `grid-rows-[0fr]`, con bọc `overflow-hidden min-h-0`, `transition-[grid-template-rows] duration-200 ease-out`. Chevron xoay cùng `duration-200`. Không đo chiều cao bằng JS. Thêm `motion-reduce:transition-none`. Nhóm đang đóng gắn `inert` để Tab không lọt vào link đã ẩn.
  - Nhóm đầu không nhãn (Tổng quan, Hộp thư) thì luôn mở, không thu gọn.
  - Mặc định **mở hết**. Nhóm chứa trang đang xem thì **không được đóng lúc tải trang**, nếu không người ta không thấy mình đang ở đâu.
- **Thanh cuộn của sidebar tự ẩn** theo `I18`: đứng yên không thấy, rê vào hoặc đang cuộn mới hiện, 4px. Thanh cuộn xám đứng yên chạy dọc sidebar trắng là thứ nặng nhất trên cột, nặng hơn cả chữ.
- **Số đếm căn phải, là số trơn** `text-xs tabular-nums text-muted`, không pill, không viền. Năm pill viền cạnh nhau trên một cột là năm khung nhỏ kéo mắt. Mục đang chọn thì số lên `text-foreground` cùng chữ. **Không badge màu brand**, xem `../../components/small-controls.md`.
- **Các link cách nhau `gap-1` (4px)**, không `gap-0.5`: 2px thì nền rê của hai mục kề nhau gần
  như dính, cột đọc thành một khối (chủ dự án thấy).
- **Dự án đã có badge màu brand trong sidebar** ("Mới" nền đỏ, vai màu, `review.md`) thì giữ,
  nhưng **mục đang chọn tô nền màu nhấn thì badge của nó đảo**: nền `--primary-foreground`,
  chữ `--primary`. Badge đỏ nằm trên nền đỏ thì tan mất, và cột có hai ba khối đỏ đặc tranh
  nhau (`N3`). Wireframe vẽ luôn ca này (`wireframe.md`, `U3`).

```tsx
<Link
  href={item.href}
  className={cn(
    "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 text-sm text-foreground/70 outline-hidden transition-colors",
    !isActive && "hover:bg-item-hover hover:text-foreground",
    isActive && "bg-secondary font-medium text-foreground",
  )}
>
  <Inbox className="size-4 shrink-0" />
  {item.label}
  {item.unread > 0 && (
    <span className={cn("ml-auto shrink-0 text-xs tabular-nums text-muted", isActive && "text-foreground")}>
      {item.unread > 99 ? "99+" : item.unread}
    </span>
  )}
</Link>
```

Nhóm thu gọn được: nút nhãn cùng khuôn mục con, trượt bằng `grid-rows`.

```tsx
// Vùng nav: `flex flex-col py-3 px-3`. Nhóm tách nhau bằng `mt-4`, KHÔNG kẻ đường chia.
<div className="mt-4 first:mt-0">
  <button
    type="button"
    aria-expanded={isOpen}
    aria-controls={groupId}
    onClick={() => setIsOpen(!isOpen)}
    className="flex h-10 w-full cursor-pointer items-center rounded-xl px-3 text-xs font-medium uppercase tracking-wide text-muted outline-hidden transition-colors hover:bg-item-hover hover:text-foreground"
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
- **Tên mục bị cắt thì rê vào hiện đủ tên**, cả lúc sidebar đang mở: "Báo cáo tài chính theo q…" phải có tooltip "Báo cáo tài chính theo quý". Dùng lại tooltip của chế độ thu gọn, chỉ bật khi chữ **thật sự bị cắt** (đo theo `T14`: bề rộng chữ bằng `Range`, không bằng `scrollWidth`), mục ngắn không bật. Đừng chỉ bật tooltip lúc thu gọn: lúc mở thì tên dài cụt hẳn, không có cách nào đọc được.
- **Dưới `lg`, sidebar là panel trượt từ TRÁI, cùng khuôn với panel trượt ở `overlay.md`, chỉ đổi phía**: khung `bg-surface shadow-modal`, nền tối thêm `border-r border-border` (`M23`); lớp phủ `bg-black/15` (không `/30`, đó là của modal), vào **500ms** / ra **350ms** `cubic-bezier(0.32,0.72,0,1)`, lớp phủ cùng nhịp; chỉ `translate`, không `scale`, không `opacity` trên panel. **Không nút ✕ hiện ra**: đóng bằng bấm lớp phủ (dải tối bên phải luôn lộ ít nhất 56px), bấm một link, Escape, vuốt sang trái. Menu điều hướng trượt của các app đều vậy; ✕ chen vào hàng logo thì trông lạc, nhất là khi nó đứng sát tên thay vì sát mép. Vẫn có một nút đóng `sr-only` đứng đầu panel cho trình đọc màn hình. Panel khác (xem bản ghi, lọc) vẫn có ✕ theo `overlay.md`: chúng chứa việc đang làm, không phải chỗ đi qua. Mọi khối trượt từ mép trong app dùng **một** lớp phủ và **một** đường cong (`N5`). Đừng tự chọn `bg-black/30` + 200ms `ease-out` khi đề chỉ ghi "trượt từ trái". Bóng cũng vậy: đừng để panel phẳng không bóng, ở phong cách nổi thì nó thấp hơn cả card phía sau.

- **Thanh điều hướng dưới thay ☰ khi app có từ 5 mục chính trở xuống** và người dùng chuyển mục
  liên tục trên điện thoại (app dùng hằng ngày, app người dùng cuối). App quản trị nhiều nhóm menu,
  ít mở trên điện thoại thì giữ ☰. Dưới `lg`:
  - `fixed inset-x-0 bottom-0` nền `--surface`, viền trên `border-border`, cao `h-16` cộng
    `pb-[env(safe-area-inset-bottom)]` (vạch home của iPhone), trang chừa `pb-20` để mục cuối
    không bị che.
  - 4–5 mục chia đều (`grid grid-cols-4`/`5`), mỗi mục icon lucide `size-5` trên chữ `text-xs`,
    cả ô là vùng bấm. Đang chọn: icon và chữ `text-primary` (dự án gần đen thì `text-foreground
    font-medium`), không nền, không vạch; mục khác `text-muted`. Link có `aria-current="page"`.
  - Mục thứ 6 trở đi gom vào mục cuối **"Thêm"** mở sheet từ đáy, không nhồi 6 mục chữ bị cắt.
  - Số đếm (việc chờ duyệt) là chấm hay badge nhỏ ở góc icon, không đẩy chữ.
  - Có thanh dưới thì header mobile bỏ ☰; khối tài khoản vào "Thêm" hay avatar ở header.
- **Màn rộng: nội dung bám sidebar, lấp bằng thêm cột.** Trang lưới hay danh sách trong khung
  có sidebar không `mx-auto` giữa vùng nội dung: ở 1920px trở lên nó để một khoảng trống giữa
  sidebar và nội dung, cả trang trông như trôi (`mx-auto max-w-300` hở
  235px mỗi bên ở 1920). Dư bề ngang thì **thêm cột**: lưới card lên `2xl:grid-cols-4`, danh
  sách card ngang thành hai cột khi vùng nội dung từ khoảng 1600px. Đừng kéo dài card: card
  ngang rộng 1800px thì nửa phải trống. Cần trần thì đặt rộng (`max-w-[1600px]` trở lên) và vẫn
  căn trái. Trang chữ, form, cài đặt giữ cột hẹp như mẫu của từng trang.
  **Mọi khối trong cột chung một mép phải.** Ô tìm, khối lọc, hàng kết quả, lưới: trần (nếu có)
  đặt ở khung bọc cả cột, không đặt riêng từng khối. Bó riêng ô tìm và khối lọc
  (`max-w-3xl`) trong khi lưới bên dưới trải hết thì cạnh khối lọc trống nửa màn, mép phải so
  le giữa các khối. Ô tìm dài ở 1920 vẫn đỡ hơn khoảng trống đó; muốn ô ngắn lại thì đặt nó
  cùng hàng với control khác (nút Tìm, sắp xếp), đừng co cả khối. Đừng bó `max-w-3xl` cho ô tìm và khối lọc chỉ vì "ô tìm dài 1550px":
  nửa phải trống, lưới bên dưới vẫn chạy hết mép.

## Kiểu khung khác mặc định: mở đúng một file

Phần trên là khung mặc định (sidebar trắng, vùng nội dung xám, bộ mặt Clean). Bộ mặt hay tổ hợp
đã chọn (`P13`, bảng ghép ngay dưới) dùng kiểu nào thì mở thêm **đúng** file của kiểu đó; mọi
luật trong file này vẫn đúng, file kiểu chỉ nói chỗ khác.

| Kiểu | File |
| --- | --- |
| Khung bọc (`inset`), bộ mặt Inset | `shell-inset.md` |
| Một mặt phẳng (`unified`), bộ mặt Paper | `shell-unified.md` |
| Sidebar nổi (`floating`), bộ mặt Float | `shell-floating.md` |
| Dải icon (`rail`, `rail-labeled`), bộ mặt Rail | `shell-rail.md` |
| Menu ngang (`topnav`), bộ mặt Topbar | `shell-topnav.md` |
| Mặt nền mở (`canvas`) | `shell-canvas.md` |
| Header toàn màn (`full`) | `shell-full.md` |

## Ghép điều hướng với vùng chứa

Mười bộ mặt là mười tổ hợp đã kiểm (`P13`). Người dùng tự xin hay gửi ảnh thì ghép theo bảng:

| | `classic` | `inset` | `unified` | `floating` | `canvas` |
| --- | --- | --- | --- | --- | --- |
| `sidebar` | Clean | Inset | Paper | Float | Soft mở |
| `sidebar-dark` | Dark Sidebar | được: cột tối trên nền xám, khối bọc trắng | không: một mặt phẳng trắng mà cột tối là hai mặt | được | không, cùng lý do |
| `rail`, `rail-labeled` | Rail | được: dải icon trên nền trang, khối bọc bên phải | được: dải có `border-r border-border-strong` | được: dải là khối trắng tách mép | được |
| `topnav` | Topbar | được: khối bọc dưới header, cách mép 8px | được | **không**: không có sidebar để nổi, dùng `canvas` | được: hàng link trên nền xám, mục đang chọn là viên trắng |

- Mỗi ô "được" lấy đúng luật của **hai** mục: mục điều hướng (sidebar, Dải icon, Menu ngang) và mục
  vùng chứa (Khung bọc, Một mặt phẳng, Sidebar nổi, Mặt nền mở). Nền rê, nền đang chọn theo vùng
  chứa: điều hướng nằm trên nền xám thì rê `foreground/4`, nằm trên trắng thì `--item-hover`.
- Ô "không" mà người dùng vẫn xin thì làm theo, báo một dòng vì sao lệch (`P1`).

## Thu gọn sidebar (từ `lg` trở lên)

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

- **Mục nào đang hiện lúc mở thì lúc thu vẫn hiện, thành icon.** Nhóm đang mở giữ nguyên icon các mục con; nhóm đang đóng thì vẫn đóng. Như chế độ `collapsible="icon"` của sidebar shadcn. Đừng chỉ giữ nhóm đầu rồi ẩn mọi nhóm có nhãn: mở thấy 13 mục, thu còn 3, người dùng tưởng mất mục, và trang đang xem nằm trong nhóm bị ẩn thì dải icon không có mục nào đang chọn (chủ dự án bỏ).
  - **Chỉ nhãn nhóm và chevron mờ đi tại chỗ** (`opacity-0` + `inert`), hàng nhãn vẫn giữ chiều cao. Khoảng trống nhãn để lại chính là chỗ tách nhóm trong dải icon, và mọi icon **đứng yên đúng vị trí** lúc thu và lúc mở (luật icon đứng yên bên dưới). Gỡ hàng nhãn ra thì icon bên dưới nhảy lên.
  - **Hàng nhãn lúc thu có một gạch ngắn** thay cho chữ: `w-4 h-px bg-border-strong`, nằm giữa hàng theo chiều dọc, **thẳng tâm icon** (hàng nhãn `px-3` nên gạch tự rơi vào 24–40px, tâm 32px, không `justify-center`). Như số đếm, gạch và chữ là **hai bản chuyển bằng opacity**: chữ + chevron `opacity-0`, gạch `opacity-100`, cả hai luôn trong DOM; gạch `aria-hidden`. Chỉ khoảng trống thì một nhóm đang đóng thành một lỗ trống giữa dải icon: đóng Kinh doanh rồi thu gọn, giữa Tài liệu và Thành viên trống 156px, gần gấp ba khoảng thường, không ai biết ở đó có một nhóm (chủ dự án duyệt gạch ngắn). Có gạch thì mỗi khoảng trống đọc ra là ranh giới nhóm, hai gạch liền nhau là có nhóm đang đóng ở giữa.
  - **Vùng nav cuộn được cả lúc thu** (dải icon có thể dài hơn màn). Lúc thu thì **ẩn hẳn thanh cuộn** (`[scrollbar-width:none]`), vẫn cuộn bằng chuột, phím, cảm ứng: thanh cuộn 4px giữ chỗ làm ô icon 40px còn 36px và lệch khỏi tâm.
  - **Đổi trang thì cuộn mục đang chọn vào tầm nhìn** (`scrollIntoView({ block: "nearest" })`): màn thấp, mục ở gần đáy bị mép dưới cắt mất nửa, không biết mình đang ở đâu.
  - **Mép vùng nav mờ dần khi còn mục bị khuất** (cả lúc mở lẫn lúc thu, vì thanh cuộn tự ẩn hoặc ẩn hẳn): `mask-image` gradient **32px** ở mép trên khi đã cuộn khỏi đầu, ở mép dưới khi còn mục phía dưới, không cuộn được thì không mờ. Tính hai cờ từ `scrollTop`, `scrollHeight`, `clientHeight` lúc cuộn và khi đổi kích thước (`ResizeObserver`), đưa vào biến CSS để mask đổi ngay: `[mask-image:linear-gradient(to_bottom,transparent,#000_var(--fade-top),#000_calc(100%-var(--fade-bottom)),transparent)]`, `--fade-top`/`--fade-bottom` là `0px` hoặc `32px`. **Dài 32px, gần bằng một hàng `h-10`**, không 16px: tự cuộn xong thường còn một hàng bị cắt ló ở mép, 16px thì phần ló vẫn đậm 70–80%, thành mấy vệt vụn (đáy icon, dấu chấm của "ị") dính ngay dưới hàng Tìm kiếm như rác. Mục đang chọn tự cuộn vào thì dừng **ngoài** dải mờ: `scroll-my-8` trên link, khớp độ dài mờ. Mask chứ không đè một lớp gradient trắng: đè lớp màu thì hover và nền mục đang chọn ở mép bị phủ trắng lệch màu. Không mờ thì màn thấp 600px sau khi tự cuộn tới Thành viên: Lịch dính ngay dưới icon Tìm, Tổng quan và Hộp thư khuất phía trên, Phòng ban khuất phía dưới, không có dấu gì báo còn mục.
  - **Chấm ở góc icon chỉ cho số "cần xử lý"** (chưa đọc, chờ duyệt, quá hạn). Số đếm tổng như "Dự án 4", "Thành viên 18" lúc thu thì bỏ, không chấm: mười chấm trên một cột là mười tín hiệu vô nghĩa. Số vẫn nằm trong tooltip.
- **Chân sidebar giữ lại**: Cài đặt thành icon, hàng profile thành **chỉ avatar**, bấm vẫn mở menu tài khoản như cũ.
  - **Lúc thu, rê vào avatar không tô nền ô vuông**, mà hiện vòng quanh chính avatar: `ring-2 ring-foreground/10` (menu đang mở thì giữ vòng). Avatar là hình tròn có nền màu riêng; tô thêm một ô xám bo góc quanh nó là tròn trong vuông, hai nền nhạt lồng nhau, trông như một cục mờ. Cùng lý do với ngoại lệ ảnh ở `I15`. Lúc mở thì hàng có chữ, tô nền cả hàng như link là đúng.
- **Mỗi icon có tooltip** là tên mục, hiện bên phải. Link giữ `aria-label` bằng tên mục vì chữ đã ẩn.
- **Dải rộng `w-16` (64px)**. Link vẫn là link cũ, `h-10 w-full px-3 rounded-xl`, chỉ bị bề rộng sidebar bóp lại còn 40px, thành ô vuông. Hover và đang chọn như link thường.
- **Icon đứng YÊN một chỗ ở cả hai trạng thái. Không bao giờ `justify-center`.** Thu gọn mà căn giữa, mở ra lại căn trái, thì lúc bấm mở icon và logo nhảy từ giữa sang trái rồi chữ mới bật ra, cả sidebar như "bung từ giữa", khựng. Cách làm: mọi thứ **căn trái**, và padding tính sao cho tâm icon rơi đúng **32px** (giữa dải 64px) ngay khi căn trái:

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
- **Nút toggle ở đầu header vùng nội dung**, icon `PanelLeftClose` khi đang mở, `PanelLeftOpen` khi đang thu. Nút ghost `size-10 rounded-xl`, có `aria-label` và `aria-expanded`. `outline-hidden`, không vòng focus (`I13`). Viền xám dày hiện ra sau khi bấm là outline mặc định của trình duyệt lọt ra (thiếu `outline-hidden`), không phải thiết kế.

```tsx
// MỘT link cho cả hai trạng thái. Không justify-center, không đổi padding:
// icon đứng yên, chỉ chữ bị mép sidebar cắt dần.
<Link
  to={item.href}
  aria-label={isCollapsed ? getSidebarLinkLabel(item) : undefined} // "Hộp thư, 20 chưa đọc"
  className={cn(
    "relative flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm whitespace-nowrap text-foreground/70 outline-hidden",
    !isActive && "hover:bg-item-hover hover:text-foreground",
    isActive && "bg-secondary font-medium text-foreground",
  )}
>
  <item.icon className="size-4 shrink-0" aria-hidden />
  <span className={cn("min-w-0 flex-1 truncate transition-opacity duration-150", isCollapsed && "opacity-0")}>
    {item.label}
  </span>

  {hasCount && (
    <>
      {/* Lúc mở: số trơn. */}
      <span aria-hidden className={cn("shrink-0 text-xs tabular-nums text-muted transition-opacity duration-150", isActive && "text-foreground", isCollapsed && "opacity-0")}>
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

## Chân sidebar

```
│ ⚙ Cài đặt                │  <- mục nav thường, cùng style các mục trên
│ ╭──────────────────────╮ │
│ │ ◐  Trần Nguyễn A…  ⇕ │ │  <- một hàng không viền, cả hàng là nút, bấm ra menu
│ ╰──────────────────────╯ │
```

- **Profile là một hàng bấm được, không khung viền**: `h-10 w-full rounded-xl px-1 hover:bg-item-hover`, như `NavUser` của sidebar shadcn. Avatar `size-8` (theo `avatar.md` nhưng **bỏ viền của avatar**), tên `text-sm font-medium truncate`, icon **`ChevronsUpDown`** `size-4 text-muted` ở mép phải. Đừng bọc khung viền quanh avatar vốn đã có viền: hai đường viền lồng nhau, avatar dính sát mép khung, tên bị cắt sớm, khung thành cục nặng nhất đáy sidebar (chủ dự án bỏ: "footer profile bị xấu").
- **Dấu hiệu bấm được là icon `ChevronsUpDown` + nền khi rê**, không phải khung. Avatar và tên trôi tự do, không ai biết bấm được, là do **không có icon nào**; có icon mở menu thì hết.
- **Tâm avatar thẳng tâm icon các link** khi sidebar thu gọn: hàng `px-1` + avatar `size-8` ra tâm 20px, đúng bằng link `px-3` + icon `size-4`.
- **Cả hàng là một `<button>`**, là trigger của dropdown/popover (`I29`). Đừng làm riêng nút nhỏ ở góc: bấm vào tên mà không có gì xảy ra là người ta tưởng app bị đơ.
- **Trong hàng chỉ có avatar + tên**, `truncate`. Email đưa lên **đầu menu**, một dòng, **cắt phần trước `@`, giữ nguyên tên miền** theo "Cắt email" ở `overlay.md`. Email là thứ để biết mình đang ở tài khoản nào (`N8`); cắt ở cuối "tran.nguyen.anh.tuan.khang@evond…" là mất đúng phần tên miền cần đọc. Đừng cho xuống dòng (`[overflow-wrap:anywhere]`): trình duyệt bẻ giữa tên miền "…@ev / ondev…", và dòng thứ hai trông như một mục riêng.
- **Tài khoản chỉ có một lối vào**: app có avatar trên header thì không có hàng profile ở đây, và ngược lại (`overlay.md`, "Menu tài khoản").
- **Menu mở lên trên** (`side="top"`, `align="start"`), **rộng đúng bằng hàng profile** (`w-(--radix-dropdown-menu-trigger-width)`), không lòi qua mép sidebar sang vùng nội dung, portal ra `body` (`I22`). Mục trong menu **cao 40px, bo 12px**, khung `rounded-2xl p-1`, xem `overlay.md`. Trong menu: email ở đầu (`text-xs text-muted`), rồi Hồ sơ, Giao diện, Cài đặt; **Đăng xuất ở cuối**, cách bằng đường chia, lúc thường trung tính, **rê vào thì đỏ** `rose` (`I4`).
- **Cài đặt ở trên khung là mục nav thường**, cùng style với các mục ở đầu sidebar (`foreground/70`, hover mờ). Đừng cho nó xám `--muted` hay tách riêng bằng đường kẻ.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex h-10 w-full cursor-pointer items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-xl px-1 text-left hover:bg-item-hover"
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
phải. **Thanh nền `--surface` (trắng như sidebar)**, không trong suốt trên nền trang: đầu sidebar
và thanh header thành một dải trắng liền trên cùng, nội dung xám nằm dưới. Các app đều để header
nền trắng; thanh trong suốt trông như chưa xong, và thanh dính đỉnh thì nội dung cuộn lên lộ ra
sau chữ. Thanh tách với nội dung bằng đường kẻ ngang `border-border` (luật chốt 18, `locked-rules.md`), **cùng độ cao `h-16` và cùng màu với đường dưới đầu sidebar** để thành một đường liền chạy ngang cả màn. Đường ngang này **không kéo theo đường kẻ dọc** cho sidebar: kẻ dọc chỉ có khi vùng nội dung cũng trắng (xem đầu mục).

```
┌──────┐░┌─────────────────────────────┐
│ w-60 │░│ header h-16                 │
├──────┤░├─────────────────────────────┤  <- hai đoạn cùng một đường
│ nav  │░│ nội dung                    │
└──────┘░└─────────────────────────────┘
        ↑ không kẻ dọc khi nội dung nền xám
```

## Nhóm nút bên phải thanh header

```
Phòng trọ                       ♡  🔔   Quản lý tin   Đăng nhập   [+ Đăng tin]
                                └ chỉ icon ┘  └──── ghost có chữ ────┘   └ nút đặc duy nhất
```

- **Một nút đặc**, là việc chính của cả sản phẩm (Đăng tin, Tạo mới), đặt **cuối hàng**. Còn
  lại là nút ghost. Màu nút đặc theo vai màu của dự án (`review.md`), nhưng **cùng chiều cao,
  cùng bo, cùng cỡ chữ** với nút ghost cạnh nó (`h-9`, `rounded-lg`, `text-sm font-medium`),
  không bóng màu (`M15`), không chữ `font-extrabold`.
- **Mục chỉ cần nhận ra, không cần đọc thì chỉ icon**: đã lưu (tim), thông báo (chuông, có
  chấm hay số khi có tin mới), giỏ. Chữ nằm ở `aria-label` và tooltip. Các trang rao vặt và
  đặt phòng lớn đều để tim và chuông chỉ icon. Mục có chữ tối đa khoảng ba.
- **Chữ nút ghost không nặng hơn tên trang** bên trái: `font-medium`, màu chữ thường hoặc
  `--muted`. Năm mục cùng `font-semibold` màu chữ chính là năm thứ tranh với tên trang.
- **Khoảng giữa các nút `gap-2`** (8px): padding của nút ghost đã là khoảng thở, `gap-2` tách
  nền rê của hai nút cạnh nhau cho khỏi dính. `gap-4` cộng padding thì hàng trải ra nửa header,
  đọc như menu trang giới thiệu. Đừng hạ xuống `gap-1` (4px): bốn nút sát nhau trông như một
  cục (chủ dự án nâng).
- **Mục đã có trong sidebar thì không lặp trên header** (luật "Hai chỗ một việc", `V1b`).
  Bỏ bên nào là quyết định của người dùng: đưa lên bảng, không chọn sẵn.
- **Liên hệ, hỗ trợ, tải app** không đứng cùng hàng với việc chính: để cuối sidebar hoặc
  trong menu tài khoản.
- Đăng nhập khi chưa có tài khoản là một nút ghost ("Đăng nhập"); đăng ký nằm trong màn đăng
  nhập. Dự án đã tô link đăng nhập bằng màu riêng thì giữ màu (vai màu), vẫn theo cỡ chung.

Wireframe đã vẽ năm mục cùng cỡ, một nút đặc thì đừng giữ header cũ của dự án: sáu mục icon +
chữ `font-semibold` cách nhau 32px, nút đặc bo tròn hẳn cao 30px chữ 13px `font-extrabold` có
bóng màu đứng giữa các nút bo 12px cao 34px chữ 14px. Probe đo "hàng nút trên header không
đồng cỡ".

## Đầu trang trong vùng nội dung

```
Khách hàng  ›  Khách hàng doanh nghiệp          <- chỉ các cấp CHA, là link
Công ty TNHH Minh Phát              [⤓ Xuất file] [+ Tạo đơn hàng]
Khách hàng từ 3/2024, 18 đơn hàng, doanh thu 1.284.500.000 đ
```

```tsx
<header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
  {/* flex-1: khối chữ lấy hết chỗ còn lại, không co theo dòng dài nhất */}
  <div className="min-w-0 flex-1">
    <Breadcrumb items={parents} />{/* ../../components/breadcrumb.md; hàng h-8 đã chừa khoảng, tên không mt */}
    <h1 className="text-xl font-semibold text-balance">{title}</h1>
    <p className="mt-1 max-w-[55ch] text-sm text-pretty text-muted">{description}</p>
  </div>
  <div className="flex shrink-0 gap-2">{actions}</div>
</header>
```

- **Đường dẫn chỉ ghi các cấp cha, không ghi trang đang đứng.** Tên trang nằm ngay dưới, ghi lại là lặp ("Cài đặt › Thành viên" rồi "Thành viên"). Ghi một chữ khác tên trang còn tệ hơn: "Khách hàng › Hồ sơ" trên đầu "Công ty TNHH Minh Phát", người đọc không biết mình đang ở đâu. Hình, đường dài, màn hẹp: `../../components/breadcrumb.md`.
- **Đường dẫn đặt ở MỘT chỗ.** App đã có đường dẫn trên thanh header `h-16` thì đầu trang không lặp lại, chỉ còn tên, mô tả, nút.
- **Một trang đúng một `<h1>`, và tên trang chỉ ghi MỘT chỗ.** Hai `<h1>` thì trình đọc màn hình không biết trang này tên gì ("Việc của tôi" trên header và "Tạo công việc mới" cùng là `<h1>`); không `<h1>` nào thì cũng vậy (bỏ đầu trang để khỏi lặp "Khách hàng", mất luôn `<h1>`). Chia theo loại trang:
  - **Trang không có đầu trang riêng** (danh sách, bảng quản lý, tổng quan, kanban): tên trên thanh header `h-16` **chính là `<h1>`**, giữ nguyên cỡ chữ của thanh (`text-base font-semibold`, cỡ chữ không đổi theo thẻ; 700 chỉ cho trang trình diễn, `T2`). Vùng nội dung không lặp lại tên; nút chính ("+ Thêm khách hàng") nằm cuối hàng công cụ cạnh ô tìm.
    - **Hàng công cụ không vừa một hàng mà tách hai thì nút chính lên cuối hàng TRÊN** (`ml-auto`,
      `shrink-0`), thẳng mép phải vùng nội dung; ô tìm, lọc xuống hàng dưới. Đừng để hàng dưới
      `flex` trơn nối nút chính sau ô lọc: nút lơ lửng giữa hàng, không thẳng với khối nào. Dưới `sm` giữ xếp dọc, nút chính rộng hết ở cuối: đưa lên hàng trên thì chữ ngày gãy dòng.
    - **Có điều hướng ngày** (lịch, lịch hẹn, báo cáo theo ngày) thì cụm `‹ [Hôm nay] ›` theo đúng
      trang lịch (`calendar.md`): ‹ › là `ghost` chỉ icon, chỉ "Hôm nay" có viền. Ba ô viền
      cạnh nhau là ba khối nặng cho một việc phụ.
  - **Trang có đầu trang riêng** (chi tiết bản ghi, form tạo, trang có mô tả hay nút riêng cho bản ghi): `<h1>` là tên trong đầu trang; thanh header chỉ ghi **cấp cha** ("Khách hàng" là link), bằng `<p>`/`<nav>`, không ghi lại tên trang.
  - Khung app nhận tên trang từ route rồi tự chọn thẻ: có đầu trang riêng thì `<p>`, không thì `<h1>`. Đừng để mỗi trang tự nhớ.
- **Tên trang `text-xl`**, trang chi tiết của một bản ghi (khách hàng, đơn, dự án) thì `text-lg` (`budgets.md`; `T9` chỉ cho nội dung lặp lại như bài viết, sản phẩm). Không `text-2xl`, `text-3xl`: đó là cỡ hero (`budgets.md`). `text-balance` để tên dài xuống dòng đều.
- **Khối chữ `min-w-0 flex-1`.** Thiếu `flex-1` thì khối co theo dòng dài nhất (thường là đường dẫn), mô tả bị ép xuống dòng ở nửa khung dù bên phải còn trống (sửa `max-w` không ăn vì bề rộng đã bị flex bóp trước).
- **Tên trang `font-semibold`, không `tracking-tight`** ở cỡ `lg`/`xl`. Tên trang là chữ đậm nhất vùng nội dung; nhạt hơn tiêu đề khối bên dưới là đảo thứ bậc.
- **Mô tả `max-w-[55ch] text-pretty`**: đủ rộng để một câu ngắn nằm một dòng, câu dài vẫn dưới 75 ký tự mỗi dòng (`T11`). Đừng dùng `max-w-2xl`: ở `text-sm` thực tế ~99 ký tự.
- **Nút bên phải, bám mép trên** (`sm:items-start`), `shrink-0`. Tối đa một nút `primary` (hành động chính của trang, `I3`), còn lại nút viền có icon (`I1`). Từ nút thứ ba thì gom vào nút `MoreHorizontal`.
- **Màn hẹp**: nút xuống dưới chữ, căn trái, giữ trên một hàng, không để hai nút trên một nút dưới (`../../responsive.md`).
- Không có mô tả, không có nút thì đầu trang chỉ còn tên, không chừa chỗ trống.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Sidebar**: nền trắng chứ không trùng nền trang; vùng nội dung nền xám thì **không `border-r`** giữa sidebar và nội dung; rê `hover:bg-item-hover`, mục đang chọn đậm hơn một bậc `bg-secondary` + `font-medium`, không màu nhấn, không viền (chủ dự án chốt; "rê và đã chọn cùng một nền" chỉ còn cho dòng bảng tick checkbox); hover vào thì icon và chữ cùng đậm lên; số đếm là số trơn `text-muted`, không pill, không badge màu brand (`I15`); nhãn nhóm IN HOA, giữa các nhóm không kẻ đường chia (chỉ khoảng trắng + nhãn), profile là hàng không viền có icon `ChevronsUpDown`, nhiều nhóm thì thu gọn được; thanh cuộn tự ẩn (`I18`); tên dài bị cắt thì rê vào có tooltip đủ tên, cả lúc sidebar mở; dưới `lg` sidebar là panel trượt trái, lớp phủ `bg-black/15`, 500/350ms đường cong sheet.
- [ ] **Thu gọn sidebar**: thu về dải icon `w-16`; **mục nào đang hiện lúc mở thì lúc thu vẫn hiện**, nhóm đang đóng vẫn đóng; nhãn nhóm chỉ `opacity-0` + `inert`, giữ chiều cao hàng, **thay bằng gạch ngắn `w-4` thẳng tâm icon**; màn thấp thì mép vùng nav mờ dần ở phía còn mục bị khuất; chấm góc icon chỉ cho số cần xử lý, cùng độ đậm với số lúc mở; mục đang chọn vẫn sáng và được cuộn vào tầm nhìn; lúc thu ẩn thanh cuộn (vẫn cuộn được); bấm mở/thu thì icon, logo, avatar ĐỨNG YÊN (không `justify-center`, không đổi padding), chữ không gỡ khỏi DOM mà bị cắt dần và mờ đi; mỗi icon có tooltip kèm số đếm; focus theo `I13` (`layouts/app/shell.md`).
- [ ] **Chân sidebar**: profile là một hàng `h-10` **không viền**, avatar không viền, icon `ChevronsUpDown` ở mép phải, cả hàng là nút mở menu; lúc thu rê vào thì vòng quanh avatar, không tô ô vuông; email ở đầu menu một dòng, chỉ cắt phần trước `@`, tên miền còn nguyên; menu rộng bằng hàng; Đăng xuất cuối menu, đỏ khi rê (`layouts/app/shell.md`). **Tải lại trang rồi bấm mở ngay lần đầu**, và thu/mở sidebar rồi bấm lại: menu có nằm sát nút không, hay trôi lên đầu sidebar? Menu tự dựng đo chiều cao trước khi có bề rộng là dính lỗi này (`layouts/overlay.md`).
