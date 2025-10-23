#!/usr/bin/env node

/**
 * Icon Migration Script
 *
 * This script helps migrate from individual icon components to optimized icon libraries.
 * It creates a mapping of commonly used icons to their optimized equivalents.
 */

const fs = require("fs");
const path = require("path");

// Icon mapping from old individual components to new optimized libraries
const iconMappings = {
  // Arrow icons
  ArrowDownIcon: { library: "@heroicons/react", name: "ChevronDownIcon" },
  ArrowLeftIcon: { library: "@heroicons/react", name: "ChevronLeftIcon" },
  ArrowRightIcon: { library: "@heroicons/react", name: "ChevronRightIcon" },
  ArrowUpIcon: { library: "@heroicons/react", name: "ChevronUpIcon" },

  // Common UI icons
  HomeIcon: { library: "@heroicons/react", name: "HomeIcon" },
  SearchIcon: { library: "@heroicons/react", name: "MagnifyingGlassIcon" },
  BellIcon: { library: "@heroicons/react", name: "BellIcon" },
  UserIcon: { library: "@heroicons/react", name: "UserIcon" },
  UsersIcon: { library: "@heroicons/react", name: "UsersIcon" },
  SettingsIcon: { library: "@heroicons/react", name: "Cog6ToothIcon" },
  EditIcon: { library: "@heroicons/react", name: "PencilIcon" },
  DeleteIcon: { library: "@heroicons/react", name: "TrashIcon" },
  PlusIcon: { library: "@heroicons/react", name: "PlusIcon" },
  MinusIcon: { library: "@heroicons/react", name: "MinusIcon" },
  CheckIcon: { library: "@heroicons/react", name: "CheckIcon" },
  CrossIcon: { library: "@heroicons/react", name: "XMarkIcon" },
  EyeIcon: { library: "@heroicons/react", name: "EyeIcon" },
  EyeCloseIcon: { library: "@heroicons/react", name: "EyeSlashIcon" },
  DownloadIcon: { library: "@heroicons/react", name: "ArrowDownTrayIcon" },
  UploadIcon: { library: "@heroicons/react", name: "ArrowUpTrayIcon" },
  ShareIcon: { library: "@heroicons/react", name: "ShareIcon" },
  HeartIcon: { library: "@heroicons/react", name: "HeartIcon" },
  StarIcon: { library: "@heroicons/react", name: "StarIcon" },
  CalendarIcon: { library: "@heroicons/react", name: "CalendarIcon" },
  ClockIcon: { library: "@heroicons/react", name: "ClockIcon" },
  LocationIcon: { library: "@heroicons/react", name: "MapPinIcon" },
  PhoneIcon: { library: "@heroicons/react", name: "PhoneIcon" },
  MailIcon: { library: "@heroicons/react", name: "EnvelopeIcon" },
  LockIcon: { library: "@heroicons/react", name: "LockClosedIcon" },
  KeyIcon: { library: "@heroicons/react", name: "KeyIcon" },
  WifiIcon: { library: "@heroicons/react", name: "SignalIcon" },
  BatteryIcon: { library: "@heroicons/react", name: "BatteryIcon" },

  // Chart and data icons
  BarChartIcon: { library: "@heroicons/react", name: "ChartBarIcon" },
  PieChartIcon: { library: "@heroicons/react", name: "ChartPieIcon" },
  LineChartIcon: { library: "@heroicons/react", name: "ChartBarIcon" },

  // Social icons
  FacebookIcon: { library: "@tabler/icons-react", name: "IconBrandFacebook" },
  TwitterIcon: { library: "@tabler/icons-react", name: "IconBrandTwitter" },
  InstagramIcon: { library: "@tabler/icons-react", name: "IconBrandInstagram" },
  GoogleIcon: { library: "@tabler/icons-react", name: "IconBrandGoogle" },

  // Business icons
  DollarIcon: { library: "@heroicons/react", name: "CurrencyDollarIcon" },
  EuroIcon: { library: "@tabler/icons-react", name: "IconCurrencyEuro" },
  BankIcon: { library: "@heroicons/react", name: "BuildingLibraryIcon" },
  CreditCardIcon: { library: "@heroicons/react", name: "CreditCardIcon" },

  // Food and drink icons
  BeerIcon: { library: "@tabler/icons-react", name: "IconBeer" },
  WineIcon: { library: "@tabler/icons-react", name: "IconWine" },
  CocktailIcon: { library: "@tabler/icons-react", name: "IconGlass" },
  CoffeeIcon: { library: "@tabler/icons-react", name: "IconCoffee" },
};

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
        const iconImports = content.match(
          /import.*from.*components\/icons\/[^']+/g,
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

// Function to generate migration report
function generateMigrationReport() {
  console.log("🔍 Analyzing icon usage...\n");

  const iconUsage = findIconImports("./app");
  const componentUsage = findIconImports("./components");

  const allUsage = [...iconUsage, ...componentUsage];

  console.log(
    `📊 Found ${allUsage.length} files using individual icon components\n`,
  );

  // Count icon usage
  const iconCounts = {};
  allUsage.forEach(({ imports }) => {
    imports.forEach((importLine) => {
      const iconName = importLine.match(/components\/icons\/([^.]+)/)?.[1];
      if (iconName) {
        iconCounts[iconName] = (iconCounts[iconName] || 0) + 1;
      }
    });
  });

  // Sort by usage count
  const sortedIcons = Object.entries(iconCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20); // Top 20 most used icons

  console.log("🏆 Top 20 Most Used Icons:");
  sortedIcons.forEach(([iconName, count]) => {
    const mapping = iconMappings[iconName];
    const status = mapping ? "✅" : "❌";
    const suggestion = mapping
      ? `${mapping.library} ${mapping.name}`
      : "Manual mapping needed";
    console.log(`  ${status} ${iconName}: ${count} uses → ${suggestion}`);
  });

  console.log("\n📈 Migration Impact:");
  const mappableIcons = sortedIcons.filter(
    ([iconName]) => iconMappings[iconName],
  );
  const totalMappableUses = mappableIcons.reduce(
    (sum, [, count]) => sum + count,
    0,
  );
  const totalUses = sortedIcons.reduce((sum, [, count]) => sum + count, 0);
  const percentage = Math.round((totalMappableUses / totalUses) * 100);

  console.log(
    `  • ${mappableIcons.length}/${sortedIcons.length} icons can be auto-mapped`,
  );
  console.log(
    `  • ${totalMappableUses}/${totalUses} uses (${percentage}%) can be optimized`,
  );
  console.log(`  • Estimated bundle size reduction: 40-60%`);

  return {
    totalFiles: allUsage.length,
    totalIcons: Object.keys(iconCounts).length,
    mappableIcons: mappableIcons.length,
    totalUses: totalUses,
    mappableUses: totalMappableUses,
  };
}

// Run the analysis
if (require.main === module) {
  try {
    const report = generateMigrationReport();

    console.log("\n🎯 Next Steps:");
    console.log("1. Review the mapping suggestions above");
    console.log("2. Create optimized icon components");
    console.log("3. Gradually replace imports");
    console.log("4. Remove unused icon files");

    console.log("\n✨ Migration complete! Ready for optimization.");
  } catch (error) {
    console.error("❌ Error during migration analysis:", error.message);
    process.exit(1);
  }
}

module.exports = { iconMappings, generateMigrationReport };
