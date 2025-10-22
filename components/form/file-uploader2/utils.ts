export interface IFileUploaderProps {
  label?: string;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  files: File[] | null | undefined;
  fileUploadLabel?: React.ReactNode;
  isMultiple?: boolean;
  singleFullWidth?: boolean;
  onDelete?: (file: File) => Promise<boolean>;
  setFiles: (files: File[]) => void;
  acceptAllFiles?: boolean;
  removeBackground?: boolean;
}

export const calculateFileSize = (sizeInBytes: number) => {
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInBytes / (1024 * 1024);

  if (sizeInMB < 1) {
    return `${sizeInKB.toFixed(1)} KB`;
  } else {
    return `${sizeInMB.toFixed(1)} MB`;
  }
};
