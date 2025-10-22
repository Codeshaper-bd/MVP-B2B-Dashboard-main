import Image from "next/image";

import FbTabIcon from "@/components/icons/FbTabIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function ProfileCard() {
  return (
    <Card>
      <CardHeader className="border-b border-border md:py-3">
        <Logo />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-2">
          <span>Hi</span>
          <Badge className="rounded-sm border-none bg-[#36BFFA4D]/30 text-[#7CD4FD]">
            Recipient Name
          </Badge>
        </div>
        <p className="mb-6 mt-4 text-xs">
          We are excited to invite you to try our newest drink, Inti Sari Red
          Wine, full of flavor and freshness! Below, we have featured a picture
          of the drink and a special offer just for you!
        </p>
        <Image
          src="/assets/all/profile-image.png"
          alt="profile image"
          height={180}
          width={445}
          className="size-full object-cover"
        />
        <Button type="button" color="primary" className="my-6 rounded-lg">
          Buy Now
        </Button>
      </CardContent>
      <CardFooter>
        <div>
          <div className="text-xs text-[#F5F5F6]">
            <p>Thank you for your support!</p>
            <p>
              Best regards, <br /> Fennec Team
            </p>
          </div>
          <div className="mt-9 flex items-center gap-3">
            <div className="flex-1">
              <Logo className="h-[18px]" />
            </div>
            <div className="flex flex-none items-center gap-2">
              <TwitterIcon className="size-3" />
              <InstagramIcon className="size-3" />
              <FbTabIcon className="size-3" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProfileCard;
