import { ArrowLeft, Mail } from "lucide-react";

import { Link } from "@/i18n/routing";
import { getParsedValues } from "@/lib/get-parsed-value";
import { getSeoMeta } from "@/lib/get-seo-meta";
import OtpVerification from "@/components/partials/auth/otp-verification";

export const metadata = getSeoMeta({ title: "OTP Verification" });

interface IOtpVerificationPageProps {
  params: { locale: string };
  searchParams: { phone?: string; email?: string };
}

function OtpVerificationPage({ searchParams }: IOtpVerificationPageProps) {
  const { email, phone } =
    getParsedValues<IOtpVerificationPageProps["searchParams"]>(searchParams);
  const otpSentTo = email || phone;
  const otpType = email ? "email" : phone ? "phone" : "phone or email";

  return (
    <div className="flex h-dvh min-h-dvh w-full basis-full items-center overflow-hidden">
      <div className="flex h-dvh w-full flex-wrap">
        <div className="relative flex-1 bg-background dark:bg-default-100">
          <div className="flex h-full flex-col">
            <div className="z-10 mx-auto mb-3 mt-16 flex w-full max-w-[524px] flex-col justify-center p-7 text-2xl text-default-900 md:px-[42px] md:py-[44px]">
              <div className="mb-6 hidden items-center justify-center text-center md:flex">
                <Mail
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
                  Check your {otpType}
                </h4>
                <div className="text-base text-default-600">
                  We&apos;ve sent a code to{" "}
                  <span className="text-default-700">{otpSentTo}</span>
                </div>
              </div>

              <OtpVerification />

              <div className="mt-10 flex items-center justify-center space-x-1 text-sm font-medium text-default-600">
                <span>Didn&apos;t get a code?</span>
                <Link href="/" className="cursor-pointer text-default-700">
                  Click to resend
                </Link>
              </div>

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

export default OtpVerificationPage;
