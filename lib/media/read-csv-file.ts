export const readCSVFile = (
  file: File,
  options: {
    delimiter?: string;
    header?: boolean;
  } = {},
): Promise<Record<string, string>[] | string[][]> => {
  const { delimiter = ",", header = true } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        if (!data || typeof data !== "string") {
          throw new Error("Failed to read file data.");
        }

        // Parse the CSV string to JSON
        const jsonData = csvToJson(data, delimiter, header);

        if (jsonData.length === 0) {
          reject(new Error("No data found in the CSV file."));
          return;
        }

        resolve(jsonData);
      } catch (error) {
        reject(
          `Error converting CSV to JSON: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export function csvToJson(
  csvString: string,
  delimiter: string,
  hasHeader: boolean,
): Record<string, string>[] | string[][] {
  const rows = parseCSV(csvString, delimiter);

  if (rows.length === 0) {
    return [];
  }

  if (hasHeader) {
    // Use the first row as headers
    const headers = rows[0];
    const jsonData: Record<string, string>[] = [];

    // Start from index 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const obj: Record<string, string> = {};

      // Map each value to its corresponding header
      headers.forEach((header, index) => {
        obj[header] = index < row.length ? row[index] : "";
      });

      jsonData.push(obj);
    }

    return jsonData;
  } else {
    // Return as array of arrays if no header
    return rows;
  }
}

export function parseCSV(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    if (line.trim() === "") {
      continue;
    }

    const row: string[] = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        // End of field
        row.push(field);
        field = "";
      } else {
        // Normal character
        field += char;
      }
    }

    // Add the last field
    row.push(field);
    rows.push(row);
  }

  return rows;
}
