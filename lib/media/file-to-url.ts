interface IGetFileUrlProps {
  file: File | Blob | null | undefined;
}

interface IGetFileUrlReturn {
  url: string;
}

export const getFileUrl = ({ file }: IGetFileUrlProps): IGetFileUrlReturn => {
  if (!file) {
    return { url: "" };
  }

  try {
    const url = URL.createObjectURL(file);
    return { url };
  } catch (error) {
    console.error("Error creating file URL:", error);
    return { url: "" };
  }
};
