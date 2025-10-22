import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function InvitationCard() {
  return (
    <Card>
      <CardContent className="relative rounded-md p-0">
        <Image
          src="/assets/all/friend-slide-background.png"
          alt=""
          className="absolute left-0 top-0 h-full w-full rounded-md object-cover"
          width={400}
          height={300}
        />
        <div className="relative px-[22px] py-5">
          <div className="max-w-[147px]">
            <h2 className="mb-2 text-base font-semibold text-default-1000">
              Invite Friends
            </h2>
            <p className="text-xs font-medium text-default-1000">
              Invite 5 friends and get 100 points!
            </p>
            <div className="mt-4">
              <Button
                variant="outline"
                color="primary"
                className="border-default-1000 text-default-1000"
                asChild
              >
                <Link href="#">Invite Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InvitationCard;
