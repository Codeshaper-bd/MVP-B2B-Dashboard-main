import { isEventCompanyAdminOrCoAdmin } from "@/lib/user/checkAuth";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";

const useIsEventCompany = () =>
  isEventCompanyAdminOrCoAdmin(useAppSelector(selectAuthUser));

export default useIsEventCompany;
