// Generate a unique key based on the selector(s)
const generateKey = <T, K extends string | number>({
  item,
  selectors,
}: {
  item: T;
  selectors?: ((data: T) => K) | ((data: T) => K)[]; // Single or multiple selectors
}): string | number | undefined => {
  // Normalize selectors into an array if it's a single function
  let selectorsArray: ((data: T) => K)[] = [];
  if (Array.isArray(selectors)) {
    selectorsArray = selectors;
  } else if (typeof selectors === "function") {
    selectorsArray = [selectors];
  }

  // Handle primitive and object types more efficiently
  if (typeof item === "string" || typeof item === "number") {
    return item;
  } else if (typeof item === "boolean") {
    return String(item); // Treat booleans as string
  } else if (item === null) {
    return "null"; // Handle null
  } else if (Array.isArray(item)) {
    return undefined; // For arrays, we don't support uniqueness here (you can modify this if needed)
  } else if (typeof item === "object" && !Array.isArray(item)) {
    let key = "";
    const len = selectorsArray.length;
    for (let i = 0; i < len; i++) {
      const value = selectorsArray?.[i]?.(item);
      if (typeof value === "string" || typeof value === "number") {
        key += value;
        if (i < len - 1) {
          key += "|";
        }
      }
    }
    return key;
  }
};

export function getUniqueArrayItems<T, K extends string | number>(
  data: T[] | null | undefined,
  selectors?: ((data: T) => K) | ((data: T) => K)[], // Single or multiple selectors
): T[] {
  if (!Array.isArray(data)) {
    return [];
  }

  const uniqueItems = new Set<string | number>(); // Use Set to track unique keys

  const result: T[] = []; // This will store the unique items
  const len = data.length;

  for (let i = 0; i < len; i++) {
    const item = data[i];
    const key = generateKey({ item, selectors });

    // Check if key is valid and not already in Set
    if (key && !uniqueItems.has(key)) {
      uniqueItems.add(key); // Add the key to Set
      result.push(item); // Store the unique item
    }
  }

  return result;
}

// const data = [
//   1,
//   1,
//   2,
//   3,
//   4,
//   5,
//   { id: 1, name: "John", age: 30 },
//   { id: 2, name: "Jane", age: 25 },
//   { id: 1, name: "John", age: 30 }, // Duplicate
//   { id: 3, name: "Doe", age: 40 },
//   { id: 4, name: "Alice", age: 35 },
//   { id: 2, name: "Jane", age: 25 }, // Duplicate
// ];

// // Use a selector to check for uniqueness based on 'id'
// const uniqueData = getUniqueArrayItems(data, [
//   (item) => {
//     if (typeof item === "object" && item !== null) {
//       return item.id; // Use 'id' for uniqueness
//     }
//     return item; // For non-object items, return undefined
//   },
// ]);

// console.log({
//   originalDataLength: data.length,
//   uniqueDataLength: uniqueData.length,
// });
