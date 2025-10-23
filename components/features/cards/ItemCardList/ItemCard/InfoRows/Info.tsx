import { CalendarIcon as CalendarIcon } from "@/components/icons";
import { DatabaseIcon as DataBaseIcon } from "@/components/icons";

export type TIconType =
  | {
      iconSource: "external";
      icon?: React.ElementType | null;
    }
  | {
      iconSource?: "internal";
      icon?: "DataBaseIcon" | "CalendarIcon" | null;
    };

export type TInfoProps = {
  label?: string | number | null;
  value?: string | number | null;
} & TIconType;

function Info({ icon, label, value, iconSource = "internal" }: TInfoProps) {
  let IconContent: React.ElementType | null | undefined = null;

  if (iconSource === "external") {
    IconContent = icon as React.ElementType;
  } else if (iconSource === "internal") {
    if (icon === "DataBaseIcon") {
      IconContent = DataBaseIcon;
    } else if (icon === "CalendarIcon") {
      IconContent = CalendarIcon;
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {!!IconContent && (
          <IconContent className="h-full w-[17px] shrink-0 text-default-700" />
        )}

        <p className="text-base font-normal leading-6 text-default-700">
          {label}
        </p>
      </div>

      <p className="text-base font-normal leading-6 text-default-700">
        {value}
      </p>
    </div>
  );
}

Info.DataBaseIcon = DataBaseIcon;
Info.CalendarIcon = CalendarIcon;

export default Info;
