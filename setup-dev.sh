#!/bin/bash

# Development script for running both client and server
# This script helps run both projects independently

echo "🚀 E-commerce Development Setup"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo "🔍 Checking requirements..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi
echo "✅ Client dependencies installed"
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi
echo "✅ Server dependencies installed"
echo ""

# Go back to root
cd ..

echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy server/env.example to server/.env and configure your environment variables"
echo "2. Start MongoDB (if running locally)"
echo "3. Run the server: cd server && npm run dev"
echo "4. In another terminal, run the client: npm run dev"
echo ""
echo "🌐 Server will run on: http://localhost:3001"
echo "🌐 Client will run on: http://localhost:5173"

