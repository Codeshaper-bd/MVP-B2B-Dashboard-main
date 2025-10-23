#!/usr/bin/env node

/**
 * Icon Usage Analysis Script
 *
 * This script analyzes the actual usage of individual icon components
 * to identify optimization opportunities.
 */

const fs = require("fs");
const path = require("path");

// Function to find all icon imports in the codebase
function findIconImports(dir) {
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

        // Look for imports from components/icons
        const iconImports = content.match(
          /import\s+(\w+)\s+from\s+["']@\/components\/icons\/([^"']+)["']/g,
        );

        if (iconImports) {
          results.push({
            file: filePath,
            imports: iconImports,
          });
        }
      }
    }
  }

  scanDirectory(dir);
  return results;
}

// Function to analyze icon usage
function analyzeIconUsage() {
  console.log("🔍 Analyzing icon usage...\n");

  const appUsage = findIconImports("./app");
  const componentUsage = findIconImports("./components");

  const allUsage = [...appUsage, ...componentUsage];

  console.log(
    `📊 Found ${allUsage.length} files using individual icon components\n`,
  );

  // Count icon usage
  const iconCounts = {};
  const iconFiles = new Set();

  allUsage.forEach(({ imports }) => {
    imports.forEach((importLine) => {
      const match = importLine.match(
        /import\s+(\w+)\s+from\s+["']@\/components\/icons\/([^"']+)["']/,
      );
      if (match) {
        const [, componentName, fileName] = match;
        iconCounts[componentName] = (iconCounts[componentName] || 0) + 1;
        iconFiles.add(fileName);
      }
    });
  });

  // Sort by usage count
  const sortedIcons = Object.entries(iconCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 30); // Top 30 most used icons

  console.log("🏆 Top 30 Most Used Icons:");
  sortedIcons.forEach(([iconName, count]) => {
    console.log(`  • ${iconName}: ${count} uses`);
  });

  console.log(`\n📈 Analysis Summary:`);
  console.log(`  • Total files using icons: ${allUsage.length}`);
  console.log(`  • Total unique icons used: ${Object.keys(iconCounts).length}`);
  console.log(`  • Total icon files in components/icons: ${iconFiles.size}`);
  console.log(
    `  • Estimated bundle impact: ${Object.keys(iconCounts).length} individual components`,
  );

  // Calculate potential savings
  const totalUses = Object.values(iconCounts).reduce(
    (sum, count) => sum + count,
    0,
  );
  console.log(`  • Total icon imports: ${totalUses}`);

  console.log("\n🎯 Optimization Opportunities:");
  console.log(
    "  • Replace individual icon components with optimized libraries",
  );
  console.log("  • Use tree-shakeable icon imports");
  console.log("  • Implement dynamic icon loading for rarely used icons");
  console.log("  • Remove unused icon files");

  return {
    totalFiles: allUsage.length,
    totalIcons: Object.keys(iconCounts).length,
    totalUses: totalUses,
    topIcons: sortedIcons.slice(0, 10),
  };
}

// Function to create optimized icon component
function createOptimizedIconComponent() {
  const optimizedIconContent = `import React from 'react';
import { 
  HomeIcon,
  MagnifyingGlassIcon as SearchIcon,
  BellIcon,
  UserIcon,
  UsersIcon,
  Cog6ToothIcon as SettingsIcon,
  PencilIcon as EditIcon,
  TrashIcon as DeleteIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  XMarkIcon as CrossIcon,
  EyeIcon,
  EyeSlashIcon as EyeCloseIcon,
  ArrowDownTrayIcon as DownloadIcon,
  ArrowUpTrayIcon as UploadIcon,
  ShareIcon,
  HeartIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon as LocationIcon,
  PhoneIcon,
  EnvelopeIcon as MailIcon,
  LockClosedIcon as LockIcon,
  KeyIcon,
  SignalIcon as WifiIcon,
  BatteryIcon,
  ChartBarIcon as BarChartIcon,
  ChartPieIcon as PieChartIcon,
  CurrencyDollarIcon as DollarIcon,
  BuildingLibraryIcon as BankIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

// Re-export commonly used icons with consistent naming
export {
  HomeIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  UsersIcon,
  SettingsIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  CrossIcon,
  EyeIcon,
  EyeCloseIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  HeartIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  PhoneIcon,
  MailIcon,
  LockIcon,
  KeyIcon,
  WifiIcon,
  BatteryIcon,
  BarChartIcon,
  PieChartIcon,
  DollarIcon,
  BankIcon,
  CreditCardIcon
};

// Default export for easy importing
export default {
  HomeIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  UsersIcon,
  SettingsIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  CrossIcon,
  EyeIcon,
  EyeCloseIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  HeartIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  PhoneIcon,
  MailIcon,
  LockIcon,
  KeyIcon,
  WifiIcon,
  BatteryIcon,
  BarChartIcon,
  PieChartIcon,
  DollarIcon,
  BankIcon,
  CreditCardIcon
};`;

  fs.writeFileSync("./components/icons-optimized.tsx", optimizedIconContent);
  console.log(
    "✅ Created optimized icon component: components/icons-optimized.tsx",
  );
}

// Run the analysis
if (require.main === module) {
  try {
    const report = analyzeIconUsage();

    console.log("\n🚀 Creating optimized icon component...");
    createOptimizedIconComponent();

    console.log("\n📋 Migration Plan:");
    console.log("1. ✅ Install optimized icon libraries");
    console.log("2. ✅ Create optimized icon component");
    console.log("3. 🔄 Gradually replace imports in components");
    console.log("4. 🔄 Update imports in app directory");
    console.log("5. 🗑️ Remove unused individual icon files");
    console.log("6. 📊 Measure bundle size reduction");

    console.log("\n✨ Analysis complete! Ready for optimization.");
  } catch (error) {
    console.error("❌ Error during analysis:", error.message);
    process.exit(1);
  }
}

module.exports = { analyzeIconUsage, createOptimizedIconComponent };
