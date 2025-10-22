import { memo } from "react";

export interface IInfoProps {
  name: string | null | undefined;
  phoneNumber: string | number | null | undefined;
}
function Info({ name, phoneNumber }: IInfoProps) {
  return (
    <div className="space-y-1">
      <h4 className="text-base font-semibold leading-6 text-[#F5F5F6]">
        {name}
      </h4>

      <p className="text-sm font-normal leading-5 text-[#94969C]">
        +{phoneNumber}
      </p>
    </div>
  );
}

export default memo(Info);
