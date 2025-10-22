import { usePathname } from "next/navigation";

const useIsPastEvent = () => {
  const pathName = usePathname();
  return pathName.includes("/events/past-events/");
};
export default useIsPastEvent;
