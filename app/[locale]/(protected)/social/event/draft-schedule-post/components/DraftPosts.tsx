"use client";
import React, { useState } from "react";

import useBooleanState, { type TExternalState } from "@/hooks/useBooleanState";
import { createDelay } from "@/lib/date-time/create-delay";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { CheckIcon as CheckIcon } from "@/components/icons";
import HelpHexagonIcon from "@/components/icons/HelpHexagonIcon";
import { InfoIcon as InfoIcon } from "@/components/icons";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import SearchComponent from "@/components/ui/search-component";

import PostCard, {
  type TDraftPostMode,
  type TPostCardProps,
} from "../../../components/PostCard";

const draftPostsData: TPostCardProps[] = [
  {
    mode: "draft",
    id: crypto.randomUUID(),
    title: "Name Event",
  },
  {
    mode: "draft",
    id: crypto.randomUUID(),
    title: "Name Event",
  },
  {
    mode: "draft",
    id: crypto.randomUUID(),
    title: "Name Event",
  },
  {
    mode: "draft",
    id: crypto.randomUUID(),
    title: "Name Event",
  },
];

const handleOpenDialog =
  ({
    setEventData,
    data,
    openDeleteDialog,
  }: {
    setEventData: React.Dispatch<
      React.SetStateAction<Pick<
        TDraftPostMode,
        "id" | "image" | "title"
      > | null>
    >;
    data: Pick<TDraftPostMode, "id" | "image" | "title"> | null;
    openDeleteDialog: (props: Partial<TExternalState> | void) => () => void;
  }) =>
  () => {
    setEventData(data);
    openDeleteDialog()();
  };

const handleCloseDialog =
  ({
    setEventData,
    closeDeleteDialog,
  }: {
    setEventData: React.Dispatch<
      React.SetStateAction<Pick<
        TDraftPostMode,
        "id" | "image" | "title"
      > | null>
    >;
    closeDeleteDialog: (props: Partial<TExternalState> | void) => () => void;
  }) =>
  () => {
    setEventData(null);
    closeDeleteDialog()();
  };

const handleDelete =
  ({
    closeDeleteDialog,
    setEventData,
    openPostRequestDialog,
    setIsDeleteLoading,
    setPostRequestMessage,
    setPostRequestResultType,
  }: {
    closeDeleteDialog: (props: Partial<TExternalState> | void) => () => void;
    setEventData: React.Dispatch<
      React.SetStateAction<Pick<
        TDraftPostMode,
        "id" | "image" | "title"
      > | null>
    >;
    openPostRequestDialog: (
      props: Partial<TExternalState> | void,
    ) => () => void;
    setIsDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPostRequestMessage: React.Dispatch<React.SetStateAction<string>>;
    setPostRequestResultType: React.Dispatch<
      React.SetStateAction<"destructive" | "success" | undefined>
    >;
  }) =>
  async () => {
    try {
      setIsDeleteLoading(true);
      await createDelay(2000);
      if (Math.random() > 0.5) {
        throw new Error("Failed to delete draft");
      }
      setEventData(null);
      closeDeleteDialog()();

      setPostRequestResultType("success");
      setPostRequestMessage("Draft has been successfully deleted");
      openPostRequestDialog()();
    } catch (error) {
      console.error(error);
      setEventData(null);
      closeDeleteDialog()();
      setPostRequestResultType("destructive");
      setPostRequestMessage(
        error instanceof Error ? error?.message : "Failed to delete draft",
      );
      openPostRequestDialog()();
    } finally {
      setIsDeleteLoading(false);
    }
  };

interface IDraftPostsProps {
  className?: string;
}

function DraftPosts({ className }: IDraftPostsProps) {
  const [eventData, setEventData] = useState<Pick<
    TDraftPostMode,
    "id" | "image" | "title"
  > | null>(null);
  const [postRequestMessage, setPostRequestMessage] = useState("");
  const [postRequestResultType, setPostRequestResultType] = useState<
    "destructive" | "success" | undefined
  >();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const {
    state: isDeleteDialogOpen,
    setOpen: openDeleteDialog,
    setClose: closeDeleteDialog,
  } = useBooleanState();
  const {
    state: isPostRequestDialogOpen,
    setOpen: openPostRequestDialog,
    setClose: closePostRequestDialog,
  } = useBooleanState();

  return (
    <div className={className}>
      <div className="mb-4 flex w-full items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold leading-8 text-default-900">
          Draft Posts
        </h2>

        <SearchComponent />
      </div>

      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {draftPostsData?.map((data) => (
          <PostCard
            key={data.id}
            {...data}
            mode="draft"
            onDelete={handleOpenDialog({
              data,
              openDeleteDialog,
              setEventData,
            })}
            isDeleteModalOpen={
              !!eventData?.id && !!data?.id && eventData?.id === data?.id
            }
            isDeleteLoading={isDeleteLoading}
          />
        ))}
      </div>

      <AlertDialog open={isDeleteDialogOpen}>
        <StatusAlert
          status="alert"
          withCloseButton
          disableInternallyClose
          onClose={handleCloseDialog({ closeDeleteDialog, setEventData })}
          icon={<HelpHexagonIcon className="size-5" />}
          title="Are you sure you want to delete this Draft?"
          description="Are you sure you want to delete this item? This action cannot be undone."
        >
          <StatusAlert.Buttons>
            <StatusAlert.Buttons.SecondaryButton
              onClick={handleCloseDialog({ closeDeleteDialog, setEventData })}
              disabled={isDeleteLoading}
            >
              Cancel
            </StatusAlert.Buttons.SecondaryButton>

            <StatusAlert.Buttons.PrimaryButton
              onClick={handleDelete({
                closeDeleteDialog,
                setEventData,
                openPostRequestDialog,
                setIsDeleteLoading,
                setPostRequestMessage,
                setPostRequestResultType,
              })}
              disabled={isDeleteLoading}
            >
              <ButtonLoadingContent
                isLoading={isDeleteLoading}
                actionContent="Yes"
              />
            </StatusAlert.Buttons.PrimaryButton>
          </StatusAlert.Buttons>
        </StatusAlert>
      </AlertDialog>

      <AlertDialog open={isPostRequestDialogOpen}>
        <StatusAlert
          status={postRequestResultType}
          withCloseButton
          disableInternallyClose
          onClose={closePostRequestDialog()}
          icon={
            postRequestResultType === "success" ? (
              <CheckIcon className="size-5" />
            ) : (
              <InfoIcon className="size-5" />
            )
          }
          title={postRequestMessage}
        />
      </AlertDialog>
    </div>
  );
}

export default DraftPosts;
