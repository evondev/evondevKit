# Trạng thái và tương tác — luật I

Nguồn duy nhất cho nút, hover, focus, danh sách, modal. Con số ở `budgets.md`.

---

## Nút

> **⚠️ Đảo luật.** Bản cũ của skill này viết "ba variant `primary` / `ghost` /
> `danger`, không outline" và "nút mặc định không icon". **Cả hai đã bỏ.** Chủ dự
> án chốt ngược lại ở focus.camp ngày 13/09/2026. Đừng hồi sinh luật cũ.

**I1. Nút mặc định là viền + icon, không phải nền màu nhấn.**

Dựng nút mới → nút viền, icon lucide **bên trái** chữ.

*Vì sao:* nguyên lời chủ dự án — *"không nên để brand bị nhiều màu quá trong dự
án"*. Nút nền nhấn rải khắp nơi thì màu thương hiệu loang ra, tới lúc có một nút
**thật sự** cần nổi thì nó không nổi được nữa. Cùng tinh thần với `M2`.

| Loại nút | Dùng |
| --- | --- |
| Mặc định: thêm, sửa, mở, lọc, xem… | viền + icon trái + chữ |
| Hành động chính **duy nhất** của một khu, thật cần nổi | nền màu nhấn |
| Nút phụ cần rõ hơn ghost: nút rộng hết card, nút cạnh `primary` | nền `--secondary`, không viền |
| Chỉ icon | nút cỡ icon, có `aria-label`, cao bằng nút chữ cạnh nó |
| Xoá (nút đứng riêng) | nền `rose-500/10` + chữ `rose-700` lúc nào cũng hiện, rê vào nền đậm lên `/15` |

**I2. Chọn nền màu nhấn thì nói một câu lý do.** Nộp bài, thanh toán, tham gia —
những chỗ đó hợp lệ. Nhưng phải là một lựa chọn, không phải mặc định.

**I3. Trong một nhóm lựa chọn chỉ một nút được là nút chính.** Ba nút đặc màu như
nhau là chưa quyết định hộ người dùng.

**I4. Hành động nguy hiểm không đỏ đặc.**

Áp cho xoá, **đăng xuất**, huỷ tài khoản, rời nhóm. Có hai dạng tuỳ chỗ đứng:

| Chỗ | Lúc thường | Rê vào / Tab tới |
| --- | --- | --- |
| **Nút đứng riêng** — hàng nút, hộp xác nhận, khu nguy hiểm | nền `rose-500/10`, chữ + icon `rose-700` | nền `rose-500/15` |
| **Mục trong menu** — dropdown, sidebar, đăng xuất | trung tính như mục khác | chữ + icon đỏ, nền `rose-500/10` |

Nút thì nền mờ đỏ luôn hiện (chủ dự án chốt 21/09/2026), code ở
`components/button.md`. Không bao giờ `bg-rose-500 text-white`, không viền đỏ.

Phần dưới là cho **mục trong menu**. Khi rê vào thì đổi **cả hai**: chữ (kèm icon) sang đỏ, nền sang đỏ rất mờ.

```html
<button class="group text-foreground hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-400">
  <i data-lucide="log-out" class="size-4 text-muted group-hover:text-rose-700 dark:group-hover:text-rose-400"></i>
  Đăng xuất
</button>
```

"Trung tính" nghĩa là **trông y như các mục khác cùng chỗ** — trong menu thì chữ
`--foreground` như mọi mục, trong hàng nút thì là nút phụ. Không có nghĩa là
`text-muted`: mục đăng xuất mà nhạt hơn các mục khác thì đọc ra là đã bị khoá
(`I8`).

- **Nền đỏ ~10%**, không hơn (nút đứng riêng được `/15` lúc rê vào vì nó đã sẵn `/10`). Đậm hơn thì nó thành một dải màu cảnh báo, không còn là trạng thái rê chuột.
- **Icon đổi màu cùng chữ.** Icon lúc thường là `text-muted`, nên phải có **`group` ở hàng** và `group-hover:text-rose-700` ở icon. Thiếu `group` thì `group-hover` im lặng không chạy — chữ đỏ mà icon còn xám, và không có lỗi nào báo.
- Chỉ mục nguy hiểm được đỏ. Các mục khác trong cùng menu vẫn hover về nền xám như `I10`.
- Mục nguy hiểm trong menu thì **tách xuống cuối**, cách bằng một đường chia.

**I5. Nút màu nhấn đang có thì KHÔNG đi quét đổi hàng loạt.** Chỉ đổi sang viền +
icon khi đang được yêu cầu sửa UI/UX ở đúng khu đó, và ghi vào nhật ký. Quét hàng
loạt là một PR không ai duyệt nổi.

**I6. Không đẻ ma trận variant nhân size.** Cần nút khác cỡ thì truyền
`className`. Một bản `Button` ở project cũ của bro đã phình lên 8 variant, 3 size
và một variant `glow` dùng ba lớp radial gradient — đó là ví dụ ngược.

**I7. "Xem tất cả", "Đọc thêm" là nút, không phải link chữ.**

Đây là hành động dẫn sang một màn khác, nên nó phải trông bấm được.

- Dùng **nút phụ**, không viền phát sáng, không icon mũi tên.
- **Căn phải.** Khối có header thì đặt ở header bên phải, cùng hàng với tiêu đề. Danh sách phải đọc hết mới bấm thì đặt cuối khối, vẫn căn phải, vẫn **trong khung** (xem `F3`).

**I8. Nút phụ không được trông như đã bị khoá.** Chữ nhạt trên nền nhạt thì người
dùng đọc ra là nút disabled. Chênh lệch nền của nút phụ với nền cha phải **thấy
được khi liếc**.

---

## Hover và focus

**I9. Mọi phần tử bấm được phải CÓ hover, và hover đó phải nhìn thấy được.**

Hai vế, hay sót vế đầu. Đổi màu xong tự hỏi: chênh lệch này có nhận ra khi liếc
không.

⚠️ **Nút `primary` là chỗ bị quên nhiều nhất.** Nó đã nổi sẵn nên nhìn tĩnh thấy
ổn, và người dựng bỏ qua. Nhưng nút chính của cả màn mà rê vào không phản hồi gì
thì nó là thứ duy nhất trong trang trông như ảnh chụp. Luôn có
`hover:bg-primary-hover` — token đã có sẵn trong `tokens.css`, không phải tự chế
màu.

**I10. Hover của một dòng là một lớp nền nhẹ, không tô đậm lên, không phóng to.
Nền hover không bao giờ trùng màu nền trang.**

Chọn token theo **nền hover có chạm hai mép khung hay không**:

| Dòng | Hover | Vì sao |
| --- | --- | --- |
| **Thụt vào**, có bo góc, cách mép khung một khe: mục menu, link sidebar, dòng danh sách trong widget | `hover:bg-background` | Nền xám nằm gọn trong khung trắng, mắt đọc ra một viên được ấn xuống |
| **Tràn hết bề ngang**, chạm hai mép khung trắng: dòng bảng, danh sách chia `divide-y` sát mép | `hover:bg-surface-hover` | Tô `--background` thì dòng đó cùng màu với nền trang bên ngoài khung, trông như khung bị khoét thủng một dải (đã dính 21/09/2026, bảng khách hàng) |

Dòng **đang chọn** (tick checkbox) của bảng cũng dùng `--surface-hover`, giữ
nguyên khi rê vào. Dấu hiệu chính của "đã chọn" là checkbox, nền chỉ phụ hoạ.

**I11. Hành động trên dòng: ít thì hiện thẳng, nhiều thì gom vào nút ba chấm.**

| Số hành động của một dòng | Cách hiện |
| --- | --- |
| **1–2**, không có hành động nguy hiểm | Icon button `h-8` nằm thẳng trong dòng, cột cuối căn phải. Danh sách thì mờ lúc thường, hiện khi rê vào dòng. **Bảng thì luôn hiện**, chữ `text-muted`: bảng dài người ta dò theo cột, nút lúc có lúc không làm cột cuối nhảy |
| **Từ 3 trở lên**, hoặc có xoá | **Một** nút `MoreHorizontal` luôn hiện ở cột cuối, bấm ra dropdown. Hành động hay dùng nhất (thường là sửa) được phép nằm ngoài thêm một nút, cạnh dấu ba chấm |

Trong dropdown: mục thường ở trên, **xoá tách xuống cuối** sau một đường chia,
hover đỏ `rose` (`I4`). Nút ba chấm có `aria-label="Thao tác"`, và **chặn nổi bọt**
(`event.stopPropagation()`) khi cả dòng cũng bấm được để mở chi tiết — không thì
bấm ba chấm là nhảy luôn sang trang chi tiết.

Thiết bị không có chuột thì không có hover: nút ẩn-hiện-khi-rê phải kèm
`[@media(hover:none)]:opacity-100`, không thì trên điện thoại không bao giờ thấy.

**I12. Chỉ đổi màu khi chuyển trạng thái.** Ngoại lệ duy nhất là card hover được
`transition-all`.

**I13. Không vòng ring khi focus. Focus bằng bàn phím trông GIỐNG HOVER.**

Vòng ring (dù là `outline` của trình duyệt hay `ring-*` dựng bằng `box-shadow`) làm
menu và nút trông như đang lỗi. Nhưng bỏ trắng thì người dùng bàn phím không biết
mình đang đứng ở đâu. Cách giải: **dùng lại đúng trạng thái hover** làm dấu hiệu
focus. Hết ring, mà vẫn thấy.

| Phần tử | Focus bàn phím |
| --- | --- |
| Mục menu, nút viền, nút ghost | `focus-visible:outline-hidden focus-visible:bg-background` — y như hover |
| Nút `primary` | `focus-visible:outline-hidden focus-visible:bg-primary-hover` |
| Ô nhập, textarea | **Chỉ đổi màu viền**: `focus:border-primary`. Không ring, kể cả ring mờ |
| Link chữ | `focus-visible:underline` |

**`focus-visible`, không phải `focus`**, trừ ô nhập. Bấm chuột thì không hiện gì,
chỉ khi dùng bàn phím mới hiện. Ô nhập thì dùng `focus` vì người dùng cần thấy
mình đang gõ vào ô nào, dù vào bằng chuột hay bàn phím.

**`outline-hidden` (Tailwind v4) hay `outline-none` (v3)**, đừng dùng `outline: none`
thuần hay `outline-none` của v4. Hai class kia làm outline **trong suốt** chứ không
xoá hẳn, nên nó vẫn hiện ra ở chế độ tương phản cao của Windows. Đó là chỗ duy
nhất người dùng thật sự cần nó mà không có nền hover để thay.

**Menu: chỉ MỘT mục sáng tại một thời điểm.** Hover với focus mà là hai trạng
thái riêng thì rê chuột vào mục này trong khi Tab đang đứng ở mục kia, hai mục
cùng sáng, người dùng không biết bấm Enter sẽ mở cái nào. Dùng Radix / shadcn thì
dùng **`data-[highlighted]`** thay cho cả `hover:` lẫn `focus:`:

```tsx
<DropdownMenuItem className="outline-hidden data-[highlighted]:bg-background">
```

`data-[highlighted]` đi theo cả chuột lẫn phím mũi tên, nên luôn chỉ có một mục
sáng. Không dùng Radix thì khi chuột vào mục nào, gọi `.focus()` cho mục đó.

**I14. Bỏ luôn cả dấu hiệu thay thế là một quyết định, không phải một mặc định.**

Mặc định của skill là **không ring, nhưng có nền giống hover** (`I13`). Bỏ luôn cả
nền, tức bấm Tab không thấy gì, thì người dùng bàn phím không còn biết mình đang
đứng ở nút nào. focus.camp đã làm vậy (16/09/2026) và ghi rõ đánh đổi. Nếu làm
thì:

- Ghi lý do ngay tại chỗ, kèm câu **"đừng sửa lại khi thấy bấm Tab không có dấu hiệu gì"**.
- Để rule ở **đúng một chỗ**, để muốn trả lại thì sửa một dòng.

**I15. Sidebar: mục đang chọn tô nền xám, không tô màu nhấn, không viền.** Mục
chưa chọn thì không nền. Sidebar nền trắng thì hover và đang chọn **cùng một nền
mờ** `--background`; đang chọn thêm `font-medium`. Không `--secondary`, đậm quá. Hover hay đang chọn thì **icon và chữ cùng
lên `--foreground`**; lúc thường cả hai `foreground/70`, không mờ tới `--muted`.
Xem `layouts/app.md`.

Ngoại lệ đã dính: khi mục đang chọn là **ảnh** (avatar ở thanh dưới mobile), tô
màu đè lên ảnh thì không đọc ra là "đang chọn" — dùng vòng `box-shadow` quanh ảnh.

---

## Danh sách

**I16. Dữ liệu nhiều thì phân trang, đừng đổ hết ra.**

Danh sách hay bảng quá khoảng 25 dòng thì thêm phân trang, hoặc nút tải thêm.
Kèm theo phân trang thì luôn hiện **tổng số** và **đang xem tới đâu**: "51 tới 75
trong 312 dòng". Thiếu con số đó thì phân trang chỉ là mấy cái nút vô nghĩa.

**I17. Ngưỡng giấu nội dung sau một cú bấm:** chỉ dùng accordion hay tab khi danh
sách dài hơn 6 mục, hoặc mỗi phần trả lời dài quá 3 dòng. Dưới ngưỡng đó thì
hiện hết.

**I18. Thanh cuộn tự ẩn: đứng yên thì không thấy, rê vào hoặc đang cuộn thì hiện.**

Công thức lấy từ focus.camp (chốt 08/09/2026, sửa lỗi Chrome 18/09/2026), CSS
nằm sẵn trong `tokens.css`, áp cho cả app:

- Thanh **4px**, rãnh trong suốt, thumb bo tròn hẳn.
- **Đứng yên: thumb trong suốt.** Rê chuột vào vùng cuộn: hiện mờ (16%). Đang cuộn: đậm hơn (28%). Rê thẳng vào thumb: 40%.
- **Ẩn bằng màu trong suốt, không bằng `scrollbar-width: none`.** Bề rộng vẫn giữ chỗ, lúc thanh hiện ra nội dung không bị đẩy ngang 4px. Dùng `none` là mỗi lần cuộn cả khối giật một cái.
- **Khối Firefox phải bọc `@supports not selector(::-webkit-scrollbar)`.** Từ Chrome 121, có `scrollbar-width` là Chrome bỏ hết `::-webkit-scrollbar` và vẽ thanh gốc to, chiếm chỗ.
- Trạng thái "đang cuộn" cần một component nhỏ gắn `.is-scrolling` vào **đúng phần tử đang cuộn**, gỡ ra sau 700ms. Nghe `scroll` ở pha **capture** để bắt được cả vùng cuộn lồng nhau (sidebar, danh sách trong modal). Mount một lần ở gốc app:

```tsx
import { useEffect } from "react";

// Gắn .is-scrolling vào đúng phần tử đang cuộn, gỡ ra 700ms sau khi dừng.
// CSS trong tokens.css đọc class này để hiện thanh cuộn (luật I18).
export default function ScrollbarAutohide() {
  useEffect(() => {
    const hideTimers = new WeakMap<Element, number>();

    function handleScroll(event: Event) {
      // Cuộn cả trang thì target là document, lấy phần tử gốc.
      const scrollingElement =
        event.target instanceof Element ? event.target : document.scrollingElement;
      if (!scrollingElement) return;

      scrollingElement.classList.add("is-scrolling");
      window.clearTimeout(hideTimers.get(scrollingElement));
      hideTimers.set(
        scrollingElement,
        window.setTimeout(() => scrollingElement.classList.remove("is-scrolling"), 700),
      );
    }

    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });

    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  return null;
}
```

`.scrollbar-clean` (ẩn hẳn, không bao giờ hiện) chỉ còn cho **hàng chip / tab
cuộn ngang**. Vùng cuộn dọc thì để thanh tự ẩn lo, đừng gắn `scrollbar-clean`:
ẩn hẳn thì người dùng chuột không có gì để kéo, cũng không biết còn bao nhiêu.

**I19. Mọi trang có dữ liệu đều cần đủ ba trạng thái: đang tải, rỗng, lỗi.**

Khung chờ phải **đúng hình** của nội dung sẽ hiện ra, không phải một vòng xoay
giữa màn. Khung chờ sai hình thì trang nhảy một cái lúc dữ liệu về, và đó là thứ
người dùng cảm nhận được dù không gọi tên được.

Xem `components/empty-state.md`.

---

## Modal

**I20. Modal có ô nhập thì bấm ra ngoài KHÔNG được đóng.**

Popup nào chứa `input` / `textarea` / `select` / rich-text / upload ảnh thì
backdrop **không** mang handler đóng. Đang điền dở mà con chuột lỡ click một cái
ra ngoài là mất sạch — không có nháp, không undo. Đóng bằng nút ✕ / Huỷ / Esc,
tức là phải cố ý.

- `e.target === e.currentTarget` **không phải cách vá**: nó chỉ chặn click bị bubble từ bên trong, còn click thẳng vào backdrop — đúng cái tay lỡ bấm — vẫn đóng. Xoá cả prop `onClick` đi.
- Gỡ dismiss thì **phải chắc còn đường đóng khác**. Dính thật ở focus.camp: hai bottom sheet lấy backdrop làm lối ra DUY NHẤT, gỡ xong là khoá luôn người dùng trong sheet.
- **Form nhiều bước thì khoá THEO BƯỚC**, không khoá cả modal. Bước chưa gõ gì thì cho đóng; bước đang gõ dở thì khoá. Màn gõ mã OTP là thứ phải khoá: bấm nhầm là mất mã, xin lại phải đợi hết 60 giây.

**I21. Vẫn giữ dismiss cho thứ chỉ để đọc hoặc chọn.** Lightbox ảnh, xem chi
tiết đơn, roster, dropdown, menu, panel thông báo, drawer mobile. Đóng nhầm mấy
cái đó không mất gì.

**I22. Panel và dropdown phải portal ra `document.body`.**

Popup lồng trong sidebar hay thanh dưới sẽ bị clip bởi `overflow` hoặc bị nhốt
trong stacking context của cha. Portal thoát mọi thứ đó.

**I23. Dựng modal mới thì dùng khung dùng chung, đừng tự dựng backdrop bằng
`position: fixed`.** Khung dùng chung cho sẵn khoá tiêu điểm, trả tiêu điểm về
nút đã mở, khoá cuộn nền, và aria đúng chuẩn — tự dựng thì mất hết.

---

## Điều hướng

**I24. Panel thông báo mở tại chỗ, không điều hướng sang trang khác.** Điều hướng
đi mất luôn ngữ cảnh chỉ để liếc một cái thông báo.

**I25. Hành động "đánh dấu đã đọc" phải theo đúng phạm vi đang xem.** Đang lọc
còn 2 dòng mà bấm lại xoá sạch thông báo của phạm vi người dùng **không nhìn
thấy** là mất dữ liệu thầm lặng.

---

## Ô nhập

**I26. Nhãn phải gắn vào ô, có `cursor-pointer`, và chỉ rộng bằng chữ.**

Ba thứ đi liền nhau, thiếu một cái là lỗi:

```html
<label for="email" class="w-fit cursor-pointer text-sm font-medium">Email</label>
<input id="email" />
```

- **`for` / `htmlFor` khớp `id`** — bấm vào chữ là ô nhận tiêu điểm. Không có thì nhãn chỉ là chữ trang trí, và trình đọc màn hình cũng không biết ô này tên gì.
- **`cursor-pointer`** — nhãn bấm được mà con trỏ vẫn là que gõ chữ thì không ai biết để mà bấm.
- **`w-fit`** — chỗ sót nhiều nhất. `<label>` là block, không có `w-fit` thì nó chiếm trọn chiều ngang. Bấm vào khoảng trắng trống bên phải chữ, cách chữ 300px, ô vẫn sáng lên. Người dùng bấm hụt ra ngoài mà thấy ô phản hồi thì tưởng mình bấm trúng cái gì đó.

**I27. Ô mật khẩu phải có nút hiện/ẩn.** Không có thì người dùng gõ sai một ký tự
là phải xoá hết gõ lại, và đó là lý do rời form phổ biến nhất ở màn đăng nhập.

- Nút **chỉ có icon**, `absolute` trong ô, căn phải. Icon `Eye` / `EyeOff` theo `F15`.
- **`type="button"`.** Quên thì nó mặc định là `submit` — bấm xem mật khẩu hoá ra gửi form.
- `aria-label` đổi theo trạng thái: "Hiện mật khẩu" / "Ẩn mật khẩu". Không phải một nhãn cố định.
- Chừa chỗ cho nút bằng padding phải trên chính ô (`pr-11`), đừng để chữ gõ dài chui xuống dưới icon.
- Mặc định là **ẩn**. Mở sẵn thì mật khẩu phơi ra trước mặt người đứng sau lưng.

**I28. KHÔNG tắt gợi ý điền sẵn của trình duyệt. Khai báo cho nó đúng.**

Cái khung đen Chrome bật lên khi chạm vào ô email là **trình quản lý mật khẩu**,
không phải lỗi giao diện. Người dùng bấm một cái là điền xong cả form. Tắt nó đi
là ép người ta gõ tay mật khẩu 20 ký tự, và đẩy họ sang chỗ đặt mật khẩu dễ nhớ.

`autocomplete="off"` ở form đăng nhập còn bị Chrome, Safari, Firefox **cố tình
bỏ qua** — tắt không được, chỉ làm hỏng phần gợi ý chứ không tắt hẳn.

Việc phải làm là ngược lại: khai báo đủ để nó đoán đúng.

| Ô | `autocomplete` |
| --- | --- |
| Email / tên đăng nhập | `username` (hoặc `email`) |
| Mật khẩu, màn **đăng nhập** | `current-password` |
| Mật khẩu, màn **đăng ký** hoặc đổi mật khẩu | `new-password` |
| Mã OTP | `one-time-code` |

Mỗi ô cũng phải có `name`. Thiếu `name` thì trình duyệt không có gì để lưu, và
lần sau không gợi ý được.

Khung gợi ý **che mất ô ngay dưới** — đó là hành vi bình thường của trình duyệt,
nó tự đóng khi gõ hoặc khi rời ô. Đừng đẩy khoảng cách các trường ra xa để
"tránh" nó.

---

## Vùng bấm

**I29. Nền hover, vùng bấm và `cursor-pointer` phải nằm trên CÙNG MỘT phần tử,
và phần tử đó rộng hết hàng.**

Lỗi hay gặp nhất ở menu, sidebar và danh sách bấm được. Nền hover nằm ở phần tử
bọc ngoài, rộng cả hàng, còn phần tử bấm được (`<a>`, `<button>`) lại là inline,
chỉ ôm vừa khít chữ.

Hệ quả: rê chuột ngang qua hàng thì con trỏ **nhấp nháy**, qua chữ là bàn tay, qua
khoảng trống là mũi tên. Nền vẫn sáng cả hàng, nên người dùng tưởng bấm đâu cũng
được. Bấm vào khoảng trống thì **không có gì xảy ra**, và họ nghĩ app bị đơ.

```html
<!-- Sai: hover ở <li>, vùng bấm chỉ bằng chữ -->
<li class="rounded-lg px-3 py-2 hover:bg-background">
  <a href="/ho-so">Hồ sơ của bạn</a>
</li>

<!-- Đúng: <li> trơn, mọi thứ dồn vào <a> -->
<li>
  <a href="/ho-so" class="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-background">
    <i data-lucide="user" class="size-4 text-muted"></i>
    Hồ sơ của bạn
  </a>
</li>
```

**React với shadcn / Radix: bẫy `asChild`.** Đây là chỗ dính nhiều nhất trong
dự án Next:

```tsx
// Sai: Item có hover và rộng cả hàng, nhưng điều hướng nằm ở <Link> inline bên trong.
// Bấm vào khoảng trống của hàng thì menu đóng lại mà không đi đâu cả.
<DropdownMenuItem>
  <Link href="/ho-so">Hồ sơ của bạn</Link>
</DropdownMenuItem>

// Đúng: asChild để <Link> TRỞ THÀNH chính Item, thừa hưởng hover lẫn vùng bấm
<DropdownMenuItem asChild>
  <Link href="/ho-so" className="flex w-full cursor-pointer items-center gap-2.5">
    Hồ sơ của bạn
  </Link>
</DropdownMenuItem>
```

**Cách kiểm, mất năm giây:** rê chuột từ mép trái sang mép phải của hàng, thật
chậm. Con trỏ phải là bàn tay **suốt từ đầu tới cuối**. Đổi dù một lần là lỗi.

Áp cho: mục menu, link sidebar, dòng danh sách bấm được, tab, và card mà cả khối
bấm được. Padding của hàng đặt trên **phần tử bấm**, không đặt trên phần tử bọc,
vì padding cũng là vùng bấm.

`cursor-pointer` phải ghi tường minh trên `<button>` ở Tailwind v4 — xem `W7`.
