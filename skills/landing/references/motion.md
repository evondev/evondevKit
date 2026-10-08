# Công thức chuyển động — luật C

Mức chuyển động (Tĩnh, Nhẹ, Nổi bật) chọn ở `H12`. File này là **cách làm** từng hiệu ứng, cho mọi
loại trang. Code viết cho Tailwind v4 + React; dự án khác đổi cú pháp, giữ con số.

⚑ Rút từ 18 landing sản phẩm được khen (tra 07/10/2026) và code landing của evondevKit. Số đông
dùng hiệu ứng nhỏ, rẻ: chữ hero hiện dần (~9/18), khối hiện khi cuộn tới (~11/18), vòng lặp nền
nhẹ (10/18), dải chạy cho logo hay đánh giá (7/18). Cảm giác "sống" của trang được khen đến từ
**demo sản phẩm dùng được hay xem được**, không từ trang trí. 0/18 có con trỏ đổi kiểu, 0/18 ghim
cảnh bằng GSAP (8/18 ghim bằng CSS `sticky`), 5/18 cuộn mượt bằng Lenis. Trang nặng nhất là trang
cuộn kể chuyện dài 19–26k px; trang sạch nhất có 0–2 vòng lặp nền.

---

## C1. Bốn điều cho mọi hiệu ứng ⚑

1. **CSS trước, JavaScript sau, thư viện sau cùng.** Hiệu ứng nào làm được bằng `@keyframes` hay
   `animation-timeline` thì không thêm gói. Landing evondevKit chạy hết bằng CSS, `requestAnimationFrame`
   và `IntersectionObserver`, không thư viện nào.
2. **Chỉ chạy khi thấy được.** Gõ chữ, canvas, đếm số, vòng lặp: khởi động khi vào khung nhìn,
   dừng khi ra (`IntersectionObserver`). Tab ẩn thì trình duyệt tự dừng `requestAnimationFrame`.
3. **Giảm chuyển động là tắt hết.** Người bật `prefers-reduced-motion: reduce` thấy trang đứng yên ở
   trạng thái cuối: chữ đủ, số đủ, dải chạy thành hàng tĩnh, video không tự chạy, canvas vẽ một
   khung. Một nửa số trang đã tra để hiệu ứng chạy tiếp, kể cả trang được khen: đừng theo số đông ở
   chỗ này.
4. **Nội dung không chờ hiệu ứng.** HTML từ server ra sẵn trạng thái cuối (chữ đủ, số thật). Máy
   chưa chạy JavaScript, công cụ chụp, trình đọc màn hình vẫn thấy đủ.

```tsx
// Hook dùng chung: ở server coi như có giảm chuyển động, HTML ra sẵn trạng thái cuối.
import { useSyncExternalStore } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  );
}
```

## C2. Chữ hero hiện dần ⚑

Lúc tải trang, các dòng trong hero (nhãn, H1, câu dẫn, hàng nút, ảnh sản phẩm) nổi lên lần lượt.

```css
@theme {
  --animate-hero-rise: hero-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;

  @keyframes hero-rise {
    from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
    to { opacity: 1; transform: none; filter: none; }
  }
}
```

```html
<p class="motion-safe:animate-hero-rise">…nhãn</p>
<h1 class="motion-safe:animate-hero-rise [animation-delay:80ms]">…</h1>
<p class="motion-safe:animate-hero-rise [animation-delay:180ms]">…câu dẫn</p>
<div class="motion-safe:animate-hero-rise [animation-delay:260ms]">…hàng nút</div>
<div class="motion-safe:animate-hero-rise [animation-delay:340ms]">…ảnh sản phẩm</div>
```

- Tổng không quá ~1,2 giây: khách đọc được H1 trước khi kịp chờ. Chỉ hero dùng; section dưới dùng `C3`.
- `motion-safe:` là đủ để giảm chuyển động thấy chữ đứng yên ngay.

## C3. Khối hiện khi cuộn tới ⚑

Thuần CSS bằng scroll-driven animation, không JavaScript. Trình duyệt chưa hỗ trợ thì khối hiện
sẵn như thường.

```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}

@utility reveal {
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      animation: reveal-up linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 45%;
    }
  }
}
```

- Gắn `reveal` lên **khối con** (card, hàng, ảnh), không lên cả section: cả section mờ thì đầu
  section (H2) cũng mờ theo.
- Card trong một lưới hiện **cùng lúc**, không lệch từng cái: lệch 80ms × 6 card là khách chờ nửa
  giây mới đọc được card cuối.
- Không hiện lại khi cuộn ngược lên (`view()` tự giữ trạng thái theo vị trí, không nháy).

## C4. Gõ chữ trong demo ⚑

Ô prompt, terminal, ô tìm kiếm trong hero gõ lần lượt vài câu ví dụ (5/18 trang có). Đây là chỗ
cảm giác "sống" đáng tiền nhất: khách thấy sản phẩm đang làm việc.

- Gõ 28ms mỗi ký tự, giữ câu đủ 2,6 giây rồi sang câu kế, hết thì vòng lại.
- **Chỉ gõ khi ô đang trong khung nhìn** (`C1` điều 2) và **dừng hẳn khi khách chạm vào**: bấm tab
  câu mẫu, focus ô, rê chuột vào nút copy. Khách đang đọc mà chữ tự đổi là giật mất câu khỏi tay họ.
- Server render đủ câu đầu; giảm chuyển động thì đứng ở câu đầu, đủ chữ.
- Có con trỏ nhấp nháy (`caret-blink 1s steps(1)`), tắt khi giảm chuyển động.
- Nút copy cạnh câu đang hiện copy **câu đủ**, không phải phần đang gõ dở.

## C5. Dải chạy (marquee) ⚑

Chỉ cho **một** hàng mỗi trang: logo khách hay đánh giá ngắn. Dải chạy ở mọi hàng là dấu hiệu
trang dùng quá tay.

```css
@theme {
  --animate-marquee: marquee 40s linear infinite;

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
}
```

```html
<div class="overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
  <ul class="flex w-max gap-12 motion-safe:animate-marquee hover:[animation-play-state:paused]">
    …danh sách…
    …danh sách lần hai, mỗi mục aria-hidden="true"…
  </ul>
</div>
```

- Hai bản danh sách nối nhau, lùi đúng 50% thì quay về đầu mà không thấy chỗ nối. Bản sao
  `aria-hidden`, trình đọc màn hình chỉ đọc một lần.
- Dừng khi rê chuột. Giảm chuyển động: `motion-safe:` tắt chạy, bản sao ẩn, danh sách xuống
  dòng thành lưới (`motion-reduce:flex-wrap motion-reduce:w-auto`).
- Mép tan dần hai bên bằng `mask-image`, không đặt hai khối màu nền đè lên.

## C6. Đếm số ⚑

Số liệu (người dùng, lượt chạy, uptime) đếm từ 0 lên khi vào khung nhìn, **một lần**.

- 1,2 giây, `easeOutCubic` (`1 - (1 - t) ** 3`), `requestAnimationFrame`, `tabular-nums` để
  chữ số không nhảy bề ngang.
- Server render **số thật**; giảm chuyển động thì hiện số luôn. Số giả thì đánh dấu (`H9`):
  đếm lên một con số bịa là nói dối có hiệu ứng.

## C7. Cuộn ghim kể chuyện ⚑

Sản phẩm có quy trình nhiều bước (nhập → xử lý → kết quả): cột trái là danh sách bước cuộn
bình thường, cột phải khung sản phẩm **dính** đổi theo bước đang đọc (6/18 trang có, toàn bằng
CSS `sticky`).

```html
<div class="grid gap-12 lg:grid-cols-2">
  <ol class="space-y-[40vh] py-[20vh]">
    <li data-step="1">…H3, đoạn ngắn…</li>
  </ol>
  <div class="hidden lg:block">
    <div class="sticky top-24 aspect-4/3 overflow-hidden rounded-2xl border border-border-strong">…khung sản phẩm, đổi theo bước…</div>
  </div>
</div>
```

- Bước đang đọc do `IntersectionObserver` trên từng `li` quyết (`rootMargin: "-45% 0px -45% 0px"`),
  khung phải đổi nội dung bằng chuyển mờ 200ms. Không GSAP pin, không cuộn chiếm quyền (scroll-jacking).
- **Bước không đang đọc mờ đi** (`opacity-40`, chuyển 200ms), bước đang đọc đậm, từ `lg`. Lúc chuyển
  bước, khung dính nằm giữa chữ hai bước (chữ bước trước ở trên, bước sau ở dưới, cùng đậm như nhau):
  khách không biết khung đang nói bước nào.
- **Dưới `lg` bỏ ghim:** mỗi bước một khối chữ kèm ảnh của chính nó, xếp dọc.
- Tối đa **một** khối ghim mỗi trang, 3–5 bước. Trang toàn khối ghim là trang 20k px khách bỏ giữa chừng.
- Giảm chuyển động: khung vẫn dính, chỉ đổi nội dung tức thì, không chuyển mờ.

## C8. Vòng lặp nền ⚑

Chấm nhấp nháy, lưới điểm sáng, canvas ASCII hay hạt, quay chậm: **tối đa 8 mỗi trang, đếm theo
loại** (trang sạch nhất có 0–2; landing evondevKit có 7–8 và được khen; trang 11–29 vòng lặp là
trang bị chê nặng). 50 chấm cùng một nhịp nhấp nháy là một vòng lặp; mỗi canvas lớn là một. Trang
phần mềm mặc định có ngôn ngữ hình lấy từ sản phẩm (`A4`, `C10`); trang thu lead giữ 0–2.

- Canvas giới hạn ~15 khung/giây, chỉ vẽ khi trong khung nhìn, giảm chuyển động thì vẽ một khung đứng.
- Vòng lặp CSS (`pixel-blink 2.4s`, `spin 14s`) gắn `motion-safe:`.
- Không đặt vòng lặp sau chữ đang cần đọc (H1, câu dẫn): mắt bị kéo khỏi chữ. **Không chạm chữ**: cả
  đường mảnh, SVG rộng cũng không giao khung chữ H1, H2, câu dẫn (đường nhịp tim chạy xuyên chữ
  cuối H1 ở hero và CTA cuối là lỗi probe `--landing` đo được).

## C9. Cuộn mượt, GSAP, 3D ⚑

Chỉ mức Nổi bật (`H12`), khi người dùng xin.

- **Cuộn mượt (Lenis):** 5/18 có, và **cả 5 đều không tắt khi giảm chuyển động**. Dùng thì bắt buộc:
  không khởi tạo Lenis khi `prefers-reduced-motion: reduce`; link neo vẫn tới đúng chỗ (`lenis.scrollTo`
  với `offset` bằng chiều cao header); trên màn chạm để cuộn gốc của máy.
- **GSAP ScrollTrigger:** chỉ khi cần cuộn kéo theo khung hình (scrub), `C7` không làm được.
  1/18 có. Giấy phép GSAP miễn phí nhưng không phải MIT, báo người dùng.
- **3D (three.js), Rive, Spline:** cần file người làm bằng editor; AI không tự dựng được mô hình ra
  hồn. Tải sau khi trang đã hiện (`dynamic import`), tắt trên điện thoại.
- **Con trỏ đổi kiểu:** không dùng (0/18 trang sản phẩm). Đó là kiểu của site agency, portfolio.

## C10. Ngôn ngữ hình ⚑

Cách làm từng kiểu trong bảng ngôn ngữ hình của `A4`. Chọn **một** kiểu theo việc sản phẩm làm,
dùng ở hero, CTA cuối, trong card và đường ngăn; không gom nhiều kiểu cho "phong phú". Món nào
cũng `aria-hidden`, `pointer-events-none`, ẩn dưới `lg`, đứng yên khi giảm chuyển động, chỉ chạy khi
trong khung nhìn (`C1`).

**Lưới chấm sáng theo trạng thái** (tác vụ, agent, tải): lưới ô `size-1.5` cách `gap-1`, ô
`bg-border-strong`; vài ô bật `bg-primary` theo nhịp như việc đang chạy (một cột sáng dần là hàng
đợi xử lý, ô rải rác sáng rồi tắt là các agent). Dùng `setInterval` 400–600ms đổi `data-on` trên
ô, chuyển màu `transition-colors duration-300`; không dùng `Math.random` mỗi khung.

**Sơ đồ nút nối dây, gói tin chạy** (hạ tầng, workflow): nút là card nhỏ có icon và tên thật của
sản phẩm (repo, hàng đợi, database), dây là `<path>` SVG `stroke-(--border-strong)`. Gói tin là chấm
`size-1.5 bg-primary rounded-full` chạy theo dây bằng `offset-path: path(...)` và
`@keyframes { to { offset-distance: 100% } }` 2–3 giây, lệch nhịp giữa các dây.

**Nét tự vẽ khi cuộn tới** (nhánh git, đường biểu đồ, tuyến đường): `stroke-dasharray` bằng độ
dài path (`getTotalLength()`), `stroke-dashoffset` từ độ dài về 0 theo `animation-timeline: view()`
như `C3`. Vẽ một lần, không lặp.

**Sóng âm, cột equaliser** (âm thanh, họp): 16–32 cột `w-1 rounded-full bg-primary`, mỗi cột
`scaleY` từ 0.2 tới 1 với thời lượng 0.8–1.4s và độ trễ khác nhau (`transform-origin: bottom`
hay giữa). Sóng tĩnh vẽ bằng SVG từ một mảng biên độ cố định, không ngẫu nhiên mỗi lần tải.

**Bản đồ chấm** (phân phối toàn cầu): bản đồ thế giới bằng chấm SVG tĩnh (lưới chấm, chỉ giữ
chấm nằm trên lục địa), 3–6 chấm màu nhấn ở thành phố thật của người dùng có vòng `animate-ping`
chậm (3s). Không quả cầu WebGL trừ khi người dùng xin (`C9`).

**Bảng lật số, bộ đếm sống** (số liệu): chữ số `font-mono tabular-nums` trong ô viền, đổi số thì
chữ cũ trượt lên mờ đi 200ms; chỉ số thật hay số `GIẢ:` được đánh dấu (`C6`, `A7`).

**Ẩn dụ từ tên** (đường ray, sổ, hải đăng): một hình kéo dọc mép trái suốt trang làm xương sống,
mỗi section là một "ga" (chấm tròn trên đường), chấm sáng khi section vào khung nhìn
(`IntersectionObserver`). Chỉ khi tên sản phẩm có hình rõ.

**Chữ terminal, ASCII, pixel** (công cụ dòng lệnh, đọc code; bộ của landing evondevKit):

**Hình pixel nhấp nháy:** lưới 4×4 ô `size-1.5 rounded-[1px]` cách `gap-[3px]`, mô tả bằng chuỗi
(`"#"` ô màu nhấn, `"o"` ô `bg-border-strong`, `"."` trống). Mỗi ô nhấp nháy lệch nhịp để không
nháy cùng lúc. Đặt tâm hình ở tâm một ô lưới nền.

```css
@theme {
  --animate-pixel-blink: pixel-blink 2.4s ease-in-out infinite;

  @keyframes pixel-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.15; }
  }
}
```

```tsx
// Nhịp lệch rải đều trong 2,4 giây theo vị trí ô.
const blinkDelay = `${(cellIndex * 373) % 2400}ms`;
<span className="size-1.5 rounded-[1px] bg-primary motion-safe:animate-pixel-blink" style={{ animationDelay: blinkDelay }} />
```

**Đám ASCII trôi:** canvas ~260×300px hai bên hero (bên phải lật `-scale-x-100`), ô chữ 7×12px,
`10px` mono, bộ ký tự từ thưa tới đặc `.:-=+*#%`. Độ đặc mỗi ô là vài sóng sin chồng nhau theo
thời gian nhân với khuôn tròn tan ra mép; dưới ngưỡng ~0,26 thì bỏ trống. Màu chữ là token chữ
nhạt, alpha theo độ đặc tối đa 0,6, thỉnh thoảng (~0,6%) một ký tự màu nhấn. ~14 khung/giây, chỉ vẽ
khi trong khung nhìn (`C1`), đọc lại màu khi đổi theme, giảm chuyển động thì vẽ một khung đứng.

```ts
function getAsciiDensity(x: number, y: number, time: number) {
  const wave =
    Math.sin(x * 7 + time * 0.55) * Math.cos(y * 5 - time * 0.4) * 0.5 +
    Math.sin((x + y) * 11 + time * 0.9) * 0.3 +
    Math.cos(x * 17 - y * 9 + time * 0.3) * 0.2;
  const distance = Math.hypot((x - 0.5) * 2, (y - 0.5) * 2);

  return (wave * 0.5 + 0.5) * Math.max(0, 1 - distance);
}
```

**Vòng tròn có icon ở giao điểm:** `size-11 rounded-full border border-border bg-background`, tâm
đặt đúng giao điểm lưới bằng `-translate-1/2`, icon `size-4` màu nhấn `motion-safe:animate-[spin_14s_linear_infinite]`.

**Nhãn mono nhảy ký tự:** khi nhãn section (`[02 / 08] TÍNH NĂNG`) cuộn tới lần đầu, ký tự thứ i
đứng yên từ nhịp `6 + i`, trước đó là ký tự ngẫu nhiên; mỗi nhịp 40ms, khoảng trắng giữ nguyên.
**Chỉ cho chữ mono** (mọi ký tự cùng bề ngang, chữ không xô dòng), một lần, server render chữ đủ.

## C11. Thanh kéo trước / sau ⚑

Hai khung chồng nhau (ảnh, hay hai mảnh HTML cùng cỡ), khung trước cắt bằng `clip-path: inset(0
calc(100% - x) 0 0)` tới vị trí thanh. Đây là chỗ khách tự tay làm, nên đáng hơn mọi hiệu ứng tự chạy.

**Chỉ khi hai bên cùng bố cục**: cùng một màn trước và sau khi sửa, ảnh gốc và ảnh đã xử lý, chỗ
nào bên này thì đúng chỗ đó bên kia. Hai bên khác cấu trúc (danh sách commit → changelog chia mục,
file ghi âm → biên bản) thì thanh cắt ngang chữ giữa từ ("ng còn nhận chữ cái"), đọc như lỗi hiển
thị: dùng hai cột cạnh nhau có mũi tên ở giữa, dưới `lg` xếp dọc mũi tên xuống.

- Kéo ở bất kỳ đâu trong khung (`pointerdown` + `setPointerCapture`), không chỉ ở tay nắm.
  `touch-action: pan-y` (`touch-pan-y`) để vuốt dọc trên điện thoại vẫn cuộn trang.
- Tay nắm là `role="slider"` `tabIndex={0}` có `aria-valuenow`, `aria-label`; phím ← → bước 2%,
  Shift bước 10%, Home / End về hai mép. Vòng tiêu điểm trên nút tròn của tay nắm.
- Đường thanh `w-0.5 bg-white` có viền mờ, nút tròn `size-10` icon `ChevronsLeftRight` giữa khung.
- Nhãn "Trước" / "Sau" ở hai góc dưới, nhãn sau màu nhấn. Khởi đầu 50%, không tự chạy qua lại.

## C12. Màn sản phẩm sống ⚑

Màn app giả ở hero (`A3`) chạy một **kịch bản ngắn** đúng chuyện sản phẩm làm hằng ngày (`A8`): job
chạy xong thì dòng xanh, job trễ thì chấm vàng rồi thông báo Slack trượt vào; cuộc họp kết thúc thì
biên bản hiện từng dòng; commit mới thì changelog thêm mục.

- **Kịch bản cố định**, mảng sự kiện có mốc thời gian, 8–12 giây rồi vòng lại; không `Math.random`
  (mỗi lần tải một kiểu, chụp ảnh không ổn định).

  ```ts
  const heroScript: HeroEvent[] = [
    { at: 0, type: "row-insert", row: { job: "nightly-db-backup", status: "ok" } },
    { at: 2400, type: "status", job: "invoice-sync", status: "late" },
    { at: 3600, type: "toast", text: "invoice-sync is 12 min late" },
    { at: 7000, type: "status", job: "invoice-sync", status: "ok" },
  ];
  ```
- Mỗi sự kiện một thay đổi nhỏ, có chuyển động 200–300ms: dòng mới mở từ `grid-rows-[0fr]` sang
  `grid-rows-[1fr]`, chấm trạng thái `transition-colors`, thông báo trượt vào góc khung (lệch 8px +
  mờ → rõ) rồi tự đi sau 3 giây, con số tăng như `C6`.
- **Khung cao cố định**: dòng mới đẩy dòng cuối ra khỏi khung (`overflow-hidden`), khung không đổi
  chiều cao, trang bên dưới không nhảy.
- Chỉ chạy khi khung trong khung nhìn (`C1`); **dừng khi khách rê chuột vào khung, focus hay bấm
  tab** của demo (`C4`), chạy lại khi rời đi.
- Server render và giảm chuyển động: đứng ở một khung giữa kịch bản có đủ các trạng thái (dòng
  xanh, dòng vàng, thông báo), không chạy.

## C13. Màn nghiêng phẳng dần khi cuộn ⚑

Màn sản phẩm lớn (hero kiểu nghiêng, hay khối "cho xem sản phẩm làm việc") nằm nghiêng ra sau, cuộn
tới thì phẳng dần về thẳng. Thuần CSS, tiến độ theo cuộn, một chỗ mỗi trang (`A8`).

```css
@keyframes tilt-flat {
  from { transform: perspective(1400px) rotateX(16deg) scale(0.94); opacity: 0.7; }
  to { transform: none; opacity: 1; }
}

@utility tilt-in {
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      transform-origin: 50% 0;
      animation: tilt-flat linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 40%;
    }
  }
}
```

- Gắn trên khung màn (`lg:tilt-in`), dưới `lg` để phẳng: màn hẹp nghiêng làm chữ trong màn nhỏ đi.
- Khung bọc không `overflow-hidden` theo chiều dọc, không thì bóng và mép trên bị cắt khi nghiêng.
- Trình duyệt chưa hỗ trợ hay giảm chuyển động: màn thẳng ngay.
