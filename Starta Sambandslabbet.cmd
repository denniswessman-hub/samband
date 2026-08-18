@echo off
setlocal
cd /d "%~dp0"

set "SAMBAND_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "SAMBAND_PNPM=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"

if not exist "%SAMBAND_PNPM%" goto missing_runtime
if not exist "%SAMBAND_NODE%\node.exe" goto missing_runtime

set "PATH=%SAMBAND_NODE%;%PATH%"
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:3000/'"
echo Sambandslabbet startar. Lat det har fonstret vara oppet medan du tranar.
echo Stang med Ctrl+C nar du ar klar.
call "%SAMBAND_PNPM%" run start
goto end

:missing_runtime
echo Startmiljon saknas. Oppna README.md for alternativa startinstruktioner.
pause

:end
endlocal
