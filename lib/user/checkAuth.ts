import type { TUserArgs } from "./types";

// ===== PROMOTER PORTAL ===== //

const isPromoter = (user: TUserArgs): boolean => user?.type === "PROMOTER";

// ===== NIGHT CLUB PORTAL ===== //

const isNightClubAdmin = (user: TUserArgs): boolean =>
  user?.type === "ADMIN" && user?.subscriptionPlan === "NIGHT_CLUB";

const isNightClubCoAdmin = (user: TUserArgs): boolean =>
  user?.type === "EMPLOYEE" &&
  user?.roles?.some((role) => role?.slug === "co-admin") &&
  user?.subscriptionPlan === "NIGHT_CLUB";

const isNightClubAdminOrCoAdmin = (user: TUserArgs): boolean =>
  isNightClubAdmin(user) || isNightClubCoAdmin(user);

// ===== EVENT COMPANY PORTAL ===== //

const isEventCompanyAdmin = (user: TUserArgs): boolean =>
  user?.type === "ADMIN" && user?.subscriptionPlan === "EVENT_COMPANY";

const isEventCompanyCoAdmin = (user: TUserArgs): boolean =>
  user?.type === "EMPLOYEE" &&
  user?.roles?.some((role) => role?.slug === "co-admin") &&
  user?.subscriptionPlan === "EVENT_COMPANY";

const isEventCompanyAdminOrCoAdmin = (user: TUserArgs): boolean =>
  isEventCompanyAdmin(user) || isEventCompanyCoAdmin(user);

// ===== UTILITY FUNCTIONS ===== //

const hasValidAccess = (user: TUserArgs): boolean => {
  if (!user) {
    return false;
  }

  return (
    isNightClubAdmin(user) ||
    isEventCompanyAdmin(user) ||
    isNightClubCoAdmin(user) ||
    isEventCompanyCoAdmin(user) ||
    isPromoter(user)
  );
};

export {
  isPromoter,
  isNightClubAdmin,
  isNightClubCoAdmin,
  isNightClubAdminOrCoAdmin,
  isEventCompanyAdmin,
  isEventCompanyCoAdmin,
  isEventCompanyAdminOrCoAdmin,
  hasValidAccess,
};
