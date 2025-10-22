import { useCallback, useState, useEffect } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useBooleanState from "@/hooks/useBooleanState";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { localStorageUtil } from "@/lib/localStorageUtil";
import { cn } from "@/lib/utils";
import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import { useUpdateAnEventRelationMutation } from "@/store/api/events/events-api";
import BackButton from "@/components/Buttons/back-button";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import AddOns from "@/components/modules/addon/AddOns";
import AddonSwitch from "@/components/modules/addon/AddonSwitch";
import CreateAddonDialog from "@/components/modules/addon/modals/create-addon-dialog";
import EditAddonDialog from "@/components/modules/addon/modals/edit-addon-dialog";
import RenderData from "@/components/render-data";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ADDONS_STORAGE_KEY = "upcomingEventAddons";

function AddonsSection() {
  const { state: open, setOpen, setClose } = useBooleanState();
  const [selectedSlug, setSelectedSlug] = useState<
    TIdOrSlugOrIdentifier<"slug">["slug"] | null
  >(null);
  const { toast } = useToast();

  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();
  const isAddOnEnabled = !!getAnEventData?.details?.isAddOnEnabled;

  const getAllAddonData = getAnEventData?.addOns;

  // Local state for selected addons
  const [selectedAddons, setSelectedAddons] = useState<TAddOn[] | null>(null);

  // Check if there are any changes by comparing with original data
  const hasChanges = useCallback(() => {
    const originalAddons = getAnEventData?.addOns || [];
    const currentAddons = selectedAddons || [];

    if (originalAddons.length !== currentAddons.length) {
      return true;
    }

    const originalIds = originalAddons.map((addon) => addon.id).sort();
    const currentIds = currentAddons.map((addon) => addon.id).sort();

    return JSON.stringify(originalIds) !== JSON.stringify(currentIds);
  }, [getAnEventData?.addOns, selectedAddons]);

  const [updateAnEventRelation, { isLoading }] =
    useUpdateAnEventRelationMutation();

  // Update selectedAddons when API data loads
  useEffect(() => {
    if (getAllAddonData && getAllAddonData.length > 0) {
      setSelectedAddons(getAllAddonData);
    }
  }, [getAllAddonData]);

  // Load addons from localStorage on component mount
  useEffect(() => {
    const loadAddonsFromStorage = async () => {
      try {
        const storedAddons =
          await localStorageUtil.getItemAsync<TAddOn[]>(ADDONS_STORAGE_KEY);
        if (storedAddons?.success && storedAddons?.data) {
          setSelectedAddons(storedAddons.data);
        }
      } catch (error) {
        console.error("Failed to load addons from localStorage:", error);
      }
    };

    loadAddonsFromStorage();
  }, []);

  const handleAddonAction = useCallback(
    ({
      action,
      selectedAddons,
    }: {
      action: "toggle" | "createOrEdit" | "delete";
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

          setSelectedAddons(
            updatedAddonsArray.length ? updatedAddonsArray : null,
          );

          // Update localStorage like in host event
          if (updatedAddonsArray?.length) {
            await localStorageUtil.setItemAsync(
              ADDONS_STORAGE_KEY,
              updatedAddonsArray,
            );
          } else {
            await localStorageUtil.removeItemAsync(ADDONS_STORAGE_KEY);
          }
        } catch (error) {
          console.error(`Failed to ${action} addon`, error);
        }
      },
    [],
  );

  const handleAttachAddons = useCallback(async () => {
    if (!getAnEventData?.details?.slug) {
      return;
    }
    if (!selectedAddons?.length) {
      return;
    }
    const toastId = toast({
      variant: "loading",
      title: "Attach Addons with Event",
      description: "Please wait while we attach the addons to the event.",
    });
    try {
      await updateAnEventRelation({
        slug: getAnEventData?.details?.slug,
        body: {
          addOns: selectedAddons?.map((addon) => ({ id: addon.id })) || [],
        },
      });

      // Clear localStorage after successful attachment like in host event
      await localStorageUtil.removeItemAsync(ADDONS_STORAGE_KEY);

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Addons attached successfully",
        description: "The addons have been attached to the event successfully.",
      });
    } catch (error) {
      console.error("Failed to attach addons", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to attach addons",
          description: "Please try again.",
        }),
      });
    }
  }, [
    selectedAddons,
    getAnEventData?.details?.slug,
    updateAnEventRelation,
    toast,
  ]);

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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium">Add-Ons</h3>
        <div className="flex items-center gap-4">
          <CreateAddonDialog
            triggerClassName="h-9 text-sm font-semibold"
            triggerText="Manage Add-Ons"
            onToggleAddon={handleAddonAction({
              action: "toggle",
              selectedAddons,
            })}
            onCreateOrEditSuccess={handleAddonAction({
              action: "createOrEdit",
              selectedAddons,
            })}
            onDeleteAddonSuccess={handleAddonAction({
              action: "delete",
              selectedAddons,
            })}
            selectedAddons={selectedAddons}
          />

          <AddonSwitch
            eventSlug={getAnEventData?.details?.slug || ""}
            isAddOnEnabled={isAddOnEnabled}
          />
        </div>
      </div>

      <RenderData
        expectedDataType="array"
        data={selectedAddons}
        {...getAnEventApiState}
        loadingSkeleton={
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} length={1} />
            ))}
          </div>
        }
      >
        <div
          className={cn(
            "grid grid-flow-row gap-4 md:grid-flow-row md:grid-cols-2",
            {
              "pointer-events-none opacity-50": !isAddOnEnabled,
            },
          )}
        >
          {selectedAddons?.map((item) => (
            <AddOns
              key={item?.id}
              item={item}
              deleteAddonsHandler={(slug) => {
                const addon = selectedAddons?.find((a) => a.slug === slug);
                if (addon) {
                  const deleteHandler = handleAddonAction({
                    action: "delete",
                    selectedAddons,
                  });
                  deleteHandler(addon);
                }
              }}
              editAddonsHandler={(slug) => {
                const addon = selectedAddons?.find((a) => a.slug === slug);
                if (addon) {
                  handleEditAddon(addon);
                }
              }}
            />
          ))}
        </div>
      </RenderData>

      <div className="mt-6 flex items-center justify-end gap-3">
        <BackButton />
        <Button
          type="button"
          color="primary"
          className="flex-none"
          disabled={!selectedAddons?.length || !hasChanges()}
          onClick={handleAttachAddons}
        >
          <ButtonLoadingContent isLoading={isLoading} actionContent="Save" />
        </Button>
      </div>

      <EditAddonDialog
        isEdit
        selectedSlug={selectedSlug}
        open={open}
        onOpenChange={setClose({ beforeExecute: () => setSelectedSlug(null) })}
        onCreateOrEditSuccess={handleAddonAction({
          action: "createOrEdit",
          selectedAddons,
        })}
      />
    </div>
  );
}

export default AddonsSection;
