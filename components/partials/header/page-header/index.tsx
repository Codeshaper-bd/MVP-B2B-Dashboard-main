"use client";
import Link from "next/link";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { isPromoter } from "@/lib/user/checkAuth";
import { cn } from "@/lib/utils";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import ClockRewindIcon from "@/components/icons/ClockRewindIcon";
import { Button } from "@/components/ui/button";

import Notifications from "../notification";
import Description from "./Description";

interface PageHeaderProps {
  title?: string;
  description?: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
  const loggedInUser = useAppSelector(selectAuthUser);
  const isPromoterUser = isPromoter(loggedInUser);
  const isEventCompany = useIsEventCompany();
  return (
    <div className="relative flex flex-none items-baseline justify-between pb-5 pt-8">
      <div className="">
        {!!title && (
          <h2 className="relative mb-1.5 text-xl capitalize leading-tight text-default-900 lg:text-3xl">
            {title}{" "}
            {title === "Fennec Live" && (
              <span className="absolute right-[-20px] top-[17px] h-2 w-2 rounded-full bg-[#F97066]" />
            )}
          </h2>
        )}

        <Description description={description} />
      </div>

      <div className="nav-tools hidden shrink-0 items-center gap-3 xl:flex">
        {!isPromoterUser && (
          <Link
            href={
              isEventCompany
                ? "/en/event-company/activity-log"
                : "/en/activity-log"
            }
            className="hidden xl:block"
          >
            <Button
              type="button"
              size="40"
              className={cn(
                "focus:ring-none relative flex-col items-center justify-center rounded-lg border border-default-200 !bg-secondary text-default-700 hover:text-primary focus:outline-none md:flex md:bg-default-50",
              )}
            >
              <ClockRewindIcon className="size-5" />
            </Button>
          </Link>
        )}

        <Notifications />
      </div>
    </div>
  );
}

export default PageHeader;
