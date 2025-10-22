import CustomRadioGroup from "@/components/CustomRadioGroup";
import EmailColoredIcon from "@/components/icons/EmailColoredIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import ProfileCard from "./profile-card";

function PreviewStep() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8">
        <Card className="space-y-6 p-6">
          <div>
            <h2 className="mb-1 text-lg font-semibold leading-7 text-default-900">
              Preview
            </h2>
            <p className="overflow-hidden text-ellipsis text-sm font-normal not-italic leading-5 text-[#94969C]">
              Fill in the essential information about your event.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              color="secondary"
              className="rounded-full border-none bg-[#161B26]"
            >
              <EmailColoredIcon className="me-2 size-4" />
              aetherneilsen@gmail.com
            </Button>

            <Button color="secondary" className="gap-1.5">
              <LogoutIcon className="size-4 text-default-700" />
              Log Out
            </Button>
          </div>

          <div>
            <CustomRadioGroup
              className="gap-4"
              options={[
                {
                  label: "Post Now",
                  value: "post-now",
                },
                {
                  label: "Schedule Post",
                  value: "schedule-post",
                },
              ]}
            />
          </div>

          <div>
            <Input
              label="Name"
              placeholder="Input Name"
              // {...register("review.name")}
              // error={errors?.review?.name?.message}
            />
          </div>
        </Card>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <ProfileCard />
      </div>
    </div>
  );
}

export default PreviewStep;
