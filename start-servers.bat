@echo off
echo === Stopping all Node processes on ports 5000, 5173 ===

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000 "') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173 "') do taskkill /F /PID %%a 2>nul

echo === Ports cleared ===
echo.

echo === Starting Backend Server + Admin Panel (port 5000) ===
start "Backend + Admin" cmd /k "cd /d %~dp0server && node index.js"

timeout /t 3 /nobreak >nul

echo === Starting Frontend (port 5173) ===
start "Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo === All servers started! ===
echo   Backend + Admin:  http://localhost:5000/api
echo   Admin Panel:      http://localhost:5000/admin
echo   Frontend:         http://localhost:5173
echo.
pause