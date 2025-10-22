import { memo } from "react";

import type { TPromoter } from "@/store/api/promoters/promoters.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Info from "./Info";
import VerticalSettingsMenuButton, {
  type IVerticalSettingsMenuButtonProps,
} from "./VerticalSettingsMenuButton";

export interface IUserInfoProps extends TPromoter {
  onVerticalSettingsMenuClick: IVerticalSettingsMenuButtonProps["onClick"];
}

function UserInfo({
  phone,
  fullName,
  media,
  id,
  userId,
  onVerticalSettingsMenuClick,
}: IUserInfoProps) {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            src={media?.url || ""}
            alt={fullName || "promoter avatar"}
          />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        <Info name={fullName} phoneNumber={phone} />
      </div>

      <VerticalSettingsMenuButton
        dataId={id}
        userId={userId}
        onClick={onVerticalSettingsMenuClick}
      />
    </div>
  );
}

export default memo(UserInfo);
