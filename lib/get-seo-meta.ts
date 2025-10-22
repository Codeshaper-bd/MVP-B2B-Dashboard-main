import type { Metadata } from "next";

type TGetSeoMetaProps = Metadata | void;

export const getSeoMeta = (props: TGetSeoMetaProps): Metadata => {
  const {
    title,
    applicationName = "Fennec Dashboard",
    description = "Created by Fennec",
    manifest = "/images/fav-icon/site.webmanifest",
    icons = {
      icon: "/images/fav-icon/favicon.ico",
      apple: "/images/fav-icon/apple-touch-icon.png",
    },
    ...restProps
  } = props || {};
  const finalTitle = title ? `${title} | Fennec Dashboard` : "Fennec Dashboard";

  return {
    title: finalTitle,
    applicationName,
    description,
    icons,
    manifest,
    ...restProps,
  };
};
