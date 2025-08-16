import fs from "fs-extra";
import { execSync } from "child_process";
import path from "path";

const STATIC_DIR = "static";
const RELEASE_CONFIGS_DIR = "release_static";
const BACKUP_DIR = "static_backup";
const MISC_DIR = "misc";

async function release() {
  try {
    console.log("🔄 Starting release build...");

    // Backup static folder
    console.log("📦 Backing up static folder...");
    await fs.copy(STATIC_DIR, BACKUP_DIR);

    // Replace static with release_static
    console.log("🔧 Replacing static with release_static...");
    await fs.remove(STATIC_DIR);
    await fs.copy(RELEASE_CONFIGS_DIR, STATIC_DIR);

    console.log("📂 Copying misc files...");
    await fs.copy(MISC_DIR, path.join(STATIC_DIR, "misc"));
    await fs.copy("README.md", path.join(STATIC_DIR, "README.md"));

    // Run build
    console.log("🏗️ Running build...");
    execSync("npm run build", { stdio: "inherit" });

    // Restore original static
    console.log("🔄 Restoring original static folder...");
    await fs.remove(STATIC_DIR);
    await fs.move(BACKUP_DIR, STATIC_DIR);

    console.log("✅ Release build completed successfully!");
  } catch (error) {
    console.error("❌ Release build failed:", error.message);

    // Attempt to restore backup if it exists
    if (await fs.pathExists(BACKUP_DIR)) {
      console.log("🔄 Attempting to restore backup...");
      try {
        await fs.remove(STATIC_DIR);
        await fs.move(BACKUP_DIR, STATIC_DIR);
        console.log("✅ Backup restored successfully");
      } catch (restoreError) {
        console.error("❌ Failed to restore backup:", restoreError.message);
      }
    }

    process.exit(1);
  }
}

release();
