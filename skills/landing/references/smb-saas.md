# SaaS cho tiệm và doanh nghiệp nhỏ — luật B45

Kiểu thứ ba của skill, bên cạnh Blueprint và Dark glow. Dùng cho phần mềm mà người mua **không phải
dev**: app đặt lịch, quản lý bán hàng, CRM, kế toán, chấm công, cho tiệm tóc, spa, phòng khám, quán,
cửa hàng, văn phòng nhỏ. Blueprint đẹp nhờ đường kẻ và code; người mua ở đây không đọc code, họ cần
thấy **tiệm của mình** trong trang: người đang làm việc, cái máy đặt trên quầy, tin nhắn khách gửi.

⚑ Rút từ 11 landing phần mềm đặt lịch cho salon, spa, phòng khám đang chạy (chụp màn đầu ở 1440,
15/11/2026) và một wireframe test; chưa qua bài dựng nào.

## B45. Lớp nhìn

**Nền sáng, không nền tối** (0/11 trang nền tối). Ba lựa chọn: trắng; kem ấm (`#faf7f2`); hay trắng
với **một mảng pastel** màu nhấn nhạt (`color-mix(in oklab, var(--primary) 8%, white)`) làm nền hero
hay một dải section. Đề không nói thì trắng + mảng pastel ở hero. Wireframe không đưa phương án nền tối
cho kiểu này: không trang nào trong 11 trang đo dùng, nó là giọng của sản phẩm cho dev.

**Màu nhấn** theo ngành, ấm và mềm: hồng đất, tím nhạt, xanh lá dịu, cam san hô. Một màu nhấn (`B4`).
Nút chính đặc màu nhấn hay đen, bo `rounded-full` hay `rounded-lg`.

**Font**: tiêu đề sans tròn đậm (Be Vietnam Pro 700, Plus Jakarta Sans) hay serif mềm (Fraunces,
Lora; 2/11 trang dùng serif cho H1); thân chữ sans. Nhãn section là chữ thường màu nhấn hay chữ hoa
nhỏ giãn chữ; mono chỉ cho nhãn ngắn kiểu tab ("LỊCH", "ĐẶT ONLINE"), không cho đoạn chữ.

**Bo, bóng**: card bo `rounded-2xl`, bóng mềm (`shadow-[0_20px_60px_-20px_rgb(0_0_0/0.15)]`) cho mảnh
giao diện nổi; không khung kẻ lộ của Blueprint.

## Hero: người thật + giao diện nổi

7/11 trang có **ảnh chụp người ở nơi làm việc** trong hero (thợ đang cắt tóc, lễ tân ở quầy, tay
cầm điện thoại trong tiệm, máy tính bảng trên quầy), mảnh giao diện của app **nổi trên ảnh** (thẻ lịch
hẹn, thẻ "đã xác nhận", số doanh thu). 3/11 chỉ có màn app lớn. Chọn theo thứ tự:

1. **Mặc định: chia đôi**, chữ trái, phải là ảnh người ở tiệm (bo `rounded-3xl`, tỉ lệ 4:5 hay 1:1)
   với 2–3 thẻ giao diện nhỏ nổi đè lên mép ảnh (lệch ra ngoài ảnh 24–40px, bóng mềm), mỗi thẻ một
   việc của app: "Chị Lan đặt 14:00 · Cắt + nhuộm", "Đã nhắc qua Zalo · Đã xác nhận", "Hôm nay 12 hẹn".
2. **Canh giữa + màn app lớn** dưới hàng nút (bảng lịch theo nhân viên), khi app có màn quản lý đẹp
   và đề không có ảnh.
3. **Luồng khách đặt** (điện thoại ở giữa, bên trái tin nhắn, bên phải phiếu hẹn) khi việc mạnh nhất
   của app xảy ra phía khách.

Ảnh người **không phải người thật có tên** (không phải chủ app, không gắn tên khách hàng thật), nên
được sinh theo `B31` (`ai-images.md`): prompt ghi rõ người Việt, tiệm Việt, ánh sáng tự nhiên, tông
màu theo token, chừa vùng trống chỗ thẻ nổi. Ảnh người thật có tên (chủ tiệm trong cảm nhận, người sáng
lập) thì theo `B43`. Chưa có ảnh: khung giữ chỗ đúng tỉ lệ, thẻ nổi vẫn hiện trên khung.

**H1 nói việc chủ tiệm bớt được**, không nói tính năng: "Khách tự đặt lịch. Hẹn tự nhắc. Bạn chỉ việc
làm.", "Bớt 40% khách bỏ hẹn". Dưới hàng nút: dấu tích điều kiện ("Không cần thẻ · Hết hạn tự về gói
Miễn phí") và một dòng bằng chứng có avatar chủ tiệm + số tiệm đang dùng.

## Khối

Thứ tự hay gặp: hero → hàng số (tiệm đang dùng, % giảm khách bỏ hẹn, số lượt đặt) → **kết nối quen
thuộc** (hàng logo nơi khách đặt tới: Zalo, Facebook, Google Maps, Instagram; với trang Việt Zalo đứng
đầu) → tính năng theo ô, mỗi ô **một mảnh giao diện thật** (trang đặt lịch của khách, lịch theo nhân
viên, tin nhắc, doanh thu), xen **một dải ảnh** người ở tiệm → theo ngành (tóc, spa, nha khoa, thú
cưng: thẻ có ảnh, mỗi thẻ một câu việc riêng của ngành đó) → ba bước bắt đầu → cảm nhận chủ tiệm (ảnh
thật hay chữ cái đầu, tên tiệm + quận) → bảng giá (gói giữa nổi bật) → FAQ → CTA cuối trên mảng màu
nhấn hay pastel.

- **Cảm nhận** ghi tên tiệm và nơi ("Tóc Mai Anh, Quận 3") để chủ tiệm khác nhận ra người giống mình.
- **Avatar trong cảm nhận và hàng avatar dưới hero**:
  - Chưa có ảnh thật của chủ tiệm thì **cả hàng dùng chữ cái đầu** trên nền pastel màu nhấn, giống nhau
    ở mọi thẻ.
  - Không lấy ảnh avatar ngẫu nhiên (randomuser, pravatar, ảnh kho). Mặt người nước ngoài đứng cạnh tên
    Việt ("Đỗ Mai Anh, Quận 3") nhìn ra ngay là bịa. Thêm nữa, đó là ảnh người thật bị gắn vào lời họ
    không nói.
  - Không trộn trong một hàng thẻ có ảnh với thẻ chữ cái đầu.
  - Luật ảnh mẫu của app (`mock-photos.md`) không áp ở đây.
- **Hàng kết nối** mục nào cũng có logo. Zalo, Facebook, Google Maps, Instagram, TikTok, Shopee đều có
  trong `simple-icons` (`zalo`, `facebook`, `googlemaps` …). Không để một mục chỉ có chữ đứng cạnh các
  mục có logo.
- **Ngoài hero còn ít nhất một khối có người ở tiệm**: thẻ theo ngành có ảnh, hay một dải ảnh xen giữa
  các ô tính năng. Mỗi ảnh có một mục trong `image-prompts.md`. Nếu ảnh chỉ có ở hero, lúc chưa sinh ảnh
  cả trang không có người nào và đọc như một trang SaaS chung chung, mất cái riêng của kiểu này.
- **Bảng giá** giá theo tháng, nói ai hợp gói nào ("Cho tiệm có vài thợ"), gói miễn phí có thật thì
  để đầu.
- Không khối code, không lệnh cài, không benchmark kỹ thuật.

## Soát cuối

- [ ] Màn đầu có người thật ở tiệm (ảnh hay khung giữ chỗ có prompt trong `image-prompts.md`) và ít
  nhất hai thẻ giao diện nổi, mỗi thẻ một việc app làm.
- [ ] Nền sáng / kem / pastel; không phương án nền tối trong wireframe.
- [ ] Không chữ kỹ thuật (API, sync, dashboard, tích hợp) trong H1 và câu dẫn.
- [ ] Ô tính năng nào cũng có mảnh giao diện, dữ liệu là tên khách, dịch vụ, giá tiền Việt.
- [ ] Ở 375: thẻ nổi xếp dưới ảnh hay thu còn một thẻ, không che mặt người trong ảnh.
- [ ] Ngoài hero có ít nhất một khối ảnh người ở tiệm (theo ngành, hay dải ảnh), mỗi ảnh có prompt.
- [ ] Avatar cảm nhận là ảnh thật hoặc chữ cái đầu, đồng bộ cả hàng; không có ảnh randomuser hay ảnh kho.
- [ ] Hàng kết nối mục nào cũng có logo.
