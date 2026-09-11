@echo off
title Bright Sprout Studio - Dynamic Server
cd /d "F:\work\workbook"
echo =======================================================
echo   Starting Bright Sprout Studio Dynamic Server...
echo =======================================================
start "" "http://localhost:8000"
start "" "http://localhost:8000/admin/login.html"
node server.js
pause
