"use client";
import { memo } from "react";

import { useConfig } from "@/hooks/use-config";
import { Link } from "@/i18n/routing";
import { getRedirectPath } from "@/lib/user/getRedirectPath";
import { cn } from "@/lib/utils";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";

import LargeBrandLogoIcon from "./icons/LargeBrandLogoIcon";
import {
  default as SmallBrandLogo,
  default as SmallBrandLogoIcon,
} from "./icons/SmallBrandLogoIcon";

function Logo({ className }: { className?: string }) {
  const [config] = useConfig();
  const loggedInUser = useAppSelector(selectAuthUser);
  const getRedirectUrl = () => getRedirectPath(loggedInUser);
  const redirectUrl = getRedirectUrl()?.split("/en")[1];
  return (
    <Link
      href={redirectUrl}
      className={cn("flex shrink-0 items-center gap-2 py-3", className)}
    >
      {/* For Desktop devices */}
      <div className="hidden xl:block">
        {config?.collapsed ? (
          <SmallBrandLogoIcon className="w-10 shrink-0 bg-transparent" />
        ) : (
          <LargeBrandLogoIcon className="ml-3.5 w-[150px] shrink-0 bg-transparent" />
        )}
      </div>

      {/* For Mobile devices */}
      <div className="block xl:hidden">
        <SmallBrandLogo className="w-10 shrink-0 bg-transparent" />
      </div>
    </Link>
  );
}

export default memo(Logo);
