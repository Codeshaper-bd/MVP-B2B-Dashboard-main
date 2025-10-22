"use client"; // Error components must be Client Components

import { memo } from "react";

import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import InfoIcon from "../icons/InfoIcon";

export type TPageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
  mode?: "global" | "page";
};

function PageError({ error, reset, mode = "page" }: TPageErrorProps) {
  console.error(`🚀 ~ PageError ~ ${mode} ~ error:`, error);

  return (
    <div className="space-y-4">
      <div>
        <Alert color="destructive" variant="soft">
          <InfoIcon className="h-5 w-5" />
          <AlertTitle className="mb-0#">Something went wrong!</AlertTitle>
          <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>
        </Alert>
      </div>

      <Button onClick={reset} color="destructive" size="sm">
        Try again
      </Button>
    </div>
  );
}

export default memo(PageError);
