import { cn } from "@/lib/utils";
import UploadFileIcon from "@/components/icons/UploadFileIcon";
import { Card, CardContent } from "@/components/ui/card";
import IconBorder from "@/components/ui/icon-border";
function FileUploaderLabel({ readonly }: { readonly?: boolean }) {
  return (
    <Card
      className={cn(
        "flex h-[170px] cursor-pointer flex-col justify-center shadow-none",
        {
          "bg-[#343842]": readonly,
        },
      )}
    >
      <CardContent className="flex flex-col items-center px-6">
        <IconBorder className="h-10 w-10">
          <UploadFileIcon className="h-5 w-5 text-default-700" />
        </IconBorder>
        <h4 className="mt-3">
          <span className="text-sm font-semibold text-default-700">
            Click to upload{" "}
          </span>
          <span className="text-sm text-default-600">or drag and drop</span>
        </h4>
        <div className="mt-1 text-xs text-default-600">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </div>
      </CardContent>
    </Card>
  );
}

export default FileUploaderLabel;
