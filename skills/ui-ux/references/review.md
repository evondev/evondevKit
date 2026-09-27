# Soi UI đang có — luật V

Mở file này khi người dùng muốn biết **UI đang có trông ổn chưa**: đề có chữ "xem
giúp", "review", "chỗ nào chưa ổn", "sao trông kỳ", "nhìn rối", "cho đẹp hơn", họ gửi
ảnh chụp app của chính họ, hoặc gửi link localhost của một app đang chạy.

Khác nhánh `L` (`refactor.md`): `L` dọn code và **giữ nguyên hình**. `V` soi hình,
**đề xuất đổi hình**, người dùng chọn dòng rồi mới sửa. Đề vừa muốn dọn code vừa muốn
đẹp hơn thì soi theo `V` trước, dọn theo `L` sau.

Ở nhánh này **skill chỉ là tham khảo**. Dự án có màu, bo góc, font riêng là hệ của
họ, không phải lỗi.

---

## Bốn mặc định

1. **Soi thì không hỏi, sửa thì hỏi.** Chụp, đo, lập bảng luôn. Nhưng **không đụng
   file nào của dự án** cho tới khi người dùng chọn dòng. Đây là ngoại lệ duy nhất
   của "mặc định hơn hỏi" ở đầu `SKILL.md`: dựng màn mới thì làm luôn, còn sửa sản
   phẩm đang chạy thì hỏi.
2. **Đọc hệ của dự án trước khi chấm.** Chạy audit câu 2 và tầng 3 trong `SKILL.md`,
   đọc `tailwind.config`, `globals.css` / `index.css`, file token, component dùng
   chung. Chấm theo hệ đó, **không theo `tokens.css` của skill**.
3. **Báo nhầm tệ hơn bỏ sót.** Chỉ một dòng gọi màu brand là lỗi là người dùng hết
   tin cả bảng. Phân vân giữa hai hạng thì chọn hạng nhẹ hơn. Phân vân có phải lỗi
   không thì bỏ dòng đó.
4. **Không làm thêm việc.** Không đề xuất dark mode khi dự án chưa có (`V4`), không
   đề xuất đổi phong cách, không viết lại component. Mỗi dòng sửa đúng chỗ lỗi.

---

## V1. Mỗi dòng một hạng ⚑

| Hạng | Căn cứ | Ví dụ | Mặc định |
| --- | --- | --- | --- |
| **Hỏng** | Sai với mọi brand | Tương phản dưới 4.5:1 (chữ lớn 3:1), trang cuộn ngang, chữ bị cắt hay bị giấu mất nghĩa, focus không thấy, vùng bấm dưới 24px, lớp nổi lòi khỏi màn, dialog cao quá màn mà không cuộn | Đề xuất sửa |
| **Lệch hệ** | Token và component **của chính dự án** | Ba kiểu bo góc nút, hai màu cho cùng một trạng thái, khoảng cách lẻ ngoài thang của họ, mã hex viết cứng gần giống token | Đề xuất sửa, theo hệ của họ |
| **Gu** | `principles.md` và luật skill | Sidebar có viền phải, badge nền đậm, nền rê đậm nhạt | Chỉ nêu, ghi "gu, tuỳ bạn", mặc định không chọn |

- **Lệch hệ phải chỉ ra được chỗ đúng trong dự án.** "Nút này bo 6px, bốn nút khác
  cùng loại bo 12px (`button.tsx:14`)" là Lệch hệ. Chỉ nói "nên bo 12px" mà không có
  chỗ nào của dự án làm thế thì đó là Gu.
- **Không bao giờ là lỗi**, trừ khi phạm luật đọc được ở hạng Hỏng: màu nhấn và màu
  brand, bo góc lớn hay nhỏ, font, bóng / gradient / glass dùng đều khắp dự án, mật
  độ dày hay thoáng, dự án nhiều màu hơn gu skill (đầu `principles.md`). Mấy thứ này
  cũng không đưa vào hạng Gu.
- **Gu tối đa năm dòng**, xếp cuối bảng.

Probe báo không có nghĩa là lỗi Hỏng. Nhiều mục của probe đo theo gu skill, nên đổi
sang hạng theo bảng này:

| Mục probe | Hạng |
| --- | --- |
| Cuộn ngang, lớp nổi lòi khỏi màn, tab tới mà không thấy gì đổi, tương phản chữ dưới ngưỡng, khung giấu mất chữ, chữ cắt còn quá ngắn, chữ trong nút xuống dòng, nhãn số đè lên đường biểu đồ | Hỏng |
| Chỗ bấm dưới 32px | Dưới 24px là Hỏng, từ 24 tới 31px là Gu |
| Hàng trong header / nav rớt dòng | Hỏng khi đè hay đẩy lệch khối khác, không thì Lệch hệ (so với cách hàng đó ở khổ khác). Xem ảnh mới quyết |
| Cao gần bằng mà không bằng, chữ cùng cột lệch mép, dấu ngăn cách không đều | Lệch hệ |
| Nền rê gần như không thấy, nền rê tan vào nền khác, viền đổi màu lúc rê, rê / focus khác hình mục đang chọn, bấm xong còn dấu thừa, vòng focus không bọc hết link, bảng cuộn ngang mất cột, nhóm lựa chọn xếp lưới, số tiền ngắt dòng, số không thẳng hàng, nhãn số lòi ra ngoài vùng vẽ, dấu câu rơi xuống đầu dòng | Gu |
| Lỗi console | Không vào bảng. Ghi một dòng dưới bảng |

---

## V2. Nguồn ảnh và độ tin ⚑

- **Có app chạy** (link localhost hay URL, hoặc chạy được dev server): tự chụp bằng
  probe (`V3`). Danh sách route lấy từ file router. Vướng đăng nhập, cần dữ liệu
  thật, hay server không chạy thì nói thẳng một dòng rồi xin ảnh, không đoán.
- **Người dùng gửi ảnh**: ảnh của họ thắng ảnh tự chụp khi hai bên khác nhau, vì đó
  là thứ họ thật sự thấy (đã đăng nhập, dữ liệu thật). Khác nhau thì nói ra một dòng.
- **Chỉ có ảnh, không có code**: vẫn làm. Hạng Lệch hệ chỉ dựa trên cái thấy trong ảnh
  (hai nút cùng loại hai kiểu bo góc), không nói tới token.
- **Video**: model không xem video được. Tách khung ra rồi chọn các khung quanh lúc
  chuyển động: `ffmpeg -i quay.mp4 -vf fps=4 "$TMPDIR/evon-review/khung/%03d.png"`.
- **Mỗi dòng ghi nguồn**: *đo*, *thấy trong ảnh*, *đọc code*, hay *đoán*. Ảnh tĩnh
  không cho thấy hover, focus, chuyển động, cấu trúc a11y hay bề rộng khác, nên
  **không khẳng định những thứ đó chỉ từ ảnh**. Hoặc ghi "cần kiểm khi chạy", hoặc bỏ
  dòng đó. Tương phản đọc từ ảnh là màu hút từ pixel, ảnh nén lệch vài mức, nên chỉ
  báo khi thấp rõ (dưới khoảng 4:1).

---

## V3. Soi đủ khổ, quét bề rộng, mở lớp nổi ⚑

Mỗi route một lượt:

```bash
node <thư mục skill>/scripts/probe.mjs http://localhost:5173/<route> \
  --widths 375,768,1024,1280,1440 --sweep --out "$TMPDIR/evon-review/<route>"
```

| Khổ | Bề rộng | Hay vỡ ở đâu |
| --- | --- | --- |
| Mobile | 375 | Tràn ngang, lề rộng ăn mất bề ngang, hàng chip hay tab rớt dòng |
| Tablet dọc | 768 | Lưới hai cột bị bóp, sidebar chưa thu mà nội dung đã chật |
| Tablet ngang | 1024 | Ngưỡng thu sidebar, drawer đè gần hết nội dung |
| Laptop nhỏ | 1280 | Bảng nhiều cột cạnh sidebar, toolbar xuống dòng |
| Desktop | 1440 | Nội dung kéo quá dài, dòng chữ quá rộng |

- **Chụp ở khổ cố định chưa đủ.** `--sweep` kéo bề rộng từ 1440 xuống 375, mỗi bước
  20px, rồi báo **khoảng bề rộng** có lỗi. Mở các ảnh ở mục "Khung đáng xem", và thêm
  vài ảnh quanh ngưỡng sidebar thu và ngưỡng lưới đổi cột: chồng lấn hay lệch hàng
  thì máy không đo được. Chỉ khung có lỗi mới lên bảng.
- **Tràn ngang thì đo, không chỉ nhìn.** Probe ghi phần tử lòi ra. Chép selector đó
  vào bảng, hạng Hỏng, nguồn *đo*.
- **Mở cả lớp nổi ở 375.** Probe tự mở các nút có `aria-haspopup` (menu, select,
  popover). Dialog và drawer mở bằng nút thường thì bấm mở bằng Playwright rồi chụp,
  hoặc ghi rõ "chưa soi được dialog X". Ảnh trang đang đóng không cho thấy menu tràn
  mép hay dialog cao quá màn.
- **Mỗi dòng ghi khổ màn hay khoảng bề rộng bị lỗi**, ví dụ "375px" hoặc "860–1000px".

---

## V4. Dark mode: có thì soi cả hai, chưa có thì không bịa ⚑

Cùng tinh thần `M20` (mặc định chỉ light), nhưng dự án đã có sẵn thì theo dự án.

- **"Có dark mode" nghĩa là bật được, không phải chỉ có khai báo.** Dự án dựng từ
  shadcn thường có khối `.dark` trong `globals.css` mà chưa bao giờ dùng. Chỉ coi là
  có khi thấy **cách bật**:

  ```bash
  grep -rlE "next-themes|ThemeProvider|setTheme|classList\.(add|toggle)\(['\"]dark|prefers-color-scheme|data-theme" \
    --include='*.tsx' --include='*.ts' --include='*.jsx' --include='*.js' --include='*.css' . | grep -v node_modules
  ```

  Rồi chụp lại bằng `--dark` và so với ảnh light. Màn không đổi màu thì dark chỉ có
  khai báo. Probe gắn class `dark` lên `<html>` và giả lập `prefers-color-scheme`;
  dự án bật bằng `data-theme` thì gắn thuộc tính đó rồi tự chụp.
- **Chưa có (hoặc chỉ khai báo) thì không làm**: không chụp dark, không đề xuất dark,
  không thêm class `dark:` vào code sửa. Ghi tối đa một dòng "dự án chưa bật dark
  mode" ở phần mở đầu, không vào bảng.
- **Có thì soi đủ hai chế độ.** Chụp mỗi khổ màn cả light lẫn dark (`--dark`), ảnh
  "sau" cũng đủ hai bản. Màu dark lấy đúng token dark của dự án (khối `.dark`,
  `[data-theme="dark"]`), không lấy navy của skill (`M23`).
- **Dark mode làm dở là Hỏng**: có nút bật mà còn mảng nền trắng cứng, chữ đen trên
  nền tối, viền biến mất, logo tối trên nền tối, bóng không thấy.
- **Sửa một chế độ thì chụp lại cả hai.** Sửa cho light đẹp mà làm vỡ dark là lỗi hay
  gặp nhất ở dự án có hai chế độ.

---

## V5. Bảng giao, ảnh "sau", và sửa dòng đã chọn ⚑

**Ảnh "sau" phải là render thật, không phải lời mô tả.**

- Có app chạy: chèn CSS tạm vào trang (`page.addStyleTag`) rồi chụp đúng khổ đó.
  Chưa đụng file nào của dự án.
- Chỉ có ảnh: dựng lại vùng bị lỗi thành HTML tĩnh, dùng màu hút từ ảnh của họ,
  không dùng màu skill. Ghi rõ "mô phỏng".
- Dòng Gu không cần ảnh "sau".

**Bảng giao là bảng markdown trong chat**, không dựng trang HTML. Thứ tự:

1. **Mở đầu**, mỗi thứ một dòng: dòng `Audit:` (stack, hệ token ở đâu, phong cách,
   dark mode: có / chỉ khai báo / không), đã soi route nào ở khổ nào, chỗ nào chưa soi
   được và vì sao.
2. **Bảng**: xếp Hỏng trước, rồi Lệch hệ, Gu cuối.

   | # | Hạng | Chỗ | Lỗi | Sửa | Nguồn | Ảnh |
   | --- | --- | --- | --- | --- | --- | --- |
   | 1 | Hỏng | `/orders`, 860–1000px, `nav` trong header | Menu trên đầu xuống hai dòng, đẩy tiêu đề trang lệch xuống | Chuyển sang nút menu từ 1000px thay vì 860px | đo | [trước](…) · [sau](…) |
   | 7 | Gu | Sidebar | Viền phải cộng nền khác màu, hai lần tách một ranh giới. Gu, tuỳ bạn | Bỏ viền | đọc code | |

   - Cột **Lỗi** nói bằng cái người dùng cuối thấy ("menu xuống hai dòng, đẩy ô tìm
     kiếm lệch"), không nói bằng tên luật.
   - Cột **Sửa** nói theo hệ của dự án: token nào, component nào, file nào.
   - Lỗi lặp ở nhiều màn mà cùng một gốc (component dùng chung) thì gộp làm một dòng,
     ghi các màn bị ảnh hưởng.
3. **Kết**: *"Trả lời số dòng muốn sửa, ví dụ `sửa 1, 3, 4`."* Không tự đề nghị sửa hết.

**Người dùng chọn xong:**

- Chỉ sửa đúng các dòng đó, bằng token và component của họ. Lỗi nằm ở component dùng
  chung thì sửa ở component đó, và nói trước là nó đổi luôn các màn khác.
- Sửa xong thì chụp lại cùng khổ (có dark thì chụp cả hai chế độ), đặt ảnh trước và
  sau cạnh nhau, rồi chạy lại probe trên route đó để chắc lỗi đã hết mà không đẻ lỗi
  mới.
