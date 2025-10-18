@echo off
REM Development script for running both client and server
REM This script helps run both projects independently

echo 🚀 E-commerce Development Setup
echo ================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check for Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v18+ first.
    pause
    exit /b 1
)

REM Check for npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are available
echo.

REM Install client dependencies
echo 📦 Installing client dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)
echo ✅ Client dependencies installed
echo.

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)
echo ✅ Server dependencies installed
echo.

REM Go back to root
cd ..

echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Copy server/env.example to server/.env and configure your environment variables
echo 2. Start MongoDB (if running locally)
echo 3. Run the server: cd server ^&^& npm run dev
echo 4. In another terminal, run the client: npm run dev
echo.
echo 🌐 Server will run on: http://localhost:3001
echo 🌐 Client will run on: http://localhost:5173
pause
