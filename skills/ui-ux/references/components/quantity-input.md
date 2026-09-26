# Ô nhập số lượng

Số lượng trong giỏ, số ghế, số bản in: một số nguyên nhỏ trong khoảng biết trước.
Nút − và + hai bên, số ở giữa gõ thẳng được. Số lớn hoặc có phần thập phân (giá,
cân nặng) thì dùng ô nhập thường (`input.md`), không dùng khuôn này.

```tsx
<div
  className={cn(
    // Mượn nguyên class của ô nhập (viền, nền, bo, focus, lỗi, cao h-11 md:h-10),
    // bỏ padding ngang, ôm vừa nội dung. Khung đổi viền khi ô số bên trong focus.
    getFieldControlClasses(hasError, true),
    "inline-flex h-11 w-fit items-stretch overflow-hidden px-0 md:h-10",
    isDisabled && "cursor-not-allowed bg-background text-muted",
  )}
>
  <Button
    variant="ghost"
    aria-label="Giảm số lượng"
    aria-controls={id}
    tabIndex={-1}
    disabled={isDecreaseDisabled}
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => handleStep(-1)}
    className="group h-full w-11 shrink-0 rounded-none p-0 hover:bg-transparent md:w-10"
  >
    {/* Vùng bấm là cả ô cao (44px ở màn hẹp), nền rê chỉ là ô vuông bo thụt vào. */}
    <span className="grid size-8 place-items-center rounded-lg text-muted transition-colors group-enabled:group-hover:bg-foreground/5 group-enabled:group-hover:text-foreground">
      <Minus className="size-4" aria-hidden />
    </span>
  </Button>

  <input
    id={id}
    type="text"
    inputMode="numeric"
    role="spinbutton"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-invalid={hasError || undefined}
    aria-describedby={describedById}
    autoComplete="off"
    // Nhiều hơn số chữ số của max đúng một: gõ hay dán quá tay thì vẫn kéo về max.
    maxLength={String(max).length + 1}
    disabled={isDisabled}
    className="w-12 min-w-0 bg-transparent text-center tabular-nums outline-hidden disabled:cursor-not-allowed"
  />

  {/* Nút + y hệt nút −, icon Plus */}
</div>
```

## Hình

- **Một khung duy nhất, viền của ô nhập** (`border-border-strong`, `rounded-xl`,
  focus viền nhấn + quầng mờ khi ô số bên trong focus). Không kẻ vạch dọc giữa nút và số:
  thêm hai đường chia là thêm tín hiệu cho việc ba phần đã tự rõ (`N3`).
- **Nền rê của nút − + là ô vuông `size-8 rounded-lg` thụt vào giữa ô**, cùng khuôn nút
  xoá trong ô tìm (`input.md`, `N5`). **Không** cho nền rê phủ kín cả khúc cao từ viền tới
  viền: nền đó cắt ngang lưng chừng khung, không vạch chia nào đỡ mép trong, một bên vuông
  thành một bên theo góc bo, trông như ô bị khuyết một mảng (đã dính 26/09/2026 ở
  `/components`). Vùng **bấm** vẫn là cả khúc cao, `w-11` màn hẹp, `md:w-10` (`N9`); chỉ
  phần **nhìn thấy** là thụt vào.
- Icon `Minus` / `Plus` `size-4`, `text-muted`, rê vào đậm lên `text-foreground`.
- Tới đầu nào thì nút phía đó `disabled`: mờ `opacity-50`, con trỏ cấm, rê không đổi nền.
  Nút giữ chỗ, không ẩn (`N1`).
- Số `tabular-nums`, căn giữa, ô số `w-12` đủ hai ba chữ số.
- **Bị khoá**: cả khung chìm xuống `bg-background`, số `text-muted`, hai nút mờ; lý do
  khoá nói ngay dưới ô như ô nhập thường.

## Hành vi

- `type="text" inputMode="numeric" role="spinbutton"`, **không `type="number"`**: ô số của
  trình duyệt tự vẽ mũi tên lên xuống chồng lên hai nút, và nhận cả `1e2`, `-3`.
- **Số gõ vào chỉ áp khi rời ô hoặc bấm Enter.** Gõ dở "9" trong "99" mà đã áp thì nơi dùng
  tính lại tiền theo từng phím. Ô gõ trống rồi rời đi thì **giữ số cũ**, không tự điền `min`
  (`N7`). Số ngoài khoảng thì kéo về trong khoảng khi áp.
- Đang gõ dở mà bấm + thì cộng vào số đang gõ, không vào số cũ.
- **`maxLength` bằng số chữ số của `max` cộng một**, không bằng đúng số chữ số. Bằng đúng
  thì trình duyệt cắt bớt chữ số thừa trước khi ô kịp kéo về: kho còn 8 mà gõ 20 ra 2, ô
  tới 99 mà dán 150 ra 15, một số sai lặng lẽ thay vì số tối đa. Thêm một chữ số thì số
  bị cắt vẫn luôn lớn hơn `max`, và kéo về đúng `max` (đã dính 26/09/2026 ở `/components`:
  mẫu cũ ghi `String(max).length`, ngược với câu "gõ 20 thì về 8" ngay bên dưới).
- Phím trong ô theo mẫu spinbutton: mũi tên lên xuống đổi 1, PageUp/PageDown đổi 10,
  Home/End về `min`/`max`.
- Hai nút `tabIndex={-1}`: ô số đã đổi được bằng phím, Tab qua ba điểm dừng cho một ô là
  thừa. `onMouseDown` chặn mặc định để bấm − + không kéo tiêu điểm ra khỏi ô đang gõ,
  và trên điện thoại bàn phím không bật lên theo.

## Giới hạn và lỗi

- **Giới hạn biết trước là `max`, không phải lỗi.** Kho còn 8 thì `max={8}`: nút + mờ ở 8,
  gõ 20 thì về 8, dòng gợi ý dưới ô nói con số thật: *"Còn 8 sản phẩm."* Không để
  `max={99}` rồi báo lỗi khi người dùng vượt 8: để người ta bấm một nút rồi mới mắng là
  nút đó không nên bấm được (đã dính 26/09/2026: ví dụ "Kho chỉ còn 8 sản phẩm" mà
  nút + vẫn bấm được tới 99).
- **Trạng thái lỗi dành cho điều ô không biết trước**: kho giảm sau khi hàng đã nằm trong
  giỏ, server từ chối lúc đặt. Khi đó `max` đã là 8 mà số đang là 12: viền đỏ, nút + mờ,
  câu lỗi thay dòng gợi ý và nói cách sửa (*"Kho vừa giảm còn 8, giảm xuống 8 hoặc ít
  hơn."*). Bấm − một lần thì về thẳng 8.
- Dòng gợi ý nói giới hạn thật của thứ đang mua, không phải khoảng kỹ thuật chung chung
  ("Từ 1 đến 99"). Không có giới hạn đáng nói thì không có dòng gợi ý.
