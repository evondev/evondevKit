# Tên sửa tại chỗ

Tên bản ghi ở đầu trang (dự án, tài liệu, bảng) đổi được ngay tại chỗ, không mở form.
Ô sửa tại chỗ trong dòng bảng (hạn chót, vai trò) là chuyện khác, xem `../layouts/app.md`.
Email và mật khẩu không sửa tại chỗ (`../layouts/app.md`, trang hồ sơ).

## Hành vi

- **Bấm vào tên thì thành ô nhập, chữ chọn sẵn** để gõ đè luôn. Enter hoặc nút ✓ thì lưu,
  Esc hoặc nút ✕ thì huỷ, bấm ra ngoài thì lưu (như hầu hết app quản lý công việc).
- **Để trống thì không lưu**: viền đỏ, câu lỗi dưới ô ("Chưa nhập tên dự án", nói việc cần
  làm, `layouts/form.md`), ô vẫn mở. Gõ lại chữ thì lỗi mất, dòng lỗi giữ chỗ tới lúc thoát.
  Lưu tên đã bỏ khoảng trắng hai đầu; tên không đổi thì không gọi lưu.
- **Hai nút ✓ ✕ luôn có**, cho chuột và màn chạm (điện thoại không có Esc, `N9`). Rê vào thấy
  tooltip kèm phím tắt. Hai nút `onMouseDown={preventDefault}`: không có thì ô blur trước, mà
  blur là lưu, nên bấm Huỷ thành lưu.
- **Enter lúc bộ gõ đang gạch chân chữ** (`event.nativeEvent.isComposing`) là chốt chữ tiếng
  Việt, không phải lưu.
- **Esc chặn nổi bọt**: tên nằm trong panel trượt hay modal thì Esc chỉ huỷ sửa, không đóng panel.
- **Tiêu điểm**: thoát bằng phím hay nút thì về lại nút tên; bấm ra ngoài thì để yên chỗ vừa bấm.
- **Ô là `<textarea rows={1}>` tự giãn** (`field-sizing-content`), không `<input>`: tên dài xuống
  dòng như lúc đứng yên, không cuộn ngang mất chữ đầu (`N8`). Dán chữ nhiều dòng thì gộp bằng
  dấu cách; `enterKeyHint="done"`.
- **Lúc đứng yên là nút `ghost` nằm trong `<h1>`**, không phải `<h1>` bấm được. Bút chì
  `size-4 text-muted` nằm cuối dòng chữ, đi theo chữ cuối khi xuống dòng. Tên ở đầu trang là
  việc phụ nên bút chì chỉ hiện lúc rê và lúc Tab tới; màn chạm thì luôn hiện (`I11`). Trình đọc
  màn hình đọc "Website bán hàng 2026. Sửa tên dự án" (`sr-only`).

## Bố cục: chữ không được nhúc nhích

Bấm vào tên thì chỉ khung hiện ra, chữ đứng yên từng pixel (`N1`). Ba thứ phải khớp:

1. **Cùng khuôn chữ.** Nút tên và ô nhập cùng `px-2`, viền 1px (nút viền trong suốt), dòng
   `leading-7`, cao 44/40px (`min-h-11 py-1.75 md:min-h-10 md:py-1.25`), cỡ chữ đúng cỡ `<h1>`
   của đầu trang (`text-xl font-semibold`, `../layouts/app.md`).
2. **Chữ thẳng cột với phần còn lại của đầu trang, khung tràn ra trái.** Nền rê và viền ô nằm
   ngoài chữ, lùi ra trái đúng padding + viền (8 + 1 = 9px). Không lùi thì tên thụt 9px so với
   link cấp cha, câu mô tả, hàng tab ngay trên dưới nó (đã dính 26/09/2026: tên thụt 9px so với
   nhãn phía trên, ở cả ba bề rộng). Các app có tên sửa tại chỗ đều giữ chữ thẳng cột, khung
   mới là thứ tràn ra. Đây là ngoại lệ của `N11` (vùng bấm nở ra ngoài chữ): không có cách không
   âm nào giữ được cả chữ thẳng cột lẫn khung bao quanh chữ.
3. **Cùng bề rộng dòng chữ ở hai trạng thái.** Từ `sm` hai nút đứng cạnh ô, ăn mất 96px
   (104px ở `sm`, nút 44px). Lúc đứng yên tên cũng chừa đúng chỗ đó (`sm:pr-26 md:pr-24`), không
   thì bấm vào là tên dài xuống dòng khác đi (đã dính 26/09/2026, 1280px: "hàng khu" rớt từ
   dòng một xuống dòng hai lúc vào sửa). Dưới `sm` hai nút xuống hàng dưới, nằm phải, chung hàng
   với câu lỗi: để bên phải thì ở 375px ô chỉ còn ~200px, tên ngắn cũng vỡ hai dòng.

```tsx
// Đứng yên
<h1
  className={cn(
    // Số âm: khung nở ra ngoài chữ, chữ thẳng cột với đầu trang (N11 cách 4). 9px = px-2 + viền.
    "-ml-2.25 min-w-0",
    // Chừa chỗ hai nút ✓ ✕ của lúc sửa: tên xuống dòng y hệt ở hai trạng thái.
    "sm:pr-26 md:pr-24",
  )}
>
  <Button
    ref={triggerRef}
    variant="ghost"
    onClick={startEditing}
    className={cn(
      "group w-fit max-w-full justify-start border border-transparent px-2 text-left",
      "min-h-11 py-1.75 md:min-h-10 md:py-1.25",
      "text-xl leading-7 font-semibold text-foreground hover:text-foreground",
    )}
  >
    <span className="min-w-0">
      {value}
      <span className="sr-only">. {editLabel}</span>
      <Pencil
        className={cn(
          "ml-2 inline-block size-4 align-[-1px] text-muted transition-opacity",
          "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
          "[@media(hover:none)]:opacity-100",
        )}
        aria-hidden
      />
    </span>
  </Button>
</h1>

// Đang sửa
<div
  onKeyDown={handleKeyDown}
  onBlur={handleBlur}
  className={cn(
    // Số âm đặt trên khối lưới, không trên textarea: textarea không tự giãn theo margin âm,
    // mép phải hụt 9px so với hàng nút ở màn hẹp (đo 26/09/2026).
    "-ml-2.25 grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-2",
  )}
>
  <textarea
    ref={fieldRef}
    rows={1}
    enterKeyHint="done"
    aria-label="Tên dự án"
    aria-invalid={hasError || undefined}
    className={cn(
      fieldControlClasses, // viền, nền, bo, focus, lỗi của ô nhập (input.md)
      "col-span-2 sm:col-span-1",
      "field-sizing-content resize-none px-2",
      "min-h-11 py-1.75 md:min-h-10 md:py-1.25",
      "text-xl leading-7 font-semibold md:text-xl",
    )}
  />

  <div className="col-start-2 row-start-2 flex gap-2 sm:row-start-1">
    {/* Tooltip "Lưu · Enter", "Huỷ · Esc" bọc từng nút */}
    <Button icon={Check} aria-label="Lưu" onMouseDown={keepFieldFocused} onClick={save} className="size-11 p-0 md:size-10" />
    <Button icon={X} aria-label="Huỷ" onMouseDown={keepFieldFocused} onClick={cancel} className="size-11 p-0 md:size-10" />
  </div>

  {/* Câu lỗi thụt lại 9px: thẳng chữ trong ô và thẳng cột với đầu trang, không thẳng khung. */}
  {hasMessageRow ? (
    <div className="col-start-1 row-start-2 min-w-0 pl-2.25">
      <FieldMessage error={error} isSpaceReserved />
    </div>
  ) : null}
</div>
```

Đổi `px-2` thì đổi luôn ba chỗ `2.25` (9px). Đổi cỡ nút ✓ ✕ thì đổi `sm:pr-26 md:pr-24` (hai nút + hai
khoảng `gap-2`).

*Phép thử:* đo `x` của chữ tên bằng `Range` và `x` của link cấp cha / câu mô tả: bằng nhau. Bấm
vào một tên dài ở 1280px: số dòng và chữ đầu mỗi dòng không đổi.
