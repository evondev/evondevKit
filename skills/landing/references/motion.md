# Chuyển động — cách làm từng hiệu ứng

`B10` (`blueprint.md`) nói **chỗ nào được động**. File này là **cách làm**: con số, code, luật tắt.
Mở khi dựng hero, khối hiện khi cuộn, sơ đồ, demo tự chạy, dải logo, hàng số. Code viết cho Tailwind
v4 (bản trình duyệt trong `<style type="text/tailwindcss">` hay trong dự án đều chạy); React thì đổi
cú pháp, giữ con số.

⚑ Rút từ 18 landing sản phẩm được khen (tra 07/10/2026) và 20 trang Blueprint đo kỹ (11/11/2026).
Số đông dùng hiệu ứng nhỏ, rẻ: chữ hero hiện dần, khối hiện khi cuộn tới, vài vòng lặp nhẹ, một dải
logo. Cảm giác "sống" đến từ **demo sản phẩm chạy được hay xem được**, không từ trang trí. 0/18 có con
trỏ đổi kiểu, 1/18 ghim cảnh bằng GSAP (8/18 ghim bằng CSS `sticky`).

**Không chọn hiệu ứng vì nó đẹp.** Mỗi chuyển động phải trả lời được "nó cho khách thấy sản phẩm làm
gì": gói tin chạy trên sơ đồ là luồng dữ liệu, terminal gõ là lệnh thật, số đếm là số đo. Không trả lời
được thì bỏ, dù thư viện có sẵn.

---

## B33. Bốn điều cho mọi hiệu ứng ⚑

1. **CSS trước, JavaScript sau, thư viện khi đáng.** Làm được bằng `@keyframes`, `transition` hay
   `animation-timeline` thì không thêm gói. Một trang Blueprint đủ đẹp chạy hết bằng CSS,
   `requestAnimationFrame` và `IntersectionObserver`. Component có sẵn chỉ khi viết tay đắt hơn hẳn và
   qua ba cửa của `B40`.
2. **Chỉ chạy khi thấy được.** Gõ chữ, canvas, đếm số, vòng lặp JS: khởi động khi vào khung nhìn,
   dừng khi ra (`IntersectionObserver`).
3. **Giảm chuyển động là tắt hết.** Người bật `prefers-reduced-motion: reduce` thấy trang đứng yên ở
   trạng thái cuối: chữ đủ, số đủ, dải logo thành hàng tĩnh, sơ đồ vẽ sẵn, demo hiện kết quả. Một nửa
   số trang đã tra để hiệu ứng chạy tiếp, kể cả trang được khen: chỗ này không theo số đông. Vòng lặp
   CSS gắn `motion-safe:`; vòng JS tự chặn:

   ```js
   const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
   ```

   React: hook dùng chung, ở server coi như có giảm chuyển động để HTML ra sẵn trạng thái cuối.

   ```tsx
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
4. **Nội dung không chờ hiệu ứng.** HTML ra sẵn trạng thái cuối (chữ đủ, số thật, kết quả demo). Máy
   chưa chạy JavaScript, công cụ chụp, trình đọc màn hình vẫn thấy đủ.

## B34. Màn mở và khối hiện khi cuộn tới ⚑

**Màn mở** theo con số của `B10` (opacity + `translateY(8px)`, 400ms, trễ 0/80/160/240/320ms), tổng
không quá ~1 giây để khách đọc được H1 ngay:

```css
@theme {
  --animate-hero-rise: hero-rise 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) both;

  @keyframes hero-rise {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }
}
```

```html
<p class="motion-safe:animate-hero-rise">…nhãn mono</p>
<h1 class="motion-safe:animate-hero-rise [animation-delay:80ms]">…</h1>
```

**Khối hiện khi cuộn tới**: thuần CSS bằng `animation-timeline: view()`; trình duyệt chưa hỗ trợ thì
khối hiện sẵn như thường.

```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(4px); }
  to { opacity: 1; transform: none; filter: none; }
}

@utility reveal {
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      animation: reveal-up linear both;
      animation-timeline: view();
      animation-range: entry 40px entry 420px;
    }
  }
}
```

- **Biên độ đủ để thấy**: dịch 40px, mờ 4px. Bản dịch 18px, xong ngay khi khối vừa ló đáy màn thì
  người xem cuộn cả trang vẫn nói "chưa có animation".
- **Mốc bằng px, không bằng %**: phần trăm của `entry` / `cover` nhân theo chiều cao khối, khối cao
  1000px với `entry 15% cover 35%` lộ nửa màn vẫn còn mờ. Mốc px cho khối nào cũng xong một chỗ.
- Gắn `reveal` lên **khối con** (ô lưới, khung code, sơ đồ), không lên cả section: tiêu đề section
  mờ theo là khách không đọc được mình đang ở đâu. Ô lưới của Blueprint vẫn đứng yên **đường kẻ**:
  chỉ nội dung trong ô hiện, đường kẻ khung (`B5`, `B6`) luôn có sẵn, không mờ, không trượt.
- Các ô trong một hàng lệch **theo cuộn, không theo thời gian**: ô hai, ô ba lùi mốc 40px
  (`[animation-range:entry_80px_entry_460px]`), tối đa ba nấc.
- Không hiện lại khi cuộn ngược (`view()` giữ trạng thái theo vị trí, không nháy).

## B35. Demo tự chạy: gõ chữ, terminal, màn sản phẩm ⚑

Món chính hero (`B14`) tự chạy một lần sau 1,2 giây (`B10`). Đây là chỗ "sống" đáng tiền nhất.

- **Gõ chữ** (ô prompt, terminal, khung thử): 28ms mỗi ký tự; lệnh xong thì kết quả hiện từng dòng
  100–150ms, như output thật. Con trỏ nhấp nháy `caret-blink 1s steps(1)`, tắt khi giảm chuyển động.
- **Màn sản phẩm** (mảnh giao diện): **kịch bản cố định**, mảng sự kiện có mốc thời gian, đúng chuyện
  sản phẩm làm hằng ngày (lint chạy xong ra 3 lỗi, job deploy chuyển xanh, log thêm dòng). Không
  `Math.random`: mỗi lần tải một kiểu thì ảnh chụp, probe không ổn định.

  ```js
  const heroScript = [
    { at: 0, type: "type", text: "npx <tên-sản-phẩm> check src/" },
    { at: 1400, type: "line", text: "✓ 214 files parsed in 0.8s" },
    { at: 1900, type: "line", text: "✗ src/api/user.ts:42  no-floating-promise", tone: "error" },
  ];
  ```
- Mỗi sự kiện một thay đổi nhỏ 200–300ms: dòng mới mở từ `grid-rows-[0fr]` sang `grid-rows-[1fr]`,
  chấm trạng thái `transition-colors`. **Khung cao cố định**: dòng mới đẩy dòng cũ ra khỏi khung, trang
  bên dưới không nhảy.
- **Dừng hẳn khi khách chạm vào**: gõ, focus, bấm tab câu mẫu, rê vào nút copy. Khách đang đọc mà chữ
  tự đổi là giật câu khỏi tay họ. Nút copy copy **câu đủ**, không phần đang gõ dở.
- HTML và giảm chuyển động: đứng ở **trạng thái cuối** có đủ lệnh và kết quả, không chạy.

## B36. Dải logo, đếm số ⚑

**Dải logo chạy** (tuỳ, `B18`): một hàng mỗi trang.

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
  <ul class="flex w-max gap-12 motion-safe:animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
    …danh sách…
    …danh sách lần hai, mỗi mục aria-hidden="true" class="motion-reduce:hidden"…
  </ul>
</div>
```

- Hai bản nối nhau, lùi đúng 50% thì quay về đầu không thấy chỗ nối; bản sao `aria-hidden`.
- Dừng khi rê. Giảm chuyển động: không chạy, bản sao ẩn, danh sách xuống dòng thành lưới.
- Mép tan bằng `mask-image`, không đặt hai khối màu nền đè lên (lộ trên nền Kem, Tối).

**Đếm số** (hàng số `B23`, benchmark `B22`): đếm từ 0 khi vào khung nhìn, **một lần**, 1,2 giây,
`easeOutCubic` (`1 - (1 - t) ** 3`), `requestAnimationFrame`, `tabular-nums` để chữ số không nhảy bề
ngang. HTML có **số thật**; giảm chuyển động thì hiện số luôn. Số mẫu thì đánh dấu (`B30`): đếm lên
một con số bịa là nói dối có hiệu ứng. Thanh benchmark mọc từ 0 theo `B22`.

## B37. Cuộn ghim kể chuyện ⚑

Khối "cách hoạt động" có 3–5 bước (cài → cấu hình → chạy → kết quả): cột trái là các bước cuộn bình
thường, cột phải là khung sản phẩm **dính**, đổi theo bước đang đọc (6/18 trang có, toàn bằng CSS
`sticky`). Đây là cách làm "quy trình 01 → 02 → 03 sáng theo cuộn", không cần GSAP.

```html
<div class="grid gap-12 lg:grid-cols-2">
  <ol class="space-y-[40vh] py-[20vh]">
    <li data-step="1"><span class="font-mono">01</span> …H3, đoạn ngắn…</li>
  </ol>
  <div class="hidden lg:block">
    <div class="sticky top-24 aspect-4/3 overflow-hidden border border-border">…khung code / terminal / sơ đồ đổi theo bước…</div>
  </div>
</div>
```

- Bước đang đọc do `IntersectionObserver` trên từng `li` quyết (`rootMargin: "-45% 0px -45% 0px"`);
  khung phải đổi nội dung bằng chuyển mờ 200ms. Không ghim bằng GSAP, không chiếm quyền cuộn.
- **Bước không đang đọc nhạt bằng màu chữ, không bằng `opacity`**: tiêu đề và đoạn sang `--muted`,
  số bước mono mất màu nhấn; bước đang đọc chữ đậm, số bước màu nhấn. `opacity-40` đưa chữ xuống dưới
  2:1, khách không đọc được bước sắp tới.
- **Không tổ tiên nào `overflow-hidden` / `overflow-auto`**: `sticky` bám khung cuộn gần nhất, thành
  ra không ghim, cột phải trống suốt bước 2, 3. Cần cắt tràn ngang thì `overflow-clip`.
- **Dưới `lg` bỏ ghim**: mỗi bước một khối chữ kèm mảnh của chính nó, xếp dọc.
- Tối đa **một** khối ghim mỗi trang. Giảm chuyển động: khung vẫn dính, đổi nội dung tức thì.

## B38. Hình động hợp Blueprint ⚑

Chọn theo việc sản phẩm làm, **một hai kiểu** mỗi trang, không gom cho "phong phú". Món nào cũng
`aria-hidden`, `pointer-events-none`, đứng yên khi giảm chuyển động, chỉ chạy khi trong khung nhìn.

- **Sơ đồ nút nối dây, gói tin chạy** (hạ tầng, workflow, API): hình của `B15`. Gói tin là chấm
  `size-1.5 rounded-full bg-primary` chạy theo dây bằng `offset-path: path(...)` và
  `@keyframes { to { offset-distance: 100% } }`, chạy một lần hay lặp chậm 4 giây như `B15`; nhiều dây
  thì lệch nhịp nhau.
- **Nét tự vẽ khi cuộn tới** (sơ đồ, nhánh git, đường biểu đồ): `stroke-dasharray` bằng độ dài path
  (`getTotalLength()`), `stroke-dashoffset` về 0 theo `animation-timeline: view()` như `B34`. Vẽ một
  lần, nút hiện trước, đường sau.
- **Lưới ô sáng theo trạng thái** (hàng đợi, agent, tác vụ song song): lưới ô `size-1.5` cách `gap-1`,
  ô `bg-border-strong`; vài ô bật `bg-primary` theo nhịp như việc đang chạy (một cột sáng dần là hàng
  đợi xử lý, ô rải rác sáng rồi tắt là các worker). `setInterval` 400–600ms đổi `data-on`, chuyển màu
  300ms; không `Math.random` mỗi khung. **Lưới chỉ nháy ngẫu nhiên, không nói trạng thái nào, là trang
  trí**: không dùng. Ô lưới khung trang (`B6`) sáng lên khi rê chuột cũng là trang trí, không dùng.
- **Nhãn mono nhảy ký tự** (`B7`): khi nhãn section (`[02] FEATURES`) cuộn tới lần đầu, ký tự thứ i
  đứng yên từ nhịp `6 + i`, trước đó là ký tự ngẫu nhiên; mỗi nhịp 40ms, khoảng trắng giữ nguyên. Chỉ
  chữ mono (cùng bề ngang, không xô dòng), một lần, HTML có chữ đủ.
- **Tầng xếp chồng nghiêng** (sản phẩm là một lớp nằm giữa: platform, middleware, SDK giữa app và hạ
  tầng): 3–5 tấm mỏng nhìn nghiêng kiểu bản vẽ kỹ thuật, mỗi tấm một tầng có tên thật (app của bạn →
  sản phẩm → dữ liệu → hạ tầng). Tầng của sản phẩm viền màu nhấn, tầng khác viền `--border-strong`, nền
  trong. Cuộn tới thì các tầng từ tách xa khít lại một lần. Đây là bản dựng bằng CSS của kiểu "tách lớp
  3D", **không** cần three.js, nên không phạm `B11`. Dưới `lg` xếp phẳng thành cột; giảm chuyển động
  đứng ở trạng thái đã khít.

  ```css
  @keyframes stack-close {
    from { transform: translateZ(calc(var(--layer) * 140px)); }
    to { transform: translateZ(calc(var(--layer) * 56px)); }
  }

  /* Khung ngoài không xoay giữ timeline; khung trong xoay nghiêng. --layer: 0 là tầng dưới cùng. */
  .layer-stack { view-timeline: --layer-stack block; }
  .layer-stack-tilt { transform: rotateX(55deg) rotateZ(-40deg); transform-style: preserve-3d; }
  .layer-stack-tilt > * { transform: translateZ(calc(var(--layer) * 56px)); }

  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .layer-stack-tilt > * {
        animation: stack-close linear both;
        animation-timeline: --layer-stack;
        animation-range: entry 10% cover 50%;
      }
    }
  }
  ```

  Trên tấm chỉ tên tầng 2–3 chữ và một dòng phụ; giải thích dài để cột chữ bên cạnh, chữ nghiêng khó đọc.

## B39. Vòng lặp, cuộn mượt, GSAP, 3D ⚑

**Vòng lặp** (chấm trạng thái nhấp nháy, gói tin chạy, lưới ô sáng, dải logo, icon quay chậm): Blueprint
thuộc nhóm ít (17/20 chỉ vài chỗ động), **mặc định không quá 3 loại**, trần 8 loại mỗi trang (trang
11–29 vòng lặp là trang bị chê nặng). 50 chấm cùng một nhịp là một loại.

- Canvas giới hạn ~15 khung/giây (món ký tên `B41` được 30, vì là thứ người xem nhìn chính), chỉ vẽ khi
  trong khung nhìn, giảm chuyển động vẽ một khung đứng.
- **Không chạm chữ**: vòng lặp, đường mảnh, SVG rộng không đặt sau hay giao khung chữ H1, H2, câu dẫn.

**Chỉ khi người dùng xin:**

- **Cuộn mượt (Lenis)**: không khởi tạo khi giảm chuyển động (cả 5/18 trang có đều quên); link neo tới
  đúng chỗ (`lenis.scrollTo` có `offset` bằng chiều cao header); màn chạm để cuộn gốc.
- **GSAP ScrollTrigger**: chỉ khi hình phải chạy **theo đúng vị trí cuộn** (scrub: camera đi dọc tuyến
  vẽ, sơ đồ lắp dần theo từng px cuộn), thứ `B34`, `B37` không làm được. GSAP miễn phí cả plugin
  (SplitText, DrawSVG) nhưng giấy phép không phải MIT, báo người dùng một dòng. Cách làm sơ đồ / tuyến
  chạy theo cuộn: section cao ~300vh, khung hình `pin` + `scrub: 1`; một timeline chạy cùng lúc dây tự
  vẽ (`DrawSVGPlugin`, `drawSVG: "0 0"` → đủ), chấm chạy theo dây (`MotionPathPlugin`), và nếu cần
  "camera" bám chấm thì dời khung bằng `gsap.quickTo` trong `onUpdate` (rẻ khi gọi mỗi khung). Bọc
  trong `gsap.matchMedia()`: nhánh `(prefers-reduced-motion: no-preference)` mới tạo timeline, nhánh
  `reduce` không pin, hiện sẵn khung cuối (dây đủ, chấm ở đích). Dưới `lg` không pin, xếp các bước dọc.
- **3D (three.js), Rive, Spline**: Blueprint không dùng (`B11`); món ký tên 3D thì dựng bằng chấm trên
  canvas 2D hay ảnh render theo `B31` (`B41`). Cần file người làm bằng editor, AI không
  tự dựng ra hồn. Tách lớp thì làm bằng CSS ở `B38`.
- **Con trỏ đổi kiểu**: không dùng (0/18).

## B40. Component có sẵn ⚑

⚑ Đã đọc source của tám thư viện component có chuyển động (bốn thư viện 08/10/2026, bốn thư viện
11/11/2026). Đa số cài qua shadcn CLI, hợp Tailwind v4 và React 19. Dự án `index.html` thuần thì viết
tay theo `B33`–`B38`.

**Ba cửa trước khi cài:**

1. **Giấy phép**: cài bằng lệnh vào dự án của người dùng; **không chép source của thư viện vào skill**
   hay vào template đem bán (có thư viện cấm phân phối lại source, có thư viện MIT kèm điều khoản cấm
   bán lại chính component). Ghi tên thư viện và giấy phép ở dòng lúc giao.
2. **Phụ thuộc**: `motion` chấp nhận được (một gói, dùng chung). WebGL (`three`, `ogl`, `cobe`), `gsap`,
   hạt (`tsparticles`) chỉ khi người dùng xin (`B39`). Đọc `dependencies` trong lệnh shadcn trước khi
   cài: có component kéo cả thư viện nặng cho một nền trang trí.
3. **Giảm chuyển động**: phần lớn component **không** tự tắt (đếm được 0/33, 1/45, 6/79, 20/204 file;
   chỉ một thư viện dùng GSAP tắt 39/42). Bọc trang trong `<MotionConfig reducedMotion="user">` (tắt
   `transform` của component dùng `motion`); vòng `setInterval` (gõ chữ, đếm số, danh sách tự chạy)
   tự chặn bằng `usePrefersReducedMotion` (`B33`). Có `MotionConfig` trong source chưa chắc là tắt:
   nhiều file chỉ dùng nó để truyền `transition`.
4. **Chữ có sẵn trong HTML** (`B33` điều 4): component gõ chữ, hiện chữ hay đếm số bắt đầu từ chuỗi
   rỗng, hay không render gì khi chưa bật (`trigger={false}`), là trái luật: máy chụp, trình đọc màn
   hình thấy khoảng trống. Đọc source trước khi dùng; gặp thì viết tay.

**Trùng tên khác việc**: cùng tên `animated-beam` mà thư viện này là dây nối giữa hai phần tử, thư viện
kia là mưa sao băng trên nền. Xem demo của đúng registry đang cài, không chọn theo tên.

**Công thức → component có sẵn:**

| Công thức | Component | Ghi chú |
| --- | --- | --- |
| `B38` sơ đồ nút, gói tin chạy | `animated-beam` (vệt sáng chạy theo dây SVG giữa hai phần tử) | khớp nhất; viết tay tốn công nhất |
| `B35` terminal, gõ chữ | `terminal`, `typing-animation` | không tự tắt; khung thử có tab vẫn viết tay |
| `B36` đếm số | `number-ticker` | `motion`, không tự tắt |
| `B36` dải logo | `marquee`, `LogoLoop` (tự tắt, dừng khi rê) | viết tay chỉ vài dòng CSS, ngang nhau |
| `B21` code trước / sau, cây file | `code-comparison`, `file-tree` | không chuyển động |
| `B38` lưới ô | `flickering-grid` | nháy ngẫu nhiên, không theo trạng thái: chỉ làm nền; lưới theo trạng thái viết tay |
| `B38` chấm chạy dọc một path | `element-along-svg-path` (tự chạy hay theo cuộn) | `motion`, không tự tắt: chặn bằng `usePrefersReducedMotion` |
| `B21` tab code, tab khung thử | `fluid-tabs`, `shift-tabs` (nền trượt theo tab) | có `motion-reduce:`; giữ phím ← → của `B9` |
| `B37` cuộn ghim | viết tay theo `B37` | component cùng ý cuộn trong hộp riêng, không theo trang |

**Thêm điểm nhấn được, tối đa một món mỗi trang** (gắn vào thứ khách đang xem): viền sáng chạy quanh
**một** card (gói giá khuyên dùng) bằng `border-beam` hay `shine-border`; **một** câu tuyên bố sáng dần
từng từ theo cuộn bằng `text-reveal` (một câu ngắn, không cho đoạn văn).

**Món ký tên lấy từ thư viện** (`B41`, một món mỗi trang, ở hero): được dùng nền động có sẵn **khi nó
nói đúng việc sản phẩm làm** theo bảng `B41`, kể cả món nằm trong danh sách "không dùng" dưới đây: lưới
chấm nháy (`flickering-grid`, `dot-pattern`) cho hàng đợi / tác vụ song song, quả cầu chấm (`globe` dùng
`cobe`, ~5 KB WebGL) cho mạng / edge / CDN, trường hạt hay sóng nét cho AI / tìm kiếm, chữ code trôi cho
compiler / CLI. Đổi màu về đúng màu nhấn và nền của trang, giảm mật độ cho chữ đè lên đọc được, đi qua đủ
ba cửa ở trên (giảm chuyển động thì đứng yên). Cùng món đó đặt thêm ở chỗ thứ hai, hay đặt vì "cho sinh
động" mà không nói gì về sản phẩm, thì vẫn là trang trí.

**Không dùng** (ngoài món ký tên ở trên; trang trí đặt lên sản phẩm nào cũng được, đọc thành rẻ, trái `B11`): hạt, sao băng, tia
sáng nền, cực quang, đèn chụp, lốc xoáy, pháo giấy, lưới lùi xa, nền shader, con trỏ để vệt (`particles`,
`meteors`, `retro-grid`, `warp-background`, `confetti`, `sparkles`, `background-beams`, `vortex`,
`aurora`, `shooting-stars`, `lamp`, `Hyperspeed`, `Galaxy`, `Ballpit`, `SplashCursor`, `LetterGlitch`,
`blurry-blob`, `moving-gradient`, `pixel-trail`, `image-trail`, `gravity`, `glow-effect`), đèn rọi
theo chuột trên card (`spotlight`), card nghiêng 3D theo chuột (`tilt`), nút hút theo chuột
(`magnetic`), con trỏ thay hình, nền nước / lụa / kính / hạt dựng bằng WebGL, icon và huy hiệu 3D.
