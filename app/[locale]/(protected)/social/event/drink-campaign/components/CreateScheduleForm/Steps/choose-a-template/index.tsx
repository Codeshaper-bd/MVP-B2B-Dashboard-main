"use client";

import { useState } from "react";

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
    <div>
      <h1 className="mb-6 text-lg font-semibold text-default-900">
        Choose a Template
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {TemplatesListData.map((template) => (
          <Template
            key={template.id}
            {...template}
            selectedId={selectedId}
            onClick={handleTemplateClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ChooseTemplate;
