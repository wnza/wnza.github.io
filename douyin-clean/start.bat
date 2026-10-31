@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  未检测到 Node.js，将直接用默认浏览器打开页面。
  echo  如果剪贴板按钮不可用，请按 Ctrl+V 手动粘贴。
  echo.
  start "" "%~dp0index.html"
  pause
  exit /b
)
node serve.mjs
pause
