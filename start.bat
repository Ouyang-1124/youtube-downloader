@echo off
echo ========================================
echo     YY的YouTube视频下载网站
echo     快速启动脚本
echo ========================================
echo.

echo 正在检查 Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 请先安装 Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js 已安装: 
node --version

echo.
echo 正在安装项目依赖...
call npm install

if %errorlevel% neq 0 (
    echo 错误: 依赖安装失败
    pause
    exit /b 1
)

echo.
echo 依赖安装完成！
echo.
echo 启动开发服务器...
echo 请在浏览器中访问: http://localhost:3000
echo.
echo 按 Ctrl+C 可以停止服务器
echo ========================================

call npm run dev

pause