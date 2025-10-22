import * as XLSX from "xlsx";

export const readExcelFile = (file: File): Promise<Record<string, unknown>[]> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        if (!data) {
          throw new Error("Failed to read file data.");
        }

        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          throw new Error("No sheets found in the Excel file.");
        }

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(
          worksheet,
          {
            defval: "",
          },
        );
        if (jsonData.length === 0) {
          reject(new Error("No data found in the selected sheet."));
          return;
        }
        resolve(jsonData);
      } catch (error) {
        reject(`Error processing Excel file: ${error}`);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
