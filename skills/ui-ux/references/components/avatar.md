# Avatar

**Dự án đã có component avatar thì dùng của họ** (luật câu 2, mục 0). File này chỉ
dùng khi grep ra rỗng.

---

## Không có ảnh thì là chữ cái đầu trên nền pastel

Nền màu nhạt, chữ **cùng sắc** nhưng đậm hơn. Không phải chữ trắng trên nền đặc —
nền đặc năm sáu màu cạnh nhau trong một danh sách là thành bảng màu cầu vồng.

```
  ╭───╮ ╭───╮ ╭───╮ ╭───╮
  │ A │ │ H │ │ B │ │ L │     nền pastel, chữ cùng sắc đậm hơn,
  ╰───╯ ╰───╯ ╰───╯ ╰───╯     viền mảnh cùng sắc
```

```tsx
interface AvatarTone {
  background: string;
  text: string;
  ring: string;
}

const avatarTones: AvatarTone[] = [
  { background: "bg-emerald-50 dark:bg-emerald-500/15", text: "text-emerald-700 dark:text-emerald-300", ring: "ring-emerald-200 dark:ring-emerald-500/30" },
  { background: "bg-sky-50 dark:bg-sky-500/15", text: "text-sky-700 dark:text-sky-300", ring: "ring-sky-200 dark:ring-sky-500/30" },
  { background: "bg-indigo-50 dark:bg-indigo-500/15", text: "text-indigo-700 dark:text-indigo-300", ring: "ring-indigo-200 dark:ring-indigo-500/30" },
  { background: "bg-pink-50 dark:bg-pink-500/15", text: "text-pink-700 dark:text-pink-300", ring: "ring-pink-200 dark:ring-pink-500/30" },
  { background: "bg-amber-50 dark:bg-amber-500/15", text: "text-amber-700 dark:text-orange-400", ring: "ring-amber-200 dark:ring-amber-500/30" },
  { background: "bg-violet-50 dark:bg-violet-500/15", text: "text-violet-700 dark:text-violet-300", ring: "ring-violet-200 dark:ring-violet-500/30" },
];

// Cùng một người thì luôn ra cùng một màu, ở mọi màn, mọi lần tải lại.
function getAvatarTone(seed: string): AvatarTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }

  return avatarTones[Math.abs(hash) % avatarTones.length];
}

// "Trần Nguyễn Anh Tuấn" -> "T"; tên một chữ -> chữ đó
function getInitial(name: string): string {
  return name.trim().charAt(0).toLocaleUpperCase("vi");
}
```

```tsx
// Seed là id (hoặc email), KHÔNG phải tên hiển thị — xem "Vì sao ổn" bên dưới
const tone = getAvatarTone(user.id);

<span
  className={cn(
    "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
    "text-sm font-semibold ring-1",
    tone.background,
    tone.text,
    tone.ring,
  )}
  aria-hidden
>
  {getInitial(name)}
</span>
```

**Không dùng Tailwind** thì thay class bằng mã dưới đây. Đây chính là các class
trên của Tailwind v4 đổi ra hex, nên hai kiểu dự án ra cùng một màu. Màu avatar là
màu nhận diện, không mang nghĩa, nên không vào `tokens.css`: đặt thẳng trong mảng.

| Sắc | Nền `-50` | Chữ `-700` | Viền `-200` | Tương phản chữ/nền |
| --- | --- | --- | --- | --- |
| emerald | `#ecfdf5` | `#007a55` | `#a4f4cf` | 5.1:1 |
| sky | `#f0f9ff` | `#0069a8` | `#b8e6fe` | 5.5:1 |
| indigo | `#eef2ff` | `#432dd7` | `#c6d2ff` | 7.2:1 |
| pink | `#fdf2f8` | `#c6005c` | `#fccee8` | 5.4:1 |
| amber | `#fffbeb` | `#bb4d00` | `#fee685` | 4.9:1 |
| violet | `#f5f3ff` | `#7008e7` | `#ddd6ff` | 6.7:1 |

**Nền tối** (`M32`): nền `-50` sang tối là sáu đốm trắng giữa màn đen. Nền là sắc `-500`
phủ 15%, chữ `-300`, viền sắc `-500` phủ 30%; class `dark:` đã nằm sẵn trong mảng trên. Riêng amber chữ
**`orange-400`**: `amber-300` trôi sang vàng 35° so với `amber-700` của bản sáng (`M7`, "Bản tối chọn theo sắc").
Không Tailwind thì chữ: emerald `#5ee9b5`, sky `#74d4ff`, indigo `#a3b3ff`, pink `#fda5d5`,
amber `#ff8904` (orange-400), violet `#c4b4ff`; nền và viền là `color-mix(in srgb, <mã -500> 15%, transparent)`
và `30%` với emerald `#00bc7d`, sky `#00a6f4`, indigo `#615fff`, pink `#f6339a`, amber `#fe9a00`,
violet `#8e51ff`.

```ts
const avatarTones: AvatarTone[] = [
  { background: "#ecfdf5", text: "#007a55", ring: "#a4f4cf" },
  // ... năm sắc còn lại theo bảng, giữ đúng thứ tự để cùng id ra cùng màu
];
// style={{ background: tone.background, color: tone.text, boxShadow: `0 0 0 1px ${tone.ring}` }}
```

**Vì sao ổn**

- **Màu lấy theo `id` hoặc email, không theo tên.** Hai người trùng tên vẫn khác màu, và đổi tên hiển thị thì màu không nhảy. Lấy ngẫu nhiên lúc render thì mỗi lần tải lại là một màu khác — người dùng nhận ra nhau bằng màu, màu nhảy là mất.
- **Cùng một người thì mọi chỗ cùng màu, trên cùng một màn cũng vậy.** Avatar ở header, chân sidebar, trang hồ sơ, danh sách thành viên gọi chung một component với cùng seed. Chỗ hay lệch là avatar cỡ to trên trang hồ sơ được dựng riêng: header nền chàm mà trang hồ sơ nền hổ phách, cùng chữ "T".
- **Chữ cái theo tên đã lưu, không theo ô đang sửa, và không bao giờ là "?".** Tên rỗng (tài khoản mới, chưa đặt tên) thì lấy chữ đầu email.
- **Sáu sắc, cố định.** Đủ để một danh sách mười người trông khác nhau, ít đủ để không thành cầu vồng. Đừng sinh màu từ hash ra HSL tự do — sẽ ra những sắc bùn xỉn không ai chọn. Màu nhận diện của dự án, board, danh mục (`M34`) dùng chung đúng sáu sắc này.
- **Không có `red`, không có `rose`.** Hai sắc đó đã có nghĩa trong app: lỗi và hành động nguy hiểm (`M30`). Avatar một người mà đỏ thì trông như tài khoản đó đang có vấn đề. Hồng thì dùng `pink`.
- **Nền `-50`, chữ `-700`, viền `-200`**: cả ba cùng một sắc. Chữ `-700` trên nền `-50` đạt tương phản đọc được ở cỡ `text-sm`.
- **`aria-hidden`** — tên người dùng đã hiện ngay cạnh avatar. Trình đọc màn hình đọc "T" trước tên là thừa.
- Viền dùng `ring-1`, không `border` — xem `M17` và `card.md`: thứ có kích thước cố định thì dùng ring để viền không ăn vào kích thước.

---

## Một chữ hay hai chữ

**Một chữ.** Tên tiếng Việt lấy hai chữ đầu thì ra "TN" cho "Trần Nguyễn…" —
hai chữ **họ**, không ai nhận ra ai. Lấy chữ đầu tên gọi ("Tuấn" → "T") thì đúng
hơn, nhưng tách được tên gọi khỏi họ đệm trong mọi trường hợp là không làm được.

Một chữ cái đầu của chuỗi tên thì luôn đúng, luôn đoán được, và màu nền đã lo
phần phân biệt.

Dự án đã quen hai chữ (đang dùng khắp nơi) thì theo dự án, đừng đổi.

App tiếng Anh thì ngược lại: hai chữ, đầu tên và đầu họ (`Jane Doe` → `JD`). Tên
tiếng Anh tên gọi đứng trước, họ đứng cuối, nên hai chữ luôn tách đúng (`T28`).

---

## Chồng lên nhau

Nhóm người, danh sách thành viên, "3 người đang xem":

```tsx
// -space-x-2: chồng lên nhau là bản chất của nhóm avatar, không có cách dương nào (N11 bước 4).
<div className="flex -space-x-2">
  {members.map((member) => (
    <Avatar key={member.id} className="ring-2 ring-surface" {...member} />
  ))}
</div>
```

- **`ring-2 ring-surface`** thay cho viền màu khi chồng — vòng trắng cắt rời từng avatar khỏi cái sau nó. Không có vòng này thì các hình tròn dính thành một cục.
- Chồng `-space-x-2` với cỡ `size-10`. Chồng sâu hơn thì chữ cái bị che.
- Quá 4 người thì hiện 3 cái rồi một ô `+5` cùng cỡ, nền `--background`, chữ `--muted`.

---

## Có ảnh

```tsx
<Image src={avatarUrl} alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-1 ring-border" />
```

`alt=""` cùng lý do với `aria-hidden` ở trên. Ảnh lỗi thì rơi về chữ cái đầu, không
để trống một vòng tròn xám.
