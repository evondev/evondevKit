# Khung chat với trợ lý AI

Hỏi đáp với trợ lý trong app: hỏi số liệu, soạn văn bản, tra đơn. Mượn khuôn từ
file đã có (`N5`): danh sách bước dùng công cụ mượn đường dọc của cây thư mục
(`tree.md`) và màu vòng của dòng thời gian (`timeline.md`), gợi ý mượn nút viền
(`button.md`), lỗi mượn "Lỗi tải" (`empty-state.md`).

```html
<div class="mx-auto flex h-full w-full max-w-3xl flex-col">
  <ol class="flex-1 space-y-8 overflow-y-auto px-4 py-6"><!-- vùng tin cuộn, ô soạn đứng yên -->
    <li class="space-y-6">
      <!-- Tin người dùng: bong bóng bên phải -->
      <p class="ml-auto w-fit max-w-[80%] rounded-3xl bg-surface px-4 py-2.5 text-base whitespace-pre-wrap [overflow-wrap:anywhere]">…</p>

      <!-- Câu trả lời: không bong bóng, không avatar, thẳng mép trái cột -->
      <div class="max-w-[55ch] space-y-3">
        <button class="-ml-2 flex h-8 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm text-muted hover:text-foreground" aria-expanded="false">
          <!-- ô đầu size-4: ChevronRight (xoay 90° khi mở), hoặc LoaderCircle khi chưa có bước nào -->
          Đã dùng 3 công cụ
        </button>
        <ul class="ml-[7px] space-y-3 border-l border-border-strong pl-5"><!-- đường dọc ở tâm chevron -->
          <li class="flex gap-2">
            <!-- Check size-4 text-muted | LoaderCircle animate-spin | CircleAlert text-red-600 -->
            <div class="min-w-0">
              <p class="text-sm text-foreground">Tra cứu đơn hàng</p>
              <p class="text-xs text-muted">1.284 đơn đã giao, không tính 37 đơn hoàn</p>
            </div>
          </li>
        </ul>
        <div class="text-base text-pretty">…</div>
        <!-- hàng thao tác: Sao chép, Tạo lại -->
      </div>
    </li>
  </ol>
  <!-- ô soạn, xem mục dưới -->
</div>
```

## Hai phía

- **Câu trả lời không có avatar.** Bên nào nói đã rõ bằng bong bóng và căn phải; một vòng robot trước mỗi câu trả lời là lần nói thứ hai, và ăn mất ~56px bề ngang của cột chữ (`N3`). Các trợ lý AI phổ biến đều đã bỏ. Chỉ thêm avatar khi cuộc chat có **từ ba bên trở lên** (trợ lý + nhân viên hỗ trợ thật) (đã dính 24/09/2026: vòng robot có viền ở mọi câu trả lời, cột chữ lùi vào 80px so với tiêu đề và ô soạn).
- **Tin người dùng**: `bg-surface` trên nền trang, `rounded-3xl`, `max-w-[80%]` (màn hẹp `max-w-[85%]`), giữ xuống dòng người gõ (`whitespace-pre-wrap`), đường dẫn liền một chuỗi thì bẻ ở bất kỳ đâu (`[overflow-wrap:anywhere]`, `N8`). Không màu nhấn, không bóng.
- **Câu trả lời `max-w-[55ch]`** (`T11`), `text-pretty`. Mã đơn, mã khách `font-mono` (`T17`), tiền theo đúng khuôn `đ` của app (`N5`).
- **Tin nhắn một cỡ, phụ trợ nhỏ hơn**: tin nhắn hai phía `text-base` (đây là chữ để đọc dài, như bài viết), mọi thứ phụ trợ (hàng công cụ, bước, gợi ý, "Đã dừng giữa chừng") `text-sm` hoặc `text-xs`. **Quá trình nhẹ hơn kết quả** (đã dính 24/09/2026: tên bước công cụ `text-base text-foreground`, nặng ngang câu trả lời ngay bên dưới).

## Bước dùng công cụ

- **Hàng đầu** là nút mở đóng `text-sm text-muted`, rê vào chữ đậm lên. Ô đầu `size-4`: chevron khi có danh sách bước; **spinner khi chưa có bước nào** ("Đang soạn câu trả lời"). Bước đầu tiên về thì chevron thế đúng ô đó, chữ không xê (`N1`).
- **Icon bước**: xong là `Check` **xám**, không xanh lá: dùng công cụ là việc thường ngày, như việc lặp trong `timeline.md`. Đang chạy là spinner. Hỏng là `CircleAlert text-red-600`. Chỉ icon có màu, tên bước luôn `text-foreground` (`timeline.md`).
- **Mô tả bước nói công cụ đã làm gì, không nói trước kết quả**: phạm vi, nguồn, bộ lọc ("Quét 214 đơn của chi nhánh Thủ Đức trong quý 3", "Dùng số liệu quý 2 đã chốt ngày 05/07"). Kết quả là việc của câu trả lời. Đã dính 24/09/2026: bước ghi "12 đại lý có đơn, tổng 409.000.000 đ", ngay dưới câu trả lời mở đầu "Quý 3 có 12 đại lý đặt hàng, tổng 409.000.000 đ" (`N3`).
- **Mặc định thu gọn**, cả lúc đang chạy lẫn lúc xong. Thu gọn mà đang chạy thì hàng đầu là **tên bước đang chạy** + spinner sau chữ ("Đang đọc bảng chi phí quảng cáo ◌"); xong thì "Đã dùng 3 công cụ".
- **Một việc đang chạy, một spinner.** Mở danh sách ra thì spinner chỉ còn ở hàng bước, hàng đầu đổi về "Đang dùng 2 công cụ" không quay. Đã dính 24/09/2026: mở ra thấy tên bước và spinner hai lần, một ở hàng đầu một ở danh sách (`N3`).
- **Có bước lỗi mà vẫn trả lời được thì vẫn thu gọn**, hàng đầu "Đã dùng 2 công cụ, 1 lỗi" **cùng màu xám**; đỏ chỉ ở icon bước khi mở ra. Câu trả lời đã nói lỗi và cách xử lý rồi. Đã dính 24/09/2026: tự mở danh sách, "1 lỗi" đỏ ở hàng đầu, icon đỏ, dòng mô tả bước, rồi câu trả lời: bốn lần một ý.
- Câu trả lời không dùng công cụ nào thì không có hàng này.

## Đang chạy, dừng, lỗi

- **Chữ đang chạy ra**: một khối con trỏ nhạt ở cuối (`inline-block h-[1.1em] w-2 rounded-sm bg-foreground/30 align-text-bottom`), không nhấp nháy: chữ đang chạy đã là chuyển động. Chưa có gợi ý, chưa có hàng thao tác.
- **Nút gửi thành nút dừng**: cùng chỗ, cùng cỡ, cùng `primary`, icon `Square` đặc, `aria-label="Dừng trả lời"` + tooltip. Ô soạn **không khoá**, gõ trước câu sau được.
- **Người dùng bấm dừng**: giữ nguyên phần đã chạy ra, rồi **hàng thao tác như câu đã xong**, chữ `text-xs text-muted` "Đã dừng giữa chừng" đứng cùng hàng, sau hai icon. Không đỏ: người dùng tự dừng, không có gì hỏng. Đã dính 24/09/2026: dừng xong chỉ có dòng chữ, không Tạo lại, không Sao chép: muốn chạy tiếp phải gõ lại cả câu hỏi (`N6`, mỗi bước có lối ra).
- **Không trả lời được**: hai tầng như "Lỗi tải" (`empty-state.md`): `text-sm font-medium text-red-600` "Trợ lý chưa trả lời được", dưới là lý do `text-muted`, rồi nút viền `RotateCw` "Thử lại". **Căn trái** ở chỗ câu trả lời, không căn giữa như danh sách.

## Hàng thao tác dưới câu trả lời

Nút chỉ icon `ghost` `size-8`, có tooltip và `aria-label`: `Copy` "Sao chép", `RotateCw` "Tạo lại". Icon đầu tiên thẳng cột với chữ câu trả lời (bù `-ml-2`, `button.md`).

- Có ở câu đã chạy xong **và câu bị dừng**; không có ở câu đang chạy và câu lỗi (câu lỗi đã có nút Thử lại). **Câu cuối luôn hiện**; câu cũ hiện khi rê hoặc Tab tới (`opacity-0 group-hover:opacity-100 group-focus-within:opacity-100`), **vẫn giữ chỗ** để rê vào không xô (`N1`). Màn không có hover thì luôn hiện (`I11`).
- Không thêm like/dislike, chia sẻ, đọc to khi đề không nói. Đây là phần của mỗi câu trả lời (như ✕ của modal), không phải khối tự thêm; lúc giao báo một dòng.

## Gợi ý hỏi tiếp

```html
<div class="space-y-2">
  <p class="text-sm text-muted">Hỏi tiếp</p>
  <button class="block w-fit max-w-full cursor-pointer rounded-xl border border-border-strong bg-surface px-3 py-2 text-left text-sm text-foreground hover:border-foreground/20 hover:bg-surface-hover">
    Chi nhánh cửa hàng nào giảm nhiều nhất?
  </button>
</div>
```

- **Nút viền** (`I1`), chữ `text-foreground`. Đã dính 24/09/2026: nền xám `secondary` + chữ xám trên nền trang xám, ba khối đọc ra là nút bị khoá (`I8`), lại là thứ nặng nhất dưới câu trả lời.
- **Chỉ dưới câu trả lời cuối, đã xong.** Gửi câu mới thì gợi ý cũ biến mất.
- **Mỗi gợi ý một dòng, tối đa ~45 ký tự, 2–3 gợi ý.** Xếp dọc, cột gợi ý không rộng quá cột câu trả lời. Đã dính 24/09/2026: gợi ý 85 ký tự vỡ hai dòng và chạy qua mép phải của câu trả lời tới tận mép ô soạn.
- Bấm gợi ý gọi gì là handler rỗng (`onSuggestionSelect`, `N10`).

## Rỗng: cuộc trò chuyện mới

- **Không có câu "Chưa có tin nhắn nào".** Ở đây người dùng là người mở lời, câu báo rỗng không nói họ làm gì tiếp (`N6`). Thay bằng **2–3 gợi ý mở đầu**, cùng khuôn gợi ý hỏi tiếp, nhãn "Thử hỏi", nằm **ngay trên ô soạn**, đúng chỗ gợi ý hỏi tiếp vẫn nằm trong cuộc trò chuyện (`N5`).
- Không câu chào to, không logo, không hình (`empty-state.md`). Placeholder của ô soạn đã nói hỏi được gì, câu chào nhắc lại là nói hai lần (`N3`).

## Ô soạn

```html
<form class="mx-4 mb-4 flex items-end gap-2 rounded-3xl border border-border-strong bg-surface p-2 focus-within:border-focus focus-within:ring-2 focus-within:ring-focus">
  <textarea rows="1" class="max-h-60 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-base outline-hidden placeholder:text-muted" placeholder="Hỏi về đơn hàng, doanh thu"></textarea>
  <button class="grid size-10 shrink-0 cursor-pointer place-items-center rounded-2xl bg-primary text-primary-foreground hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-30" aria-label="Gửi" disabled>
    <!-- ArrowUp size-4. Đang chạy: Square size-3.5 fill-current, aria-label="Dừng trả lời", không disabled -->
  </button>
</form>
```

- **Dính đáy**, rộng bằng cột tin. Vùng tin cuộn phía trên, ô soạn không cuộn theo.
- **Tự cao theo chữ** từ một dòng tới `max-h-60` (~8 dòng) rồi cuộn trong ô. Nút gửi **bám góc dưới phải** (`items-end`), không trôi lên giữa khi ô cao lên.
- **Bo lồng nhau** (`M19`): ô `rounded-3xl` (24px) = nút `rounded-2xl` (16px) + `p-2`. Đã dính 24/09/2026: nút sát mép ô ~4px, góc nút và góc ô không song song.
- **Ô trống thì nút gửi khoá `opacity-30`**, không `opacity-50` như mọi nút khoá khác. Ngoại lệ có lý do: đây là nút khoá **đứng thường trực** trên màn, `primary` mờ 50% ra khối xám giữa, thành thứ đậm nhất màn rỗng (đã dính 24/09/2026).
- Focus giống ô nhập (`F20`): viền `--border-focus` + ring mờ, trên cả khung, không chỉ quanh textarea.
- Bàn phím (`N9`): Enter gửi, Shift+Enter xuống dòng. Gửi là handler rỗng (`onSend`).
- Người dùng cuộn lên đọc lại trong lúc chữ đang chạy: hiện một nút tròn `ArrowDown` viền, `size-8`, giữa cột ngay trên ô soạn, bấm là xuống cuối. Có kéo tự động hay không là logic của người dùng (`N10`).

## Trạng thái phải dựng

Mỗi cái một ví dụ tĩnh (`N2`): xong có gợi ý · đang chạy chữ · đang dùng công cụ
chưa có chữ · đang soạn chưa có công cụ · một công cụ lỗi vẫn trả lời · người
dùng bấm dừng · không trả lời được · cuộc trò chuyện mới · ca biên (tin rất dài,
đường dẫn liền một chuỗi, ô soạn nhiều dòng).
