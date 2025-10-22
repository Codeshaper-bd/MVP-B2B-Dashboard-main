import type { TUploadSingleFileProps } from "..";
import ImagePreview from "./ImagePreview";

interface ImagePreviewListProps {
  data?: TUploadSingleFileProps["files"];
  hidePreviewInside?: TUploadSingleFileProps["hidePreviewInside"];
  previewMode?: TUploadSingleFileProps["previewMode"];
}

function ImagePreviewList({
  data,
  hidePreviewInside,
  previewMode,
}: ImagePreviewListProps) {
  if (hidePreviewInside || !data?.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      {data?.map((file, idx) => (
        <ImagePreview
          key={file?.id || file?.file?.name || idx}
          file={file}
          previewMode={previewMode}
        />
      ))}
    </div>
  );
}

export default ImagePreviewList;
