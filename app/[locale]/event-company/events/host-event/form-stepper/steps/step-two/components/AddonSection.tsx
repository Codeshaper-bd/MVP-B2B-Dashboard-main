import { memo, useCallback, useState } from "react";
import {
  useFormContext,
  useWatch,
  type UseFormSetValue,
} from "react-hook-form";

import useBooleanState from "@/hooks/useBooleanState";
import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import AddonsList from "@/components/modules/addon/addons-list";
import AddonSwitch from "@/components/modules/addon/AddonSwitch";
import CreateAddonDialog from "@/components/modules/addon/modals/create-addon-dialog";
import EditAddonDialog from "@/components/modules/addon/modals/edit-addon-dialog";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import type { IStepFormInputs } from "../../../type";
import { useEventStepperForm } from "../../../useEventStepperForm";
import { ticketingValues } from "../values";

function AddonSection() {
  const { eventSlug, getAnEventData } = useEventStepperForm();

  const { state: open, setOpen, setClose } = useBooleanState();

  const [selectedSlug, setSelectedSlug] = useState<
    TIdOrSlugOrIdentifier<"slug">["slug"] | null
  >(null);

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<IStepFormInputs>();

  const selectedAddons = useWatch({
    control,
    name: "ticketing.addons",
    defaultValue: ticketingValues?.addons,
  });

  const handleAddonAction = useCallback(
    ({
      action,
      setValue,
      selectedAddons,
    }: {
      action: "toggle" | "createOrEdit" | "delete";
      setValue: UseFormSetValue<IStepFormInputs>;
      selectedAddons: TNullish | TAddOn[];
    }) =>
      async (addon: TAddOn | TNullish) => {
        try {
          if (!addon) {
            throw new Error(
              `No addon found in callback, can't ${action} addon.`,
            );
          }

          const updatedAddons = new Map<number, TAddOn>(
            (Array.isArray(selectedAddons) ? selectedAddons : []).map((a) => [
              a?.id,
              a,
            ]),
          );

          switch (action) {
            case "toggle":
              {
                if (updatedAddons.has(addon.id)) {
                  updatedAddons.delete(addon.id);
                } else {
                  updatedAddons.set(addon.id, addon);
                }
              }
              break;

            case "createOrEdit":
              updatedAddons.set(addon.id, addon);
              break;

            case "delete":
              updatedAddons.delete(addon.id);
              break;
          }

          const updatedAddonsArray = Array.from(updatedAddons.values());

          setValue(
            "ticketing.addons",
            updatedAddonsArray.length ? updatedAddonsArray : null,
          );

          if (updatedAddonsArray?.length) {
            await localStorageUtil.setItemAsync("addons", updatedAddonsArray);
          } else {
            await localStorageUtil.removeItemAsync("addons");
          }
        } catch (error) {
          console.error(`Failed to ${action} addon`, error);
        }
      },
    [],
  );

  const handleEditAddon = useCallback(
    (addon: TAddOn | TNullish) => {
      if (!addon) {
        console.error("No addon provided for editing.");
        return;
      }

      setSelectedSlug(addon.slug);
      setOpen()();
    },
    [setOpen],
  );

  const isAddOnEnabled = !!getAnEventData?.details?.isAddOnEnabled;

  return (
    <>
      <LabelErrorWrapper
        error={
          errors?.ticketing?.addons?.root?.message ||
          errors?.ticketing?.addons?.message ||
          errors?.ticketing?.addons?.message ||
          (errors?.ticketing?.addons as { id: { message: string } }[])
            ?.map((addon) => addon?.id?.message)
            ?.filter(Boolean)
            ?.join(", ")
        }
      >
        <div>
          <div className="mb-6 flex justify-between">
            <h3>Add Ons</h3>

            <div className="flex items-center gap-6">
              {isAddOnEnabled && (
                <CreateAddonDialog
                  onToggleAddon={handleAddonAction({
                    action: "toggle",
                    setValue,
                    selectedAddons,
                  })}
                  onCreateOrEditSuccess={handleAddonAction({
                    action: "createOrEdit",
                    setValue,
                    selectedAddons,
                  })}
                  onDeleteAddonSuccess={handleAddonAction({
                    action: "delete",
                    setValue,
                    selectedAddons,
                  })}
                  selectedAddons={selectedAddons}
                />
              )}

              <AddonSwitch
                eventSlug={eventSlug}
                isAddOnEnabled={isAddOnEnabled}
              />
            </div>
          </div>

          <AddonsList
            onDelete={handleAddonAction({
              action: "delete",
              setValue,
              selectedAddons,
            })}
            handleEditAddon={handleEditAddon}
            selectedAddons={selectedAddons}
            isAddOnEnabled={isAddOnEnabled}
          />
        </div>
      </LabelErrorWrapper>

      <EditAddonDialog
        isEdit
        selectedSlug={selectedSlug}
        open={open}
        onOpenChange={setClose({ beforeExecute: () => setSelectedSlug(null) })}
        onCreateOrEditSuccess={handleAddonAction({
          action: "createOrEdit",
          setValue,
          selectedAddons,
        })}
      />
    </>
  );
}

export default memo(AddonSection);
