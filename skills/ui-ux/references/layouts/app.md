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
| Hàng ô số liệu | Gần như luôn. Bốn ô là vừa, sáu ô là bắt đầu loãng. Mobile xuống một cột, xem `../components/charts.md` |
| Biểu đồ xu hướng theo thời gian | Khi có dữ liệu tích luỹ theo tuần hoặc tháng |
| Danh sách tiến độ theo nhóm | Khi công việc chia được thành dự án hoặc nhóm |
| Việc cần làm hôm nay | Khi người dùng vào đây để bắt tay làm, không phải để xem báo cáo |
| Hoạt động gần đây | Khi có nhiều người cùng làm và cần biết ai vừa đụng gì |
| Bảng chi tiết | Khi màn này thay luôn cả trang danh sách. Có bảng rồi thì bỏ bớt widget |

Ba khối là mỏng cho một màn tổng quan. Bốn tới năm là vừa. Đề đòi quá sáu khối
thì vẫn dựng, lúc giao gợi ý một câu khối nào nên tách sang màn riêng.

Xem `../components/charts.md` cho công thức biểu đồ và luật màu.

**B. Cột trái điều hướng, nội dung phải** (khi có từ 5 mục điều hướng trở lên)

Xem mục **Khung app có sidebar** bên dưới cho công thức đầy đủ.

---

## Khung app có sidebar

```
┌──────────────┬──────────────────────────────────────┐
│ ◐ Tên tổ chức ⌄ │ Trang / Mục hiện tại      [nút][nút]│
│ [tìm      /] ├──────────────────────────────────────┤
│              │                                      │
│ ⌂ Trang chủ  │                                      │
│ ✉ Hộp thư  20│  <- số đếm căn phải                  │
│ ☑ Việc       │                                      │
│──────────────│  <- đường chia chạy hết bề ngang     │
│ CÔNG VIỆC  ⌄ │  <- nhãn nhóm IN HOA, bấm để thu gọn │
│ ▤ Dự án    4 │                                      │
│ ▦ Tài liệu   │                                      │
│──────────────│                                      │
│ KINH DOANH › │  <- nhóm đang thu gọn                │
│              │                                      │
│ ⚙ Cài đặt    │                                      │
│ ◐ Tên người ⋯│  <- ghim đáy                         │
└──────────────┴──────────────────────────────────────┘
```

- **Sidebar nền trắng `--surface`**, tách vùng nội dung bằng **một đường kẻ dọc** `border-r border-border-strong`. **Đừng để sidebar trong suốt** ăn theo `--background` của trang: sidebar xám trùng nền trang thì cả màn thành một mảng xám, không còn ranh giới nào (đã dính 21/09/2026).
- **Rộng `w-60` tới `w-64`**, cố định, `shrink-0`.
- **Hover và đang chọn CÙNG một nền mờ** `--background` (bậc xám nhạt nhất). Mục đang chọn phân biệt bằng chữ `font-medium` và việc nền **đứng yên**, không bằng nền đậm hơn. Đừng dùng `--secondary` cho mục đang chọn: trên sidebar trắng nó đậm quá, thành một mảng xám nặng (đã dính 21/09/2026). **Không tô màu nhấn**, không viền.
- **Mỗi link cao 40px** (`h-10`, `px-3`), bo `rounded-xl` 12px theo luật bo-theo-chiều-cao `F1`. Link 36px trông chật, nền hover lọt thỏm; 40px thì hàng thoáng và bấm trúng dễ hơn.
- **Icon và chữ đi cùng nhau.** Lúc thường cả hai `text-foreground/70`: dịu hơn chữ chính nhưng **không mờ tới `--muted`**, xám `--muted` trên nền trắng là đọc không ra tên mục. Hover hay đang chọn thì **cả icon lẫn chữ** lên `text-foreground`. Đặt màu trên phần tử `<a>`, icon dùng `currentColor`, đừng gán màu riêng cho icon, nếu không hover chỉ sáng mỗi chữ.
- **Nhãn nhóm IN HOA, chữ XÁM**: `text-xs font-medium uppercase tracking-wide text-muted`, hover mới lên `text-foreground`. IN HOA đã đủ tách nhãn khỏi link, nên nhãn phải **nhạt hơn** mục con, không đậm hơn: nhãn đen `--foreground` cộng IN HOA thì nặng nhất cột, lấn cả mục đang chọn (đã dính 21/09/2026). Viết thường thì nhãn nhóm trông y như một mục nav nhạt màu, mắt không tách được đâu là tiêu đề, đâu là link (đã dính 21/09/2026). Chữ trong dữ liệu vẫn viết thường ("Công việc"), IN HOA bằng CSS, để screen reader không đánh vần từng chữ.
- **Đường chia giữa các nhóm**: `border-t border-border-strong` trên mỗi nhóm trừ nhóm đầu. Chỉ khoảng trắng thì không đủ khi sidebar dài và cuộn: mắt không còn thấy khoảng hở giữa nhóm cũ và nhóm mới.
- **Mọi đường kẻ trong sidebar dùng `--border-strong`**: kẻ dọc tách nội dung, kẻ dưới đầu sidebar, kẻ chia nhóm, kẻ trên chân sidebar, **và viền khung profile**. Trên nền trắng, `--border` (`#f7f7f8`) gần như tàng hình, đường chia mất tác dụng (đã dính 21/09/2026). Cả sidebar một màu viền, không chỗ rõ chỗ mờ.
- **Đường kẻ chạy HẾT bề ngang sidebar, mép chạm mép.** Không để padding của vùng nav cắt cụt hai đầu đường. Cách làm: vùng nav chỉ có padding dọc (`py-3`), padding ngang đặt trên **từng nhóm** (`px-3`), đường kẻ nằm trên phần tử nhóm nên tự dài hết. Đừng vá bằng `-mx-3`: đổi padding một chỗ là đường lệch.
- **Sidebar nhiều link thì nhóm thu gọn được.** Từ **3 nhóm có nhãn trở lên**, hoặc tổng số mục đủ để sidebar phải cuộn: nhãn nhóm thành một **nút rộng hết hàng** (`I29`), chevron ở mép phải (`ChevronDown` `size-4`, xoay `-rotate-90` khi đóng), có `aria-expanded`. Hover nhãn là nền `--background` như mục nav.
  - **Nút nhãn cùng khuôn với mục con**: cùng `h-10 px-3`, cùng `rounded-xl`. Đặt chiều cao bằng `h-10` chứ không bằng `py`, vì chữ `text-xs` của nhãn thấp hơn chữ `text-sm` của link, dùng `py` là nút nhãn lùn hơn hàng con. Mép trái chữ nhãn thẳng mép icon con, chevron thẳng mép phải badge.
  - **Mục con không thụt vào, không đường dọc.** Nhóm ở đây là *phân khu*, các mục con ngang hàng nhau và đã có icon riêng. Thụt vào cộng đường dọc là ngôn ngữ của **cây lồng nhau**, và nó ăn mất 16-20px của cột vốn đã hẹp, chữ dài bị cắt sớm hơn.
  - Chỉ thụt + đường dọc khi đó là **menu con của một link** (Dự án ▸ Dự án A, Dự án B): mục con **không icon**, thụt để chữ thẳng mép chữ của link cha, đường dọc `border-l border-border-strong` chạy ở tâm icon cha. Mục con đang chọn thì đoạn đường dọc của nó đậm lên `--foreground`.
  - **Mở/đóng có animation trượt**, không chớp giật: `grid` với `grid-rows-[1fr]` ↔ `grid-rows-[0fr]`, con bọc `overflow-hidden min-h-0`, `transition-[grid-template-rows] duration-200 ease-out`. Chevron xoay cùng `duration-200`. Không đo chiều cao bằng JS. Thêm `motion-reduce:transition-none`. Nhóm đang đóng gắn `inert` để Tab không lọt vào link đã ẩn.
  - Nhóm đầu không nhãn (Tổng quan, Hộp thư) thì luôn mở, không thu gọn.
  - Mặc định **mở hết**. Nhóm chứa trang đang xem thì **không được đóng lúc tải trang**, nếu không người ta không thấy mình đang ở đâu.
- **Thanh cuộn của sidebar tự ẩn** theo `I18`: đứng yên không thấy, rê vào hoặc đang cuộn mới hiện, 4px. Thanh cuộn xám đứng yên chạy dọc sidebar trắng là thứ nặng nhất trên cột, nặng hơn cả chữ (đã dính 21/09/2026).
- **Số đếm căn phải**, là **pill trắng viền mảnh chữ xám**, hoặc số trơn `text-muted`. **Cả sidebar chọn đúng một kiểu**, không mục pill mục trơn. **Không badge màu brand**, xem `../components/small-controls.md`.

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
- Mobile thì sidebar ẩn, mở bằng nút, trượt từ trái. Xem `overlay.md`.

### Thu gọn sidebar (từ `lg` trở lên)

```
Mở                                 Thu gọn
┌──────────────────┐               ┌──────┐
│ ◐ Evondev Studio │               │  ◐   │
├──────────────────┤               ├──────┤
│ ⌂ Tổng quan      │               │  ⌂   │
│ ✉ Hộp thư    99+ │               │  ✉⁹⁹⁺│  <- badge đè góc icon
│ ▦ Lịch           │               │  ▦   │
├──────────────────┤               │      │  <- các nhóm có nhãn: ẨN
│ CÔNG VIỆC      › │               │      │
│ KINH DOANH     › │               │      │
├──────────────────┤               ├──────┤
│ ⚙ Cài đặt        │               │  ⚙   │
│ [◐ Tên người   ⋮]│               │  ◐   │  <- chỉ avatar, vẫn mở menu
└──────────────────┘               └──────┘
```

Mặc định là **thu về dải icon**, không ẩn hẳn. Ẩn hẳn (bề rộng về 0) chỉ làm khi
người dùng yêu cầu.

- **Dải icon chỉ hiện nhóm đầu**, tức nhóm không nhãn (Tổng quan, Hộp thư, Lịch). **Mọi nhóm có nhãn đều ẩn**, kể cả nhóm đang mở. Bung hết icon của mọi nhóm thì thành một cột mười mấy icon không chữ, không ai phân biệt được Khách hàng với Thành viên, và nó bỏ qua luôn trạng thái đóng/mở nhóm người dùng vừa chọn (đã dính 21/09/2026). Muốn vào các nhóm đó thì mở sidebar ra.
  - Hệ quả cho việc xếp dữ liệu: **nhóm đầu là những mục dùng hằng ngày**, 3–5 mục, vì đó là thứ duy nhất còn lại khi thu gọn.
  - Trang đang xem nằm trong nhóm bị ẩn thì dải icon không có mục nào đang chọn. Chấp nhận, tiêu đề trang ở header đã nói người ta đang ở đâu.
- **Chân sidebar giữ lại**: Cài đặt thành icon, khung profile thành **chỉ avatar**, bấm vẫn mở menu tài khoản như cũ.
- **Mỗi icon có tooltip** là tên mục, hiện bên phải. Link giữ `aria-label` bằng tên mục vì chữ đã ẩn.
- **Dải rộng `w-16` (64px)**. Link vẫn là link cũ, `h-10 w-full px-3 rounded-xl`, chỉ bị bề rộng sidebar bóp lại còn 40px, thành ô vuông. Hover và đang chọn như link thường.
- **Icon đứng YÊN một chỗ ở cả hai trạng thái. Không bao giờ `justify-center`.** Thu gọn mà căn giữa, mở ra lại căn trái, thì lúc bấm mở icon và logo nhảy từ giữa sang trái rồi chữ mới bật ra, cả sidebar như "bung từ giữa", khựng (đã dính 21/09/2026). Cách làm: mọi thứ **căn trái**, và padding tính sao cho tâm icon rơi đúng **32px** (giữa dải 64px) ngay khi căn trái:

  | Phần tử | Tính | Tâm |
  | --- | --- | --- |
  | Icon link `size-4` | nav `px-3` 12 + link `px-3` 12 + nửa icon 8 | 32 |
  | Logo `size-8` ở đầu sidebar | header `px-4` 16 + nửa logo 16 | 32 |
  | Avatar `size-8` trong khung profile | chân `px-3` 12 + viền 1 + `p-[3px]` 3 + nửa avatar 16 | 32 |

  Khung profile vì thế cao đúng 40px (32 + 2×3 + 2×1), khớp luật 40px/12px. Lúc mở và lúc thu dùng **cùng** các padding này, không đổi padding theo trạng thái.
- **Badge đè lên góc trên phải của icon**, không nằm cạnh: `absolute left-5 top-1` (neo theo icon, không neo theo mép link), cùng kiểu pill trắng viền `--border-strong` với badge lúc mở (một kiểu cho cả sidebar), thu nhỏ `h-4 min-w-4 px-1 text-[10px] leading-none`. Thêm `ring-2 ring-surface` để pill tách khỏi nét icon bên dưới. Vẫn rút gọn `99+`.
- **Đường kẻ chia nhóm và kẻ dưới đầu sidebar vẫn chạy hết bề ngang dải.**
- **Chuyển động: chỉ bề rộng chạy, bố cục bên trong không đổi.** `<aside>` `overflow-hidden`, `transition-[width] duration-200 ease-out motion-reduce:transition-none`, `w-64` ↔ `w-16`.
  - **Chữ luôn nằm trong DOM**, `whitespace-nowrap`, bị mép sidebar **cắt dần** khi thu và **lộ dần** khi mở, như kéo rèm. Không `hidden`, không render có điều kiện: gỡ chữ ra rồi gắn lại là nó bật "phựt" một cái, và bố cục tính lại làm icon xê dịch.
  - Chữ, tên workspace, badge cạnh chữ, nhãn nhóm thêm `transition-opacity duration-150`, thu thì `opacity-0`. Mờ đi cùng lúc bị cắt thì không thấy nửa chữ lơ lửng ở mép.
  - **Badge có HAI bản, chuyển bằng opacity**: bản cạnh chữ (`ml-auto`) mờ đi, bản đè góc icon (`absolute`) hiện lên. Đừng di chuyển một badge từ chỗ này sang chỗ kia, nó sẽ bay chéo qua sidebar.
  - **Nhóm có nhãn mờ đi tại chỗ** (`opacity-0` + `inert`), không gỡ ra. Gỡ ra thì chiều cao nav đổi, thanh cuộn nhảy.
- Có nhớ trạng thái thu/mở hay không, có phím tắt hay không là việc của người dùng. Nếu đề có phím tắt thì ghi nó trong tooltip của nút toggle.
- **Nút toggle ở đầu header vùng nội dung**, icon `PanelLeftClose` khi đang mở, `PanelLeftOpen` khi đang thu. Nút ghost `size-10 rounded-xl`, có `aria-label` và `aria-expanded`. **Không vòng viền khi focus** (`I13`): `outline-hidden focus-visible:bg-background`. Viền xám dày quanh nút sau khi bấm là focus ring của trình duyệt lọt ra, không phải thiết kế (đã dính 21/09/2026).

```tsx
// MỘT link cho cả hai trạng thái. Không justify-center, không đổi padding:
// icon đứng yên, chỉ chữ bị mép sidebar cắt dần.
<Link
  to={item.href}
  aria-label={isCollapsed ? item.label : undefined}
  className="relative flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm whitespace-nowrap text-foreground/70 hover:bg-background hover:text-foreground"
>
  <item.icon className="size-4 shrink-0" aria-hidden />
  <span className={cn("min-w-0 flex-1 truncate transition-opacity duration-150", isCollapsed && "opacity-0")}>
    {item.label}
  </span>

  {hasCount && (
    <>
      {/* Bản cạnh chữ, lúc mở. */}
      <span className={cn("shrink-0 rounded-full border border-border-strong bg-surface px-2 py-px text-xs font-medium tabular-nums text-muted transition-opacity duration-150", isCollapsed && "opacity-0")}>
        {formatSidebarCount(item.count)}
      </span>
      {/* Bản đè góc icon, lúc thu. left-5 = px-3 + gần hết icon. */}
      <span className={cn("absolute left-5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-border-strong bg-surface px-1 text-[10px] font-medium leading-none tabular-nums text-muted ring-2 ring-surface transition-opacity duration-150", !isCollapsed && "opacity-0")}>
        {formatSidebarCount(item.count)}
      </span>
    </>
  )}
</Link>
```

### Chân sidebar

```
│ ⚙ Cài đặt                │  <- mục nav thường, cùng style các mục trên
│ ╭──────────────────────╮ │
│ │ ◐  Trần Nguyễn A…  ⋮ │ │  <- MỘT khung, cả khối là nút, bấm ra menu
│ ╰──────────────────────╯ │
```

- **Profile nằm trong một khung**: `h-10 rounded-xl border border-border-strong bg-surface`, padding `p-[3px] pr-3`: avatar `size-8` vừa khít chiều cao 40px, và tâm avatar thẳng tâm icon khi sidebar thu gọn (xem bảng ở mục Thu gọn sidebar). **Viền `--border-strong`, cùng màu mọi đường kẻ khác trong sidebar.** Từng để `--border` cho khớp viền dropdown, nhưng đặt cạnh các đường kẻ `--border-strong` thì khung profile là chỗ duy nhất mờ, trông lệch (đã dính 21/09/2026). Đừng để avatar, tên, email trôi tự do trên nền sidebar (đã dính 21/09/2026: trông như chữ rơi ra khỏi layout, không ai biết đó là chỗ bấm được).
- **Cả khung là một `<button>`**, là trigger của dropdown/popover (`I29`). Hover `bg-background`. Đừng làm riêng nút ba chấm nhỏ ở góc: bấm vào tên mà không có gì xảy ra là người ta tưởng app bị đơ.
- **Dấu ba chấm dọc** `EllipsisVertical` `size-4 text-muted` ở mép phải, `ml-auto`. Đó là dấu hiệu duy nhất cho biết "bấm vào đây ra menu".
- **Trong khung chỉ có avatar + tên**, `truncate`. Email không nằm trong khung: hai dòng bị cắt `…` cạnh nhau thì đọc không ra dòng nào. Email đưa lên **đầu menu**, ở đó có đủ chỗ.
- Avatar `size-8`, `rounded-lg` hoặc tròn, theo `../components/avatar.md`.
- **Menu mở lên trên** (`side="top"`, `align="start"`), rộng bằng khung hoặc hơn, portal ra `body` (`I22`). Mục trong menu **cao 40px, bo 12px**, khung `rounded-2xl p-1`, y như link sidebar ngay bên dưới, xem `overlay.md`. Trong menu: email ở đầu (`text-xs text-muted`), rồi Hồ sơ, Giao diện, Cài đặt; **Đăng xuất ở cuối**, cách bằng đường chia, chỉ đỏ `rose` khi rê vào (`M4`).
- **Cài đặt ở trên khung là mục nav thường**, cùng style với các mục ở đầu sidebar (`foreground/70`, hover mờ). Đừng cho nó xám `--muted` hay tách riêng bằng đường kẻ.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex h-10 w-full cursor-pointer items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-xl border border-border-strong bg-surface p-[3px] pr-3 text-left hover:bg-background"
    >
      <Avatar name={user.name} src={user.avatarUrl} className="size-8" />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {user.name}
      </span>
      <EllipsisVertical className="size-4 shrink-0 text-muted" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent side="top" align="start" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl p-1">
    {/* Mỗi DropdownMenuItem: h-10 rounded-xl px-3, như link sidebar. */}
    <DropdownMenuLabel className="truncate text-xs font-normal text-muted">{user.email}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {/* Hồ sơ, Giao diện, Cài đặt… */}
    <DropdownMenuSeparator />
    {/* Đăng xuất */}
  </DropdownMenuContent>
</DropdownMenu>
```

Vùng nội dung có **thanh tiêu đề riêng** ở trên: đường dẫn ở trái, nhóm nút ở
phải. Thanh đó cũng tách bằng đường kẻ ngang `--border-strong`, cùng màu với kẻ dọc của sidebar để hai đường gặp nhau liền mạch, không tách bằng nền.

```
┌──────┬──────────────────────────────┐
│ w-60 │ header h-16                  │
│ nav  ├──────────────────────────────┤
│      │ nội dung                     │
└──────┴──────────────────────────────┘
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
    <p className="mt-1 max-w-2xl text-sm text-pretty text-muted">{description}</p>
  </div>
  <div className="flex shrink-0 gap-2">{actions}</div>
</header>
```

- **Đường dẫn chỉ ghi các cấp cha, không ghi trang đang đứng.** Tên trang nằm ngay dưới, ghi lại là lặp ("Cài đặt › Thành viên" rồi "Thành viên"). Ghi một chữ khác tên trang còn tệ hơn: "Khách hàng › Hồ sơ" trên đầu "Công ty TNHH Minh Phát", người đọc không biết mình đang ở đâu (đã dính 22/09/2026). Mỗi mục cha là link. Mục dài thì `max-w-48 truncate` kèm `title`.
- **Đường dẫn đặt ở MỘT chỗ.** App đã có đường dẫn trên thanh header `h-16` thì đầu trang không lặp lại, chỉ còn tên, mô tả, nút.
- **Tên trang `text-xl`**, trang chi tiết của một bản ghi (khách hàng, đơn, dự án) thì `text-lg` theo `T9`. Không `text-2xl`, `text-3xl`: đó là cỡ hero (`budgets.md`). `text-balance` để tên dài xuống dòng đều.
- **Khối chữ `min-w-0 flex-1`.** Thiếu `flex-1` thì khối co theo dòng dài nhất (thường là đường dẫn), mô tả bị ép xuống dòng ở nửa khung dù bên phải còn trống (đã dính 22/09/2026, sửa `max-w` không ăn vì bề rộng đã bị flex bóp trước).
- **Tên trang `font-semibold`, không `tracking-tight`** ở cỡ `lg`/`xl`. Tên trang là chữ đậm nhất vùng nội dung; nhạt hơn tiêu đề khối bên dưới là đảo thứ bậc.
- **Mô tả `max-w-2xl text-pretty`**: đủ rộng để một câu ngắn nằm một dòng, không cắt đôi cụm "doanh thu / 1.284.500.000 đ", vẫn dưới 75 ký tự mỗi dòng ở câu dài (`T11`).
- **Nút bên phải, bám mép trên** (`sm:items-start`), `shrink-0`. Tối đa một nút `primary` (hành động chính của trang), còn lại nút viền có icon (`I1`). Từ nút thứ ba thì gom vào nút `MoreHorizontal`.
- **Màn hẹp**: nút xuống dưới chữ, căn trái, giữ trên một hàng, không để hai nút trên một nút dưới (`../responsive.md`).
- Không có mô tả, không có nút thì đầu trang chỉ còn tên, không chừa chỗ trống.

---

## Bảng kanban

```
Cần làm      4    Đang làm     3    Chờ duyệt    2    Xong        3
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ tiêu đề việc │  │ tiêu đề việc │  │ tiêu đề việc │  │ ✓ tiêu đề    │
│ dự án · hạn  │  │ dự án · hạn  │  │ dự án · hạn  │  │ dự án · xong │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│ ...          │  │ ...          │
└──────────────┘  └──────────────┘
```

- **Cột không tô màu riêng.** Tên cột cộng số đếm là đủ. Bốn cột bốn màu là dấu hiệu chưa quyết định được cái nào quan trọng, và nó phá luật một màu nhấn.
- **Thẻ là card thật**, đây là ngoại lệ hợp lệ của luật `F3`: thẻ kanban là vật kéo thả được, không phải một dòng trong danh sách.
- **Thẻ `p-4`, gap giữa thẻ `gap-3`, gap giữa cột `gap-4`.** Xem `budgets.md`. Đừng hạ xuống `p-3`, chật.
- **Tiêu đề việc không `truncate`**, cho xuống tối đa hai dòng rồi mới cắt. Thẻ hẹp mà cắt một dòng thì đọc không ra việc gì.
- **Màn hẹp thì cuộn ngang trong khung**, mỗi cột `w-[280px] shrink-0`, không wrap thành hai hàng. Xem luật `R6` trong `../responsive.md`. Lề đặt trên hàng bên trong (`flex gap-4 px-3`), không đặt trên khung cuộn, nếu không cột cuối dính sát mép.
- **Cột rỗng vẫn phải chiếm chỗ**, xem `../components/empty-state.md`.
- Quá năm cột thì hỏi xem có nên gộp bớt trạng thái không.

**Code mẫu đã duyệt: `app-kanban.html`.** Chép cấu trúc từ đó, đừng dịch lại từ
mấy gạch đầu dòng trên. File đó đã qua vòng tra tấn 375px, cuộn ngang có lề hai
đầu, chip cuộn ngang, thẻ `p-4`, chip lọc `h-9`.

---

## Danh sách có bộ lọc

```
┌─────────────────────────────────────┐
│ Tiêu đề              [+ Thêm mới]   │
│ tab  [tab]  tab           [tìm    ] │  <- chọn một: tab; chọn nhiều: chip
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

Bảng quản lý (khách hàng, đơn hàng, thành viên…) có tìm, lọc, phân trang, chọn
nhiều dòng. Bộ mặc định, dựng đủ không hỏi:

```
Khách hàng                                       [+ Thêm khách hàng]
[Tất cả 32] Đang giao dịch 18  Tiềm năng 9  Ngừng 5   [tìm…] [Lọc]
┌──────────────────────────────────────────────────────────────────┐
│ ☐  Khách hàng ↕     Công ty      Trạng thái      Doanh thu ↕   ⋯ │
├──────────────────────────────────────────────────────────────────┤
│ ☐  ⬤ Tên            Công ty      (● Đang GD)     184.500.000 đ  ⋯ │
│ ☐  ⬤ Tên            Công ty      (● Tiềm năng)             0 đ  ⋯ │
├──────────────────────────────────────────────────────────────────┤
│ 1 tới 10 trong 32 khách hàng        Mỗi trang [10▾]  ‹ 1 2 3 4 › │
└──────────────────────────────────────────────────────────────────┘

Khi có dòng được chọn, hàng tab + tìm được THAY bằng:
[Đã chọn 3 · Bỏ chọn]                                     [Xoá 3 dòng]
```

- **Tab trạng thái** ở trên bảng theo "Thanh tab" trong `../components/small-controls.md`: tab đang chọn ô nền nhạt `--surface-hover` viền mảnh, không chip đen đặc. "Bộ lọc" trong đề không chỉ là hàng tab: các trường khác (công ty, người phụ trách, khoảng ngày) vào nút **Lọc** mở popover.
- **Hover dòng `hover:bg-surface-hover`**, không `hover:bg-background` (`I10`). Dòng chạm hai mép khung trắng mà tô màu nền trang là trông như thủng.
- **Cột trạng thái là badge màu** theo `M7`, không chấm xám + chữ đen.
- **Hành động dòng** theo `I11`: 1–2 cái thì icon button luôn hiện ở cột cuối; từ 3 cái hoặc có xoá thì một nút `MoreHorizontal` ra dropdown. Cột cuối hẹp `w-12`, căn phải, không tiêu đề (có `<span class="sr-only">Thao tác</span>`).
- **Chọn nhiều dòng:** checkbox đầu dòng, checkbox tiêu đề có ba trạng thái (không / một phần / tất cả trong trang). Có dòng được chọn thì **thanh hành động hàng loạt thay chỗ** hàng tab, cùng chiều cao để bảng không nhảy. Xoá hàng loạt luôn qua hộp xác nhận (`../layouts/overlay.md`), nói rõ số dòng.
- **Mỗi ô một dòng.** Tên công ty dài thì `truncate` với `max-w` và `title` đầy đủ, không cho xuống ba dòng: một dòng cao gấp ba làm cả bảng mất nhịp. Ô hai tầng (tên + email) là ngoại lệ duy nhất, và mọi dòng đều hai tầng như nhau.
- **Giá trị trống thống nhất một kiểu**: `—` màu `text-muted`. Không chỗ "Chưa có", chỗ "Khách lẻ", chỗ để trống.
- **Số căn phải, `tabular-nums`**, tiêu đề cột số cũng căn phải. Cột số, ngày có sắp xếp thì tiêu đề là nút có icon mũi tên.
- **Dòng tiêu đề bảng** `text-xs font-medium text-muted`, nền `--surface`, chia với thân bằng `--border`.
- Phân trang có tổng số và vị trí đang xem (`I16`), dựng theo "Phân trang" trong `../components/small-controls.md`: một trang thì ẩn nav, không có dòng thì ẩn cả footer. Màn hẹp thì bảng cuộn ngang trong khung (`R9`).

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
- Không viết chữ giải thích dưới mọi dòng. Chỉ giải thích thứ thật sự khó đoán.
- Vùng nguy hiểm tách xuống cuối cùng.
- **Mặc định dựng kiểu không có nút "Lưu thay đổi" tổng**: mỗi dòng chừa chỗ cho một dấu "Đã lưu" nhỏ cạnh điều khiển. Lưu lúc nào, gọi gì là việc của người dùng, skill chỉ để handler rỗng (`onChange`). **Không trộn hai kiểu trên một trang**: vừa có nút Lưu vừa có toggle không cần Lưu thì người dùng không biết bật xong có phải bấm Lưu không. Đề muốn có nút Lưu thì mọi điều khiển đều chờ nút đó, và dựng thêm trạng thái nút khoá khi chưa có gì đổi.

**B. Tab dọc bên trái** (từ 15 tuỳ chọn trở lên, hoặc trên 4 nhóm)
