import Image from "next/image";

import BookMarkIcon from "@/components/icons/BookMarkIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import SendIcon from "@/components/icons/SendIcon";
import VerticalSettingsIcon from "@/components/icons/VerticalSettingsIcon";
import { Card } from "@/components/ui/card";

function InstagramPostCard() {
  return (
    <Card className="flex max-h-full w-full max-w-[482px] flex-col items-center overflow-hidden rounded-xl">
      <div className="flex h-fit w-full items-center justify-between gap-2 px-4 py-[15px]">
        <div className="flex items-center gap-2.5">
          <Image
            src={"/assets/product-2/instagram/profile-logo.svg"}
            alt="Instagram Profile Logo"
            width={60}
            height={60}
            className="size-[53px] shrink-0 rounded-full"
          />

          <h3 className="text-xl font-normal text-[#CECECE]">My Account</h3>
        </div>

        <VerticalSettingsIcon className="size-6 cursor-pointer text-[#CECECE]" />
      </div>

      <Image
        src={"/assets/product-2/instagram/post-image.svg"}
        alt="Instagram Post Image"
        width={482}
        height={482}
        className="aspect-square h-full max-h-[482px] w-full max-w-[482px]"
      />

      <div className="w-full space-y-2.5 px-4 py-[17px]">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HeartIcon className="size-6 cursor-pointer text-[#CECECE]" />
            <ChatIcon className="size-6 cursor-pointer text-[#CECECE]" />
            <SendIcon className="size-6 cursor-pointer text-[#CECECE]" />
          </div>

          <BookMarkIcon className="size-6 cursor-pointer text-[#CECECE]" />
        </div>

        <div className="text-sm font-normal text-[#CECECE]">
          <p>
            <span className="font-bold">My Account</span> Purple squirrels often
            skateboard on the moon while
          </p>
          <p>playing saxophones made of cheese.🛹</p>

          <p>#squirrel #skateboard #moon</p>
        </div>
      </div>
    </Card>
  );
}

export default InstagramPostCard;
