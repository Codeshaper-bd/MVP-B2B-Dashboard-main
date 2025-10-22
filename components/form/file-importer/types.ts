export type TFileImporterData = {
  fileMeta: File;
  data: Array<Record<string, unknown> | string[]>;
};
export interface IFileImporterProps {
  fileUploadLabel?: React.ReactNode;
  setData: React.Dispatch<React.SetStateAction<TFileImporterData | null>>;
  data: TFileImporterData | null;
}
