import Image from "next/image";

import CalenderIcon from "@/components/icons/CalenderIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import GlassIcon from "@/components/icons/GlassIcon";
import LineChartUpIcon from "@/components/icons/LineChartUpIcon";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CreatePostCard, { type TCreatePostCardProps } from "./CreatePostCard";
import ServiceCard, { type TServiceCardProps } from "./ServiceCard";

const drinkPostersServices: TServiceCardProps[] = [
  {
    title: "Event Campaign",
    description:
      "Create and manage event promotions with the help of AI, from visual design to automated scheduling.",
    icon: <CalenderIcon className="size-7" />,
    iconShapeColor: "purple",
  },
  {
    title: "Drink Campaign",
    description:
      "Promote specialty drinks with AI-generated visual campaigns, complete with copywriting and scheduling.",
    icon: <GlassIcon className="size-7" />,
    iconShapeColor: "blue",
    link: "/en/social/event/drink-campaign",
  },
];

const drinkPosterCreateOptions: TCreatePostCardProps[] = [
  {
    id: crypto.randomUUID(),
    title: "Draft & Scheduled Post",
    description: "View all drafts and continue editing",
    icon: <EditPenIcon className="size-7" />,
    link: "/en/social/drinks/draft-schedule-post",
  },
  {
    id: crypto.randomUUID(),
    title: "Published Post",
    description: "View all published posters and statistics",
    icon: <LineChartUpIcon className="size-7" />,
    link: "/en/social/drinks/published-posts",
  },
];

export interface IDrinkPosterContentProps {
  activeTab?: "eventPoster" | "drinkPoster";
  onTabClick?: (data: IDrinkPosterContentProps["activeTab"]) => void;
  setOpenSocialPlatform?: React.Dispatch<React.SetStateAction<boolean>>;
}

function DrinkPosterContent({
  activeTab = "eventPoster",
  onTabClick,
  setOpenSocialPlatform,
}: IDrinkPosterContentProps) {
  if (activeTab === "eventPoster") {
    return null;
  }

  return (
    <div className="container mt-5 px-6">
      <div className="relative z-0 min-h-[228px] w-full overflow-hidden rounded-2xl">
        <Image
          src="/assets/product-2/view-analytics/banner.svg"
          alt="bg banner"
          width="1072"
          height="228"
          className="!z-[-2] h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <h2 className="text-wrap break-words text-4xl font-semibold leading-[44px] tracking-[-0.72px] text-default-900">
            A.I Generated Campaigns
          </h2>
        </div>
      </div>

      <h3 className="mb-8 mt-16 text-center text-2xl font-semibold leading-10 text-white">
        Services
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        {drinkPostersServices.map((service, index) =>
          service?.link ? (
            <ServiceCard {...service} key={index} />
          ) : (
            <ServiceCard
              key={index}
              {...service}
              onClick={() => setOpenSocialPlatform?.(true)}
            />
          ),
        )}
      </div>

      <div className="mt-14">
        <Tabs
          defaultValue="eventPoster"
          className="w-full"
          value={activeTab}
          onValueChange={onTabClick as (value: string) => void}
        >
          <div className="mb-8 flex w-full items-center justify-between gap-2">
            <h3 className="text-2xl font-semibold leading-8 text-white">
              Create Post
            </h3>

            <div>
              <TabsList className="min-h-9 w-full border border-secondary">
                <TabsTrigger value="eventPoster" className="md:w-[206px]">
                  Event Poster
                </TabsTrigger>
                <TabsTrigger value="drinkPoster" className="md:w-[206px]">
                  Drink Posters
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="drinkPoster">
            <div className="grid gap-6 md:grid-cols-2">
              {drinkPosterCreateOptions?.map((option) => (
                <CreatePostCard key={option.id} {...option} />
              ))}
            </div>

            <div className="mb-10 mt-14 flex justify-center">
              <Button
                color="primary"
                size={"40"}
                className="px-3.5 md:px-3.5 lg:px-3.5"
                onClick={() => setOpenSocialPlatform?.(true)}
              >
                Get Started
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DrinkPosterContent;
