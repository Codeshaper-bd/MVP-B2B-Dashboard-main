import type { TMedia } from "@/store/api/media/media.types";

export type TNewFile = {
  type: "new";
  id: string;
  index: number;
  file: File;
};

export type TExistingFile = {
  type: "existing";
  index: number;
  media: TMedia;
};

export type TNewOrExistingFile = TNewFile | TExistingFile;

export type TCompareFilesAndMediaListRes = {
  categorizedFiles: TNewOrExistingFile[];
  isAllExistingFiles: boolean;
};

export type TCompareFilesAndMediaListOptions = {
  checkLastModified?: boolean;
  normalizeMimeType?: boolean;
  // useHashCheck?: boolean;
};

export const compareFilesAndMediaList = (params: {
  files?: (File | null | undefined)[] | null;
  mediaList?: (TMedia | null | undefined)[] | null;
  options?: TCompareFilesAndMediaListOptions;
}): TCompareFilesAndMediaListRes => {
  try {
    if (!params || (!params.files && !params.mediaList)) {
      return {
        categorizedFiles: [],
        isAllExistingFiles: true,
      };
    }

    const files = params.files?.filter((file): file is File => !!file) ?? [];
    const mediaList =
      params.mediaList?.filter((media): media is TMedia => !!media) ?? [];

    if (files.length === 0) {
      return {
        categorizedFiles: [],
        isAllExistingFiles: false,
      };
    }

    const {
      checkLastModified = false,
      normalizeMimeType = false,
      // useHashCheck = false,
    } = params.options || {};

    const normalizeType = (type: string | null | undefined) =>
      normalizeMimeType ? type?.replace("jpeg", "jpg") : type;

    // Create a map for quick lookup of existing media by a unique key. Time Complexity: O(n)
    const mediaMap = new Map<string, TMedia>(
      mediaList.map((media) => {
        const mediaUpdatedAtTime = new Date(
          media?.updatedAt ||
            media?.deletedAt ||
            media?.createdAt ||
            new Date(),
        ).getTime();

        return [
          `${media.originalName}_${normalizeType(media.type)}_${media.size}${checkLastModified ? `_${mediaUpdatedAtTime}` : ""}`,
          media,
        ];
      }),
    );

    let isAllExistingFiles = true;

    const categorizedFiles: TNewOrExistingFile[] = files.map((file, index) => {
      const mediaKey = `${file.name}_${normalizeType(file.type)}_${file.size}${checkLastModified ? `_${file.lastModified}` : ""}`;
      const existingMedia = mediaMap.get(mediaKey);

      if (!existingMedia || mediaList?.length !== files.length) {
        isAllExistingFiles = false;
      }

      const categorizedFile: TNewOrExistingFile = existingMedia
        ? { type: "existing", media: existingMedia, index }
        : { type: "new", id: crypto.randomUUID(), index, file };

      return categorizedFile;
    });

    return {
      categorizedFiles,
      isAllExistingFiles,
    };
  } catch (error) {
    console.error("Error in compareFilesAndMediaList:", error);

    return {
      categorizedFiles: [],
      isAllExistingFiles: true,
    };
  }
};
