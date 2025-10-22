// import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import type {
  TLinkAMediaToAModuleArgs,
  TMedia,
  TMediaTags,
  TUploadAMediaMutation,
} from "@/store/api/media/media.types";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

import {
  compareFilesAndMediaList,
  type TCompareFilesAndMediaListOptions,
} from "./compare-files-and-media-list";

export interface IUploadRequiredImagesProps {
  filesData: {
    mainImage: File | null | undefined;
    galleryImages: (File | null | undefined)[] | null | undefined;
  };
  mediaList: (TMedia | null | undefined)[] | null | undefined;
  fileCompareOptions?: TCompareFilesAndMediaListOptions;
  uploadAMedia: TUploadAMediaMutation;
  toastProps?: TUseToastReturnType;
  tags?: TMediaTags;
  toastMode?: "group" | "individual";
}

export const uploadOnlyRequiredImages = async ({
  filesData,
  mediaList,
  fileCompareOptions,
  uploadAMedia,
  toastProps,
  toastMode = "individual",
  tags,
}: IUploadRequiredImagesProps) => {
  const { categorizedFiles, isAllExistingFiles } = compareFilesAndMediaList({
    files: [filesData?.mainImage, ...(filesData?.galleryImages ?? [])],
    mediaList,
    options: fileCompareOptions,
  });
  const changedFiles = categorizedFiles?.filter((file) => file?.type === "new");
  let errorCount = 0;
  let finalMediaList: TLinkAMediaToAModuleArgs[] | undefined = undefined;

  // const toastId =
  //   toastMode === "group" && changedFiles?.length
  //     ? toastProps?.toast?.({
  //         variant: "loading",
  //         title: `Uploading New Images`,
  //         description: `Please wait while we upload ${changedFiles?.length} new files`,
  //       })
  //     : null;
  for (let index = 0; index < categorizedFiles?.length; index++) {
    const categorizedFile = categorizedFiles?.[index];

    switch (categorizedFile.type) {
      case "new":
        {
          // const toastId =
          //   toastMode === "individual"
          //     ? toastProps?.toast?.({
          //         variant: "loading",
          //         title: `Uploading ${categorizedFile.file?.name}`,
          //         description: `Please wait while we upload the ${categorizedFile.file?.name}`,
          //       })
          //     : null;

          try {
            const newMediaRes = await uploadAMedia({
              file: categorizedFile.file,
              tags,
            }).unwrap();

            if (newMediaRes?.success) {
              finalMediaList = Array.isArray(finalMediaList)
                ? finalMediaList
                : [];
              finalMediaList.push({
                id: newMediaRes?.data?.id,
                isFeatured:
                  filesData?.mainImage?.name === categorizedFile.file?.name &&
                  filesData?.mainImage?.size === categorizedFile.file?.size &&
                  filesData?.mainImage?.type === categorizedFile.file?.type,
              });

              // if (toastMode === "individual") {
              //   toastId?.update?.({
              //     id: toastId.id,
              //     variant: "success",
              //     title: `${categorizedFile.file?.name} uploaded`,
              //     description:
              //       newMediaRes?.message ||
              //       `The ${categorizedFile.file?.name} has been uploaded successfully`,
              //   });
              // }
            }
          } catch (error) {
            console.error(error);
            errorCount += 1;
            // if (toastMode === "individual") {
            //   toastId?.update?.({
            //     id: toastId.id,
            //     variant: "error",
            //     title: `Failed to upload ${categorizedFile.file?.name}`,
            //     description: getApiErrorMessage(
            //       error,
            //       `Oops! Failed to upload the ${categorizedFile.file?.name}. Please try again`,
            //     ),
            //   });
            // }
          }
        }
        break;

      case "existing":
        {
          const { media } = categorizedFile;
          if (!isAllExistingFiles) {
            finalMediaList = Array.isArray(finalMediaList)
              ? finalMediaList
              : [];
            const mainImage = mediaList?.find((m) => !!m?.isFeatured);
            const isFeatured =
              (filesData?.mainImage && index === 0) ||
              (filesData?.mainImage?.name === mainImage?.name &&
                filesData?.mainImage?.size === mainImage?.size &&
                filesData?.mainImage?.type === mainImage?.type);

            finalMediaList.push({
              id: media.id,
              isFeatured,
            });
          }
        }
        break;
    }
  }

  /* group mode of toast success error handling start */
  if (categorizedFiles?.length === errorCount) {
    /* Everything failed */
    // toastId?.update?.({
    //   id: toastId.id,
    //   variant: "error",
    //   title: `Failed Uploading New Images`,
    //   description: getApiErrorMessage(
    //     null,
    //     `Failed to upload all new images. Please try again`,
    //   ),
    // });
  } else if (categorizedFiles?.length > errorCount) {
    /* Partially Failed */
    // toastId?.update?.({
    //   id: toastId.id,
    //   variant: "success",
    //   title: `Some Images Failed to Upload`,
    //   description: getApiErrorMessage(
    //     null,
    //     `Successfully uploaded ${categorizedFiles?.length - errorCount} ${categorizedFiles?.length - errorCount === 1 ? "image" : "images"}.${errorCount ? ` Failed to upload ${errorCount} images. Please try again` : ""}`,
    //   ),
    // });
  } else if (!errorCount && categorizedFiles?.length) {
    /* Everything Success */
    // toastId?.update?.({
    //   id: toastId.id,
    //   variant: "success",
    //   title: `All New Images Uploaded`,
    //   description: `All images have been uploaded successfully`,
    // });
  }
  /* group mode of toast success error handling end */

  if (!filesData?.mainImage && !filesData?.galleryImages?.length) {
    finalMediaList = [];
  }

  return { finalMediaList, isAllExistingFiles };
};
