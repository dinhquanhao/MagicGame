# Bàn giao Aether Casting Lab cho Codex trên Windows

Đây là ngữ cảnh dự án được tóm tắt từ cuộc trò chuyện ChatGPT ngày 19/10/2026, không phải bản xuất session hoặc toàn bộ lịch sử ChatGPT. Source và video tham khảo đi kèm để tiếp tục đúng công việc.

## Yêu cầu đang có hiệu lực

Người dùng đã chạy thử demo, nói “tất cả đều ổn hãy tiếp tục làm bước 2”. Sau đó người dùng yêu cầu tạm dừng, rồi yêu cầu chuyển sang Codex và tiếp tục. Hãy tiếp tục BƯỚC 2 ngay trong thư mục dự án chứa file này. Không tạo một dự án mới hoặc thay toàn bộ source bằng ví dụ khác. Không hỏi lại về phong cách, camera hoặc phạm vi bước 1 đã được chấp nhận. Đọc source trước và thực hiện công việc, không dừng ở việc viết một kế hoạch.

## Dự án và kết quả hiện tại

- Tên: Aether Casting Lab. Bản web hiện có: https://aether-casting-lab-hao.grittyharp17.chatgpt.site
- Trang tham khảo: https://linearabiltycastingextendedthreejs.pages.dev/ . Video người dùng cung cấp nằm tại `references/casting-reference.mp4`.
- Mục tiêu: game web 3D với nhân vật tự di chuyển/ngắm/thi triển, vòng phép, va chạm, sát thương, âm thanh và nhiều hiệu ứng. Không làm video render thay cho ứng dụng chơi được.
- Công nghệ: HTML/CSS/JavaScript module, Three.js 0.180.0 đi kèm trong `dist/vendor`, không cần bước build. Bản đơn máy chưa cần backend.
- Góc camera đã chấp nhận: chéo từ trên xuống; đấu trường tối và phép phát sáng, pháp sư teal/indigo với điểm nhấn vàng.
- Điều khiển: WASD/phím mũi tên, chuột ngắm; Q/E/R dùng skill; Space dùng skill đang chọn; Escape tạm dừng. Cảm ứng có joystick và chọn skill.
- Có 5 mục tiêu, mỗi mục tiêu 500 HP; hồi sinh sau 3,5 giây; mana tối đa 100, hồi 9/giây.
- Q Hỏa tiễn: 80 sát thương, niệm 0,35 giây, hồi 1,5 giây, tốn 12 mana. Đạn đi theo hướng ngắm và trúng mục tiêu đầu tiên.
- E Quang tuyến: 140 sát thương mỗi mục tiêu một lần, niệm 0,7 giây, hồi 5 giây, tốn 22 mana. Tia xuyên theo đường thẳng.
- R Tinh vân: 220 sát thương, niệm 1,15 giây, tinh thể rơi 0,55 giây sau khi phóng, hồi 8 giây, tốn 32 mana, bán kính 3,8 m. Khóa vị trí từ đầu lúc niệm.
- Có nhật ký, tổng sát thương, kill, điều chỉnh chất lượng/cường độ/rung, âm tổng hợp, trình diễn, reset và tab Lộ trình 7 bước.
- Nhân vật hiện tại được dựng bằng các mesh hình khối có khớp; CHƯA phải skinned model GLB, chưa có armature/animation xuất từ Blender.
- Có chế độ tương thích Canvas 2D dùng chung luật chơi khi WebGL không khởi tạo được. Phải giữ nó hoạt động.
- Source trước bàn giao khớp bản đã phát hành, commit tham chiếu `01d21a00ba9f3e92de57bd604b56d9cf18d07f02`. ZIP này không chứa Git metadata, credential hoặc cấu hình deploy. Không có thay đổi bước 2 nào đã được triển khai.

## Blender và Codex trên PC đã được thiết lập

- Người dùng dùng Windows, PowerShell. Codex CLI đã mở thành công trong terminal tương tác (ảnh trước đây hiển thị v0.163.0).
- Blender 5.2.2 LTS đã cài add-on MCP for Blender. Trạng thái lần kiểm tra thành công trước: `Connected on port 9876`; Codex `/mcp` hiện `blender: connected (9 tools)`.
- Codex đã thực sự đọc được scene `Scene`: `Cube` mesh, `Light` light, `Camera` camera. Đây là trạng thái trước đó, KHÔNG được coi là scene hiện tại nếu chưa đọc lại.
- Server được đăng ký bằng `codex.cmd mcp add blender -- uvx mcp-for-blender`. `uv` đã cài. Không cài lại hay tạo đăng ký trùng khi kết nối vẫn có sẵn.
- Bắt đầu bằng đọc trạng thái add-on và scene thông qua MCP, sau đó làm việc trong Blender đang mở. Không tự nhận đã kết nối nếu chưa gọi công cụ thành công.
- Nếu scene có nội dung người dùng tạo thêm, giữ nguyên. Có thể tạo collection riêng `Aether_Character` cho tài nguyên mới; không xóa tất cả scene hoặc ghi đè file Blender không liên quan.
- Từng gặp `TERM=dumb` khi gọi Codex qua một phiên tự động. Chạy lệnh Codex tương tác trong terminal thật. File `Continue-In-Codex.cmd` được cung cấp để mở đúng thư mục với prompt bàn giao.

## BƯỚC 2 cần hoàn thành

### 1. Nhân vật thật có rig

Tạo pháp sư hình người được thiết kế có chủ đích trong Blender, thay thế model hình khối của demo: đầu/mặt hoặc hood có silhouette rõ, thân, bàn tay, tay/chân, áo choàng, giáp hoặc viền trang phục, trượng với tinh thể. Giữ phong cách fantasy teal/indigo, vàng và ánh sáng bạc hà. Tự dựng hoặc dùng tài nguyên miễn phí có giấy phép phù hợp; không sử dụng asset trả phí khi chưa được cho phép.

Có bộ xương thật và trọng số skinning ở các phần cần biến dạng. Tư thế nghỉ chuẩn, tỷ lệ và scale hợp lý, trục và hướng nhìn thống nhất khi xuất. Tối ưu hợp lý cho trình duyệt; không thêm hàng trăm mesh trang trí hoặc texture quá lớn chỉ để tăng chi tiết.

### 2. Bộ animation

Ít nhất: Idle, Run/Walk, CastCharge, CastRelease và HitReact. Có chuyển hướng/đứng quay bằng animation hoặc blending mượt. Áo choàng có nhịp chuyển động nhẹ phù hợp. Loop đứng/chạy liền mạch; tránh trượt chân rõ rệt. Cast kết thúc bằng một động tác phóng có thể thấy được thay vì bắn skill khi tay chưa cử động.

Tạo bone hoặc socket tên rõ, ví dụ `StaffTip`/`SpellOrigin`, gắn đúng đầu trượng. Không dùng tọa độ phóng cố định tách khỏi nhân vật khi đã có model thật.

### 3. Xuất và tích hợp

- Lưu bản Blender có thể sửa tại `assets_src/aether-mage.blend` và xuất `dist/assets/models/aether-mage.glb`, bao gồm mesh, skin, vật liệu hỗ trợ và animation clip.
- Thêm GLTFLoader tương thích đúng Three.js 0.180.0. Giữ dependency cần thiết ở local; kiểm tra import map hoặc relative import để không có bare import không resolve.
- Dùng AnimationMixer và state machine/blending để nối Idle/Run/Charge/Release với `Game` hiện tại. Điều chỉnh playback theo thời gian niệm của từng skill để động tác và thời điểm phóng khớp nhau.
- Sửa trực tiếp các module liên quan; tách module nhân vật nếu giúp source rõ hơn, không thay toàn bộ kiến trúc hoặc đổi stack.
- Giữ nguyên ba skill, số damage, mana, cooldown, sân tập, mục tiêu, điều khiển và giao diện đã được chấp nhận.
- Đồng bộ đầu trượng, đạn và tia theo vị trí world của socket. Nếu điều chỉnh mô phỏng để nhận điểm phóng, giữ logic gameplay test được khi không có renderer.
- Giữ phương án thay thế nếu tải GLB lỗi; hiển thị trạng thái rõ, không để lỗi asset làm toàn bộ sân tập ngừng chạy.

### 4. Điều khiển và va chạm cơ bản

Giữ di chuyển, ngắm và giới hạn sân. Bổ sung va chạm đơn giản với các vật cản thực trên sân, tránh xuyên và rung giật khi trượt dọc mép. Tách collision khỏi mesh hiển thị. Không tạo hệ vật lý nặng nếu chưa cần. Camera vẫn giữ góc đã được chấp nhận; chỉ sửa nếu cần tránh model bị khuất hoặc quá nhỏ.

### 5. Kiểm chứng và bàn giao

- Chạy các test hiện có và thêm test có ý nghĩa cho trạng thái animation/điểm phóng/va chạm mới khi phù hợp.
- Kiểm tra GLB thực tế có skin/bones, animation clip, vật liệu và socket, không chỉ ghi một file đúng đuôi.
- Chạy demo trong trình duyệt có WebGL, thử idle → chạy → quay → niệm → phóng; cả Q/E/R; thử nhiều lần và chuyển skill nhanh, tạm dừng/reset trong lúc niệm, phóng khi đang di chuyển.
- Kiểm tra model và animation từ nhiều góc trong Blender. Lưu ảnh hoặc video ngắn minh chứng nếu công cụ hỗ trợ.
- Phân biệt test logic, kiểm tra cấu trúc và kiểm tra hình ảnh/GPU. Không khẳng định đã chơi thử nếu môi trường không chạy được WebGL.
- Báo những gì đã làm, file thay đổi, cách chạy, kết quả test và giới hạn còn lại. Dừng sau khi hoàn thành bước 2; chưa mở rộng bộ 15 hệ hoặc làm chiến dịch trong lần này.

## Các file nên đọc trước

1. `README.md`, `PLAN.md`, `package.json`.
2. `dist/core.js`: luật chơi, cast/release, target/projectile.
3. `dist/view3d.js`: `buildMage()`, animation trong `render()`, `onRelease()` và điểm phóng hiện cố định.
4. `dist/app.js`: input, touch, reset, frame loop, fallback.
5. `dist/fallback.js`, `tests/game.test.mjs`, `scripts/check.mjs`.

## Chạy và kiểm tra

```powershell
npm.cmd test
npm.cmd run check
py -m http.server 5173 --bind 127.0.0.1 --directory dist
```

Mở http://localhost:5173/ . Nếu Python launcher `py` không có, kiểm tra `python` đang cài; không giả định lệnh đã chạy thành công.

Kết quả đã xác minh của bản demo ban đầu: 8 test gameplay qua, kiểm tra cú pháp/tài nguyên/DOM id qua, mô phỏng DOM của nút cast/pause/reset/lộ trình qua, renderer tương thích được dựng và xem ảnh, cấu trúc scene Three.js chạy qua. Browser/GPU thực CHƯA được kiểm chứng ở môi trường tạo demo ban đầu.

## Quy tắc phạm vi và tài nguyên

- Ưu tiên sửa file của dự án hiện tại và giữ các tính năng đang có.
- Không mua asset hoặc dùng API/dịch vụ trả phí khi chưa được người dùng cho phép.
- Không dùng API key bí mật, token Git hoặc credential từ cuộc trò chuyện; gói này không chứa chúng.
- Thực hiện bước 2 trên máy người dùng. Việc sửa source local không tự cập nhật Site đang online. Chỉ phát hành lên đúng Site cũ khi có chỉ dẫn và quyền phù hợp; không tự tạo một Site/production project khác.
- Không merge main/force push hoặc triển khai vào dự án Magic-Game trước đây: Aether trong thư mục này là demo riêng đang được tiếp tục.

## Định hướng dài hạn, chưa triển khai trong bước 2

Sau bước 2: hoàn thiện một skill, tăng VFX, rồi mở rộng 15 hệ: hỏa, thủy, thổ, ánh sáng, bóng tối, phong, lôi, băng, nham, độc, không gian, thời gian, huyết, tinh tú, tinh thần. Mong muốn dài hạn là AOE rộng, vòng phép nhiều lớp với nét chạy đủ chu vi, các kiểu xoay gồm lệch 45 độ, skill phát khi kết thúc niệm, impact/dư chấn/sóng xung kích/rung/hit-stop. Hệ huyết dùng nhiều xích dài giao cắt, không cần quả cầu. Các phần này chỉ làm sau khi model và animation đã ổn.
