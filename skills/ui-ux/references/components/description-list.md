# Nhãn và giá trị (description list)

Khối thông tin của trang chi tiết: email, số điện thoại, trạng thái, ngày tạo.
Nằm trong card (`card.md`), mỗi hàng một cặp nhãn và giá trị, theo `T23`.

```html
<dl class="@container space-y-3 text-sm">
  <!-- Mỗi cặp một khối. Đổi khuôn theo bề rộng chính <dl>, không theo màn: dưới 384px nhãn trên giá trị
       dưới, từ @sm (384px) hai cột nhãn 7rem, từ @xl (576px) nhãn 10rem -->
  <div class="grid gap-1 @sm:grid-cols-[7rem_minmax(0,1fr)] @sm:items-baseline @sm:gap-6 @xl:grid-cols-[10rem_minmax(0,1fr)]">
    <dt class="text-muted">Email</dt>
    <dd class="min-w-0 font-medium text-foreground [overflow-wrap:anywhere]">minhanh.nguyen@lumen.vn</dd>
  </div>
  <div class="grid gap-1 @sm:grid-cols-[7rem_minmax(0,1fr)] @sm:items-baseline @sm:gap-6 @xl:grid-cols-[10rem_minmax(0,1fr)]">
    <dt class="text-muted">Trạng thái</dt>
    <dd><!-- badge M7, KHÔNG phải chữ trơn "Đang giao dịch" -->
      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-black/5">
        <span class="size-1.5 rounded-full bg-current"></span>Đang giao dịch
      </span>
    </dd>
  </div>
  <div class="grid gap-1 @sm:grid-cols-[7rem_minmax(0,1fr)] @sm:items-baseline @sm:gap-6 @xl:grid-cols-[10rem_minmax(0,1fr)]">
    <dt class="text-muted">Nhãn</dt>
    <dd class="flex flex-wrap gap-1.5"><!-- mỗi nhãn một pill, KHÔNG nối bằng dấu phẩy -->
      <span class="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">VIP</span>
      <span class="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">Khách quen</span>
    </dd>
  </div>
  <div class="grid gap-1 @sm:grid-cols-[7rem_minmax(0,1fr)] @sm:items-baseline @sm:gap-6 @xl:grid-cols-[10rem_minmax(0,1fr)]">
    <dt class="text-muted">Tổng doanh thu</dt>
    <dd class="font-medium tabular-nums text-foreground">1.284.500.000<span class="ml-1 text-muted">đ</span></dd>
  </div>
  <div class="grid gap-1 @sm:grid-cols-[7rem_minmax(0,1fr)] @sm:items-baseline @sm:gap-6 @xl:grid-cols-[10rem_minmax(0,1fr)]">
    <dt class="text-muted">Số điện thoại</dt>
    <dd class="text-muted">—</dd>
  </div>
</dl>
```

- **`<dl>` / `<dt>` / `<dd>`**, không dựng bằng `<div>`: trình đọc màn hình đọc ra đúng cặp nhãn và giá trị.
- **`@sm:items-baseline`** để chữ nhãn thẳng dòng chữ trong badge hay pill: badge có `py-1` nên cao hơn dòng chữ thường, căn đỉnh thì nhãn lệch lên vài px so với chữ trong badge.
- **Cột nhãn rộng cố định** để mọi giá trị thẳng một mép. Nhãn dài hơn cột thì cho xuống dòng trong cột, không nới cột theo nhãn dài nhất.
- **Khuôn đổi theo bề rộng `<dl>` (`@container`), không theo viewport.** Cùng một card Liên hệ nằm ở cột
  phải 22rem, trong panel 448px, hay giữa khung rộng; `sm:` chỉ biết màn rộng 1440px, không biết khối
  chỉ còn 310px. Ba bậc theo khối:
  - **Dưới 384px: xếp chồng**, nhãn trên, giá trị ngay dưới (`gap-1`), giữa các cặp `space-y-3`. Khe trong
    cặp nhỏ hơn khe giữa các cặp thì mắt mới gom đúng nhãn với giá trị của nó. Cột phải trang chi tiết,
    màn điện thoại rơi vào đây.
  - **384–575px: nhãn `7rem`** (panel trượt, card nửa khung). Panel 448px trừ lề còn ~400px: nhãn `10rem`
    chiếm gần nửa, giá trị bị ép xuống 3–4 dòng.
  - **Từ 576px: nhãn `10rem`.**

  Card Liên hệ ở cột phải, `<dl>` 310px, `sm:grid-cols-[7rem_…]` bật vì
  màn 1440px: giá trị còn 174px, email vỡ ba dòng ("…thi@" / "quangtrung-" / "logistics.com.vn"), địa chỉ
  bốn dòng, nhãn "Thuốc đang dùng" hai dòng. Xếp chồng cùng khối: email và địa chỉ hai dòng. `probe.mjs` báo
  "nhãn–giá trị hai cột trong khối hẹp". Tailwind v3 cần plugin `@tailwindcss/container-queries`; không có
  thì truyền prop bố cục từ chỗ đặt card (cột phải thì xếp chồng), đừng quay về `sm:`.
- **Giá trị `font-medium text-foreground`, nhãn `text-muted`** (`T23`). Giá trị dài xuống dòng, bám mép trên cùng nhãn (`items-start`), không `truncate`: đây là chỗ để đọc đủ.
- **Giá trị có avatar (người phụ trách) là `flex h-5 items-center gap-2`, không `inline-flex`.** `inline-flex` nằm trong dòng chữ nên cả cụm bị đẩy theo baseline: hàng cao 24px thay vì 20px, chữ tên thấp hơn chữ nhãn 1,5px, nhìn rõ nhãn "Phụ trách" nổi lên cao hơn tên (đổi avatar xuống `size-5` vẫn lệch). `h-5` giữ hàng đúng một dòng chữ, avatar `size-6` tràn 2px trên dưới vào khoảng cách giữa hai hàng.
- **`[overflow-wrap:anywhere]` cho giá trị**: email, URL, mã dài không có dấu cách nên không tự xuống dòng, sẽ đẩy tràn card ở màn hẹp.
- **Email chèn `<wbr>` ngay sau `@`**, để email dài xuống dòng ở ranh giới tên / tên miền. `overflow-wrap:anywhere` chỉ là lưới đỡ: một mình nó thì bẻ ở bất kỳ ký tự nào vừa hết chỗ. Ví dụ: thêm nút sao chép cạnh email, cột giá trị hẹp đi 28px, "…@hoanggiap" / "hat-import-export.com.vn" vỡ giữa chữ.
  - **Email nằm giữa câu chữ** (hộp xác nhận, toast, dòng "Đang chờ xác nhận…") thì `<wbr>` chưa đủ: tên miền có gạch nối thì trình duyệt còn bẻ ở gạch nối, ra "…khang@evondev-" / "studio.com" (ở 375px còn vỡ "…@evo" / "ndev-studio.com"). Tách email làm hai khúc `inline-block max-w-full`, mỗi khúc chỉ bẻ bên trong khi tự nó dài hơn cả dòng:

    ```tsx
    interface EmailTextProps {
      email: string;
      // Dấu câu ngay sau email ("." cuối câu, ","): phải nằm trong khúc cuối, xem dưới.
      suffix?: string;
    }

    function EmailText({ email, suffix }: EmailTextProps) {
      const atIndex = email.lastIndexOf("@");

      if (atIndex < 0) return <span className="wrap-anywhere">{email}{suffix}</span>;

      const localSegments = email.slice(0, atIndex + 1).split(".");

      return (
        // Cả email là một khối: vừa một dòng thì xuống dòng nguyên cụm, không bẻ sau "@".
        <span className="inline-block max-w-full wrap-anywhere">
          <span className="inline-block max-w-full">
            {localSegments.map((segment, index) => (
              <Fragment key={index}>
                {index > 0 && <wbr />}
                {index > 0 && "."}
                {segment}
              </Fragment>
            ))}
          </span>
          <span className="inline-block max-w-full">
            {email.slice(atIndex + 1)}
            {suffix}
          </span>
        </span>
      );
    }
    ```

    Dùng chung một component này cho mọi chỗ in email, kể cả hàng giá trị ở trên.
  - **Dấu câu ngay sau email đi vào `suffix`, không viết sau thẻ.** Sau một khối `inline-block`
    trình duyệt được phép xuống dòng, nên `<EmailText />.` ở câu dài ra dòng mở đầu bằng dấu
    chấm: "…evondev.com.vn" / ". Đổi tài khoản".
    Viết `<EmailText email={email} suffix="." />`. Bọc cả email và dấu bằng `whitespace-nowrap`
    thì không được: mất luôn chỗ xuống dòng sau `@`. Probe báo lỗi này ở mục "Dấu câu rơi xuống
    đầu dòng".
  - **Khối bọc ngoài cũng `inline-block max-w-full`.** Để khối ngoài là inline thường thì trình
    duyệt chọn ngắt ngay sau `@` dù cả email vừa một dòng: "Bạn đang đăng nhập bằng
    tran.nguyen.anh.tuan.khang@" / "evondev-studio.com. Đổi tài khoản", đọc như hai mẩu, câu căn
    giữa thì hai dòng lệch hẳn nhau. Khối ngoài `inline-block` thì
    email vừa dòng sẽ xuống nguyên cụm; chỉ khi dài hơn cả dòng mới ngắt sau `@` như trên (thử ở
    320, 375, 1280px).
  - **Phần trước `@` dài hơn cả dòng thì xuống dòng trước dấu chấm** (`<wbr>` trước mỗi `.`, như trên). Không có nó thì `wrap-anywhere` bẻ ở ký tự vừa hết chỗ, và hay rơi đúng trước `@`: một dòng chỉ có mỗi "@" ("…toan.tong.hop" / "@" / "congty-…"). Có `<wbr>` thì ra "…toan.tong" / ".hop@" / "congty-…". Không dính `@` vào ký tự cuối bằng `nowrap`: ra "…tong.ho" / "p@", vẫn vỡ giữa chữ.
- **Giá trị trống là `—` `text-muted`**, một ký hiệu cho mọi ô trống, giống ô trống trong bảng (`layouts/app.md`, `T18`). Không viết "Chưa có", "Chưa gắn nhãn", mỗi dòng một câu.
- **Giá trị có khuôn riêng thì dùng đúng component của nó**, không viết chữ trơn: trạng thái là badge màu (`M7`), nhãn phân loại là pill (`M8`, `list-row.md`), tiền dùng `đ` không `₫` (`charts.md`), số `tabular-nums`, mã và ID `font-mono` (`T17`).
- **Email là link `mailto:`, số điện thoại là link `tel:`**, chữ vẫn `text-foreground`, rê vào gạch chân. Kèm icon button `copy` `size-7` hiện khi rê vào hàng, luôn hiện trên màn chạm (`I11`); bấm thì icon đổi `check` 1,5 giây, không toast. **Vùng bấm nới ra 40px mà hình giữ 28px**: `relative before:absolute before:-inset-1.5` (số âm buộc phải giữ theo `N11`, cùng cách tay cầm ở `range-slider.md`: nút to lên `size-10` thì cột giá trị hẹp thêm 12px và mỗi hàng trên điện thoại cao thêm 12px). Nút 28px trơn trên màn chạm là dưới mức 32px. Hai hàng có nút sao chép cách nhau 56px nên vùng 40px không chồng nhau. Mặc định ở trang chi tiết và panel xem bản ghi; ở form xác nhận, màn chỉ đọc lại thông tin vừa nhập thì để chữ trơn. **Không lặp các việc này vào menu ⋯** ("Gọi điện", "Sao chép email"): việc gắn với một giá trị thì nằm cạnh giá trị đó (`layouts/app.md`, "Trang chi tiết bản ghi").
- Không kẻ đường chia giữa các hàng khi dưới 8 hàng: khoảng trắng đủ tách. Nhiều hơn thì chia nhóm có tiêu đề nhỏ, không kẻ từng hàng.
