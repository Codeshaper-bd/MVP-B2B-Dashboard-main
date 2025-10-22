"use client";

import { useUserOnlineStatus } from "@/hooks/use-online-status";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";

function UserPresence() {
  const authUser = useAppSelector(selectAuthUser);
  const userId = authUser?.id || -1;

  useUserOnlineStatus(userId);

  return null;
}

export default UserPresence;
