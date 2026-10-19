@echo off
setlocal
cd /d "%~dp0"
echo AETHER - CONTINUE STEP 2 IN CODEX
echo Keep Blender open with MCP for Blender connected.
echo Codex will read CODEX_HANDOFF.md and continue in this folder.
echo.
where codex.cmd >nul 2>nul
if errorlevel 1 (
  echo Codex CLI was not found. Open PowerShell in this folder.
  echo After fixing PATH, run: codex.cmd
  echo Then ask it to read CODEX_HANDOFF.md and implement Step 2.
  pause
  exit /b 1
)
call codex.cmd "Read CODEX_HANDOFF.md, README.md and PLAN.md first. Continue the user's approved Step 2 directly in this existing project: inspect Blender through the configured MCP connection, create a real rigged mage and animation clips, export GLB, integrate animation and collision, then validate. Preserve the current arena and three skills. Implement the work now, not just a plan. Report actual results and limitations in Vietnamese."
echo.
echo Codex session ended. Work is saved in this folder.
pause
