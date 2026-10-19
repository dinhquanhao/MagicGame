@echo off
cd /d "%~dp0"
echo AETHER CASTING LAB
echo Open http://localhost:5173/ in Chrome or Edge.
echo Keep this window open. Press Ctrl+C to stop.
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 5173 --bind 127.0.0.1 --directory dist
) else (
  python -m http.server 5173 --bind 127.0.0.1 --directory dist
)
pause
