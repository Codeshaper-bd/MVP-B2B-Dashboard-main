import { Button } from "@/components/ui/button";

interface IFileActions {
  setFiles: (files: File[]) => void;
  open: () => void;
}
function FileActions({ setFiles, open }: IFileActions) {
  return (
    <div className="mt-3 flex justify-end gap-3">
      <Button color="destructive" type="button" onClick={() => setFiles([])}>
        Remove All
      </Button>
      <Button color="primary" type="button" onClick={open}>
        Add File
      </Button>
    </div>
  );
}

export default FileActions;
