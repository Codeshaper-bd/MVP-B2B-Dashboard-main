"use client";
import { memo } from "react";

import { getAuthUserName } from "@/lib/user/get-auth-user-name";
import {
  selectAuthUserFirstName,
  selectAuthUserLastName,
} from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";

export type TDescriptionProps = { description?: string };

function Description({ description }: TDescriptionProps) {
  const authUserFirstName = useAppSelector(selectAuthUserFirstName);
  const authUserLastName = useAppSelector(selectAuthUserLastName);
  const authUserName = getAuthUserName({
    firstName: authUserFirstName,
    lastName: authUserLastName,
    fallBackName: "User Unavailable",
  });

  return (
    <p className="text-base leading-normal text-default-600">
      {description || `Welcome back, ${authUserName}!`}
    </p>
  );
}

export default memo(Description);
