# Responsive

Mọi luật về màn hẹp gom hết ở đây. `rules-form.md` không lặp lại, chỉ trỏ sang.

**Ngưỡng kiểm là 375px.** Kiểm trước khi báo xong, không phải kiểm sau khi bị
chê. Vòng tra tấn bắt buộc nằm ở `checklist.md` cổng 3.

---

**R1. Trang không bao giờ được cuộn ngang.** Thân trang vừa khít mọi bề rộng, kể cả 375px.

Triệu chứng dễ nhận nhất: cuộn sang ngang thì thấy **một mảng trống** bên phải, vì có một phần tử nào đó rộng hơn màn đẩy cả trang ra. Thấy mảng trống đó là biết ngay có thứ gì đang tràn, đi tìm bằng cách bỏ dần `min-w-0` ra. Nội dung thật sự rộng thì cho cuộn trong khung riêng `overflow-x-auto`, đừng để nó đẩy cả trang. Kiểm ở 375px **trước khi** báo xong.

**R2. Lưới xuống một cột ở mobile.** Mặc định `grid-cols-1`, rồi mới `sm:grid-cols-2` và `lg:grid-cols-4`. Ngoại lệ: hàng ô số liệu 2×2 ở mobile khi mọi số vừa ô (`components/charts.md`, "Ô số liệu ở màn hẹp").

**R3. Không để phần tử rớt hàng lẻ.** Wrap mà còn dư một cái đứng một mình ở hàng dưới thì đọc ra là lỗi, không phải là thiết kế.

- **Cụm nút thì không bao giờ rớt hàng.** Tìm cách giữ trên một hàng: rút chữ, giảm `px`, hạ chiều cao. Không được nữa thì cho cả cụm xuống một cột, mỗi nút một hàng đầy đủ, chứ đừng để hai nút trên một nút dưới.
- **Lưới có số cột lẻ thì đi thẳng từ 1 lên số cột đó**, bỏ qua bậc giữa: `grid-cols-1 lg:grid-cols-3`, đừng chèn `sm:grid-cols-2` vì 3 mục chia 2 cột sẽ thành 2 trên 1 dưới.
- **Số cột chẵn thì wrap thoải mái**, 4 mục chia 2 cột ra 2 hàng đều nhau, không ai lẻ loi.

**R4. Nhịp ở mobile: card `p-4`, tối đa `p-5`.** Đừng mang `p-8` của màn rộng xuống màn hẹp, 32px lề mỗi bên trên màn 375px là ăn mất một phần năm bề ngang. Nút ở mobile hạ về `h-10` — **trừ nút nằm trong form**, cái đó đi cùng chiều cao
ô nhập (`h-11` ở màn hẹp), xem `references/budgets.md`.

**R5. Chật là hỏng, không phải là đã responsive.** Thu nhỏ mà nội dung dồn cục, chữ vỡ ba bốn dòng, ảnh méo thì đó là chưa xử, không phải là xong. Cách xử, theo thứ tự nên thử:

1. Đổi hàng ngang thành xếp dọc.
2. Ảnh chữ nhật đổi thành **vuông nhỏ**, `h-16 w-16` hoặc `h-20 w-20`, đừng giữ tỉ lệ ngang rồi bóp lại.
3. Giảm cỡ chữ một bậc.
4. Cắt tiêu đề còn tối đa hai dòng bằng `line-clamp-2`.

Và luôn giữ: **ngày tháng, nhãn phụ phải nhỏ hơn tiêu đề ít nhất một bậc.** Tiêu đề `text-sm` thì ngày `text-xs`. Bằng nhau là mắt không biết đọc cái nào trước.

**R6. Ngoại lệ của R1 và R2: thứ tự tuyến tính thì không được wrap.** Board trạng thái, các bước quy trình, dòng thời gian, hàng chip lọc, hàng tab đều thuộc loại này. Xếp thành hai hàng thì mắt đọc theo hình chữ Z và mất dòng chảy; bốn chip ở 375px thì ba cái một hàng và một cái rớt xuống đứng lẻ, nhìn như lỗi. Cho cuộn ngang trong khung, mỗi phần tử `shrink-0`, cột kanban `w-[248px] grow max-w-[320px]` (vì sao thì xem `layouts/app.md`).

**Lề của vùng cuộn đặt trên hàng bên trong, không đặt trên khung cuộn.** Padding bên phải của khung `overflow-x-auto` bị nhiều trình duyệt bỏ qua khi cuộn tới cuối, nên phần tử cuối dính sát mép trong khi phần tử đầu vẫn có lề.

```html
<!-- Sai: cột cuối dính mép -->
<div class="overflow-x-auto px-3"><div class="flex gap-4">...</div></div>

<!-- Đúng -->
<div class="-mx-3 overflow-x-auto sm:-mx-5"><div class="flex gap-4 px-3 sm:px-5">...</div></div>
```

Cách khác cũng được: chèn phần tử đệm cuối hàng, `<div class="w-3 shrink-0 sm:w-5" aria-hidden="true"></div>`.

---

**R7. Chữ trong card ở mobile: tiêu đề giữ cỡ, mô tả `text-sm`.** Tiêu đề card `text-base font-semibold` **ở mọi breakpoint** (`D8`), luôn lớn hơn chữ bên trong một bậc (`T8`); dài thì `text-balance`, không hạ cỡ. Mô tả `text-sm` để card không dài lê thê. Bản cũ hạ tiêu đề xuống `text-sm` ở mobile, bằng cỡ mô tả, trái cả `T8` lẫn `D8`.

**R8. Chữ GÕ ĐƯỢC không bao giờ xuống dưới 16px ở mobile.** `input`, `textarea`,
`select` — dưới 16px thì iOS **tự phóng to cả trang** khi chạm vào ô, và không
tự thu lại. Người dùng đang điền form bỗng thấy trang nhảy một cái rồi lệch hẳn.

```html
<input class="text-base md:text-sm" />
```

Đây là **ngoại lệ của `R7`**: chữ chỉ để đọc trong card thì hạ về `text-sm` ở
mobile, chữ gõ được thì không. Luật này nói **cỡ chữ**, không nói chiều cao: ô
vẫn `h-11 md:h-10`, xem `budgets.md`.

**R9. Bảng ở màn hẹp thì cuộn ngang, đừng bóp cột.** Đây là lỗi hay gặp nhất với bảng: để nguyên `<table>` co lại theo bề rộng màn, kết quả là mỗi ô chỉ còn vài chục pixel, chữ vỡ ba bốn dòng, cột nọ dính cột kia, đọc không ra gì.

```html
<div class="-mx-4 overflow-x-auto sm:-mx-6">
  <div class="min-w-[44rem] px-4 sm:px-6">
    <table class="w-full">…</table>
  </div>
</div>
```

- **`min-w`** cho khối bọc bảng, đủ để mọi cột thở. Không có nó thì bảng vẫn co.
- **`whitespace-nowrap`** cho ô ngày tháng, số, trạng thái. Chữ dài như tên hay mô tả thì cho xuống dòng bình thường.
- Lề đặt trên **khối bên trong**, không đặt trên khung cuộn. Xem R6.
- Cuộn ngang thì **bắt buộc** ghim cột nhận diện (thường là cột đầu) bằng `sticky left-0` kèm nền `--surface`, cột ghim không quá ~40% khung. Cột đầu rộng hơn thế (tên + email) thì đừng cuộn: **dưới `sm`, bảng quản lý thành danh sách dòng** (`layouts/app.md`, mục Bảng dữ liệu). Cuộn mà không ghim thì cuộn một nhịp là mất tên, các ô còn lại không biết của ai (đã dính 25/09/2026).

Đây là ngoại lệ hợp lệ của R1, cùng loại với R6: cuộn trong khung chứ không phải cả trang.

**Ở desktop, phải cuộn ngang là dấu hiệu thừa cột, không phải lỗi bề ngang.** Thử theo
thứ tự: gộp cột (email xuống dưới tên trong cùng một ô), bỏ cột phụ, hoặc đẩy nó sang
drawer chi tiết. Đếm cột trước khi dựng: bảng trong khung app còn ~970px ở 1280px khi
sidebar mở, quá 6 cột là bắt đầu chật (đã dính 23/09/2026: bảng khách hàng 7 cột, rộng
1140px trong khung 970px).

**R10. Tab hoặc chip quá nhiều ở màn hẹp thì rút chữ, không rút được thì gom vào dropdown.** Thứ tự nên thử:

1. **Rút chữ, nếu vẫn còn nghĩa.** "Đến hạn hôm nay" thành "Hôm nay". Mất nghĩa thì đừng rút.
2. **Cho cả hàng cuộn ngang**, xem R6. Hợp khi các mục ngang vai nhau.
3. **Gom vào một dropdown**, hiện mục đang chọn kèm mũi tên. Hợp khi có trên sáu mục, hoặc khi hàng cuộn ngang làm người ta không thấy hết lựa chọn.

Đừng để `flex-wrap`, đó là cách duy nhất sai trong ba cách trên.

**Hàng cuộn ngang thì mép mờ dần ở phía còn mục bị khuất**, cùng cách với vùng nav sidebar (`layouts/app.md`): `mask-image` 32px, mép trái mờ khi đã cuộn khỏi đầu, mép phải mờ khi còn mục phía sau, tính cờ từ `scrollLeft`/`scrollWidth`/`clientWidth`. Thanh cuộn đã ẩn (`scrollbar-clean`) nên mép cắt thẳng qua chữ không báo được gì: ở 375px hàng chip cắt ngang "Bán|", còn tab "Ngừng giao dịch 6" nằm hẳn ngoài khung, trông như chỉ có ba trạng thái (đã dính 25/09/2026, bảng khách hàng). Áp cho hàng tab, hàng chip, và khung bảng cuộn ngang (`R9`).

**Vạch chỉ vị trí tự vẽ: KHÔNG dựng mặc định, đề xuất một dòng lúc giao.** Mặc định hàng cuộn
ngang chỉ có mép mờ ở trên. Lúc giao màn có hàng tab/chip cuộn ngang ở màn hẹp thì báo một
dòng, **nói bằng vấn đề của người dùng cuối, không nhắc tên dự án hay sản phẩm tham khảo nào**:
_"Trên điện thoại không có thanh cuộn, người dùng không biết hàng [tab lọc] này kéo sang được.
Mình đang để mép phải mờ dần; có thể đổi sang dropdown, hoặc thêm một thanh cuộn mảnh luôn hiện
bên dưới hàng."_ Người dùng chọn cách nào mới dựng cách đó (chủ dự án chốt
25/09/2026: đây là thứ gợi ý cho người dùng, không áp sẵn). Công thức khi dựng (chủ dự án duyệt
17–18/09/2026 ở một dự án thật): Mép mờ báo "phía này còn", vạch báo "còn bao
nhiêu và đang ở đâu". Thanh cuộn gốc của iOS/Android là thanh nổi, chỉ hiện **lúc đang
vuốt**, nên không báo trước được; thanh 4px tự ẩn theo `I18` cũng chỉ hiện khi rê chuột,
điện thoại không có rê chuột. Tab lấp ló ở mép cũng không chắc có: tab có thể kết thúc
khít mép khung.

```tsx
<div className="relative min-w-0">
  <div ref={scrollerRef} className="flex overflow-x-auto scrollbar-clean …">{items}</div>
  {isOverflowing ? (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full mt-1 h-[3px] overflow-hidden rounded-full bg-foreground/5">
      {/* Bề rộng và vị trí đổi theo từng pixel cuộn: style, không class. */}
      <div className="absolute inset-y-0 rounded-full bg-foreground/15"
        style={{ width: `${visibleRatio * 100}%`, left: `${offsetRatio * 100}%` }} />
    </div>
  ) : null}
</div>
```

- **Chỉ hiện khi hàng thật sự tràn** (`scrollWidth > clientWidth + 1`), ở mọi bề rộng, không riêng màn hẹp. `visibleRatio = clientWidth / scrollWidth`, `offsetRatio = scrollLeft / scrollWidth`, đo lúc cuộn (`passive`) và bằng `ResizeObserver` (xoay máy, font tải xong đổi bề rộng). Dùng chung hook với mép mờ.
- **Nằm NỔI (`absolute top-full mt-1`) dưới hàng, không nằm trong luồng**: vạch chỉ hiện sau khi đo xong lúc tải, nằm trong luồng thì cả trang nhảy xuống một nhịp. Nơi gọi chừa khoảng trống dưới hàng từ 8px trở lên (vạch chiếm 7px).
- **Hàng tab gạch chân có đường kẻ nền thì vạch chạy ĐÈ lên đường kẻ đó** (`bottom-0 h-0.5`, rãnh chính là đường kẻ nền), không vẽ rãnh riêng bên dưới: hai đường sát nhau đọc như gạch chân bị lệch. Hàng tab gạch chân không có đường kẻ nền thì dùng rãnh riêng như trên.
- **Màu nhạt, không nhạt hơn nữa**: thanh là gợi ý "kéo được", đậm hơn là kéo mắt khỏi mục đang chọn; nhạt hơn thì ngoài nắng mất hẳn (đã thử `/50`, `/30` rồi chốt khoảng `/20` của màu xám chữ phụ, tương đương `bg-foreground/15` ở đây).
- **Mục đang chọn bị khuất thì tự cuộn nó vào giữa hàng** lúc tải và khi đổi mục. Tự tính `scrollLeft` rồi `scroller.scrollTo`, **không `scrollIntoView`**: hàng có thể đang nằm dưới màn lúc tải, `scrollIntoView` kéo cả trang xuống theo. Lần đầu `behavior: "auto"`, các lần sau `"smooth"`.
- Áp cho hàng chip, hàng tab còn cuộn ngang, dải card/carousel. **Tab trạng thái của bảng ở màn hẹp mà có tab nằm hẳn ngoài khung thì vẫn thành dropdown** (`layouts/app.md`): vạch báo được "còn", không báo được còn trạng thái nào.

---

## Bảng hạ bậc ở mobile, đừng bê nguyên nhịp desktop xuống

| | Mobile (dưới `sm`) | Từ `sm` trở lên |
| --- | --- | --- |
| Padding trang | `p-4` | `sm:p-6` |
| Padding card | `p-4`, tối đa `p-5` | xem `budgets.md` |
| Chiều cao nút | `h-10` | xem `budgets.md` |
| Tiêu đề trong card | `text-base` | `text-base` (không đổi theo breakpoint, `D8`) |
| Mô tả trong card | `text-sm` | `text-sm` hoặc `text-base` tuỳ loại trang |
| Ngày tháng, nhãn phụ | `text-xs`, luôn nhỏ hơn tiêu đề một bậc | như trên |
| Ô nhập, textarea, select | **`text-base`, không hạ.** Dưới 16px thì iOS tự zoom | `md:text-sm` |

`p-8` là nhịp của màn rộng. Bê xuống 375px thì riêng lề đã ăn
mất một phần năm bề ngang.

---

## Thứ tự kiểm ở 375px

1. Trang có cuộn ngang không. Có là hỏng, trừ ngoại lệ R6.
2. Vùng nào cuộn ngang thì cuộn hết sang phải, phần tử cuối còn lề không.
3. Có cụm nút nào rớt hàng không, có phần tử nào đứng lẻ ở hàng dưới không.
4. Card còn `p-8` không.
5. Ngày tháng có nhỏ hơn tiêu đề không.
6. Nhìn tổng thể: có chỗ nào chật dồn cục không. Chật là chưa xong.
