import { useState } from "react";
import { toast as sonnerToast } from "sonner";

import { markAsDeleted, undoDelete } from "@/lib/deleted-bars";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useDeleteBarMutation } from "@/store/api/bars/bars-api";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { useRouter } from "@/components/navigation";
import StatusAlert from "@/components/StatusAlert";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function formatTitle(input: string | TNullish): string {
  if (typeof input !== "string") {
    return "";
  }

  const words = input.replace(/-/g, " ").split(" ");
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }
  return words.join(" ");
}

function DeleteBarDialog({
  slug,
}: {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
}) {
  const router = useRouter();
  const [deleteABar, { isLoading }] = useDeleteBarMutation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setOpen(false);

    if (!slug) {
      toast({
        variant: "destructive",
        title: "Bar slug missing",
        description: "Cannot delete bar without a valid slug.",
      });
      return;
    }
    markAsDeleted(slug);
    let cancelled = false;
    const toastKey = sonnerToast.custom(
      (id) => (
        <div className="!w-full !max-w-2xl rounded-[8px] border border-default-200 p-4">
          <h4 className="mb-4 text-base font-medium">
            {formatTitle(slug)} will be permanently deleted in 30 seconds.
          </h4>
          <p className="mb-3 text-sm text-muted-foreground">
            {`If this was a mistake, click "Undo" now to cancel the deletion.`}
          </p>
          <Button
            fullWidth
            color="primary"
            className="px-4"
            onClick={() => {
              cancelled = true;
              clearTimeout(timeoutId);
              sonnerToast.dismiss(id);
              sonnerToast.success("Bar deletion cancelled");
              undoDelete(slug);
            }}
          >
            Undo
          </Button>
        </div>
      ),
      {
        duration: 30000,
        className: "!w-full !max-w-2xl",
      },
    );
    const timeoutId = setTimeout(async () => {
      if (cancelled) {
        return;
      }

      const toastId = toast({
        variant: "loading",
        title: "Deleting Bar",
        description: "Please wait while we delete your bar",
      });

      try {
        const res = await deleteABar(slug).unwrap();

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Bar deleted",
          description: "Bar has been successfully deleted",
        });

        sonnerToast.dismiss(toastKey);
        /* if (
          typeof window !== "undefined" &&
          res.success &&
          window.location.pathname.includes("bars")
        ) {
          router.push("/organization/bars");
        } */
      } catch (error) {
        toastId.update({
          id: toastId.id,
          variant: "destructive",
          ...getApiErrorMessages({
            error,
            title: "Failed to delete Bar",
            description: "Please try again later.",
          }),
        });
      }
    }, 30000);
    router.push("/organization/bars");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          color="secondary"
          className="hover:border-destructive hover:text-destructive"
        >
          <DeleteIcon className="me-1 size-4" /> Delete Bar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <StatusAlert
          status="destructive"
          withCloseButton
          icon={<DeleteIcon className="size-5" />}
          title="Delete Bar"
          description={`Are you sure you want to delete this ${formatTitle(slug)} bar?`}
        >
          <StatusAlert.Buttons>
            <StatusAlert.Buttons.SecondaryButton
              disabled={isLoading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </StatusAlert.Buttons.SecondaryButton>

            <StatusAlert.Buttons.PrimaryButton
              disabled={isLoading}
              onClick={handleDelete}
            >
              <ButtonLoadingContent
                isLoading={isLoading}
                actionContent="Delete"
              />
            </StatusAlert.Buttons.PrimaryButton>
          </StatusAlert.Buttons>
        </StatusAlert>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBarDialog;
