import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import {
  useCreateAFeedbackReplyMutation,
  useUpdateAFeedbackReplyMutation,
} from "@/store/api/feedback/feedback-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import type { IFeedbackModalProps } from ".";

type IFormType = {
  replayText: string;
};
function FeedbackForm({
  data,
  setIsOpen,
}: Pick<IFeedbackModalProps, "data" | "setIsOpen">) {
  const [createAFeedbackReply] = useCreateAFeedbackReplyMutation();
  const [updateAFeedbackReply] = useUpdateAFeedbackReplyMutation();
  const { toast } = useToast();

  // if has replies it will be editable
  const hasReplies = data?.replies && data.replies.length > 0;
  const lastReply = hasReplies ? data.replies[data.replies.length - 1] : null;

  // react form submit
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IFormType>({
    defaultValues: {
      replayText: "",
    },
  });

  useEffect(() => {
    if (lastReply) {
      reset({
        replayText: lastReply?.reply || "",
      });
    }
  }, [lastReply, reset]);

  const onSubmit: SubmitHandler<IFormType> = async (formData) => {
    const toastId = toast({
      variant: "loading",
      title: "Replying",
      description: "Please wait while we reply the feedback.",
    });
    try {
      if (hasReplies) {
        await updateAFeedbackReply({
          id: lastReply?.id,
          body: {
            reply: formData?.replayText || "",
          },
        }).unwrap();
      } else {
        await createAFeedbackReply({
          feedbackId: data.id,
          reply: formData.replayText,
        }).unwrap();
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: lastReply
          ? "Reply Updated Successfully"
          : "Reply Sent Successfully",
        description: getApiErrorMessage(
          undefined,
          "Congratulations! Reply sent successfully",
        ),
      });
      reset();
      setIsOpen(false);
    } catch (err) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error: err,
          title: lastReply ? "Reply Update Failed" : "Reply Send Failed",
          description: lastReply
            ? "Failed to update reply"
            : "Failed to send reply",
        }),
      });
    }
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex items-center gap-4 px-6 py-5 pt-0">
          <div className="flex-1">
            <Textarea
              placeholder="Reply"
              {...register("replayText", {
                required: "Reply text is required",
              })}
            />
          </div>

          <Button type="submit" className="flex-none self-end" color="primary">
            <ButtonLoadingContent
              isLoading={isSubmitting}
              actionContent={
                hasReplies ? <span>Update</span> : <span>Send</span>
              }
            />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
