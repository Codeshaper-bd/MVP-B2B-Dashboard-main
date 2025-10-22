import Link from "next/link";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export type TServiceCardProps = {
  id?: string | number;
  icon: React.ReactNode;
  iconShapeColor?:
    | "purple"
    | "blue"
    | "blue-2"
    | "green"
    | "green-2"
    | "violet"
    | "orange";
  title?: string;
  description?: string;
  link?: string | null;
  onClick?: (
    data: Pick<TServiceCardProps, "id" | "title" | "description">,
  ) => void;
};

const getIconShapeBackgroundColor = (
  iconShapeColor: TServiceCardProps["iconShapeColor"],
) => {
  let color: string | undefined;

  switch (iconShapeColor) {
    case "purple":
      color = "#DD2590";
      break;
    case "blue":
      color = "#2E90FA";
      break;
    case "blue-2":
      color = "#528BFF";
      break;
    case "orange":
      color = "#EF6820";
      break;
    case "green":
      color = "#099250";
      break;
    case "green-2":
      color = "#099250";
      break;
    case "violet":
      color = "#7F56D9";
      break;
    default:
      break;
  }

  return {
    backgroundColor: color,
  };
};

type THandleOnClick = (
  props: {
    onClick?: (
      data: Pick<TServiceCardProps, "id" | "title" | "description">,
    ) => void;
  } & Pick<TServiceCardProps, "id" | "title" | "description">,
) => React.MouseEventHandler<HTMLDivElement>;

const handleOnClick: THandleOnClick =
  ({ onClick, title, description, id }) =>
  () => {
    onClick?.({ title, description, id });
  };

function ServiceCard({
  id,
  description,
  icon,
  title,
  iconShapeColor,
  ...restProps
}: TServiceCardProps) {
  const isButtonMode =
    "onClick" in restProps && restProps.onClick !== undefined;
  const isLinkMode =
    "link" in restProps &&
    restProps.link! !== null &&
    restProps.link! !== undefined &&
    restProps.link !== "" &&
    restProps.link !== "#" &&
    !isButtonMode;

  const content = (
    <Card
      className={cn(
        "rounded-xl p-6 hover:border-primary",
        (isButtonMode || isLinkMode) && "cursor-pointer",
      )}
      onClick={
        isButtonMode
          ? handleOnClick({
              id,
              title,
              description,
              onClick: restProps.onClick,
            })
          : undefined
      }
    >
      <div
        className="flex size-14 items-center justify-center rounded-full text-white"
        style={getIconShapeBackgroundColor(iconShapeColor)}
      >
        {icon}
      </div>

      <h3 className="mb-4 mt-6 text-wrap break-words text-xl font-semibold leading-[30px] text-default-900">
        {title}
      </h3>

      <p className="text-base font-normal leading-6 text-default-700">
        {description}
      </p>
    </Card>
  );

  if (isLinkMode) {
    return <Link href={restProps.link ?? "#"}>{content}</Link>;
  }
  return content;
}

export default ServiceCard;
