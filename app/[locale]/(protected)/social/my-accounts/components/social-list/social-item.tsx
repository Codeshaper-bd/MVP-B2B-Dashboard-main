import Image from "next/image";
import React from "react";

import AttachSocialDialog from "@/app/[locale]/(protected)/social/my-accounts/components/modals/attach-social-dialog";
import { Card, CardContent } from "@/components/ui/card";

import type { TSocialItem } from "./index";

function SocialItem({ id, image, name, descriptions }: TSocialItem) {
  return (
    <Card>
      <CardContent className="px-5 py-4">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-4">
            <Image
              src={image}
              alt=""
              width={60}
              height={60}
              className="size-12"
            />
            <div>
              <h3 className="text-base font-semibold text-default-1000">
                {name}
              </h3>
              <p className="text-sm text-default-700">{descriptions}</p>
            </div>
          </div>
          <div className="flex-none">
            <AttachSocialDialog />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialItem;
