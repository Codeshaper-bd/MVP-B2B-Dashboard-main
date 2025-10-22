import Link from "next/link";
import { memo } from "react";

import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function AcceptedComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 bg-gradient-to-br from-gray-900 to-black shadow-lg">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
              <CheckCircleIcon className="h-12 w-12 text-green-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-4 text-2xl font-bold text-white">
            Already Registered!
          </h2>

          {/* Description */}
          <p className="mb-8 text-sm leading-relaxed text-gray-300">
            You are already registered as a promoter. Please login to your
            account to continue managing your events.
          </p>

          {/* Action Button */}
          <Button
            asChild
            className="w-full border border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-3 text-white shadow-md transition-all duration-200 hover:from-gray-600 hover:to-gray-700 hover:shadow-lg active:scale-95"
          >
            <Link href="/">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(AcceptedComponent);
