import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";

const useGetLoggedInUser = () => useAppSelector(selectAuthUser);

export default useGetLoggedInUser;
