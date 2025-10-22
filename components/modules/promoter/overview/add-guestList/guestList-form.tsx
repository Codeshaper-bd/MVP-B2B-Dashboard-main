"use client";

import PhoneInput from "react-phone-input-2";
import AsyncSelect from "react-select/async";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { useToast } from "@/components/ui/use-toast";

function GuestListForm() {
  const { setClose } = useDialogContext();
  const { toast } = useToast();

  const onSubmit = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Adding Guest",
      description: "Please wait while we add your guest",
    });

    toastId.update({
      id: toastId.id,
      variant: "success",
      title: "Guest added successfully!",
      description: "Jesse Pinkman (10) has been added to the guest list.",
    });
    setClose();
  };

  return (
    <form noValidate onSubmit={onSubmit} className="mt-1 space-y-5">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Enter First Name"
          label="First Name"
          required
        />
        <Input type="text" placeholder="Enter Last Name" label="Last Name" />
      </div>
      <LabelErrorWrapper label={"Phone Number"}>
        <PhoneInput country={"us"} />
      </LabelErrorWrapper>

      <LabelErrorWrapper label="Number of Guests">
        <AsyncSelect
          cacheOptions
          // defaultOptions={defaultOptions}
          // loadOptions={handleLoadOptions({ getAllGuestListOptions })}
          isClearable
          // value={GuestList ?? null}
          placeholder="Select Guestlist Number"
          className="react-select"
          classNamePrefix="select"
          /* onChange={(selected) => {
                        setValue("GuestList", selected);
                      }} */
          formatOptionLabel={(optionsData) => (
            <div className="flex items-center space-x-3">
              Select Guestlist Number
            </div>
          )}
          /* isLoading={
                  getAllGuestListOptionsApiState.isLoading ||
                  getAllGuestListOptionsApiState?.isFetching
                } */
        />
      </LabelErrorWrapper>
      <div className="grid grid-cols-2 gap-3">
        <Button
          fullWidth
          size="lg"
          color="secondary"
          type="button"
          onClick={setClose}
          // disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          size="lg"
          color="primary"
          type="submit"
          // disabled={isSubmitting}
          rounded="lg"
        >
          <ButtonLoadingContent
            // isLoading={isSubmitting}
            isLoading={false}
            actionContent="Add Guestlist"
            loadingContent="Creating"
          />
        </Button>
      </div>
    </form>
  );
}

export default GuestListForm;
