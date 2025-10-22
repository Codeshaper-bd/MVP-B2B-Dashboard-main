import Image from "next/image";

import { calculateFileSize } from "@/components/form/file-uploader/utils";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Card, CardContent } from "@/components/ui/card";

interface FilePreviewProps {
  image?: string;
  fileName?: string;
  fileSize: number;
  handleDelete?: () => void;
}
function FilePreview({
  image = "/assets/all/xlsx-icon.png",
  fileName,
  fileSize,
  handleDelete,
}: FilePreviewProps) {
  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex gap-4">
              <Image
                src={image}
                alt="xlsx-icon"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div>
                <h3 className="mb-1 text-sm font-medium text-default-700">
                  {fileName}
                </h3>
                <p className="text-sm text-default-600">
                  {calculateFileSize(fileSize)} – 100% uploaded
                </p>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <div className="flex flex-col items-center gap-3">
              <DeleteIcon
                className="size-3.5 cursor-pointer text-destructive"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilePreview;
