import { execSync } from "child_process";
import fs from "fs-extra";

const STATIC_DIR = "static";
const DEV_STATIC_DIR = "dev_static";
const TEMP_DIR = "temp_static";

async function build() {
  try {
    console.log("🔄 Starting dev build...");

    // Create dev_static if it doesn't exist
    if (!(await fs.pathExists(DEV_STATIC_DIR))) {
      console.log("📦 Creating dev_static directory...");
      await fs.copy(STATIC_DIR, DEV_STATIC_DIR);
      console.log("✅ dev_static created from static");
    }

    // Rename `static` to `temp_static` and `dev_static` to `static`
    console.log("🔄 Renaming directories...");
    await fs.rename(STATIC_DIR, TEMP_DIR);
    await fs.rename(DEV_STATIC_DIR, STATIC_DIR);

    // Run build using dev_static directory
    console.log("🏗️ Building...");
    execSync("vite build", { stdio: "inherit" });

    // Restore original directories
    console.log("🔄 Restoring original directories...");
    await fs.rename(STATIC_DIR, DEV_STATIC_DIR);
    await fs.rename(TEMP_DIR, STATIC_DIR);

    console.log("✅ Dev build completed successfully!");
  } catch (error) {
    console.error("❌ Dev build failed:", error.message);

    if (await fs.pathExists(TEMP_DIR)) {
      // Restore names
      await fs.rename(STATIC_DIR, DEV_STATIC_DIR);
      await fs.rename(TEMP_DIR, STATIC_DIR);
    }

    process.exit(1);
  }
}

build();
