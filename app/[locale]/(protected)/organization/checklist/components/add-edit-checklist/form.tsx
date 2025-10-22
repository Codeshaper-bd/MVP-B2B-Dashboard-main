import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import InfoIcon from "@/components/icons/InfoIcon";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useChecklistForm from "./useChecklistForm";

const options = [
  {
    label: "Binary  Value",
    value: "spent",
  },
  {
    label: "Dynamic Value",
    value: "invite_friend",
  },
];

function Form() {
  const { setClose } = useDialogContext();
  const {
    formProps: {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      watch,
    },
    onSubmit,
  } = useChecklistForm();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Input
          label="Task Name"
          placeholder="Enter Checklist Name"
          {...register("taskName")}
          error={errors?.taskName?.message}
        />

        <div>
          <Label htmlFor="variableName">
            Variable Name
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="-mb-1 ms-1 size-4" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[320px] text-start">
                  <p>
                    The Variable Name uniquely identifies this checklist task.
                    Make sure the name is descriptive and relevant to the task.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="variableName"
            placeholder="Enter variable name"
            {...register("variableName")}
            error={errors?.variableName?.message}
          />
        </div>

        <div>
          <Label htmlFor="variableName">
            Response Type
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="-mb-1 ms-1 size-4" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[320px] text-start">
                  <div>
                    <h3 className="mb-4 text-xs font-medium text-default-700">
                      Select the appropriate response type:
                    </h3>
                    <ul className="list-disc space-y-1 px-4">
                      <li>
                        <strong className="text-xs font-semibold text-default-1000">
                          Binary Value:
                        </strong>
                        <span className="text-xs font-medium text-default-700">
                          Yes or No answers
                        </span>
                      </li>
                      <li>
                        <strong className="text-xs font-semibold text-default-1000">
                          Dynamic Value:
                        </strong>
                        <span className="text-xs font-medium text-default-700">
                          Input for numbers or other values.
                        </span>
                      </li>
                      <li>
                        <strong className="text-xs font-semibold text-default-1000">
                          Text:
                        </strong>
                        <span className="text-xs font-medium text-default-700">
                          Provide descriptive answers in text form.
                        </span>
                      </li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <SelectInput
            placeholder="Select response type"
            value={watch("responseTime")}
            options={options}
            onChange={(value) => {
              setValue("responseTime", value?.value);
            }}
            error={errors?.responseTime?.message}
          />
        </div>

        <Textarea
          label="Description"
          placeholder="Enter description"
          {...register("descriptions")}
          error={errors?.descriptions?.message}
        />

        <div className="grid grid-cols-2 gap-6">
          <Button type="button" color="secondary" fullWidth onClick={setClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" fullWidth>
            Add Checklist
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
