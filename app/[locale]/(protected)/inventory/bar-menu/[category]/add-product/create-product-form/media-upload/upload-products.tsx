import { memo, useState } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import type { TMedia } from "@/store/api/media/media.types";
import FileUploader from "@/components/form/file-uploader2";
// import FileUploader from "@/components/form/file-uploader";

interface IUploadProductsProps {
  handleSelect: (data: TMedia | TNullish) => void;
}

function UploadProducts({ handleSelect }: IUploadProductsProps) {
  const [files, setFiles] = useState<File[] | null | undefined>([]);
  const [uploadAMedia, { isLoading: isUploading }] = useUploadAMediaMutation();

  const handleUpload = async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const result = await uploadAMedia({
        file: newFiles[0],
        tags: ["BarMenu"],
      }).unwrap();

      if (result?.success) {
        setFiles([newFiles[0]]);
        handleSelect(result?.data as TMedia);
      }
    }
  };

  const handleDelete = async () => {
    try {
      setFiles([]);
      return true;
    } catch (error) {
      console.error("Error deleting media:", error);
      return false;
    }
  };

  return (
    <div>
      <FileUploader
        label="Upload New Image"
        files={files}
        setFiles={handleUpload}
        onDelete={handleDelete}
        isMultiple={false}
        singleFullWidth
        isLoading={isUploading}
        aspectRatio={10 / 35}
        cropShape="rect"
        cropWidth={100}
        cropHeight={350}
        removeBackground={true}
      />
    </div>
  );
}

export default memo(UploadProducts);
