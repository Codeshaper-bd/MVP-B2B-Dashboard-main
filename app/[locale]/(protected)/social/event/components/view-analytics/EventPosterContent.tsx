import BackgroundBanner from "@/components/background-banner";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { EditIcon as EditPenIcon } from "@/components/icons";
import GlassIcon from "@/components/icons/GlassIcon";
import LineChartUpIcon from "@/components/icons/LineChartUpIcon";
import NetworkBarIcon from "@/components/icons/NetworkBarIcon";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CreatePostCard, { type TCreatePostCardProps } from "./CreatePostCard";
import ServiceCard, { type TServiceCardProps } from "./ServiceCard";

const eventPostersServices: TServiceCardProps[] = [
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
  {
    title: "Analytics",
    description:
      "Track campaign performance with key metrics, data visualizations, and deep insights for better decisions.",
    icon: <NetworkBarIcon className="size-7" />,
    iconShapeColor: "green",
    link: "#",
  },
];

const eventPosterCreateOptions: TCreatePostCardProps[] = [
  {
    id: crypto.randomUUID(),
    title: "Draft & Scheduled Post",
    description: "View all drafts and continue editing",
    icon: <EditPenIcon className="size-7" />,
    link: "/en/social/event/draft-schedule-post",
  },
  {
    id: crypto.randomUUID(),
    title: "Published Post",
    description: "View all published posters and statistics",
    icon: <LineChartUpIcon className="size-7" />,
    link: "/en/social/event/published-posts",
  },
];

export interface IEventPosterContentProps {
  activeTab?: "eventPoster" | "drinkPoster";
  onTabClick?: (data: IEventPosterContentProps["activeTab"]) => void;
  setOpenSocialPlatform?: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventPosterContent({
  activeTab = "eventPoster",
  onTabClick,
  setOpenSocialPlatform,
}: IEventPosterContentProps) {
  if (activeTab === "drinkPoster") {
    return null;
  }

  return (
    <div className="container mt-5 px-6">
      <BackgroundBanner
        image="/assets/product-2/view-analytics/banner.svg"
        title="  A.I Generated Campaigns"
      />

      <div className="mb-8 mt-16 flex w-full items-center justify-between gap-2">
        <h3 className="text-2xl font-semibold leading-10 text-white">
          Services
        </h3>

        <Button
          color="primary"
          size={"40"}
          className="px-3.5 md:px-3.5 lg:px-3.5"
          onClick={() => setOpenSocialPlatform?.(true)}
        >
          Get Started
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {eventPostersServices.map((service, index) =>
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

          <TabsContent value="eventPoster">
            <div className="grid gap-6 md:grid-cols-2">
              {eventPosterCreateOptions.map((option) => (
                <CreatePostCard key={option.id} {...option} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EventPosterContent;
