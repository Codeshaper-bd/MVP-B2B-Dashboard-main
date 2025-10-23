"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import UploadSingleFile from "@/components/form/upload-single-file";
import FileUploaderLabel from "@/components/form/upload-single-file/uploader-label";
import AiMagicIcon from "@/components/icons/AiMagicIcon";
import { InfoIcon as InfoIcon } from "@/components/icons";
import InfoOvalIcon from "@/components/icons/InfoOvalIcon";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TooltipComponent } from "@/components/ui/tooltip";

import { colorOptions } from "./constants";
import InfoRow from "./InfoRow";
import PreviewList from "./PreviewList";
import useCreateScheduleForm from "./useCreateDrinkForm";

function CreateDrinkForm() {
  const { formProps, onSubmit } = useCreateScheduleForm();
  const {
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = formProps;
  const formFiledValues = watch();

  const fileSelectContent = (
    <UploadSingleFile
      label={
        <div className="flex w-fit items-center gap-1.5">
          Upload Relevant Images (Optional)
          <TooltipComponent
            className="w-full lg:!w-full lg:!max-w-80"
            content={
              <div className="text-start">
                <h6 className="text-xs font-semibold leading-[18px] text-default-1000">
                  What is the Occasion?
                </h6>

                <p className="text-xs font-medium leading-[18px] text-default-700">
                  Please select the occasion of the respective event that best
                  reflects the theme and reason for celebration.
                </p>
              </div>
            }
          >
            <InfoIcon className="size-4 text-default-1000" />
          </TooltipComponent>
        </div>
      }
      fileUploaderLabel={
        <FileUploaderLabel className="h-[calc(100%_-_25px)]" />
      }
      multiple
      files={null}
      setFiles={(files) => {
        setValue("images", files);
      }}
      hidePreviewInside
      middleContent={
        <div>
          {(formFiledValues?.images?.length ?? 0) > 4 && <InfoRow />}

          <PreviewList
            className="mt-3.5"
            data={formFiledValues?.images}
            onRemove={(value) => {
              setValue(
                "images",
                formFiledValues?.images?.filter((v) => {
                  const isIdMatched =
                    !!v.id && !!value?.id && v.id !== value?.id;
                  const isFileMatched =
                    !!v.file && !!value?.file && v.file !== value?.file;

                  return isIdMatched || isFileMatched;
                }),
              );
            }}
          />
        </div>
      }
      error={errors?.images?.message}
    />
  );

  return (
    <div className="w-full">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 lg:px-14">
          <Card>
            <CardHeader>
              <h2 className="mb-1 text-lg font-semibold leading-7 text-default-900">
                Create Drink
              </h2>

              <p className="overflow-hidden text-ellipsis text-sm font-normal leading-5 text-default-600">
                Fill in the essential information about your event.
              </p>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              <div className="space-y-6">
                <Tabs defaultValue="automatic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 border border-secondary">
                    <TabsTrigger
                      className="flex w-full items-center gap-2 text-sm font-semibold leading-5"
                      value="automatic"
                    >
                      Automatic
                      <InfoOvalIcon className="h-[22px] w-5 shrink-0" />
                    </TabsTrigger>

                    <TabsTrigger
                      className="flex w-full items-center gap-2 text-sm font-semibold leading-5"
                      value="manual"
                    >
                      Manual
                      <InfoOvalIcon className="h-[22px] w-5 shrink-0" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="automatic">
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label={
                            <div className="flex w-fit items-center gap-1.5 text-inherit">
                              Name of Drink
                              <TooltipComponent
                                content={
                                  <div className="text-start">
                                    <h6 className="text-xs font-semibold leading-[18px] text-default-1000">
                                      What is the Occasion?
                                    </h6>

                                    <p className="text-xs font-medium leading-[18px] text-default-700">
                                      Please select the occasion of the
                                      respective event that best reflects the
                                      theme and reason for celebration.
                                    </p>
                                  </div>
                                }
                              >
                                <InfoIcon className="size-4 text-default-1000" />
                              </TooltipComponent>
                            </div>
                          }
                          placeholder="Input Name"
                          error={errors?.name?.message}
                        />

                        <SelectInput
                          label={
                            <div className="flex w-fit items-center gap-1.5 text-inherit">
                              Color of Drink
                              <TooltipComponent
                                content={
                                  <div className="text-start">
                                    <h6 className="text-xs font-semibold leading-[18px] text-default-1000">
                                      What is the Occasion?
                                    </h6>

                                    <p className="text-xs font-medium leading-[18px] text-default-700">
                                      Please select the occasion of the
                                      respective event that best reflects the
                                      theme and reason for celebration.
                                    </p>
                                  </div>
                                }
                              >
                                <InfoIcon className="size-4 text-default-1000" />
                              </TooltipComponent>
                            </div>
                          }
                          enableOptionRightIcon
                          placeholder="Select Color"
                          // searchLocation="inside-dropdown"
                          options={colorOptions}
                          onChange={(value) => {
                            setValue("color", String(value?.value) ?? "");
                          }}
                          value={formFiledValues?.color}
                          error={errors?.color?.message}
                        />
                      </div>

                      <Textarea
                        label={
                          <div className="flex w-fit items-center gap-1.5 text-inherit">
                            Describe Drink
                            <TooltipComponent
                              content={
                                <div className="text-start">
                                  <h6 className="text-xs font-semibold leading-[18px] text-default-1000">
                                    What is the Occasion?
                                  </h6>

                                  <p className="text-xs font-medium leading-[18px] text-default-700">
                                    Please select the occasion of the respective
                                    event that best reflects the theme and
                                    reason for celebration.
                                  </p>
                                </div>
                              }
                            >
                              <InfoIcon className="size-4 text-default-1000" />
                            </TooltipComponent>
                          </div>
                        }
                        rows={4}
                        placeholder="Input Description"
                        error={errors?.description?.message}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="manual">
                    <div className="space-y-6">
                      <div
                        className={cn(
                          "grid gap-4 md:grid-cols-2",
                          (formFiledValues?.images?.length ?? 0) > 0 &&
                            "md:grid-cols-1",
                        )}
                      >
                        <Input
                          label={
                            <div className="flex w-fit items-center gap-1.5 text-inherit">
                              Name of Drink
                              <TooltipComponent
                                content={
                                  <div className="text-start">
                                    <h6 className="text-xs font-semibold leading-[18px] text-default-1000">
                                      What is the Occasion?
                                    </h6>

                                    <p className="text-xs font-medium leading-[18px] text-default-700">
                                      Please select the occasion of the
                                      respective event that best reflects the
                                      theme and reason for celebration.
                                    </p>
                                  </div>
                                }
                              >
                                <InfoIcon className="size-4 text-default-1000" />
                              </TooltipComponent>
                            </div>
                          }
                          placeholder="Input Name"
                          error={errors?.name?.message}
                        />

                        <SelectInput
                          label={
                            <div className="flex w-fit items-center gap-1.5 text-inherit">
                              Color of Drink
                              <TooltipComponent
                                content={
                                  <div className="text-start">
                                    <h6 className="text-xs font-semibold leading-[18px] text-default-1000">
                                      What is the Occasion?
                                    </h6>

                                    <p className="text-xs font-medium leading-[18px] text-default-700">
                                      Please select the occasion of the
                                      respective event that best reflects the
                                      theme and reason for celebration.
                                    </p>
                                  </div>
                                }
                              >
                                <InfoIcon className="size-4 text-default-1000" />
                              </TooltipComponent>
                            </div>
                          }
                          enableOptionRightIcon
                          placeholder="Select Color"
                          // searchLocation="inside-dropdown"
                          options={colorOptions}
                          onChange={(value) => {
                            setValue("color", String(value?.value) ?? "");
                          }}
                          value={formFiledValues?.color}
                          error={errors?.color?.message}
                        />

                        {(formFiledValues?.images?.length ?? 0) > 0 ? (
                          <div>{fileSelectContent}</div>
                        ) : (
                          fileSelectContent
                        )}

                        {!((formFiledValues?.images?.length ?? 0) > 0) && (
                          <LabelErrorWrapper
                            label="a"
                            labelClassName="opacity-0"
                            className="h-full"
                          >
                            <Card className="mx-auto w-full rounded-xl p-4">
                              <div className="h-full w-full rounded-[8px] bg-[#161B26] p-4">
                                <div className="relative mx-auto w-full max-w-32">
                                  <Image
                                    src="/assets/product-2/drink-posts/scan-qr-to-import.svg"
                                    alt="scan-qr-to-import"
                                    width={128}
                                    height={128}
                                    className="h-full w-full object-contain"
                                  />
                                </div>
                              </div>

                              <div className="mt-3 flex w-full flex-col items-center gap-1">
                                <h2 className="text-sm font-semibold leading-5 text-default-700">
                                  Scan QR for Import
                                </h2>
                                <p className="text-center text-xs font-normal leading-[18px] text-[#94969C]">
                                  PNG, JPG (max. 800x400px)
                                </p>
                              </div>
                            </Card>
                          </LabelErrorWrapper>
                        )}
                      </div>

                      <Textarea
                        label={
                          <div className="flex w-fit items-center gap-1.5 text-inherit">
                            Describe Drink
                            <TooltipComponent
                              content={
                                <div className="text-start">
                                  <h6 className="text-xs font-semibold leading-[18px] text-default-1000">
                                    What is the Occasion?
                                  </h6>

                                  <p className="text-xs font-medium leading-[18px] text-default-700">
                                    Please select the occasion of the respective
                                    event that best reflects the theme and
                                    reason for celebration.
                                  </p>
                                </div>
                              }
                            >
                              <InfoIcon className="size-4 text-default-1000" />
                            </TooltipComponent>
                          </div>
                        }
                        rows={4}
                        placeholder="Input Description"
                        error={errors?.description?.message}
                      />

                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-normal leading-5 text-[#94969C]">
                          Implies that the AI will help spark creative ideas for
                          the drink description.
                        </p>

                        <Button
                          type="button"
                          color="secondary"
                          className="gap-2 md:px-4"
                        >
                          <AiMagicIcon className="size-4 text-primary" />
                          <span className="text-primary">Write with Magic</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>

            <CardFooter className="flex gap-4">
              <div className="flex-1">
                <p className="text-sm text-default-600">
                  Implies that the AI will help spark creative ideas for the
                  drink description.
                </p>
              </div>

              <Button
                type="button"
                color="secondary"
                className="flex-none gap-2 md:px-4"
              >
                <AiMagicIcon className="size-4 text-primary" />
                <span className="text-primary">Write with Magic</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}

export default CreateDrinkForm;
