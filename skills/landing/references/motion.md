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
<div class="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
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
- **Dưới `lg` bỏ ghim:** mỗi bước một khối chữ kèm ảnh của chính nó, xếp dọc.
- Tối đa **một** khối ghim mỗi trang, 3–5 bước. Trang toàn khối ghim là trang 20k px khách bỏ giữa chừng.
- Giảm chuyển động: khung vẫn dính, chỉ đổi nội dung tức thì, không chuyển mờ.

## C8. Vòng lặp nền ⚑

Chấm nhấp nháy, lưới điểm sáng, canvas ASCII hay hạt, quay chậm: **tối đa 2 mỗi trang** (trang
sạch nhất có 0–2; trang 11–29 vòng lặp là trang bị chê nặng).

- Canvas giới hạn ~15 khung/giây, chỉ vẽ khi trong khung nhìn, giảm chuyển động thì vẽ một khung đứng.
- Vòng lặp CSS (`pixel-blink 2.4s`, `spin 14s`) gắn `motion-safe:`.
- Không đặt vòng lặp sau chữ đang cần đọc (H1, câu dẫn): mắt bị kéo khỏi chữ.

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
