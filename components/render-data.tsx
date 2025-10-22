import { TriangleAlert } from "lucide-react";
import { memo } from "react";

import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import { Alert, AlertDescription } from "@/components/ui/alert";

import DataLoader from "./loader/data-loader";
import TopLoadingBar from "./loader/top-loader";
import DataNotFound from "./ui/data-not-found";
import InfoCard from "./ui/info-card";

export interface IApiStateInfo extends Record<string, unknown> {
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  error?: unknown;
  isSuccess?: boolean;
  isUninitialized?: boolean;
  loadingSkeleton?: React.ReactNode;
  errorUI?: React.ReactNode;
  dataNotFoundUI?: React.ReactNode;
  uninitializedSkeleton?: React.ReactNode;
  isModal?: boolean;
  dataNotFoundTitle?: string;
  dataNotFoundSubtitle?: string;
}

interface IRenderDataProps<T> extends IApiStateInfo {
  data?: T | null | undefined;
  children?: React.ReactNode;
  expectedDataType: "array" | "object" | "string" | "number";
}

function RenderData<T>({
  data,
  isError,
  isFetching,
  isLoading,
  isUninitialized,
  isSuccess,
  loadingSkeleton,
  children,
  error,
  expectedDataType,
  isModal,
  uninitializedSkeleton,
  errorUI,
  dataNotFoundUI,
  dataNotFoundTitle = "No data found",
  dataNotFoundSubtitle = "Sorry, we couldn’t find any data.",
}: IRenderDataProps<T>) {
  if (isUninitialized) {
    return (
      uninitializedSkeleton || (
        <Alert color="primary" variant="soft">
          <AlertDescription>
            <InfoCard
              title="Data fetching is off. You may not have permission to view this data."
              icon={<TriangleAlert className="h-4 w-4" />}
              color="primary"
            />
          </AlertDescription>
        </Alert>
      )
    );
  }

  if (isLoading) {
    return loadingSkeleton || <DataLoader />;
  }
  if (isFetching) {
    if (isModal) {
      return <TopLoadingBar isLoading={isFetching} />;
    }
    return (
      <>
        <TopLoadingBar isLoading={isFetching} />
        {children}
      </>
    );
  }

  if (isError) {
    console.info(getApiErrorMessage(error, "Something went wrong"));
    return null;
  }

  const isNullishData = data === null || data === undefined;
  const isArray = !isNullishData && Array.isArray(data);
  const isObject = !isNullishData && !isArray && typeof data === "object";
  const isEmptyArray = isArray && data?.length === 0;
  const isEmptyObject = isObject && !!data && Object.keys(data).length === 0;

  if (isNullishData) {
    console.info(
      `No data found.${expectedDataType === "array" || expectedDataType === "object" ? ` Expected data type: ${expectedDataType} but received ${data === null ? "null" : "undefined"}` : ""}`,
    );
    return (
      dataNotFoundUI || (
        <DataNotFound
          className="h-full grow justify-center"
          title={dataNotFoundTitle}
          subtitle={dataNotFoundSubtitle}
        />
      )
    );
  }

  if (expectedDataType === "array" && isObject) {
    console.info(
      `Backend exception occurred. Expected data type: ${expectedDataType} but received an object`,
    );
    return null;
  }

  if (expectedDataType === "object" && isArray) {
    console.info(
      `Backend exception occurred. Expected data type: ${expectedDataType} but received an array`,
    );
    return null;
  }

  if (
    (expectedDataType === "array" || expectedDataType === "object") &&
    (isEmptyArray || isEmptyObject)
  ) {
    return (
      dataNotFoundUI || (
        <DataNotFound
          className="h-full grow justify-center"
          title={dataNotFoundTitle}
          subtitle={dataNotFoundSubtitle}
        />
      )
    );
  }

  return <>{children}</>;
}

export default memo(RenderData);
