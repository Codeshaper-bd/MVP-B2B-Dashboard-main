import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { ClockIcon as ClockIcon } from "@/components/icons";
import CommentIcon from "@/components/icons/CommentIcon";
import CopyIcon from "@/components/icons/CopyIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import PageHeader from "@/components/partials/header/page-header";
import SelectInput from "@/components/SelectInput";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import InfoCard from "./components/InfoCard";
import InsightGraph from "./components/InsightGraph";

function PostAnalyticPage() {
  return (
    <div>
      <PageHeader title="A.I Generated Campaigns" description="By Fennec AI" />

      <DynamicBreadcrumb />

      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6 lg:flex-[65%]">
          <Card className="space-y-6 p-6">
            <div>
              <h2 className="mb-1 text-lg font-semibold leading-7 text-[#F5F5F6]">
                Posted
              </h2>
              <p className="overflow-hidden text-ellipsis text-sm font-normal leading-5 text-[#94969C]">
                Fill in the essential information about your event.
              </p>
            </div>

            <Input
              label="Link to Post"
              placeholder="https://www.instagram.com/p/linkExample/"
              leftContent={<LinkIcon className="size-4 text-default-600" />}
              rightContent={
                <CopyIcon className="size-4 cursor-pointer text-default-600" />
              }
            />

            <div className="grid gap-3 md:grid-cols-2">
              <Input
                label="Link to Post"
                placeholder="10 November 2024"
                leftContent={
                  <CalenderIcon className="size-4 text-default-600" />
                }
                rightContent={
                  <CopyIcon className="size-4 cursor-pointer text-default-600" />
                }
                className="bg-default-50"
              />

              <SelectInput
                label="Time Posted"
                placeholder="PST UTC-08:00"
                leftContent={<ClockIcon className="size-4 text-default-600" />}
                // searchLocation="inside-trigger"
                className="bg-default-50"
              />
            </div>
          </Card>

          <Card className="space-y-6 p-6">
            <div>
              <h2 className="mb-1 text-lg font-semibold leading-7 text-[#F5F5F6]">
                Post Analytics
              </h2>

              <p className="overflow-hidden text-ellipsis text-sm font-normal leading-5 text-[#94969C]">
                Fill in the essential information about your event.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <InfoCard
                icon={<EyeIcon className="size-3.5" />}
                iconBgColor="blue"
                label={"View"}
                value={2000}
                progress={100}
              />

              <InfoCard
                icon={<HeartIcon className="size-3.5" />}
                iconBgColor="purple"
                label={"Like"}
                value={2000}
                progress={-100}
              />

              <InfoCard
                icon={<CommentIcon className="size-3.5" />}
                iconBgColor="yellow"
                label={"Comment"}
                value={2000}
                progress={0}
              />
            </div>

            <Card className="p-6">
              <InsightGraph />
            </Card>
          </Card>
        </div>

        <div className="flex-1 lg:flex-[35%]">
          {/* <InstagramPostCard /> */}
        </div>
      </div>
    </div>
  );
}

export default PostAnalyticPage;
