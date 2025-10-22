"use client";
import { memo, useEffect } from "react";

import { isNightClubAdmin, isNightClubCoAdmin } from "@/lib/user/checkAuth";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "@/components/navigation";
import SiteLayout from "@/components/partials/layouts";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const loggedInUser = useAppSelector(selectAuthUser);
  const router = useRouter();

  const hasValidAccess =
    isNightClubAdmin(loggedInUser) || isNightClubCoAdmin(loggedInUser);

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

export default memo(AdminLayout);
