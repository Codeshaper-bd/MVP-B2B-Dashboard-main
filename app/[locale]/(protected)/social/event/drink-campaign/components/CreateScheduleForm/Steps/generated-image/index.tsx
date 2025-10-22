import AiMagicIcon from "@/components/icons/AiMagicIcon";
import DoubleStarIcon from "@/components/icons/DoubleStarIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import RefreshIcon from "@/components/icons/RefreshIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TooltipComponent } from "@/components/ui/tooltip";

import GeneratedImage from "./GeneratedImage";

const aiGeneratedImages: { id?: string | number; src?: string | null }[] = [
  {
    id: crypto.randomUUID(),
    src: "/assets/product-2/ai-generated-campaigns/generated-image.svg",
  },
  {
    id: crypto.randomUUID(),
    src: "/assets/product-2/ai-generated-campaigns/generated-image.svg",
  },
  {
    id: crypto.randomUUID(),
    src: "/assets/product-2/ai-generated-campaigns/generated-image.svg",
  },
  {
    id: crypto.randomUUID(),
    src: "/assets/product-2/ai-generated-campaigns/generated-image.svg",
  },
  {
    id: crypto.randomUUID(),
    src: "/assets/product-2/ai-generated-campaigns/generated-image.svg",
  },
  {
    id: crypto.randomUUID(),
    src: "/assets/product-2/ai-generated-campaigns/generated-image.svg",
  },
];

function GeneratedImagesStep() {
  // const {
  //   register,
  //   formState: { errors },
  //   control,
  //   setValue,
  //   watch,
  //   trigger,
  // } = useFormContext<TInitialState>();

  // const generatedImages = watch("generatedImages");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative">
          <Textarea
            placeholder="Describe Your Background Image"
            className="min-h-[144px]"
          />
          <Button
            type="button"
            className="absolute bottom-3 right-3.5 min-h-11 gap-2 !bg-gradient-to-tr from-[#FF44EC] to-[#FFC833] text-default"
          >
            <DoubleStarIcon className="size-6" />
            Generate
          </Button>
        </div>

        <div className="mt-5 flex w-full items-center justify-between">
          <div>
            <h2 className="mb-1 text-lg font-semibold leading-7 text-default-900">
              Describe Your Event
            </h2>

            <p className="overflow-hidden text-ellipsis text-sm font-normal leading-5 text-default-600">
              Fill in the essential information about your event.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              size={"44"}
              color="secondary"
              className="gap-2 md:px-4"
            >
              <RefreshIcon className="size-5 text-primary" />
              <span className="text-primary">Regenerate All</span>
            </Button>

            <div className="flex items-center gap-2 px-4 py-2.5">
              <Checkbox
                color="success"
                id="select-all-ai-generated-image"
                className="cursor-pointer"
                // onChange={() => {
                //   if (
                //     generatedImages?.generatedImages?.length ===
                //     aiGeneratedImages.length
                //   ) {
                //     setValue("generatedImages.generatedImages", []);
                //   } else {
                //     setValue(
                //       "generatedImages.generatedImages",
                //       aiGeneratedImages,
                //     );
                //   }
                // }}
                // checked={
                //   generatedImages?.generatedImages?.length ===
                //   aiGeneratedImages.length
                // }
              />

              <label
                htmlFor="select-all-ai-generated-image"
                className="cursor-pointer text-base font-semibold leading-6 text-default-600"
              >
                Select All
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiGeneratedImages?.map((image, index) => (
            <GeneratedImage
              key={index}
              src={image?.src}
              // onSelect={() => {
              //   const isFound = generatedImages?.generatedImages?.find(
              //     (item) => item.id === image.id,
              //   );

              //   if (isFound) {
              //     setValue("generatedImages.generatedImages", [
              //       ...(generatedImages?.generatedImages?.filter(
              //         (item) => item.id !== image.id,
              //       ) ?? []),
              //     ]);
              //   } else {
              //     setValue("generatedImages.generatedImages", [
              //       ...(generatedImages?.generatedImages ?? []),
              //       image,
              //     ]);
              //   }
              // }}
              // isSelected={Boolean(
              //   generatedImages?.generatedImages?.find(
              //     (item) => item.id === image.id,
              //   ),
              // )}
            />
          ))}
        </div>

        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <Textarea
              label={
                <div className="flex w-fit items-center gap-1.5 text-inherit">
                  Generated Captions
                  <TooltipComponent
                    content={
                      <div className="text-start">
                        <h6 className="text-xs font-semibold leading-[18px] text-white">
                          What is the Occasion?
                        </h6>

                        <p className="text-xs font-medium leading-[18px] text-default-700">
                          Please select the occasion of the respective event
                          that best reflects the theme and reason for
                          celebration.
                        </p>
                      </div>
                    }
                  >
                    <InfoIcon className="size-4 text-white" />
                  </TooltipComponent>
                </div>
              }
              placeholder="Input Description"
              // {...register("describeYourEvent.description")}
              // error={errors?.describeYourEvent?.description?.message}
            />

            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-normal leading-5 text-default-600">
                Implies that the AI will help spark creative ideas for the event
                caption.
              </p>

              <Button type="button" color="secondary" className="gap-2 md:px-4">
                <AiMagicIcon className="size-4 text-primary" />
                <span className="text-primary">Write with Magic</span>
              </Button>
            </div>
          </div>

          <div className="flex w-full items-center gap-3">
            <Input
              type="text"
              containerClassName="flex-grow"
              label={
                <div className="flex w-fit items-center gap-1.5 text-inherit">
                  Hashtags
                  <TooltipComponent
                    content={
                      <div className="text-start">
                        <h6 className="text-xs font-semibold leading-[18px] text-white">
                          What is the Occasion?
                        </h6>

                        <p className="text-xs font-medium leading-[18px] text-default-700">
                          Please select the occasion of the respective event
                          that best reflects the theme and reason for
                          celebration.
                        </p>
                      </div>
                    }
                  >
                    <InfoIcon className="size-4 text-white" />
                  </TooltipComponent>
                </div>
              }
              placeholder="Input Description"
              // {...register("describeYourEvent.description")}
              // error={errors?.describeYourEvent?.description?.message}
            />

            <Button
              type="button"
              color="secondary"
              className="mt-6 min-h-11 gap-2 md:px-4"
            >
              <AiMagicIcon className="size-4 text-primary" />
              <span className="text-primary">AI Generation</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GeneratedImagesStep;
