import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the main app from server
import serverApp from "./server/app.js";

// Create a new Express app for Vercel
const vercelApp = express();

// Middleware
vercelApp.use(helmet());
vercelApp.use(cors());
vercelApp.use(express.json());

// Serve static files from the dist directory (built frontend)
vercelApp.use(express.static(path.join(__dirname, "dist")));

// Mount the API routes - the server app already has /api prefix
vercelApp.use("/", serverApp);

// Health check endpoint
vercelApp.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Catch-all handler: send back React's index.html file for any non-API routes
vercelApp.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handling middleware
vercelApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default vercelApp;
