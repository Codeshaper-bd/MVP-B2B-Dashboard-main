"use client";

import { Close } from "@radix-ui/react-dialog";

import XIcon from "@/components/icons/X";
import { useRouter } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SocialPlatform, { type ISocialPlatformProps } from "./social-platform";

const socialPlatforms: Omit<ISocialPlatformProps, "onClick" | "selectedId">[] =
  [
    {
      id: 1,
      name: "instagram",
      image: "/assets/social-svg/insta.svg",
      isComingSoon: false,
    },
    {
      id: 2,
      name: "twitter",
      image: "/assets/social-svg/socileIcon/email.svg",
      isComingSoon: true,
    },
    {
      id: 3,
      name: "facebook",
      image: "/assets/social-svg/socileIcon/facebook.svg",
      isComingSoon: true,
    },
    {
      id: 4,
      name: "linkedIn",
      image: "/assets/social-svg/socileIcon/file.svg",
      isComingSoon: true,
    },
  ];

export interface IChooseSocialPlatformProps {
  openSocialPlatform: boolean;
  setOpenSocialPlatform: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: Omit<ISocialPlatformProps, "onClick" | "selectedId"> | null;
  setSelectedId: React.Dispatch<
    React.SetStateAction<Omit<
      ISocialPlatformProps,
      "onClick" | "selectedId"
    > | null>
  >;
}

function ChooseSocialPlatform({
  openSocialPlatform,
  setOpenSocialPlatform,
  selectedId,
  setSelectedId,
}: IChooseSocialPlatformProps) {
  const router = useRouter();
  return (
    <div>
      <Dialog open={openSocialPlatform} onOpenChange={setOpenSocialPlatform}>
        <DialogContent hideInternalClose>
          <DialogHeader className="">
            <DialogTitle className="px-6 pb-5 pt-6 text-[18px]">
              Select Outreach
            </DialogTitle>
            <Close className="absolute right-7 top-6 rounded-sm bg-default opacity-70">
              <XIcon className="h-[14px] w-[14px] hover:text-destructive" />
              <span className="sr-only">Close</span>
            </Close>
          </DialogHeader>
          <hr />
          <div className="grid grid-cols-2 gap-4 p-6">
            {socialPlatforms.map((platform) => (
              <SocialPlatform
                {...platform}
                key={platform.id}
                onClick={setSelectedId}
                selectedId={selectedId?.id}
              />
            ))}
          </div>
          <div className="flex justify-center p-4">
            <Button
              className="w-full px-6 py-2"
              color="primary"
              disabled={!selectedId?.name}
              onClick={() => router.push(`./event/${selectedId?.name}`)}
            >
              Next {selectedId?.name}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChooseSocialPlatform;
