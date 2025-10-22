"use client";
import { memo, useEffect } from "react";

import {
  isEventCompanyAdmin,
  isEventCompanyCoAdmin,
} from "@/lib/user/checkAuth";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "@/components/navigation";
import SiteLayout from "@/components/partials/layouts";

function EventCompanyLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const loggedInUser = useAppSelector(selectAuthUser);

  const hasValidAccess =
    isEventCompanyAdmin(loggedInUser) || isEventCompanyCoAdmin(loggedInUser);

  useEffect(() => {
    if (!hasValidAccess) {
      router.push("/errors/401");
    }
  }, [hasValidAccess, router]);

  if (!hasValidAccess) {
    return null;
  }

  return <SiteLayout>{children}</SiteLayout>;
}

export default memo(EventCompanyLayout);
