"use";
import { memo } from "react";

import type { TPromoter } from "@/store/api/promoters/promoters.types";
import { Separator } from "@/components/ui/separator";

import AssignedEvents from "./AssignedEvents";
import type { IHeaderProps } from "./AssignedEvents/Header";
import Permissions from "./Permissions";
import UserInfo from "./UserInfo";

type TPromoterProps = TPromoter & {
  header: IHeaderProps;
};

function Promoter({ ...promoters }: TPromoterProps) {
  return (
    <div className="items-start space-y-[19px] rounded-2xl border border-solid border-[#1F242F] bg-[#121722] px-5 pb-7 pt-6">
      <UserInfo onVerticalSettingsMenuClick={undefined} {...promoters} />

      <Separator
        className="my-5 w-full bg-[#333741]"
        orientation="horizontal"
      />

      <AssignedEvents {...promoters} classname="mb-5" />

      <Permissions {...promoters} />
    </div>
  );
}

export default memo(Promoter);
