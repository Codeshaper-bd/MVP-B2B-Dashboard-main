export type TGeneratedImagesStep = {
  generatedImages?:
    | {
        id?: string | number;
        src?: string | null;
      }[]
    | null;
  generatedCaptions?: string | null;
  hashtags: string[];
};
