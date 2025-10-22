"use client";
import Lottie from "lottie-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import lottieAnimationForFennec from "@/public/animation/lottieAnimationForFennec.json";

function AuthBackground({
  children,
  title,
  description,
  className,
  formCardWrapperClassName,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  formCardWrapperClassName?: string;
}) {
  const clientEnv = {
    NEXT_PUBLIC_NODE_ENV: process.env["NEXT_PUBLIC_NODE_ENV"],
    API_BASE_URL: process.env["NEXT_PUBLIC_API_BASE_URL"],
    firebase: {
      FIREBASE_API_KEY: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
      FIREBASE_AUTH_DOMAIN: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
      FIREBASE_DATABASE_URL: process.env["NEXT_PUBLIC_FIREBASE_DATABASE_URL"],
      FIREBASE_PROJECT_ID: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
      FIREBASE_STORAGE_BUCKET:
        process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
      FIREBASE_MESSAGING_SENDER_ID:
        process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
      FIREBASE_APP_ID: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
      FIREBASE_MEASUREMENT_ID:
        process.env["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"],
    },
    SITE_URL: process.env["NEXT_PUBLIC_SITE_URL"],
    GOOGLE_MAP_API_KEY:
      process.env["NEXT_PUBLIC_GOOGLE_MAP_API_KEY"] ||
      "AIzaSyAeawqzVqzLkwy_aaWUTwkwd21psfUqczo",
  } as const;
  console.log("clientEnv", clientEnv);
  return (
    <div
      className={cn(
        "relative flex h-screen w-screen items-center justify-center overflow-hidden overflow-y-scroll bg-[#0c111d] bg-cover bg-center py-6",
        className,
      )}
    >
      <>
        <Lottie
          className="absolute left-1/2 top-1/2 max-h-[88px] w-[80%] -translate-x-[52%] -translate-y-1/2 backdrop-blur-2xl md:max-h-[135px] lg:max-h-[205px]"
          style={{ zIndex: 1 }}
          width={1920}
          height={205}
          animationData={lottieAnimationForFennec}
          loop={true}
        />
        <Lottie
          className="absolute left-[53.1%] top-[56%] max-h-[88px] w-[80%] -translate-x-[52%] -translate-y-1/2 rotate-180 md:max-h-[135px] lg:max-h-[205px]"
          style={{ zIndex: 1 }}
          width={1920}
          height={205}
          animationData={lottieAnimationForFennec}
          loop={true}
        />

        <div className="auth-bg-glow" />
        <div className="absolute left-0 top-0 z-10 h-full w-[30%] rounded-xl bg-[#0c111d] backdrop-blur-3xl [-webkit-mask-image:linear-gradient(to_right,white,transparent)] [mask-image:linear-gradient(to_right,white,transparent)] [@supports(backdrop-filter:blur(0))]:[-webkit-backdrop-filter:blur(40px)]" />
        <div className="absolute right-0 top-0 z-10 h-full w-[30%] rounded-xl bg-[#0c111d] backdrop-blur-3xl [-webkit-mask-image:linear-gradient(to_left,white,transparent)] [mask-image:linear-gradient(to_left,white,transparent)] [@supports(backdrop-filter:blur(0))]:[-webkit-backdrop-filter:blur(40px)]" />
      </>
      <div
        className={cn(
          "animated-border supports-blur relative z-10 h-auto w-[90%] rounded-[24px] p-7 shadow-[inset_2.13px_4.26px_17.04px_0px_rgba(248,248,248,0.06),_0px_25.56px_25.56px_-17.04px_rgba(5,5,5,0.09),_0px_6.39px_13.85px_0px_rgba(5,5,5,0.10),_0px_6.39px_4.26px_-4.26px_rgba(5,5,5,0.10),_0px_5.33px_1.6px_-4.26px_rgba(5,5,5,0.25)]",
          "md:w-[384px] md:rounded-[34px] md:p-[38px]",
          "lg:w-[435px] lg:p-[42px]",
          formCardWrapperClassName,
        )}
      >
        <div className="flex flex-col items-center gap-[18px] md:gap-[26px]">
          <div className="size-16">
            <Image
              width={100}
              height={100}
              alt="fennec logo"
              src="/images/logo/fennec-login-logo.png"
              className="size-full object-contain"
              style={{
                backgroundColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitBackdropFilter: "none",
              }}
            />
          </div>

          <Image
            alt="fennec business logo"
            width={172}
            height={60}
            src="/images/logo/fennec_business_logo.png"
          />
          {title && (
            <h3 className="text-center text-2xl font-semibold text-white/95 md:text-[32px] lg:text-4xl">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-[F8F8F8]/50 text-center text-base font-medium">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthBackground;
