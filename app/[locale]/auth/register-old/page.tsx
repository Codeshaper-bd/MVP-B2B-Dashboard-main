import Image from "next/image";

import { Link } from "@/i18n/routing";
import { getSeoMeta } from "@/lib/get-seo-meta";
import AppleIcon from "@/components/icons/AppleIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import Copyright from "@/components/partials/auth/copyright";
import Logo from "@/components/partials/auth/logo";
import RegForm from "@/components/partials/auth/reg-form";
import { Button } from "@/components/ui/button";

export const metadata = getSeoMeta({ title: "Register" });

function RegisterPage() {
  return (
    <div className="flex h-dvh min-h-dvh w-full basis-full items-center overflow-hidden">
      <div className="flex h-dvh w-full flex-wrap">
        <div className="no-scrollbar relative h-dvh flex-1 overflow-y-auto px-5 sm:px-0">
          <div className="flex flex-col bg-background dark:bg-default-100">
            <div className="mx-auto mb-3 mt-5 flex h-full w-full max-w-[524px] flex-col justify-center text-2xl text-default-900 md:px-[42px]">
              <div className="mb-8 flex items-center justify-start text-center md:mb-12">
                <Link href="/">
                  <Logo />
                </Link>
              </div>

              <div className="mb-10">
                <h4 className="mb-2 font-medium text-default-900 md:text-xl xl:text-3xl">
                  Sign Up
                </h4>
                <div className="text-base text-default-600">
                  Welcome back! Please enter your details.
                </div>
              </div>

              <RegForm />

              <Button
                fullWidth
                className="mt-3 font-medium"
                color="default"
                variant="outline"
              >
                <GoogleIcon className="h-5 w-5" />
                <span className="ml-2 text-default-700">
                  Log in with Google
                </span>
              </Button>

              <Button
                fullWidth
                className="mt-3 font-medium"
                color="default"
                variant="outline"
              >
                <AppleIcon className="h-5 w-5" />
                <span className="ml-2 text-default-700">Log in with Apple</span>
              </Button>

              <div className="mx-auto mt-12 text-sm font-normal text-default-600 md:max-w-[345px]">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-default-900 hover:underline"
                >
                  Log in
                </Link>
              </div>
            </div>
            <div className="z-[999] pb-4 pl-8 text-left text-xs font-normal text-default-600">
              <Copyright />
            </div>
          </div>
        </div>
        <div className="relative z-[1] hidden flex-1 overflow-hidden bg-default-50 text-[40px] leading-[48px] text-default-600 lg:block">
          <div className="absolute left-0 top-0 z-[-1] h-full w-full">
            <Image
              src="/assets/auth-page-images/login-banner.png"
              alt=""
              width={300}
              height={300}
              className="mb-10 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
