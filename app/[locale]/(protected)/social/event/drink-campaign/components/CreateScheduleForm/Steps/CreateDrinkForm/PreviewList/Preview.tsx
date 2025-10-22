import Image from "next/image";

import useObjectURL from "@/hooks/useObjectURL";
import type { TSingleFile } from "@/components/form/upload-single-file";
import CrossIcon from "@/components/icons/CrossIcon";

export interface IPreviewProps {
  file: TSingleFile | null | undefined;
  disableRemove?: boolean;
  onRemove?: () => void;
}
function Preview({ file, disableRemove, onRemove }: IPreviewProps) {
  const { objectUrl, isLoading } = useObjectURL(file?.file);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="absolute -top-2.5 right-[-9px] z-[5] flex size-6 cursor-pointer items-center justify-center rounded-full bg-warning transition-all duration-300 ease-linear hover:bg-warning/90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disableRemove || isLoading}
        onClick={onRemove}
      >
        <CrossIcon className="size-2 shrink-0 text-white" />
      </button>

      <div className="relative h-full w-full overflow-hidden rounded-xl border border-solid border-[#1F242F] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]">
        {!isLoading ? (
          <Image
            src={objectUrl}
            alt="preview"
            width={311}
            height={183}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={"/assets/product-2/loading.svg"}
              alt="preview"
              width={49}
              height={48}
              className="h-12 w-12 shrink-0 animate-spin rounded-xl object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
