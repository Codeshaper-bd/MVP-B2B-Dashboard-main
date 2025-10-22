import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface IComingSoonProps {
  className?: string;
  image?: string;
  title?: string;
}
function ComingSoon({ className, image, title }: IComingSoonProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent
        className={cn(
          "shadow-glow relative flex h-screen items-center justify-center overflow-hidden rounded-[12px] border border-default-100 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(73,73,73,0.4)] bg-cover bg-center p-6 text-lg font-semibold text-default-900 shadow-inner shadow-default-200 backdrop-blur-[40px] lg:h-[723px]",
          className,
        )}
      >
        <div className="absolute left-0 top-0 h-full w-full blur-[25px]">
          <div className="h-full border-[10px] border-r-[1px] border-default-500 p-12">
            <div className="ms-2 mt-5 space-y-10">
              <div className="flex justify-between">
                <span>This is dummy text</span>
                <span className="-me-16">This is dummy text</span>
              </div>
              <p className="ms-10">This is dummy text This is dummy text</p>
              <p className="ms-10">This is dummy text This is dummy text</p>
              <p className="ms-10">This is dummy text This is dummy text</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full flex-col items-center justify-center bg-transparent lg:w-[400px]">
          <Image
            src={image || "/images/all-img/commingsoon.png"}
            alt="coming soon image"
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
          <h2 className="-mt-8 text-3xl font-semibold text-default-900">
            {title || "COMING SOON"}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}

export default ComingSoon;
