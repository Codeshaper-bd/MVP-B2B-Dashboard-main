import { usePathname } from "next/navigation";
import { useMemo } from "react";

type TBreadcrumb = {
  name: string;
  href: string;
};

const useNext14DynamicBreadcrumb = () => {
  const pathnameStr = usePathname();

  return useMemo(() => {
    if (
      !pathnameStr ||
      typeof pathnameStr !== "string" ||
      pathnameStr === "/"
    ) {
      return { breadcrumbs: [], pathname: pathnameStr || "/" };
    }

    const pathSegments = pathnameStr.split("/");
    const len = pathSegments.length;

    // Pre-allocate with maximum possible size
    const breadcrumbs: TBreadcrumb[] = new Array(len);
    let currentPath = "";
    let validCount = 0;

    for (let i = 0; i < len; i++) {
      const segment = pathSegments[i];
      if (!segment) {
        continue;
      }

      currentPath += `/${segment}`;
      breadcrumbs[validCount++] = {
        name: segment.replace(/-/g, " "),
        href: currentPath,
      };
    }

    // Trim array to actual size
    if (validCount === 0) {
      return { breadcrumbs: [], pathname: pathnameStr };
    }

    if (validCount < len) {
      breadcrumbs.length = validCount;
    }

    return { breadcrumbs, pathname: pathnameStr };
  }, [pathnameStr]);
};

export default useNext14DynamicBreadcrumb;
