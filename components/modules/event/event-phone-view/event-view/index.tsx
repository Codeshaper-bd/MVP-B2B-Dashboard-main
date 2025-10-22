import ApexBarChart from "@/components/charts/apex-bar-chart";
import BatteryIcon from "@/components/icons/BatteryIcon";
import InternetBarIcon from "@/components/icons/InternetBarIcon";
import PromoIcon from "@/components/icons/PromoIcon";
import WifiIcon from "@/components/icons/WifiIcon";
import GoogleLocationMap from "@/components/maps/GoogleLocationMap";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import type { IEventViewProps } from "..";
import About from "./about";
import ChallengeCard from "./challenge-card";
import Clock from "./clock";
import HeroArea from "./hero-area";
import PromotionCard from "./promotion-card";

function EventView({
  getAnEventData,
  getAnEventApiState,
  isEventCompany,
}: IEventViewProps) {
  const {
    details: { description } = {},
    venue,
    challenges = [],
    promotions = [],
  } = getAnEventData || {};

  return (
    <div className="relative bg-background">
      {/* top bar */}
      <div className="absolute top-0 z-50 flex w-full justify-between px-4 py-2 backdrop-blur-sm">
        <Clock />

        <div className="flex items-center gap-1">
          <InternetBarIcon className="size-4 text-default-1000" />
          <WifiIcon className="size-4 text-default-1000" />
          <BatteryIcon className="size-5 text-default-1000" />
        </div>
      </div>
      <ScrollArea className="h-[820px] bg-background">
        <RenderData
          {...getAnEventApiState}
          expectedDataType="object"
          data={getAnEventData}
        >
          <div className="relative z-10 pb-4">
            <HeroArea getAnEventData={getAnEventData} />

            <div className="space-y-5 rounded-3xl border border-primary/30 px-3.5 py-8">
              <About title="About Event" aboutText={description} />
              <Separator className="my-5" />
              <div>
                <h3 className="mb-3.5 text-lg font-medium text-default-1000">
                  Event Location
                </h3>

                <div className="relative rounded-3xl border-2 border-primary/30">
                  <GoogleLocationMap
                    lat={venue?.latitude ?? 0}
                    lng={venue?.longitude ?? 0}
                  />
                  <div className="absolute bottom-6 left-2.5 z-[9999] flex flex-col rounded-md bg-[#1D1D1D]">
                    <h2 className="inline-block px-2 text-base font-semibold text-[#E0B148]">
                      {venue?.name}
                    </h2>

                    <p className="inline-block px-2 text-xs font-medium text-[#E0B148]">
                      {venue?.address}, {venue?.city}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              {getAnEventData?.details?.isCrowdMeterEnabled && (
                <div>
                  <h3 className="mb-3.5 text-lg font-medium text-default-1000">
                    Crowd Meter
                  </h3>
                  <div className="rounded-lg border border-primary/30">
                    <ApexBarChart
                      series={[
                        {
                          name: "Crowd Meter",
                          data: [
                            5, 10, 70, 30, 50, 60, 20, 80, 90, 40, 100, 120, 30,
                            20, 10, 50, 40, 30,
                          ],
                        },
                      ]}
                      height={180}
                      showYAxis={false}
                      showXAxis={false}
                      colors={["#FFCE62", "#0BA5EC"]}
                    />
                  </div>
                </div>
              )}

              {!isEventCompany && (
                <>
                  <div>
                    <h3 className="mb-3.5 text-lg font-medium text-default-1000">
                      Challenges
                    </h3>
                    <div className="w-[340px]">
                      {challenges.length ? (
                        <Carousel>
                          <CarouselContent>
                            {challenges?.map((challenge, index) => (
                              <CarouselItem key={index}>
                                <ChallengeCard challenge={challenge} />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-1" />
                          <CarouselNext className="end-1" />
                        </Carousel>
                      ) : (
                        <div className="flex h-20 items-center justify-center rounded-lg border border-primary/30">
                          <h2 className="text-base font-medium text-default-1000/80">
                            No Challenges Available
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-3.5 text-lg font-medium text-default-1000">
                      Promotions
                    </h3>

                    <div className="w-[340px]">
                      {promotions.length ? (
                        <Carousel>
                          <CarouselContent>
                            {promotions?.map((promotion, index) => (
                              <CarouselItem key={index}>
                                <PromotionCard promotion={promotion} />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-1" />
                          <CarouselNext className="end-1" />
                        </Carousel>
                      ) : (
                        <div className="flex h-20 items-center justify-center rounded-lg border border-primary/30">
                          <h2 className="text-base font-medium text-default-1000/80">
                            No Promotions Available
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="h-5"></div>
              <Button
                fullWidth
                color="primary"
                size="xl"
                rounded="full"
                variant="outline"
                asChild
                className="h-16 cursor-pointer border-primary/30 shadow-2xl hover:bg-primary/10 hover:text-default-1000"
                disabled
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <PromoIcon className="size-6 text-primary" />
                    <span className="text-[13px] font-semibold text-default-1000">
                      Get Tickets
                    </span>
                  </div>

                  <p className="text-[11px] text-[#DCDCDC]">
                    Starting From $1,100
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </RenderData>
      </ScrollArea>
    </div>
  );
}

export default EventView;
