import { useEffect, useRef, useState } from "react";

export type TErrorResponse = {
  success: false;
  error: unknown;
  message: string;
  objectUrl: string;
};

export type TSuccessResponse = {
  success: true;
  error: null;
  objectUrl: string;
};

export type TResponse = TErrorResponse | TSuccessResponse;

const getObjectUrlPromise = (
  file: Blob | MediaSource | File | null | undefined | void,
) =>
  new Promise<TResponse>((resolve, reject) => {
    let objectUrl: string = "";

    try {
      if (!file) {
        reject({
          success: false,
          error: new Error("File is null or undefined"),
          errorMessage: "File is null or undefined",
          objectUrl,
        });
        return;
      }

      objectUrl = URL.createObjectURL(file);
      resolve({
        success: true,
        error: null,
        objectUrl,
      });
    } catch (error) {
      reject({
        success: false,
        error,
        errorMessage:
          error instanceof Error ? error?.message : "Error creating object URL",
        objectUrl,
      });
    }
  });

const fetchFunc =
  ({
    file,
    ref,
    setPreviewUrl,
    setErrorMessage,
    setIsLoading,
  }: {
    file: Blob | MediaSource | File | null | undefined;
    ref: React.MutableRefObject<string>;
    setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) =>
  async () => {
    try {
      setIsLoading(() => true);
      setErrorMessage(() => null);
      const response = await getObjectUrlPromise(file);
      if (response.success) {
        ref.current = response.objectUrl;
        setPreviewUrl(() => response.objectUrl);
      }
    } catch (err) {
      const { message, objectUrl } = err as TErrorResponse;
      ref.current = objectUrl;
      setErrorMessage(() => message);
      setPreviewUrl(() => objectUrl);
    } finally {
      setIsLoading(() => false);
    }
  };

const useObjectURL = (file: Blob | MediaSource | File | null | undefined) => {
  const ref = useRef<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    // Create object URL from the Blob, MediaSource, or File
    fetchFunc({ file, ref, setPreviewUrl, setErrorMessage, setIsLoading })();

    const currentObjectUrl = ref.current;

    // Cleanup to prevent memory leaks
    return () => {
      URL.revokeObjectURL(currentObjectUrl);
    };
  }, [file]);

  return { objectUrl: previewUrl, isLoading, errorMessage };
};

export default useObjectURL;
