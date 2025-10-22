import { ArrowLeft, Lock } from "lucide-react";

import { Link } from "@/i18n/routing";
import SetNewPasswordForm from "@/components/partials/auth/set-new-password-form";

function SetNewPasswordPage() {
  return (
    <div className="flex h-dvh min-h-dvh w-full basis-full items-center overflow-hidden">
      <div className="flex h-dvh w-full flex-wrap">
        <div className="relative flex-1 bg-background dark:bg-default-100">
          <div className="flex h-full flex-col">
            <div className="z-10 mx-auto mb-3 mt-16 flex w-full max-w-[524px] flex-col justify-center p-7 text-2xl text-default-900 md:px-[42px] md:py-[44px]">
              <div className="mb-6 flex items-center justify-center text-center">
                <Lock
                  size={64}
                  className="rounded-2xl border-2 p-3 text-default-600"
                />
                <div className="border-secondary-100 absolute -z-10 h-[7rem] w-[7rem] overflow-hidden rounded-full border opacity-45"></div>
                <div className="border-secondary-100 absolute -z-10 h-[14rem] w-[14rem] overflow-hidden rounded-full border opacity-30"></div>
                <div className="border-secondary-100 absolute -z-10 h-[21rem] w-[21rem] overflow-hidden rounded-full border opacity-25"></div>
                <div className="border-secondary-100 absolute -z-10 h-[28rem] w-[28rem] overflow-hidden rounded-full border opacity-20"></div>
                <div className="border-secondary-100 absolute -z-10 h-[35rem] w-[35rem] overflow-hidden rounded-full border opacity-15"></div>
                <div className="border-secondary-100 absolute -z-10 h-[42rem] w-[42rem] overflow-hidden rounded-full border opacity-10"></div>
                <div className="border-secondary-100 absolute -z-10 h-[49rem] w-[49rem] overflow-hidden rounded-full border opacity-5"></div>
              </div>

              <div className="mb-6 text-center">
                <h4 className="mb-2 font-medium text-default-900">
                  Set new password
                </h4>
                <div className="text-base text-default-600">
                  Your new password must be different to previously used
                  password
                </div>
              </div>

              <SetNewPasswordForm />

              <Link
                href="/"
                className="mx-auto mt-10 flex items-center justify-between space-x-1 text-sm font-medium text-default-600 hover:text-default-800"
              >
                <span>
                  <ArrowLeft />
                </span>
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetNewPasswordPage;
