"use client";
import Cookies from "js-cookie";
import { ChevronRight } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";

import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import {
  isEventCompanyAdminOrCoAdmin,
  isNightClubAdminOrCoAdmin,
  isPromoter,
} from "@/lib/user/checkAuth";
import { getAuthUserName } from "@/lib/user/get-auth-user-name";
import { getAvatarFallbackName } from "@/lib/user/get-avatar-fallback-name";
import { cn } from "@/lib/utils";
import { apiSlice } from "@/store/api";
import { useUserSignoutMutation } from "@/store/api/auth/auth-api";
import type { TUserSignoutMutation } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetAuthenticatedUserProfileQuery } from "@/store/api/profile/profile-api";
import {
  logout,
  selectAuthUser,
  selectRefreshExpiresAt,
  selectRefreshToken,
} from "@/store/features/auth";
import {
  useAppDispatch,
  useAppSelector,
  type TUseAppDispatchReturnType,
} from "@/store/hooks";
import SupportIcon from "@/components/icons/sidebar/SupportIcon";
import UserIcon from "@/components/icons/UserIcon";
import VerifiedIcon from "@/components/icons/VerifiedIcon";
import { usePathname } from "@/components/navigation";
import RenderData from "@/components/render-data";
import ImageSkeleton from "@/components/skeleton/image-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

const nightClubMenuList = [
  {
    href: "/en/dashboard/user-profile",
    label: "Profile",
    icon: UserIcon,
    isActive: (pathname: string) => pathname.endsWith("/user-profile"),
  },
  {
    href: "/en/dashboard/todo-list",
    label: "Todo",
    icon: SupportIcon,
    isActive: (pathname: string) => pathname.endsWith("/dashboard/todo-list"),
  },
];
const promoterMenusList = [
  {
    href: "#",
    label: "Profile",
    icon: UserIcon,
    isActive: (pathname: string) => pathname.endsWith("/user-profile"),
  },
];

const eventCompanyMenuList = [
  {
    href: "/en/event-company/user-profile",
    label: "Profile",
    icon: UserIcon,
    isActive: (pathname: string) =>
      pathname.endsWith("/event-company/user-profile"),
  },
  {
    href: "/en/event-company/todo-list",
    label: "Todo",
    icon: SupportIcon,
    isActive: (pathname: string) =>
      pathname.endsWith("/event-company/todo-list"),
  },
];

type THandleLogout = (props: {
  userSignout: TUserSignoutMutation;
  router: AppRouterInstance;
  dispatch: TUseAppDispatchReturnType;
  toastProps: TUseToastReturnType;
  refreshToken: string | TNullish;
  refreshExpiresAt: string | TNullish;
}) => () => Promise<void>;

function UserProfile({ type = "default" }: { type?: "default" | "mobile" }) {
  const refreshToken = useAppSelector(selectRefreshToken);
  const refreshExpiresAt = useAppSelector(selectRefreshExpiresAt);
  const loggedInUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();
  const [userSignout] = useUserSignoutMutation();
  const [config] = useConfig();
  const collapsed = type === "default" ? config.collapsed : false;
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;
  const pathname = usePathname();
  const router = useRouter();
  const toastProps = useToast();
  const {
    data: authenticatedUserProfileRes,
    ...authenticatedUserProfileApiState
  } = useGetAuthenticatedUserProfileQuery();
  const authenticatedUserProfileData = authenticatedUserProfileRes?.data;

  const authUserName = useMemo(
    () =>
      getAuthUserName({
        firstName: loggedInUser?.firstName,
        lastName: loggedInUser?.lastName,
        fallBackName: "User Unavailable",
      }),
    [loggedInUser],
  );
  const avatarFallbackName: string = useMemo(
    () => getAvatarFallbackName(authUserName),
    [authUserName],
  );

  const isPromoterUser = isPromoter(loggedInUser);
  const isEventCompanyUser = isEventCompanyAdminOrCoAdmin(loggedInUser);
  const isNightClubUser = isNightClubAdminOrCoAdmin(loggedInUser);

  const menuList = useMemo(() => {
    if (isPromoterUser) {
      return promoterMenusList;
    } else if (isEventCompanyUser) {
      return eventCompanyMenuList;
    } else if (isNightClubUser) {
      return nightClubMenuList;
    }
    return [];
  }, [isPromoterUser, isEventCompanyUser, isNightClubUser]);

  const userProfilePath = useMemo(() => {
    if (isPromoterUser) {
      return "#";
    } else if (isEventCompanyUser) {
      return "/en/event-company/user-profile";
    } else if (isNightClubUser) {
      return "/en/dashboard/user-profile";
    }
    return "#";
  }, [isPromoterUser, isEventCompanyUser, isNightClubUser]);

  const handleLogout: THandleLogout = useCallback(
    ({
      dispatch,
      refreshToken,
      refreshExpiresAt,
      router,
      userSignout,
      toastProps: { toast },
    }) =>
      async () => {
        const toastId = toast({
          variant: "loading",
          title: "Logging out...",
          description: "Please wait while we log you out",
        });

        try {
          const isRefreshTokenExpired =
            !refreshToken ||
            !refreshExpiresAt ||
            compareDateTimes({
              providedDateTime: refreshExpiresAt,
            })?.status !== "after";
          if (!refreshToken || isRefreshTokenExpired) {
            toastId.update({
              variant: "success",
              id: toastId.id,
              title: "Logout successful",
              description: "You have been logged out successfully",
            });
            Cookies.remove("authTokens");
            Cookies.remove("userInfo");
            dispatch(logout());
            dispatch(apiSlice?.util?.resetApiState());
            router?.replace("/");
            return;
          }

          await userSignout({
            refreshToken,
          }).unwrap();

          Cookies.remove("authTokens");
          Cookies.remove("userInfo");

          toastId.update({
            variant: "success",
            id: toastId.id,
            title: "Logout successful",
            description: "You have been logged out successfully",
          });
          router?.replace("/");
        } catch (error) {
          console.error("Logout error:", error);
          if (
            !!error &&
            typeof error === "object" &&
            "status" in error &&
            typeof error.status === "number" &&
            error.status === 401
          ) {
            toastId.update({
              variant: "success",
              id: toastId.id,
              title: "Logout successful",
              description: "You have been logged out successfully",
            });
            Cookies.remove("authTokens");
            Cookies.remove("userInfo");
            dispatch(logout());
            dispatch(apiSlice?.util?.resetApiState());
            router?.replace("/");

            return;
          }

          toastId.update({
            id: toastId.id,
            title: "Logout failed",
            description: getApiErrorMessage(error, "Logout failed"),
            variant: "error",
          });
        }
      },
    [],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-[10px] border border-border bg-default-150 p-3",
            {
              "mx-auto justify-center border-0 bg-transparent p-0":
                collapsed && !hovered,
            },
            authenticatedUserProfileApiState?.isError
              ? "border border-red-500 bg-destructive/25"
              : "",
          )}
        >
          <div className="inline-flex">
            <RenderData
              loadingSkeleton={
                <ImageSkeleton className="size-12 rounded-full" />
              }
              errorUI={
                <Avatar
                  className={cn("", {
                    "h-12 w-12": collapsed && !hovered,
                  })}
                >
                  <AvatarImage src={"/assets/avatar/404-avatar.jpg"} />
                  <AvatarFallback>{avatarFallbackName}</AvatarFallback>
                </Avatar>
              }
              {...authenticatedUserProfileApiState}
              data={authenticatedUserProfileData}
              expectedDataType="object"
            >
              <Avatar
                className={cn("", {
                  "h-12 w-12": collapsed && !hovered,
                })}
              >
                <AvatarImage
                  src={
                    authenticatedUserProfileData?.media?.url ||
                    "/assets/avatar/avatar-1.png"
                  }
                />
                <AvatarFallback>{avatarFallbackName}</AvatarFallback>
              </Avatar>
            </RenderData>
          </div>

          <div
            className={cn("flex-1", {
              hidden: collapsed && !hovered,
            })}
          >
            <h3 className="mb-0.5 flex items-center gap-1.5 text-sm font-medium">
              <span className="block max-w-[120px] truncate">
                {authUserName}
              </span>
              <VerifiedIcon className="mt-1 h-5 w-5 text-[#35B9E9]" />
            </h3>
            <p className="text-xs capitalize text-default-600">
              {loggedInUser?.type?.toLowerCase() || "user"}
            </p>
          </div>

          <div
            className={cn("flex-none", {
              hidden: collapsed && !hovered,
            })}
          >
            <ChevronRight />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[248px] border border-border bg-default-150 p-0"
      >
        <Link
          href={userProfilePath}
          className="block border-b border-dashed border-default-300/60 p-2"
        >
          <div
            className={cn(
              "flex items-center gap-3 rounded-md bg-default p-2",
              authenticatedUserProfileApiState?.isError
                ? "border border-red-500 bg-destructive/20"
                : "",
            )}
          >
            <RenderData
              loadingSkeleton={
                <ImageSkeleton className="size-12 rounded-full" />
              }
              errorUI={
                <Avatar
                  className={cn("", {
                    "h-12 w-12 shrink-0": collapsed && !hovered,
                  })}
                >
                  <AvatarImage src={"/assets/avatar/404-avatar.jpg"} />
                  <AvatarFallback>{avatarFallbackName}</AvatarFallback>
                </Avatar>
              }
              {...authenticatedUserProfileApiState}
              data={authenticatedUserProfileData}
              expectedDataType="object"
            >
              <Avatar
                className={cn("", {
                  "h-12 w-12 shrink-0": collapsed && !hovered,
                })}
              >
                <AvatarImage
                  src={
                    authenticatedUserProfileData?.media?.url ||
                    "/assets/avatar/avatar-1.png"
                  }
                />
                <AvatarFallback>{avatarFallbackName}</AvatarFallback>
              </Avatar>
            </RenderData>

            <div className="flex-1">
              <h3 className="mb-0.5 flex items-center gap-1.5 text-sm font-medium">
                <span className="block max-w-[140px] truncate">
                  {loggedInUser?.firstName} {loggedInUser?.lastName}
                </span>
                <VerifiedIcon className="mt-1 h-5 w-5 text-[#35B9E9]" />
              </h3>
              <p className="whitespace-wrap break-all text-xs text-default-600">
                {loggedInUser?.email}
              </p>
            </div>
          </div>
        </Link>

        <div className="px-2 py-3">
          {menuList?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center border border-transparent bg-transparent py-2 text-sm font-semibold text-default-700 transition-colors hover:bg-transparent hover:text-primary md:px-3.5",
                {
                  "text-primary": item.isActive(pathname),
                },
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 text-default-600 transition-colors group-hover:text-primary",
                  {
                    "text-primary": item.isActive(pathname),
                  },
                )}
              />
              <span className="ms-3">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-dashed border-default-300/60 p-2">
          <button
            type="button"
            onClick={handleLogout({
              dispatch,
              userSignout,
              router,
              toastProps,
              refreshToken,
              refreshExpiresAt,
            })}
            className={cn(
              "group flex w-full items-center border border-transparent bg-transparent py-2 text-sm font-semibold text-default-700 !transition-all duration-300 hover:bg-transparent hover:text-primary md:px-3.5",
              "cursor-pointers border-none outline-none ring-0 focus-within:border-none focus-within:outline-none focus-within:ring-0 hover:border-none hover:outline-none hover:ring-0 focus:border-none focus:outline-none focus:ring-0 active:border-none active:outline-none active:ring-0",
            )}
          >
            <SupportIcon className="h-5 w-5 cursor-pointer text-default-600 !transition-all duration-300 group-hover:text-primary" />
            <span className="ms-3">Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default memo(UserProfile);
