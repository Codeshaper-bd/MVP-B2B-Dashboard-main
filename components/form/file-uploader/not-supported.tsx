import { InfoIcon as InfoIcon } from "@/components/icons";

function NotSupported() {
  return (
    <div className="flex h-12 w-fit items-center justify-center rounded bg-default-100 px-3">
      <span className="flex items-center gap-1">
        <InfoIcon className="h-4 w-4 text-destructive" /> This file type is not
        supported
      </span>
    </div>
  );
}

export default NotSupported;
