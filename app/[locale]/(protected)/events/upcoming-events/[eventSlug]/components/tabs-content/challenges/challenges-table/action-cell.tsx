"üse client";

import type { CellContext } from "@tanstack/react-table";
import { memo } from "react";

import EditChallengeModal from "@/app/[locale]/(protected)/dashboard/challenges/components/Modals/EditChallengeModal";
import useBooleanState from "@/hooks/useBooleanState";
import { cn } from "@/lib/utils";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import { usePathname } from "@/components/navigation";

import { useChallengeContext } from "../challenge-context";

function ActionCell({ row: { original } }: CellContext<TChallenge, unknown>) {
  const pathname = usePathname();

  const isPastEvents = pathname.includes("/past-events");
  const { challenges, removeChallenge, updateChallenge, addChallenge } =
    useChallengeContext();
  const {
    state: isEditModalOpen,
    setOpen: setIsEditModalOpen,
    setClose: setIsEditModalClose,
  } = useBooleanState();

  const handleEditSuccess = async (data: TChallenge) => {
    try {
      let isExisting: boolean = false;
      let updatedChallenges = challenges?.map((promotion) => {
        // update mode
        if (!!promotion?.id && !!data?.id && promotion?.id === data?.id) {
          isExisting = true;
          return data;
        }

        return promotion;
      });

      // create mode
      if (!isExisting) {
        updatedChallenges = [
          ...(Array.isArray(updatedChallenges) ? updatedChallenges : []),
          data,
        ];
      }

      if (isExisting) {
        updateChallenge(data?.id, data);
      } else {
        addChallenge(data, "start");
      }
    } catch (error) {
      console.error("🚀 ~ error:", error);
    }
  };

  return (
    <div className="flex w-fit items-center gap-1">
      <div className="flex size-[40px] items-center justify-end">
        <EditPenIcon
          onClick={isPastEvents ? undefined : setIsEditModalOpen()}
          className={cn(
            "size-[20px] shrink-0 cursor-pointer hover:text-primary",
            {
              "cursor-not-allowed": isPastEvents,
            },
          )}
        />

        <EditChallengeModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalClose()}
          mode="server-edit"
          editItemSlug={original?.slug}
          onSuccess={handleEditSuccess}
        />
      </div>

      <div className="flex size-[40px] items-center justify-end">
        <DeleteIcon
          onClick={
            isPastEvents ? undefined : () => removeChallenge(original?.id)
          }
          className={cn(
            "size-[20px] shrink-0 cursor-pointer hover:text-destructive",
            {
              "cursor-not-allowed": isPastEvents,
            },
          )}
        />
      </div>
    </div>
  );
}

export default memo(ActionCell);
