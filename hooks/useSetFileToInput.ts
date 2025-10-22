import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";

type TNullish = null | undefined;
type TFile = File | null | undefined;
type TMedia =
  | {
      id: number;
      name: string | TNullish;
      originalName: string | TNullish;
      type: string | TNullish;
      url: string | TNullish;
      size: number | TNullish;
      tags: string[] | TNullish;
      isFeatured: boolean | TNullish;
      createdAt: string | TNullish;
      updatedAt: string | TNullish;
      deletedAt: string | TNullish;
    }
  | null
  | undefined;

type TFileOrMedia =
  | {
      file: TFile;
    }
  | {
      media: TMedia;
    };

type TFilesOrMediaList =
  | {
      files: TFile[];
    }
  | {
      mediaList: TMedia[] | null | undefined;
    };

type TFileInput<T extends boolean | undefined = false> = T extends true
  ? TFilesOrMediaList
  : TFileOrMedia;

type TUseSetFileToInputProps<T extends boolean | undefined = false> = {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  isMultiple?: T;
} & TFileInput<T>;

const useSetFileToInput = <T extends boolean | undefined = false>({
  inputRef,
  isMultiple,
  ...props
}: TUseSetFileToInputProps<T>) => {
  // for single file
  if (!isMultiple) {
    if (!!props && "file" in props) {
      const file = props.file as TFile;
      const dataTransfer = new DataTransfer();
      if (file) {
        dataTransfer.items.add(file);
      }
      if (inputRef.current) {
        inputRef.current.files = dataTransfer.files;
      }
    } else if (!!props && "media" in props) {
      const media = props.media as TMedia;
      const fetchUrlToFile = async () => {
        const file = await urlToFile({
          url: media?.url ?? "",
          filename:
            media?.originalName || media?.name || new Date().toISOString(),
          mimeType: media?.type as TMimeType,
          lastModified: new Date(
            media?.updatedAt ||
              media?.deletedAt ||
              media?.createdAt ||
              new Date(),
          ).getTime(),
        });
        const dataTransfer = new DataTransfer();
        if (file) {
          dataTransfer.items.add(file);
        }
        if (inputRef.current) {
          inputRef.current.files = dataTransfer.files;
        }
      };
      fetchUrlToFile();
    }

    return;
  }

  // for list of files
  if (!!props && "files" in props) {
    const files = props.files as TFile[];
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      if (file) {
        dataTransfer.items.add(file);
      }
    });
    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }
  } else if (!!props && "mediaList" in props) {
    const mediaList = props.mediaList as TMedia[] | null | undefined;
    const fetchUrlToFile = async () => {
      const dataTransfer = new DataTransfer();
      if (mediaList) {
        for (const media of mediaList) {
          const file = await urlToFile({
            url: media?.url ?? "",
            filename:
              media?.originalName || media?.name || new Date().toISOString(),
            mimeType: media?.type as TMimeType,
            lastModified: new Date(
              media?.updatedAt ||
                media?.deletedAt ||
                media?.createdAt ||
                new Date(),
            ).getTime(),
          });
          if (file) {
            dataTransfer.items.add(file);
          }
        }
      }
      if (inputRef.current) {
        inputRef.current.files = dataTransfer.files;
      }
    };
    fetchUrlToFile();
  }
};

export default useSetFileToInput;
