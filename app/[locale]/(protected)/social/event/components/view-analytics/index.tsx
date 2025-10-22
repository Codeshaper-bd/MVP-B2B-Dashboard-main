"use client";
import { useState } from "react";

import type { ISocialPlatformProps } from "@/app/[locale]/(protected)/social/event/components/social-platform-dialog/social-platform";

import DrinkPosterContent from "./DrinkPosterContent";
import EventPosterContent, {
  type IEventPosterContentProps,
} from "./EventPosterContent";
import ChooseSocialPlatform from "../social-platform-dialog";

function ViewAnalytics() {
  const [activeTab, setActiveTab] =
    useState<IEventPosterContentProps["activeTab"]>("eventPoster");
  const [openSocialPlatform, setOpenSocialPlatform] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<Omit<
    ISocialPlatformProps,
    "selectedId" | "onClick"
  > | null>(null);

  return (
    <div>
      <EventPosterContent
        activeTab={activeTab}
        onTabClick={setActiveTab}
        setOpenSocialPlatform={setOpenSocialPlatform}
      />
      <DrinkPosterContent
        activeTab={activeTab}
        onTabClick={setActiveTab}
        setOpenSocialPlatform={setOpenSocialPlatform}
      />
      <ChooseSocialPlatform
        openSocialPlatform={openSocialPlatform}
        setOpenSocialPlatform={setOpenSocialPlatform}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}

export default ViewAnalytics;
