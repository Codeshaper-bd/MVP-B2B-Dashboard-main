"use client";
import Image from "next/image";
import Link from "next/link";

import { getRedirectPath } from "@/lib/user/getRedirectPath";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import { Button } from "@/components/ui/button";

function UnauthorizedPage() {
  const loggedInUser = useAppSelector(selectAuthUser);

  const getRedirectUrl = () => getRedirectPath(loggedInUser);

  const getButtonLabel = () => {
    if (loggedInUser?.type === "PROMOTER") {
      return "Back To Promoter Portal";
    } else {
      return "Back To Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto p-10">
      <div className="flex w-full flex-col items-center">
        <div className="max-w-[542px]">
          <Image
            src="/images/all-img/dark-401.png"
            alt="error image"
            className="h-full w-full object-cover"
            priority={true}
            width={542}
            height={542}
          />
        </div>
        <div className="mt-16 text-center">
          <div className="text-2xl font-semibold text-default-900 md:text-4xl lg:text-5xl">
            You are not Authorized
          </div>
          <div className="mt-3 text-sm text-default-600 md:text-base">
            You are missing the required rights to be able to access <br /> this
            page
          </div>
          <Button
            asChild
            color="secondary"
            className="mt-9 h-12 md:min-w-[300px]"
          >
            <Link href={getRedirectUrl()}>
              <LeftArrowIcon className="me-1.5 size-4" />
              {getButtonLabel()}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
