import type { TSingleFile } from "@/components/form/upload-single-file";

export type TInitialState = {
  mode: "automatic" | "manual";
  name: string;
  color: string;
  images: TSingleFile[] | undefined | null;
  description: string;
};
