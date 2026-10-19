# Aether — Phòng thí nghiệm phép thuật

Bản demo chơi đơn trên trình duyệt, lấy trải nghiệm sân tập skill làm trọng tâm. Có nhân vật pháp sư hình khối có khớp chuyển động, 5 mục tiêu, sát thương, hồi chiêu và 3 skill. Đây là nguyên mẫu có thể phát triển tiếp, chưa phải game hoàn chỉnh hoặc bản sao source của trang tham khảo.

## Chạy trên Windows

1. Giải nén toàn bộ thư mục.
2. Chạy `Start-Demo.cmd`, hoặc mở PowerShell tại thư mục này và chạy:

```powershell
py -m http.server 5173 --bind 127.0.0.1 --directory dist
```

3. Mở **http://localhost:5173/** bằng Chrome hoặc Edge. Giữ cửa sổ PowerShell mở. Dừng máy chủ bằng Ctrl+C.

Nếu dùng macOS/Linux: `python3 -m http.server 5173 --bind 127.0.0.1 --directory dist`.

Không mở `index.html` trực tiếp bằng `file://`: trình duyệt có thể chặn các module JavaScript. Không cần cài npm hoặc tải thư viện từ CDN để chơi. Toàn bộ Three.js cần thiết đã đi kèm.

## Điều khiển

| Thao tác | Điều khiển |
|---|---|
| Di chuyển | WASD / các phím mũi tên; trên điện thoại dùng cần điều khiển |
| Ngắm | Di chuột / chạm vị trí trên sân |
| Hỏa tiễn | Q / bấm thẻ skill |
| Quang tuyến | E / bấm thẻ skill |
| Tinh vân AOE | R / bấm thẻ skill |
| Dùng skill đang chọn | Space / nút Thi triển |
| Tạm dừng | Escape / nút tạm dừng trên sân |
| Trình diễn | Nút Xem chuỗi skill; dùng điều khiển để dừng |

Hỏa tiễn gây 80 sát thương lên mục tiêu đầu tiên trên đường bay. Quang tuyến xuyên qua mục tiêu, gây 140 sát thương mỗi mục tiêu một lần. Tinh vân khóa vị trí ngắm khi bắt đầu niệm, gây 220 sát thương trong bán kính 3,8 m sau thời gian niệm và tinh thể rơi. Mỗi mục tiêu có 500 HP và hồi sinh sau 3,5 giây. Mana hồi 9 điểm/giây.

## Những gì có trong demo

- Sân tập 3D thực bằng Three.js 0.180.0, ánh sáng, bóng đổ, trượng phép và animation nhân vật theo trạng thái.
- Vòng rune, đạn phép có vệt sáng, tia năng lượng, tinh thể rơi, vụ nổ, sóng xung kích, hạt văng và số sát thương.
- Âm tổng hợp qua Web Audio, chỉ bật khi người chơi chọn; không có file âm thanh bên ngoài.
- Bảng hồ sơ skill, cường độ hiệu ứng, chất lượng đồ họa, tắt rung camera, tạm dừng, reset và trình diễn.
- Điều khiển bàn phím, chuột và cảm ứng. Tự dừng mô phỏng khi ẩn tab.
- Chế độ tương thích Canvas 2D với phép chiếu không gian khi WebGL không khởi tạo được. Chế độ này giữ luật chơi và giảm chất lượng hình ảnh; không phải phiên bản WebGL đầy đủ.
- Tab Lộ trình: 7 cột mốc có điều kiện hoàn thành. Các ô tự đánh dấu lưu trong trình duyệt; không có tài khoản hoặc máy chủ lưu tiến trình.

## Cấu trúc source

- `dist/index.html`, `styles.css`: giao diện và bố cục thích ứng.
- `dist/core.js`: mô phỏng độc lập renderer — di chuyển, niệm, hồi chiêu, đạn, beam, AOE, HP và hồi sinh.
- `dist/view3d.js`: dựng nhân vật, sân tập và VFX Three.js.
- `dist/fallback.js`: chế độ tương thích Canvas 2D dùng chung mô phỏng.
- `dist/app.js`: điều khiển, giao diện, cảm ứng, âm thanh và kết nối các phần.
- `dist/roadmap.js`: nội dung lộ trình trong ứng dụng.
- `PLAN.md`: kế hoạch làm bản hoàn chỉnh và việc nên giao cho Blender/Codex.
- `tests/game.test.mjs`: kiểm tra hành vi gameplay; `scripts/check.mjs`: cú pháp, tài nguyên và tham chiếu giao diện.
- `dist/vendor/`: Three.js phân phối kèm giấy phép MIT. Hình nhân vật, vòng rune và hiệu ứng được dựng bằng code trong dự án.

## Kiểm tra source

Nếu đã cài Node.js, chạy `npm test` và `npm run check`. Không có bước build hoặc npm install bắt buộc.

## Giới hạn cần biết

Nhân vật hiện là rig nhóm hình khối, chưa phải model skinned chất lượng cao. Animation hiện được tạo bằng code, chưa dùng animation từ Blender. Sân tập chưa có AI địch tấn công, chiến dịch, trang bị, hủy niệm, tài khoản, đồng bộ mạng hoặc lưu phiên chiến đấu. Hiệu ứng ánh sáng phát quang được làm bằng sprite và mesh; chưa có bloom hậu kỳ hoặc mô phỏng lửa/chất lỏng vật lý. Không tích hợp dịch vụ AI trả phí.

Sau mỗi thay đổi cần chạy kiểm tra logic và thử thực tế trong trình duyệt có WebGL. FPS hiển thị là giá trị của thiết bị đang chạy, không phải cam kết hiệu năng.
