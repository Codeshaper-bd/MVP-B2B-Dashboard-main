import Image from "next/image";

import { cn } from "@/lib/utils";
import { CheckIcon as CheckIcon } from "@/components/icons";

export interface ITemplateProps {
  id: number | string;
  image?: string;
  title: string;
  selectedId: string | number | null | undefined;
  onClick?: (value: Omit<ITemplateProps, "selectedId" | "onClick">) => void;
}

function Template({ id, selectedId, title, image, onClick }: ITemplateProps) {
  const isSelected = selectedId === id;

  return (
    <div>
      <div
        className={cn(
          "scale-100 cursor-pointer rounded-md border-2 border-transparent transition-transform",
          {
            "border-primary": isSelected,
          },
        )}
        onClick={() => onClick?.({ id, image, title })}
      >
        <div className="relative flex aspect-[1.47368] h-[228px] w-full items-center justify-center overflow-hidden rounded-md">
          {/* Blurred Fixed Background Image */}
          <div className="absolute inset-0 -z-10 h-full w-full">
            <Image
              src={image!}
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              className="fixed opacity-50 blur-3xl"
            />
          </div>

          {/* Foreground Image */}
          <div className="relative z-10">
            <Image
              src={image!}
              alt="Foreground Image"
              width={188}
              height={188}
              className="rounded-lg shadow-lg"
            />
          </div>

          {isSelected && (
            <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <CheckIcon className="h-3 w-3 font-bold text-default-900" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-start justify-start">
        <h1 className="line-clamp-2 break-words text-sm font-semibold">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default Template;
