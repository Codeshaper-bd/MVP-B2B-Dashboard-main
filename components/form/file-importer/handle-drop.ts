import type { FileRejection } from "react-dropzone";

import { readCSVFile } from "@/lib/media/read-csv-file";
import { readExcelFile } from "@/lib/media/read-excel-file";

import type { TFileImporterData } from "./types";

export const handleDrop = async (
  acceptedFiles: File[],
  rejectedFiles: FileRejection[],
  setIncorrectFile: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<TFileImporterData | null>>,
): Promise<void> => {
  if (rejectedFiles.length > 0) {
    setIncorrectFile(true);
    return;
  }

  const file = acceptedFiles[0];
  if (!file) {
    setIncorrectFile(true);
    return;
  }

  try {
    if (file.type === "text/csv") {
      const jsonData = await readCSVFile(file);
      setData({ fileMeta: file, data: jsonData });
    } else {
      const jsonData = await readExcelFile(file);
      setData({ fileMeta: file, data: jsonData });
    }
  } catch (error) {
    console.error("Error processing file:", error);
  }
};
