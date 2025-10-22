"use client";
import { memo, useEffect } from "react";

import { isPromoter } from "@/lib/user/checkAuth";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "@/components/navigation";
import SiteLayout from "@/components/partials/layouts";

function PromoterLayout({ children }: { children: React.ReactNode }) {
  const loggedInUser = useAppSelector(selectAuthUser);
  const isPromoterUser = isPromoter(loggedInUser);
  const router = useRouter();

  useEffect(() => {
    if (!isPromoterUser) {
      router.push("/errors/401");
    }
  }, [isPromoterUser, router]);

  if (!isPromoterUser) {
    return null;
  }

  return <SiteLayout>{children}</SiteLayout>;
}

export default memo(PromoterLayout);
