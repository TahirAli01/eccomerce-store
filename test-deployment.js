// Quick test script to verify the deployment setup
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🚀 Testing deployment setup...\n");

// Check if required files exist
const requiredFiles = [
  "index.js",
  "vercel.json",
  "package.json",
  "server/app.js",
  "server/index.js",
];

console.log("📁 Checking required files:");
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
});

// Check package.json scripts
console.log("\n📦 Checking package.json scripts:");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const requiredScripts = ["build", "vercel-build", "start"];

  requiredScripts.forEach((script) => {
    if (packageJson.scripts[script]) {
      console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
    } else {
      console.log(`❌ ${script} - MISSING`);
    }
  });
} catch (error) {
  console.log("❌ Error reading package.json");
}

// Check vercel.json
console.log("\n⚙️ Checking vercel.json configuration:");
try {
  const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
  console.log("✅ vercel.json is valid JSON");
  console.log(`✅ Builds configured: ${vercelConfig.builds?.length || 0}`);
  console.log(`✅ Routes configured: ${vercelConfig.routes?.length || 0}`);
} catch (error) {
  console.log("❌ Error reading vercel.json");
}

console.log("\n🎉 Deployment setup test completed!");
console.log("\n📋 Next steps:");
console.log("1. Set up environment variables in Vercel dashboard");
console.log("2. Connect your GitHub repository to Vercel");
console.log("3. Deploy!");
console.log("\n📖 See DEPLOYMENT.md for detailed instructions");
