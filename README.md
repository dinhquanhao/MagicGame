# Aether Casting Lab

Demo sân tập phép thuật trên trình duyệt, dùng Three.js. Mã nguồn nằm trong
`Aether-Codex-Handoff/Aether-Demo/` và có thể chạy trực tiếp, không cần build
hoặc tải thêm thư viện từ CDN.

## Tải về và chơi thử trên Windows

1. Trên GitHub, chọn **Code → Download ZIP** rồi giải nén toàn bộ gói.
2. Mở thư mục `Aether-Codex-Handoff/Aether-Demo/` trong gói đã giải nén.
3. Máy cần có **Python 3**. Nhấp đúp `Start-Demo.cmd` và giữ cửa sổ lệnh mở.
4. Mở Chrome hoặc Edge, nhập địa chỉ `http://localhost:5173`.

Nếu cần chạy thủ công, mở PowerShell tại thư mục `Aether-Demo` và chạy:

```powershell
py -m http.server 5173 --bind 127.0.0.1 --directory dist
```

Nếu máy dùng lệnh `python` thay cho `py`, dùng `python` trong lệnh trên.
Nhấn `Ctrl+C` trong cửa sổ máy chủ để dừng.
Chạy qua máy chủ HTTP để các module JavaScript tải đúng; không mở trực tiếp
`dist/index.html` bằng `file://`.

## Chạy trên Linux hoặc macOS

Từ thư mục gốc repository:

```sh
cd Aether-Codex-Handoff/Aether-Demo
python3 -m http.server 5173 --bind 127.0.0.1 --directory dist
```

Sau đó mở trình duyệt trên cùng máy và nhập địa chỉ `http://localhost:5173`.

## Điều khiển

| Thao tác | Phím hoặc điều khiển |
| --- | --- |
| Di chuyển | WASD hoặc các phím mũi tên |
| Ngắm | Chuột; chạm sân tập trên điện thoại |
| Hỏa tiễn / Quang tuyến / Tinh vân | Q / E / R |
| Thi triển skill đang chọn | Space hoặc nút Thi triển |
| Tạm dừng / tiếp tục | Esc hoặc nút tạm dừng |
| Đặt lại buổi tập | Nút Đặt lại buổi tập |

## Kiểm thử dành cho người phát triển

Cần Node.js và npm để chạy kiểm thử; không cần chúng chỉ để chơi demo.
Đã xác minh với Node.js 24.19.0, npm 11.9.0 và Python 3.12.14 trên Linux.

```sh
cd Aether-Codex-Handoff/Aether-Demo
npm test
npm run check
```

Không có dependency npm cần cài và không có bước build bắt buộc.

Kết quả kiểm tra trong môi trường đám mây:

- 8/8 kiểm thử gameplay đạt, không có kiểm thử bị bỏ qua.
- Kiểm tra tĩnh đạt: 11 tài nguyên, cú pháp JavaScript, import cục bộ và DOM ID.
- Đã chạy ứng dụng trong Chromium với WebGL qua SwiftShader và với WebGL bị
  tắt để kiểm tra chế độ Canvas 2D.
- Cả hai chế độ đều qua kiểm tra Q/E/R (80/140/220 sát thương), di chuyển,
  tạm dừng/tiếp tục, reset và lưu tiến độ lộ trình sau khi tải lại trang.
- Không ghi nhận lỗi JavaScript hoặc yêu cầu tải tài nguyên thất bại trong
  các lượt kiểm tra trình duyệt đó.

Các kết quả trên không phải phép đo hiệu năng GPU thật và chưa xác nhận
trải nghiệm trên máy Windows hoặc điện thoại của bạn.

## Phạm vi hiện tại

Đây là bản demo hiện có, với nhân vật hình khối có khớp chuyển động, ba skill
và năm mục tiêu. Đợt thiết lập môi trường không thay đổi mã nguồn gameplay;
model GLB có rig và bộ animation trong bước 2 chưa được triển khai.

Xem [hướng dẫn chi tiết](Aether-Codex-Handoff/Aether-Demo/README.md) và
[tài liệu bàn giao](Aether-Codex-Handoff/Aether-Demo/CODEX_HANDOFF.md).
Tệp `Aether-Codex-Handoff.zip` là gói bàn giao gốc; để lấy cả hướng dẫn mới
ở thư mục gốc này, dùng **Code → Download ZIP** của repository.
