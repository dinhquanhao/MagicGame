# Tiếp tục trong Codex

1. Giải nén toàn bộ gói vào một thư mục trên PC. Không chạy từ bên trong file ZIP.
2. Mở Blender, giữ MCP for Blender ở trạng thái kết nối (trước đây là cổng 9876).
3. Nhấp đúp `Continue-In-Codex.cmd`. File này mở Codex CLI trong đúng thư mục, gửi yêu cầu đọc `CODEX_HANDOFF.md` và bắt đầu triển khai bước 2.
4. Nếu Codex yêu cầu đăng nhập hoặc tin cậy thư mục dự án, hoàn tất theo giao diện của Codex. Các quyền công cụ vẫn theo cấu hình Codex của bạn.

Nếu muốn dùng phiên Codex đang mở, mở đúng thư mục dự án này rồi gửi:

> Đọc CODEX_HANDOFF.md và PLAN.md trong thư mục hiện tại. Tiếp tục triển khai bước 2 ngay trong dự án này, dùng Blender MCP đã kết nối. Giữ sân tập và ba skill đang có. Hoàn thiện model có rig, animation, GLB, tích hợp và kiểm thử; báo kết quả thực tế.

Gói bao gồm source demo, kế hoạch, ngữ cảnh bàn giao và video `references/casting-reference.mp4`. Nó tạo một phiên Codex mới có ngữ cảnh liên quan, không tự chuyển nguyên lịch sử ChatGPT hoặc khởi chạy Codex trước khi bạn mở file trên PC.

File `.cmd` không thay đổi quyền bảo mật, không cài phần mềm và không chứa token. Sau khi mở, Codex có thể yêu cầu các phê duyệt theo cấu hình của bạn. Các thay đổi được thực hiện trong thư mục đã giải nén; trang demo online chưa tự cập nhật từ source local.
