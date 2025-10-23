"use client";
import { Controller } from "react-hook-form";
import { type GroupBase, type OptionProps, components } from "react-select";
import CreatableSelect from "react-select/creatable";

import { disablePastDates } from "@/lib/date-time/disabled-dates";
import {
  convertLocalToUTC,
  convertUTCToLocal,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import CustomizedDialog from "@/components/CustomizedDialog";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import HistoryIcon from "@/components/icons/historyIcon";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import useCreateTodo from "./useCreateTodo";

function CustomOption(
  props: OptionProps<IOption, true, GroupBase<IOption>>,
): React.ReactElement {
  const { label } = props.data;
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2.5 py-1 capitalize">
        <HistoryIcon className="relative top-px h-[18px] w-[18px] text-default-600" />
        <span className="text-sm font-medium leading-none text-default-900">
          {label}
        </span>
      </div>
    </components.Option>
  );
}

function CreateTodoForm() {
  const {
    createTodoFormProps,
    onSubmit,
    tagOptions,
    tags,
    priority,
    getAllTodoTagsApiState,
    // addANewTodoTag,
  } = useCreateTodo();
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = createTodoFormProps;

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="space-y-4">
        <Input
          label="Title"
          required
          placeholder="Enter Title"
          {...register("title")}
          error={errors?.title?.message}
          className="h-11"
        />

        <Textarea
          label="Description"
          placeholder="Enter Description"
          {...register("description")}
          error={errors?.description?.message}
          rows={5}
        />

        {/* Removed Recurring and Period fields */}

        <LabelErrorWrapper label="Tags" error={errors?.tags?.message}>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                isMulti
                options={tagOptions}
                className="react-select"
                classNamePrefix="select"
                placeholder="Enter tags"
                components={{ Option: CustomOption }}
                isLoading={
                  getAllTodoTagsApiState.isLoading ||
                  getAllTodoTagsApiState.isFetching
                }
              />
            )}
          />
        </LabelErrorWrapper>

        <LabelErrorWrapper error={errors?.priority?.message}>
          <div className="flex items-center gap-2">
            <Switch
              color={"success"}
              onCheckedChange={(checked) => {
                setValue("priority", checked);
              }}
              checked={priority}
              id="priority"
            />
            <Label htmlFor="priority" className="!mb-0">
              Priority
            </Label>
          </div>
        </LabelErrorWrapper>

        <LabelErrorWrapper label="Due Date" error={errors?.dueDate?.message}>
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                color="secondary"
                fullWidth
                className="justify-start text-default-500 md:px-3.5"
                size={"lg"}
              >
                <CalenderIcon className="me-2 h-4 w-4 text-default-500" />
                {watch("dueDate") ? (
                  convertUTCToLocal({
                    utcDateTime: `${watch("dueDate")}`,
                    format: "MMM DD, YYYY",
                  })
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <Calendar
                    mode="single"
                    selected={convertUTCToLocalDate({
                      utcDateTime: `${field.value}`,
                    })}
                    onSelect={(date) => {
                      const convertedDate = date
                        ? convertLocalToUTC({
                            localDateTime: date,
                            type: "endOfDay",
                          })
                        : undefined;
                      field.onChange(convertedDate);
                    }}
                    disabled={disablePastDates}
                  />
                )}
              />
            </PopoverContent>
          </Popover>
        </LabelErrorWrapper>

        <CustomizedDialog.Buttons className="grid grid-cols-2 gap-4 pt-4">
          <CustomizedDialog.Buttons.SecondaryButton
            disableInternallyClose
            onClick={(_, { setClose }) => {
              setClose();
            }}
            size="lg"
            disabled={isSubmitting}
          >
            Cancel
          </CustomizedDialog.Buttons.SecondaryButton>

          <CustomizedDialog.Buttons.PrimaryButton
            type="submit"
            size="lg"
            disabled={isSubmitting}
          >
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent="Create"
            />
          </CustomizedDialog.Buttons.PrimaryButton>
        </CustomizedDialog.Buttons>
      </div>
    </form>
  );
}

export default CreateTodoForm;
