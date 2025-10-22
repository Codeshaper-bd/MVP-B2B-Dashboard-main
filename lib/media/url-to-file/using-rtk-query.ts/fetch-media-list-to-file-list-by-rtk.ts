import type { TNullish } from "@/store/api/common-api-types";
import type {
  TFetchFileApiRes,
  TUseLazyFetchFileQueryFunction,
} from "@/store/api/files-api/fetch-file-api.types";
import type { TMedia } from "@/store/api/media/media.types";

export async function fetchMediaListToFileListByRtk({
  mediaList,
  lazyFetchFileQueryFunction,
}: {
  mediaList?: TMedia[] | TNullish;
  lazyFetchFileQueryFunction: TUseLazyFetchFileQueryFunction;
}): Promise<{ data: File[]; errors: unknown[] | null }> {
  const constructedFiles: File[] = [];
  const errors: unknown[] = [];

  const incomingMediaList = Array.isArray(mediaList) ? mediaList : [];
  const mediaListLength = incomingMediaList.length || 0;
  if (mediaListLength === 0) {
    return { data: constructedFiles, errors: null };
  }

  const filePromises: Promise<TFetchFileApiRes>[] = [];
  for (let i = 0; i < mediaListLength; i++) {
    const media = incomingMediaList[i];
    if (typeof media !== "object" || !media?.type || !media?.url) {
      continue;
    }

    const constructedFilePromise = lazyFetchFileQueryFunction(
      media,
      true,
    ).unwrap();
    filePromises.push(constructedFilePromise);
  }

  const constructedFileListPromise = await Promise.allSettled(filePromises);
  const constructedFilesPromiseLength = constructedFileListPromise?.length || 0;
  for (let i = 0; i < constructedFilesPromiseLength; i++) {
    const constructedFilePromise = constructedFileListPromise[i];
    if (constructedFilePromise.status === "rejected") {
      errors.push(constructedFilePromise?.reason);
      continue;
    }
    if (constructedFilePromise?.value instanceof File) {
      constructedFiles.push(constructedFilePromise?.value);
    }
  }

  return { data: constructedFiles, errors };
}
