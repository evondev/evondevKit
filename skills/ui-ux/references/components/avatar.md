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
  { background: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  { background: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200" },
  { background: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200" },
  { background: "bg-pink-50", text: "text-pink-700", ring: "ring-pink-200" },
  { background: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  { background: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200" },
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

**Vì sao ổn**

- **Màu lấy theo `id` hoặc email, không theo tên.** Hai người trùng tên vẫn khác màu, và đổi tên hiển thị thì màu không nhảy. Lấy ngẫu nhiên lúc render thì mỗi lần tải lại là một màu khác — người dùng nhận ra nhau bằng màu, màu nhảy là mất.
- **Sáu sắc, cố định.** Đủ để một danh sách mười người trông khác nhau, ít đủ để không thành cầu vồng. Đừng sinh màu từ hash ra HSL tự do — sẽ ra những sắc bùn xỉn không ai chọn.
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

---

## Chồng lên nhau

Nhóm người, danh sách thành viên, "3 người đang xem":

```tsx
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
