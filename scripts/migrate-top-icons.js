#!/usr/bin/env node

/**
 * Top Icons Migration Script
 *
 * This script migrates the top 20 most used icons to the optimized system.
 * Based on analysis: InfoIcon (89 uses), PlusIcon (58 uses), DeleteIcon (49 uses), etc.
 */

const fs = require("fs");
const path = require("path");

// Top 20 most used icons based on analysis
const topIcons = [
  "InfoIcon",
  "PlusIcon",
  "DeleteIcon",
  "CrossIcon",
  "CalenderIcon",
  "EditPenIcon",
  "DollarIcon",
  "CalendarIcon",
  "ChevronDownIcon",
  "CheckIcon",
  "SearchIcon",
  "LocationIcon",
  "FemaleIcon",
  "MaleIcon",
  "ClockIcon",
  "RightArrowIcon",
  "MinusIcon",
  "EmailIcon",
  "DataBaseIcon",
  "ArrowLeftIcon",
];

// Icon mapping to optimized equivalents
const iconMappings = {
  InfoIcon: "InfoIcon",
  PlusIcon: "PlusIcon",
  DeleteIcon: "DeleteIcon",
  CrossIcon: "CrossIcon",
  CalenderIcon: "CalendarIcon", // Note: CalenderIcon -> CalendarIcon (fix typo)
  EditPenIcon: "EditIcon",
  DollarIcon: "DollarIcon",
  CalendarIcon: "CalendarIcon",
  ChevronDownIcon: "ChevronDownIcon",
  CheckIcon: "CheckIcon",
  SearchIcon: "SearchIcon",
  LocationIcon: "LocationIcon",
  FemaleIcon: "UserIcon", // Use generic UserIcon for now
  MaleIcon: "UserIcon", // Use generic UserIcon for now
  ClockIcon: "ClockIcon",
  RightArrowIcon: "ArrowRightIcon",
  MinusIcon: "MinusIcon",
  EmailIcon: "MailIcon",
  DataBaseIcon: "DatabaseIcon",
  ArrowLeftIcon: "ArrowLeftIcon",
};

// Function to find and replace icon imports
function migrateIconImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  let updatedContent = content;
  let hasChanges = false;

  // Replace individual icon imports with optimized imports
  topIcons.forEach((oldIconName) => {
    const newIconName = iconMappings[oldIconName];
    if (newIconName) {
      // Replace import statements
      const oldImportPattern = new RegExp(
        `import\\s+${oldIconName}\\s+from\\s+["']@/components/icons/${oldIconName}["']`,
        "g",
      );

      if (oldImportPattern.test(updatedContent)) {
        updatedContent = updatedContent.replace(
          oldImportPattern,
          `import { ${newIconName} as ${oldIconName} } from '@/components/icons'`,
        );
        hasChanges = true;
      }
    }
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, updatedContent);
    return true;
  }
  return false;
}

// Function to find all files that need migration
function findFilesToMigrate(dir) {
  const results = [];

  function scanDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (
        stat.isDirectory() &&
        !file.startsWith(".") &&
        file !== "node_modules"
      ) {
        scanDirectory(filePath);
      } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
        const content = fs.readFileSync(filePath, "utf8");

        // Check if file imports any of the top icons
        const hasTopIcons = topIcons.some((iconName) =>
          content.includes(`from "@/components/icons/${iconName}"`),
        );

        if (hasTopIcons) {
          results.push(filePath);
        }
      }
    }
  }

  scanDirectory(dir);
  return results;
}

// Function to perform migration
function performMigration() {
  console.log("🚀 Starting top icons migration...\n");

  const appFiles = findFilesToMigrate("./app");
  const componentFiles = findFilesToMigrate("./components");
  const allFiles = [...appFiles, ...componentFiles];

  console.log(`📊 Found ${allFiles.length} files with top icon imports\n`);

  let migratedFiles = 0;
  let totalReplacements = 0;

  allFiles.forEach((filePath) => {
    try {
      const wasMigrated = migrateIconImports(filePath);
      if (wasMigrated) {
        migratedFiles++;
        console.log(`✅ Migrated: ${filePath}`);
      }
    } catch (error) {
      console.log(`❌ Error migrating ${filePath}: ${error.message}`);
    }
  });

  console.log(`\n📈 Migration Results:`);
  console.log(`  • Files processed: ${allFiles.length}`);
  console.log(`  • Files migrated: ${migratedFiles}`);
  console.log(
    `  • Success rate: ${Math.round((migratedFiles / allFiles.length) * 100)}%`,
  );

  console.log("\n🎯 Next Steps:");
  console.log("1. ✅ Top icons migrated to optimized system");
  console.log("2. 🔄 Test the application to ensure no breaking changes");
  console.log("3. 🔄 Continue with remaining icons");
  console.log("4. 📊 Measure bundle size improvement");

  return {
    totalFiles: allFiles.length,
    migratedFiles,
    successRate: Math.round((migratedFiles / allFiles.length) * 100),
  };
}

// Run the migration
if (require.main === module) {
  try {
    const results = performMigration();
    console.log("\n✨ Top icons migration complete!");
  } catch (error) {
    console.error("❌ Error during migration:", error.message);
    process.exit(1);
  }
}

module.exports = { performMigration, iconMappings, topIcons };
