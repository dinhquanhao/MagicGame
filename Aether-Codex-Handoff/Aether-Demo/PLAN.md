# Kế hoạch làm bản hoàn chỉnh

## Mục tiêu và thứ tự

Làm một game web 3D có pháp sư điều khiển được, động tác thi triển, 15 hệ nguyên tố và skill AOE lớn. Bắt đầu từ một sandbox có thể chơi; chỉ mở rộng khi phần trước đã được kiểm chứng. Không chuyển sang UE5 chỉ để làm bản web này; đó là một hướng sản phẩm khác cần quyết định riêng.

| Thứ tự | Công việc chính | Sản phẩm cần có trước khi làm bước tiếp |
|---|---|---|
| 1 | Chốt phạm vi, camera, đồ họa, máy đích; lưu source bằng Git | Tài liệu một trang và demo chạy được |
| 2 | Nhân vật, rig, animation, di chuyển, ngắm, camera và va chạm địa hình | Nhân vật điều khiển tự nhiên, không trượt chân hoặc xuyên tường rõ rệt |
| 3 | Một skill hoàn chỉnh, trạng thái chiến đấu và dữ liệu skill | Niệm/phóng/va chạm/sát thương/hồi chiêu chính xác, kể cả khi thao tác nhanh |
| 4 | VFX nhiều lớp, âm thanh, hit-stop, rung, tối ưu một skill | Hiệu ứng đẹp, dễ đọc, khớp animation và vẫn chạy ổn trên máy đích |
| 5 | Mở rộng ba loại nền tảng thành 15 hệ | Mỗi hệ có skill đại diện khác hành vi, có bảng cân bằng và kiểm tra |
| 6 | AI địch, thử thách, thắng/thua/chơi lại; hướng dẫn và lưu tiến trình cục bộ | Một lượt chơi ngắn hoàn chỉnh cho người mới |
| 7 | Đo hiệu năng, sửa lỗi, đóng gói, phát hành thử và thu phản hồi | Không lỗi chặn trên ma trận thiết bị; có tài liệu chạy, sao lưu và cách quay lại bản cũ |

Tab Lộ trình trong demo diễn giải chi tiết từng mốc. Việc đánh dấu hoàn thành do người dùng tự thực hiện; ứng dụng không tự xác nhận dự án thật đã đạt tiêu chí.

## Việc nên làm ngay sau demo

1. Chạy thử cả ba skill. Chốt camera gần hay xa, cách di chuyển, tốc độ và góc ngắm trước.
2. Chọn một nhân vật pháp sư duy nhất. Dùng model bạn sở hữu hoặc có giấy phép phù hợp; ghi lại nguồn và điều kiện sử dụng.
3. Dùng Blender làm 5 animation đầu: idle, chạy, niệm, phóng, trúng đòn. Đặt tên bone và animation rõ ràng. Thêm một điểm gắn ở tay hoặc đầu trượng.
4. Xuất GLB, đưa vào Three.js, kiểm tra animation với model thật. Chỉ thay nhân vật, giữ nguyên bộ luật skill để dễ tìm lỗi.
5. Làm Hỏa tiễn thật tốt trước: âm niệm, tay nâng trượng, nét vòng phép chạy đủ vòng, đạn có vệt, điểm va chạm, nổ, dư chấn và số sát thương.
6. Sau khi Hỏa tiễn đạt tiêu chí, hoàn thiện beam và AOE, rồi mới nhân rộng sang bộ 15 hệ.

## Phân công Blender, Three.js và Codex

| Công cụ | Việc phù hợp | Cách kiểm tra |
|---|---|---|
| Blender qua MCP | Model, rig, animation, vũ khí, đá, tinh thể, texture hoặc mesh dùng trong hiệu ứng | Xem nhiều góc, chạy animation, kiểm tra GLB xuất ra |
| Three.js | Render thời gian thực, animation blending, hạt, shader, vệt, vòng phép, camera | Chạy trực tiếp trong trình duyệt, đo FPS/GPU và xem nhiều lần cast |
| Codex trong thư mục dự án | Sửa source, nối animation với input và gameplay, tạo dữ liệu skill, chạy kiểm tra | Yêu cầu thay đổi có phạm vi, test sau sửa, xem diff và chạy demo |
| Người phát triển | Chốt chất lượng hình ảnh, cảm giác điều khiển, phạm vi, giấy phép và ngân sách | Chơi thử, chọn phiên bản và duyệt tài nguyên |

Render hoặc mô phỏng trong Blender không tự động chuyển nguyên vẹn thành VFX tương tác trên web. Khói, lửa, hạt và vật liệu phức tạp thường cần bake thành texture/flipbook hoặc dựng lại bằng shader/hệ hạt phù hợp. Cần kiểm tra tính tương thích khi xuất model và animation.

## Kiến trúc nên hướng tới

Tách các phần `world`, `character`, `combat`, `skills`, `vfx`, `audio`, `ui`, `assets` và `tests`. Giữ luật chơi độc lập renderer như `core.js` trong demo. Không viết lại toàn dự án cho mỗi hệ mới.

Mỗi skill nên có dữ liệu: mã, hệ, thời gian niệm, thời điểm phóng trong animation, hồi chiêu, chi phí, tầm, vùng ảnh hưởng, đường bay, cách chọn mục tiêu, sát thương, số lần trúng, cách hủy, animation, các lớp VFX, âm và ngân sách hiệu năng. Dùng timeline hoặc sự kiện chung để đồng bộ. Beam hiện trong demo chỉ tính một lần sát thương; beam liên tục ở bản đầy đủ cần quy định tần suất tick cụ thể.

## Thứ tự xây VFX một skill

1. Silhouette và thời gian: nhìn rõ nhân vật, vị trí chuẩn bị trúng, hướng skill và khoảnh khắc sát thương.
2. Vòng phép: nét sáng chạy đủ chu vi, rune, các lớp quay khác tốc độ, độ lệch góc và thời điểm hoàn tất.
3. Năng lượng chính: đạn, beam hoặc vật thể lớn có hình dáng riêng; nối đúng vị trí tay/trượng.
4. Lớp phụ: vệt, khói, hạt sáng, vụn, ánh sáng và méo không khí nếu đủ ngân sách.
5. Va chạm: lóe ngắn, hit-stop có giới hạn, nổ chính, rung camera điều chỉnh được.
6. Sau nổ: sóng lan, dư chấn, bụi, vết mặt đất, âm vang; kết thúc và giải phóng tài nguyên.

Chỉ thêm 10–20 vòng phép nếu chúng vẫn dễ đọc và đạt ngân sách máy đích. Huyết có thể dùng nhiều xích dài giao cắt như một hành vi riêng; không cần quả cầu làm lõi. AOE rất lớn cần cảnh báo vùng và kiểm tra va chạm hiệu quả, không chỉ tăng scale hiệu ứng.

## Bộ 15 hệ

Hỏa, thủy, thổ, ánh sáng, bóng tối, phong, lôi, băng, nham, độc, không gian, thời gian, huyết, tinh tú, tinh thần. Mỗi hệ nên bắt đầu bằng một skill đã kiểm chứng thay vì làm nhiều skill nông. Phân biệt bằng hình dáng, chuyển động, nhịp bùng nổ, âm và luật tác động.

## Kiểm thử và tối ưu

- Đúng luật: chặn cast khi đang niệm, thiếu mana hoặc đang hồi; damage đúng mục tiêu/đúng thời điểm; đạn nhanh không xuyên mục tiêu; chết và hồi sinh không tính lặp.
- Trạng thái: mất focus, đổi tab, tạm dừng, reset khi đang niệm hoặc có đạn; đổi kích thước, đổi chất lượng và âm thanh sau tương tác.
- Hình ảnh: tay/trượng khớp điểm phóng, animation chuyển mượt, không mất model hoặc texture, AOE khớp bán kính damage.
- Hiệu năng: đo máy thật. Đề xuất mục tiêu thiết kế ban đầu 60 FPS cho PC đích và 30 FPS cho cấu hình tiết kiệm; chỉ coi đạt khi đã đo. Có thể giảm độ phân giải, hạt, bóng và hậu kỳ.
- Chạy liên tục ít nhất 10 phút; theo dõi đối tượng, texture và bộ nhớ, kiểm tra nhiều skill liên tiếp. Dùng pooling và dispose có chủ đích.
- Thử Chrome/Edge trên Windows và ít nhất một điện thoại; không suy ra hiệu năng từ video hoặc kết quả test logic.

## Cách giao việc cho Codex

Mỗi yêu cầu nên có phạm vi, hành vi cần đạt, các file được sửa và cách kiểm tra. Ví dụ: “Trong dự án hiện tại, thay nhân vật hình khối bằng model GLB đã cung cấp. Giữ nguyên ba skill và số sát thương. Dùng animation idle/run/cast, gắn điểm phóng vào bone trượng. Chạy test, mở demo, kiểm tra di chuyển và cast, rồi báo các file thay đổi và giới hạn còn lại.”

Đối với Blender: “Đọc scene trước khi sửa. Tạo hoặc chỉnh rig và animation trên model đã chọn. Kiểm tra chuyển động từ nhiều góc, xuất GLB vào thư mục assets của dự án và báo chính xác animation đã xuất.” Cung cấp đường dẫn dự án/model thật khi triển khai; không dùng đường dẫn ví dụ chưa tồn tại.

## Backend, online và chi phí

Bản chơi đơn chưa cần server game hoặc database. Nếu cần tài khoản/cloud save, thiết kế dữ liệu và xác thực ở giai đoạn riêng. Multiplayer cần máy chủ quyết định trạng thái và sát thương, đồng bộ, bù độ trễ và giới hạn lạm dụng; không chỉ thêm nút “Online”. Không mua asset, gọi API trả phí hoặc đăng ký dịch vụ trả phí khi chưa được bạn cho phép.

## Chu kỳ làm việc

Chọn một việc có đầu ra rõ → sửa trực tiếp trong dự án → chạy test logic → chơi thử → chụp/quay bằng chứng nếu cần → sửa lỗi → lưu Git checkpoint. Không mở rộng phạm vi để che lỗi của tính năng đang làm. Mỗi mốc cần một bản có thể chơi độc lập.
