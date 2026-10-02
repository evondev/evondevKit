# Đang tải (loading)

Câu cần hỏi trước khi vẽ: **người dùng đang chờ cái gì, và trên màn đã có gì rồi.**
Mỗi ca một hình. Lỗi hay gặp nhất của AI là dùng một hình cho mọi ca: cứ chờ là
skeleton, cứ bấm là spinner.

| Ca | Hình |
| --- | --- |
| Tải lần đầu, dữ liệu qua mạng | Khung chờ đúng hình (mục dưới) |
| Tải lần đầu, dữ liệu đọc từ máy (localStorage, state sẵn có) | Không khung chờ, không spinner. Một dòng chữ mờ như `empty-state.md`, chỉ khác chữ |
| **Tải lần hai**: đổi lọc, đổi trang, đổi tab, gõ tìm | **Giữ dữ liệu cũ** + thanh mảnh trên đầu khung |
| **Đổi ngay trên màn**: toggle, tick, kéo thẻ, đổi thứ tự | Đổi luôn, không spinner. Lỗi thì trả lại như cũ + toast |
| Bấm nút gửi, lưu, tạo | Spinner thế chỗ icon trong nút (`button.md`) |
| Tự lưu (cài đặt, trình soạn thảo) | Dấu "Đang lưu… / Đã lưu" cạnh chỗ vừa đổi |
| "Xem thêm" cuối danh sách | Spinner đè giữa nút, nút giữ bề rộng (`timeline.md`) |
| **Việc chạy lâu**: xuất tệp, nhập dữ liệu | Có tiến độ, chạy nền, xong báo toast |
| Tải tệp lên | `file-upload.md` |
| AI đang trả lời | `chat.md` |

Không bao giờ một vòng xoay giữa màn thay cho cả trang (`I19`). Chuyển trang thì
header, sidebar đứng yên, chỉ vùng nội dung thành khung chờ.

---

## Khung chờ (dữ liệu qua mạng, lần đầu)

Theo `I19`: khung chờ **đúng hình** dòng thật, để lúc dữ liệu về trang không nhảy.

```html
<ul aria-busy="true" class="divide-y divide-border">
  <li class="flex items-center gap-3 px-4 py-3">   <!-- cùng padding, cùng divide với dòng thật -->
    <div class="size-8 shrink-0 animate-pulse rounded-full bg-foreground/5 motion-reduce:animate-none"></div>
    <div class="min-w-0 flex-1 space-y-2">
      <div class="h-3 w-2/5 animate-pulse rounded-full bg-foreground/5 motion-reduce:animate-none"></div>
      <div class="h-3 w-1/4 animate-pulse rounded-full bg-foreground/5 motion-reduce:animate-none"></div>
    </div>
    <div class="h-3 w-16 animate-pulse rounded-full bg-foreground/5 motion-reduce:animate-none"></div>
  </li>
</ul>
<span class="sr-only" role="status">Đang tải danh sách khách hàng</span>
```

- **Vệt chờ là lớp phủ `bg-foreground/5`, không `bg-background`** (`M21`). Bản sáng hai cách ra cùng một màu
  (`#f4f4f4` / `#f4f4f6` trên card trắng); bản tối `bg-background` tối hơn card, cả khung chờ thành dãy lỗ đen
  khoét xuống, còn lớp phủ thì sáng lên mờ như mọi vùng tô khác.
- **Mượn nguyên khuôn dòng thật**: cùng cỡ avatar, cùng padding, cùng đường chia `divide-y`. Dòng thật có đường chia mà khung chờ không có thì lúc dữ liệu về vẫn thấy cả khối đổi hình.
- **Thanh chữ cao `h-3`, chiều dài lệch nhau** giữa các dòng (`w-2/5`, `w-1/2`, `w-1/3`…). Dài bằng nhau thì trông như sọc kẻ, không giống chữ.
- Số dòng bằng số dòng mỗi trang, hoặc đủ lấp khung, không bịa 3 dòng cho một khung 10 dòng.
- **Bảng nhóm thì khung chờ bắt đầu bằng một hàng nhóm**, không thẳng vào dòng dữ liệu, kẻo lúc dữ liệu về cả bảng tụt một hàng (`../layouts/app.md`, mục Bảng nhóm theo trạng thái).
- `animate-pulse` luôn đi kèm `motion-reduce:animate-none`. Trình đọc màn hình không thấy khung, nên phải có `aria-busy` và một câu `sr-only`.
- **Không bao giờ hiện câu rỗng trong lúc chờ.** "Chưa có khách hàng nào" chớp lên rồi danh sách hiện ra là người dùng vừa được báo sai một lần. Chưa biết rỗng hay không thì là đang tải.

---

## Tải lần hai: giữ dữ liệu cũ

Đổi lọc, đổi trang, đổi tab, gõ tìm, kéo lại: trên màn **đã có dữ liệu**. Thay cả bảng
bằng khung chờ lần nữa là xoá mất thứ người dùng đang nhìn, rồi vẽ lại; mỗi phím gõ
trong ô tìm là bảng chớp một lần. Giữ nguyên dữ liệu cũ tới khi dữ liệu mới về, chỉ
báo "đang chạy" bằng một thanh mảnh chạy ở mép trên khung.

```html
<div aria-busy="true" class="relative overflow-hidden rounded-2xl border border-border">
  <!-- Thanh chạy: chỉ có khi đang tải lại -->
  <div class="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
    <div class="h-full w-1/3 animate-progress-slide bg-primary motion-reduce:animate-pulse"></div>
  </div>
  <table>…dữ liệu cũ, giữ nguyên…</table>
</div>
<span class="sr-only" role="status">Đang tải kết quả</span>
```

```css
@theme {
  --animate-progress-slide: progress-slide 1.2s ease-in-out infinite;
  @keyframes progress-slide {
    from { translate: -100% 0; }
    to { translate: 300% 0; }
  }
}
```

- **Dữ liệu cũ không mờ, không khoá.** Mờ đi là chữ tụt dưới ngưỡng tương phản và đọc ra là "bị khoá"; người dùng vẫn đọc, vẫn chọn được dòng cũ trong lúc chờ.
- **Thanh nằm trong khung đang tải**, không ở đỉnh trang: đổi lọc của bảng thì thanh ở mép bảng, mắt đang nhìn đúng chỗ đó. Thanh đè lên viền trên, không chèn thêm chỗ (`N1`).
- **Thứ vừa bấm đổi ngay**: chip lọc đã chọn, tab đã chuyển, số trang đã tô. Chỉ phần dữ liệu là chờ.
- Kết quả về là 0 dòng thì sang câu rỗng (`empty-state.md`). **Tải lần hai hỏng thì giữ dữ liệu cũ, báo bằng toast lỗi có Thử lại** (`../layouts/overlay.md`); khối "Không tải được…" của `empty-state.md` chỉ dành cho khi chưa có gì trên màn.
- **Hỏng thì tab, chip, số trang trả về giá trị khớp dữ liệu đang hiện**, như ca đổi ngay trên màn. Để tab "Đang giao dịch 19" sáng trên một bảng toàn khách của "Tất cả", chân bảng ghi 32, là màn tự nói sai; câu giải thích "bảng đang hiện kết quả trước đó" là vá chỗ sai đó bằng chữ. Toast nói cái chưa tải được ("Chưa tải được khách hàng Đang giao dịch"), Thử lại là bấm lại đúng lựa chọn đó. **Riêng ô tìm giữ nguyên chữ đã gõ**, không xoá thứ người dùng gõ; toast "Chưa tìm được “ng”" + Thử lại.
- Gõ tìm thì kết quả về sau mới thắng: phản hồi của "ng" về sau phản hồi của "nguyen" không được đè lên. Huỷ hay bỏ phản hồi cũ là logic người dùng (`N10`), skill chỉ nhắc.
- Dự án có React Query, SWR thì đây là `placeholderData: keepPreviousData` / `keepPreviousData`, thanh mảnh hiện theo `isFetching`; React thuần thì `useTransition`, thanh theo `isPending`.

---

## Thời điểm hiện: chờ 300ms, đã hiện thì giữ 500ms

Dữ liệu về trong 200ms mà vẫn vẽ khung chờ là màn **chớp** một cái: khung hiện rồi
biến ngay, nhìn như lỗi. Ngược lại, khung vừa hiện được 50ms đã biến cũng chớp.

- **Chưa tới 300ms thì chưa vẽ gì**: khung giữ đúng chiều cao, trống. Không câu rỗng, không khung chờ.
- **Đã hiện thì giữ tối thiểu 500ms**, kể cả dữ liệu về ngay sau đó.
- Áp cho khung chờ, thanh mảnh tải lần hai, và chữ "Đang lưu…". **Không áp cho spinner trong nút**: spinner thế chỗ icon nên không xô gì, và người vừa bấm cần thấy nút đã nhận.

```ts
// Hiện cờ đang tải sau delayMs; đã hiện thì giữ ít nhất minVisibleMs.
export function useDelayedLoading(isLoading: boolean, delayMs = 300, minVisibleMs = 500) {
  const [isVisible, setIsVisible] = useState(false);
  const shownAtRef = useRef(0);

  useEffect(() => {
    if (isLoading) {
      if (isVisible) return;

      const showTimer = window.setTimeout(() => {
        shownAtRef.current = Date.now();
        setIsVisible(true);
      }, delayMs);
      return () => window.clearTimeout(showTimer);
    }

    if (!isVisible) return;

    const remainingMs = Math.max(0, minVisibleMs - (Date.now() - shownAtRef.current));
    const hideTimer = window.setTimeout(() => setIsVisible(false), remainingMs);
    return () => window.clearTimeout(hideTimer);
  }, [isLoading, isVisible, delayMs, minVisibleMs]);

  return isVisible;
}
```

Lúc giữ 500ms mà dữ liệu đã về thì vẫn hiện dữ liệu ngay; chỉ thanh mảnh hay chữ
"Đang lưu…" ở lại cho đủ giờ. Khung chờ lần đầu thì đợi đủ giờ rồi mới thay bằng dữ liệu:

```tsx
const isSkeletonVisible = useDelayedLoading(isLoading);

{isSkeletonVisible ? <CustomerListSkeleton /> : isLoading ? <div className="min-h-96" /> : <CustomerList />}
```

---

## Đổi ngay trên màn

Toggle, tick việc xong, kéo thẻ sang cột khác, đổi thứ tự, gắn nhãn, ghim: **đổi
luôn trên màn lúc bấm**, không spinner, không khoá điều khiển trong lúc chờ máy chủ.
Đây là việc nhỏ, gần như luôn thành công, và người dùng thường bấm liền mấy cái.

- **Lỗi thì trả lại như cũ** (công tắc gạt về, thẻ về cột cũ, đúng vị trí cũ) **kèm toast lỗi** nói cái gì chưa lưu được và có Thử lại: "Chưa chuyển được 'Sửa trang thanh toán' sang Đang làm". Trả lại im lặng thì người dùng tưởng mình bấm trượt.
- Toast lỗi theo `../layouts/overlay.md`: không tự tắt, `role="alert"`.
- **Không dùng cho việc không đổi lại được hoặc máy chủ phải quyết**: thanh toán, gửi lời mời, xoá vĩnh viễn, tạo bản ghi mà màn kế tiếp cần mã của nó. Mấy việc đó là nút đang xử lý (`button.md`).
- Gạt thì đổi tại chỗ, có xảy ra hay không là logic (`N10`); skill chỉ dựng đủ hai hình: đã đổi, và đã trả lại + toast.

---

## Tự lưu: "Đang lưu… / Đã lưu"

Trang cài đặt không nút Lưu tổng (`../layouts/app.md`) và trình soạn thảo tự lưu cần
một dấu nhỏ nói đã lưu chưa, đặt **cạnh chỗ vừa đổi**: cạnh nhãn của hàng cài đặt,
cạnh tiêu đề tài liệu ở header trình soạn thảo.

```html
<span role="status" class="inline-flex items-center gap-1 text-xs text-muted">
  <!-- Đang lưu: chỉ chữ -->
  Đang lưu…
  <!-- Đã lưu: <i data-lucide="check" class="size-3.5"></i> Đã lưu -->
</span>
```

| Trạng thái | Hình |
| --- | --- |
| Đang lưu | "Đang lưu…" `text-xs text-muted`, không spinner. Hiện theo luật 300ms |
| Đã lưu | icon `check` `size-3.5` + "Đã lưu", cùng màu `text-muted`, không xanh lá. Cài đặt: tắt sau ~2 giây. Trình soạn thảo: ở lại, thành "Đã lưu lúc 14:32" |
| Không lưu được | "Chưa lưu được" `text-red-600` + link chữ "Thử lại". Ở lại tới khi lưu được |

- **Không xanh lá cho "Đã lưu"**: lưu là việc thường xuyên, như dấu `Check` xám của bước công cụ trong `chat.md`. Xanh lá để dành cho trạng thái "đang ổn" (`rules-color.md`).
- Dấu nằm trong cùng dòng với nhãn, `flex-wrap`, đổi chữ thì chỉ nó dài ra, không đẩy điều khiển (`N1`).
- Công tắc mở luồng (quét mã, nhập mật khẩu) thì không có dấu này, xem `choice-controls.md`.

---

## Việc chạy lâu

Xuất tệp, nhập dữ liệu, tạo báo cáo, chạy hàng loạt: vài giây tới vài phút. Ba điều:

1. **Có tiến độ.** Biết tổng thì thanh có số: "Đã nhập 340 / 1.200 dòng", thanh `h-2` `role="progressbar"` (`charts.md`, "Thanh tiến độ đứng riêng"). Không biết tổng thì chữ nói đang làm bước nào ("Đang gom đơn tháng 9…"), không thanh chạy vô tận.
2. **Chạy nền.** Không khoá cả màn bằng modal chờ. Bấm xong thì toast tiến độ ở lại tới khi xong: tiêu đề ngắn "Đang xuất 1.240 đơn", dòng dưới "340 / 1.240 · xong sẽ báo bạn". Tiêu đề dài kiểu "Đang xuất 1.240 đơn, xong sẽ báo bạn" ở màn hẹp rớt một chữ xuống dòng hai (`T10`). Người dùng làm việc khác. Màn nhập dữ liệu có modal thì đóng modal được, việc vẫn chạy.
3. **Xong báo toast, kèm hành động**: "Đã xuất 1.240 đơn" + nút "Tải xuống"; "Đã nhập 1.180 dòng, 20 dòng lỗi" + "Xem dòng lỗi". Hỏng thì toast lỗi có Thử lại.

- Dưới ~3 giây thì không cần chạy nền: nút đang xử lý là đủ (`button.md`).
- **Nút đã bấm không quay spinner khi toast tiến độ đã hiện** (`N3`): một việc, một chỗ báo đang chạy. Spinner trong nút cộng thanh trong toast là hai tín hiệu cho một việc, mắt không biết nhìn chỗ nào. Nút giữ icon và chữ, không mờ, `aria-disabled` tới khi xong để không ai bấm xuất hai lần (`button.md`, đang xử lý, bỏ phần spinner).

---

## Spinner

- Một hình cho cả app: `LoaderCircle` lucide, `animate-spin motion-reduce:animate-none`, cỡ bằng icon nó thế chỗ (`size-4` trong nút).
- **Một việc đang chạy, một spinner** (`N3`). Spinner trong nút thì không thêm thanh mảnh, không thêm chữ "Đang gửi…" ở chỗ khác.
- Spinner chỉ thế chỗ một icon hoặc đè giữa một nút. Không đứng một mình giữa khối thay cho dữ liệu: chỗ đó là khung chờ.
