"use client";
import Image from "next/image";
import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

import FancyBox from "./FancyBox";

export interface IImageGridProps {
  onClick?: () => void;
  images?: (string | null | undefined)[];
  className?: string;
}

function ImageGrid({
  onClick,
  images = [
    "/assets/venues/mountain.svg",
    "/assets/venues/glass.svg",
    "/assets/venues/red-sky.svg",
    "/assets/venues/indoor.svg",
  ],
  className,
}: IImageGridProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageOne, ...restImages] = images || [];
  const restImagesLength = restImages?.length ?? 0;
  const isSomeImagesFound = images?.some((image) => !!image);

  const handleViewMoreClick = useCallback(
    ({
      imageRef,
      onClick,
    }: {
      imageRef: React.RefObject<HTMLImageElement | null>;
      onClick?: () => void;
    }) =>
      () => {
        imageRef.current?.click();
        onClick?.();
      },
    [],
  );

  return (
    <FancyBox>
      <div className={cn("relative h-[214px] w-full rounded-md", className)}>
        {!isSomeImagesFound && (
          <div className="col-span-full row-span-full flex h-full w-full items-center justify-center">
            <p className="select-none text-base font-medium text-default-1000">
              No Image Found
            </p>
          </div>
        )}

        {imageOne && (
          <Image
            src={imageOne}
            alt="image 1"
            width={300}
            height={300}
            className="h-full w-full rounded-md object-cover"
            data-fancybox="gallery"
            ref={imageRef}
          />
        )}
        <div
          className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          // eslint-disable-next-line react-compiler/react-compiler
          onClick={handleViewMoreClick({ imageRef, onClick })}
        >
          <p className="select-none text-2xl font-medium text-default-1000">
            {restImagesLength > 0 ? `+${restImagesLength}` : ""}
          </p>
        </div>
        {/* {imageTwo && (
          <Image
            src={imageTwo}
            alt="image 1"
            width={300}
            height={300}
            className="h-full w-full"
            data-fancybox="gallery"
          />
        )} */}

        {/* {isSomeImagesFound && (
          <div className={cn("relative block")}>
            <div className="flex h-full w-full grow items-center">
              {imageThree && (
                <Image
                  src={imageThree}
                  alt="image 1"
                  width={300}
                  height={300}
                  className="h-full w-full"
                  data-fancybox="gallery"
                />
              )}

              {imageFour && (
                <Image
                  src={imageFour}
                  alt="image 1"
                  width={300}
                  height={300}
                  className="h-full w-full"
                  data-fancybox="gallery"
                />
              )}
            </div>

            <div
              className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60"
              // eslint-disable-next-line react-compiler/react-compiler
              onClick={handleViewMoreClick({ imageRef, onClick })}
            >
              <p className="select-none text-xl font-medium text-default-1000">
                {restImagesLength > 0 ? `+${restImagesLength}` : ""}
              </p>
            </div>
          </div>
        )} */}
      </div>

      <div className="sr-only">
        {restImages?.map((image, index) => (
          <Image
            key={index}
            src={image || ""}
            alt={`image ${index + 5}`}
            width={300}
            height={300}
            className="h-full w-full"
            data-fancybox="gallery"
          />
        ))}
      </div>
    </FancyBox>
  );
}

export default ImageGrid;
