"use client";

import { useState } from "react";

import ColorSelect from "./ColorSelect";
import Template, { type ITemplateProps } from "./Template";

export const TemplatesListData: Omit<
  ITemplateProps,
  "selectedId" | "onClick"
>[] = [
  {
    id: 1,
    title: "Classic Christmas",
    image: "/assets/social-svg/ChooseTemplatesImage/ClassicChristmas.svg",
  },
  {
    id: 2,
    title: "Winter Wonderland",
    image: "/assets/social-svg/ChooseTemplatesImage/WinterWonderland.svg",
  },
  {
    id: 3,
    title: "Cozy Christmas",
    image: "/assets/social-svg/ChooseTemplatesImage/CozyChristmas.svg",
  },
  {
    id: 4,
    title: "Glamorous Christmas",
    image: "/assets/social-svg/ChooseTemplatesImage/GlamorousChristmas.svg",
  },
  {
    id: 5,
    title: "Christmas Charm",
    image: "/assets/social-svg/ChooseTemplatesImage/ChristmasCharm.svg",
  },
  {
    id: 6,
    title: "Christmas Night",
    image: "/assets/social-svg/ChooseTemplatesImage/ChristmasNight.svg",
  },
];

const colorOptions: string[] = [
  "#E93A7D",
  "#FDB022",
  "#9E77ED",
  "#47CD89",
  "#2E90FA",
  "#717BBC",
];

export interface IChooseTemplateProps
  extends Pick<ITemplateProps, "selectedId" | "onClick"> {}

function ChooseTemplate() {
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  const handleTemplateClick = (
    template: Omit<ITemplateProps, "selectedId" | "onClick">,
  ) => {
    setSelectedId(template.id);
  };

  return (
    <>
      <div className="my-6 flex items-center gap-3 space-y-6">
        <ColorSelect
          label="Color Schema"
          options={colorOptions}
          // onChange={(value) =>
          //   setValue("generalInformation.colorSchema", value)
          // }
          // value={generalInformation?.colorSchema}
          // error={errors?.generalInformation?.colorSchema?.message}
          onChange={(value) => setSelectedId(value)}
          value={selectedId?.toString()}
          className="text-lg"
        />

        <div className="h-10 w-[1px] bg-default-600" />

        <div className="relative flex size-11 shrink-0 cursor-pointer items-center justify-center gap-3 rounded-full border-2 border-default-1000 bg-default-1000 p-4">
          <div className="absolute inset-0 h-full w-full rounded-full border-2 border-black bg-transparent p-0.5" />
        </div>
      </div>

      <h1 className="mb-6 mt-7 text-lg">Choose a Template</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {TemplatesListData?.map((template) => (
          <Template
            key={template.id}
            {...template}
            selectedId={selectedId}
            onClick={handleTemplateClick}
          />
        ))}
      </div>
    </>
  );
}

export default ChooseTemplate;
