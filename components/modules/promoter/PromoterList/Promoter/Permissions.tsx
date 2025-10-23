import { memo } from "react";

import type { TPromoter } from "@/store/api/promoters/promoters.types";
import { CheckIcon as CheckIcon } from "@/components/icons";
import { CrossIcon as CrossIcon } from "@/components/icons";

import { guestListPermissions } from "../../forms/CreatePromoterForm/utils";

type TPermissionsProps = TPromoter & {
  groupTitle?: string;
};

function Permissions({
  groupTitle = "Permissions",
  permissions,
}: TPermissionsProps) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold leading-5 text-white">
        {groupTitle}
      </h4>

      <div className="space-y-2">
        {guestListPermissions.map((permission) => {
          const hasAccess =
            Array.isArray(permissions) &&
            permissions.includes(permission.value);

          return (
            <div key={permission.value} className="flex items-center gap-3">
              {hasAccess ? (
                <CheckIcon className="w-3.5 shrink-0 text-[#47CD89]" />
              ) : (
                <CrossIcon className="w-4 shrink-0 text-[#FF4D4F]" />
              )}

              <p className="text-wrap break-words text-center text-sm font-normal capitalize leading-5 text-default-700">
                {permission.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Permissions);
