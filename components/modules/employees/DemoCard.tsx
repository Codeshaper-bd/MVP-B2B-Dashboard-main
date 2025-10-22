"use client";
import Image from "next/image";
import { useState } from "react";

import LockLockedIcon from "@/components/icons/LockLockedIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { Card, CardContent } from "@/components/ui/card";

interface IDemoCardProps {
  name: string;
  userCount: number | string;
  isComingSoon?: boolean;
}

function DemoCard({ name: role, userCount, isComingSoon }: IDemoCardProps) {
  const [isSettingComingSoon, setIsSettingComingSoon] = useState(false);
  return (
    <Card className="group relative cursor-pointer border-none bg-secondary p-0">
      <CardContent className="p-3">
        <div className="relative">
          <Image
            src={"/images/organization/roles-bg-1.png"}
            alt={role || ""}
            width={400}
            height={400}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {(isComingSoon || isSettingComingSoon) && (
            <div className="absolute start-0 top-0 grid size-full place-content-center bg-[#161B26]/60">
              <div className="flex flex-col items-center gap-2 text-center">
                <LockLockedIcon className="size-8 text-default-700" />
                <h4 className="text-base font-semibold text-default-1000">
                  Coming Soon
                </h4>
              </div>
            </div>
          )}
          <div className="absolute start-0 top-0 size-full">
            <div className="flex h-full flex-col justify-between px-4 py-5">
              <div>
                <h2 className="mb-2 text-xs font-medium uppercase text-default">
                  Role:
                </h2>
                <p className="text-lg font-medium capitalize text-default">
                  {role}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase text-default">
                  Total Employee :
                </h3>
                <div className="flex items-center gap-1">
                  <UsersIcon className="me-1.5 h-5 w-5 text-default" />
                  <span className="text-lg font-medium text-default">
                    {userCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      {/* <div className="absolute start-0 top-full z-50 hidden w-full rounded-b-md border border-t-0 border-default-100 bg-secondary pb-4 group-hover:block">
        <div className="flex items-center justify-end px-2 pt-2">
           <Button type="button" size="icon" color="primary">
            <DeleteIcon className="size-4" />
          </Button> 
          <Button
            type="button"
            color="secondary"
            className="bg-transparent md:px-5"
            onMouseEnter={() => setIsSettingComingSoon(true)}
            onMouseLeave={() => setIsSettingComingSoon(false)}
          >
            <SettingsIcon className="me-2 size-5 text-default-700" />
            <span>Settings</span>
          </Button>
        </div>
      </div> */}
    </Card>
  );
}

export default DemoCard;
