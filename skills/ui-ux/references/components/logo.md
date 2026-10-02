# Logo sản phẩm ⚑

**Dự án đã có logo thì dùng của họ**, không vẽ lại, không chỉnh (logo là nhận diện, `V1` trong
`review.md`). File này chỉ dùng khi dự án mới chưa có logo mà màn có chỗ cho logo: đầu sidebar,
màn xác thực (`layouts/form.md`), trang lỗi đứng riêng (`layouts/app.md`). Việc nhỏ hơn một màn
mà màn đó không có chỗ cho logo thì không vẽ (`S3`).

Tìm trước khi vẽ:

```bash
find . -path ./node_modules -prune -o \( -iname "*logo*" -o -iname "*brand*" -o -iname "icon.svg" -o -iname "favicon.svg" \) -print 2>/dev/null | head
```

**Không tính là đã có logo**: ô chữ cái đầu tên sản phẩm (dấu cũ của skill, tên file kiểu
`brand-mark`), favicon mặc định của framework (tia sét tím của Vite, logo Next, `favicon.ico` của
create-react-app). Gặp chúng thì thay theo file này, giữ tên component đang được import.

Logo ở đây là **logo đơn giản cho dự án mới**: một dấu hình học và tên sản phẩm. Không phải bộ
nhận diện của agency; người dùng có logo thật thì thay vào một chỗ.

---

## Hình: dấu trong ô màu nhấn, tên bên phải

```
  ╭────╮
  │ ◐  │  Tên sản phẩm        ô size-8 bo 8px, nền màu nhấn, dấu trắng size-5
  ╰────╯
```

- **Dấu là SVG vẽ tay, không phải chữ cái trong ô.** Ô chữ cái đầu là cách của avatar và của
  logo công ty giả trong dữ liệu mẫu (`S16`); dùng nó cho logo sản phẩm thì đầu sidebar trông
  như một dòng danh sách, sản phẩm không có mặt.
- **Không lấy icon lucide làm dấu.** Cùng bộ với icon các mục sidebar ngay bên dưới, logo đọc ra
  là một mục nav.
- **viewBox `0 0 24 24`, vẽ trong vùng 4–20**, một đến ba hình cơ bản (tròn, vuông bo, cung,
  thanh). Khối đặc, hoặc nét `strokeWidth` từ 2.5; không chi tiết nào mảnh hơn 2 đơn vị, vì ở
  16px (favicon) chúng biến mất.
- **Một màu, `currentColor`**: không gradient, không bóng, không màu thứ hai. Màu đến từ ô
  (`bg-primary text-primary-foreground`), nên đổi `--primary` là logo đổi theo, nấc Xám của
  wireframe và dark mode tự đúng.
- **Tên sản phẩm** `text-sm font-semibold text-foreground truncate`, cách ô `gap-2.5`, cùng font
  của app. Không vẽ tên thành SVG, không đổi font riêng cho tên.
- **Đừng ra hình sáo**: tia sét, ngôi sao lấp lánh, lục giác, khối lập phương, chữ cái trong
  vòng tròn. Mười app mới thì sáu cái dùng các hình này, người dùng nhìn là biết logo đặt tạm.
  Cũng đừng ra hình người ta nhận ra ngay là logo của một hãng lớn.

## Ba hướng, nặn từ brief

Lấy tên sản phẩm và việc chính ở `U1`, `U2`. Mỗi hướng một dấu:

| Hướng | Cách nặn | Ví dụ |
| --- | --- | --- |
| **1. Chữ đầu dựng bằng khối** (khuyên dùng khi tên ngắn, dễ nhớ) | Chữ cái đầu tên dựng lại từ hình cơ bản, không gõ bằng font: có một khoảng cắt hay một góc lệch để nó thành dấu, không còn là chữ | "Lumen": chữ L từ hai thanh, góc trong là một chấm tròn |
| **2. Ẩn dụ việc chính** | Một hình gợi việc người dùng làm, trừu tượng hoá tới mức không còn là icon | đặt lịch: hai ô vuông bo lệch nhau; tài chính: ba thanh tăng dần, thanh cuối là nửa tròn |
| **3. Hai hình ghép** | Hai hình cơ bản chồng hay cắt nhau, phần giao là khoảng trống | vòng tròn bị một hình vuông cắt mất góc |

Ghi một câu vì sao cho mỗi hướng, bám tên hay việc chính, không viết "hiện đại, tối giản".

## Kiểm trước khi đưa

Render dấu ở **16px, 32px, 64px**, trên nền màu nhấn và trên nền trắng (dấu `text-foreground`),
xem ảnh:

- 16px còn nhận ra hình, không thành một đốm.
- Ba hướng khác nhau thật khi nhìn nhỏ, không phải một hình xoay ba kiểu.
- Đặt cạnh icon các mục sidebar không lẫn vào chúng.

Hướng nào hỏng một câu thì vẽ lại hướng đó, không đưa lên wireframe.

## Code

```tsx
// src/components/product-brand/product-mark.tsx
import type { ComponentProps } from "react";

// Dấu của sản phẩm. Thay path khi có logo thật.
export function ProductMark(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6 4h3.5v12.5H18V20H6z" />
      <circle cx="15.5" cy="8.5" r="2.5" />
    </svg>
  );
}
```

```tsx
// src/components/product-brand/product-brand.tsx
import { cn } from "@/lib/utils";
import { ProductMark } from "./product-mark";

interface ProductBrandProps {
  name: string;
  className?: string;
}

export default function ProductBrand({ name, className }: ProductBrandProps) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ProductMark className="size-5" />
      </span>
      <span className="truncate text-sm font-semibold text-foreground">{name}</span>
    </span>
  );
}
```

- Sidebar thu gọn: ô đứng yên, tên bị cắt và mờ đi như chữ các mục (`layouts/app.md`, thu gọn
  sidebar). Màn xác thực và trang lỗi đứng riêng dùng đúng component này, không vẽ bản thứ hai.
- **Favicon từ cùng dấu**: một file SVG gồm ô vuông bo nền màu nhấn và dấu trắng (tab trình duyệt
  sáng hay tối đều thấy). Next.js App Router đặt ở `app/icon.svg`; dự án khác `public/favicon.svg`
  kèm `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`. Xoá favicon mặc định của
  framework để không còn hai cái.

## Trong luồng thiết kế

- **Đề xin logo** ("làm logo", "dựng logo", "thay logo", "design a logo"; dòng logo ở câu 1 của
  `SKILL.md`): vẽ **trang chọn logo** (dưới), dừng chờ chọn. Đây là cổng duy nhất của lối này.
  Đề có "luôn" ("làm logo luôn") hoặc ghi sẵn hướng thì bỏ trang, dựng thẳng.
- **Wireframe (`U3`)**: dự án chưa có logo thì thanh công cụ có nhóm **Logo: 1 · 2 · 3** (`?logo=`),
  đổi dấu ở mọi chỗ có logo trên trang. Người dùng chọn logo cùng lúc chọn phương án, không thêm
  cổng. Mở không tham số thì hướng khuyên dùng.
- **Dựng luôn, không wireframe**: vẽ hướng khuyên dùng, không hỏi.

### Trang chọn logo ⚑

Một file `$TMPDIR/evon-design/logo.html`, khung và thanh công cụ như wireframe của `U3`
(`design-process.md`: Tailwind trình duyệt, token của dự án, thanh sáng một dòng, segmented
control, khung lý do). Chưa chọn thì không đụng file nào của dự án.

- **Thanh công cụ**: **Logo: 1 · 2 · 3** (`?logo=`, hướng khuyên dùng có chấm màu nhấn) ·
  **Màu** (công tắc: tắt là nấc Xám, bật là màu nhấn của dự án) · Nhấn (dự án chưa có màu brand,
  như `U3`).
- **Khung lý do**: tên hướng, nhãn "Khuyên dùng", một câu vì sao bám tên hay việc chính.
- **Mỗi hướng hiện dấu ở chỗ nó sẽ sống**, không hiện một dấu to giữa trang trắng:
  1. Đầu sidebar thật của dự án (ô, tên, vài mục nav có icon bên dưới), cả bản mở và bản thu gọn.
  2. Khối logo của màn đăng nhập.
  3. Một dải tab trình duyệt sáng và một dải tối, favicon 16px cạnh tên trang.
  4. Hàng cỡ 16, 32, 64px trên nền màu nhấn và trên nền trắng.
- Chụp ảnh trang ở cả ba hướng, tự xem theo "Kiểm trước khi đưa" (trên) rồi mới gửi.
- Gửi link bấm được kèm một câu: *"Chọn `1`, `2` hay `3`; trả lời `ok` là dựng hướng khuyên dùng.
  Muốn sửa một hướng thì nói (ví dụ "2 nhưng bo tròn hơn")."* Người dùng xin sửa thì vẽ lại hướng
  đó trên cùng trang, gửi lại.
- **Lúc giao** một dòng trong phần mặc định của `S15`: *"Logo: hướng [n], [một câu vì sao]. Dấu
  ở `product-mark.tsx`, có logo thật thì thay path ở đó; muốn hướng khác thì nói."*
