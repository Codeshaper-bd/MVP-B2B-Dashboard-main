"use client";
import Image from "next/image";
import Link from "next/link";

import { getRedirectPath } from "@/lib/user/getRedirectPath";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  const loggedInUser = useAppSelector(selectAuthUser);

  const getRedirectUrl = () => getRedirectPath(loggedInUser);

  const getButtonLabel = () => {
    if (loggedInUser?.type === "PROMOTER") {
      return "Go To Promoter Portal";
    } else {
      return "Go To Dashboard";
    }
  };

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-[#0C111D] p-20">
      <div>
        <div className="relative mx-auto mb-[60px] h-full w-full max-w-[743px]">
          <Image
            src="/assets/404.svg"
            alt="404"
            width={743}
            height={395}
            className="h-full w-full object-contain"
          />
        </div>

        <h1 className="mb-3 text-center text-[40px] font-semibold capitalize not-italic leading-[120%] text-default-1000">
          Ops! Page Not Found
        </h1>

        <p className="mx-auto mb-7 w-full max-w-[458px] text-center text-base font-light not-italic leading-6 text-default-1000">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>

        <div className="flex w-full flex-col items-center">
          <Button color="primary" asChild className="md:px-12" size="xl">
            <Link href={getRedirectUrl()}>
              <LeftArrowIcon className="me-1.5 size-4" /> {getButtonLabel()}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
