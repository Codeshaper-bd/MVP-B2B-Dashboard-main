import { memo, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import type { TNullish } from "@/store/api/common-api-types";
import type { TMedia } from "@/store/api/media/media.types";
import { Card } from "@/components/ui/card";

import type { TBarMenuItemFormType } from "../types";
import SearchLibrary from "./search-library";
import UploadProducts from "./upload-products";
import ViewImages, { type TViewImagesProps } from "./view-images";

function MediaUpload() {
  const selectedMediaList = useMemo(() => new Set<number>(), []);
  const { control } = useFormContext<TBarMenuItemFormType>();
  const {
    fields: mediaFilesInFormState,
    append: appendMedia,
    remove: removeMedia,
    update: updateMedia,
  } = useFieldArray({
    control,
    name: "media",
  });

  const handleSelect = (item: TMedia | TNullish) => {
    const isAlreadyAdded = item?.id ? selectedMediaList.has(item?.id) : false;
    if (isAlreadyAdded) {
      return;
    }

    if (item) {
      const { id, ...restMediaProps } = item;
      if (!id) {
        console.error("Media ID is missing", item);
        return;
      }
      appendMedia({
        ...restMediaProps,
        _id: id,
      });
    }
  };

  const handleRemove: TViewImagesProps["handleRemove"] = (index) => {
    removeMedia(index);
    selectedMediaList.delete(mediaFilesInFormState?.[index]?._id);
  };

  return (
    <div className="space-y-6">
      <SearchLibrary
        handleSelect={handleSelect}
        selectedMediaList={selectedMediaList}
      />

      {!!mediaFilesInFormState?.length && (
        <Card className="flex flex-wrap gap-3 border-none bg-default-50 p-3">
          {mediaFilesInFormState?.map((item, index) => {
            selectedMediaList.add(item?._id);

            return (
              <ViewImages
                key={item.id}
                item={item}
                handleRemove={handleRemove}
                index={index}
              />
            );
          })}
        </Card>
      )}

      <UploadProducts handleSelect={handleSelect} />
    </div>
  );
}

export default memo(MediaUpload);
