import { DialogTitle } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import type { TFeedback } from "@/store/api/feedback/feedback.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import FeedbackContent from "./feedback-content";
import FeedbackForm from "./feedback-form";
import FeedbackHeader from "./feedback-header";

export interface IFeedbackModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TFeedback;
}

function FeedbackModal({ isOpen, setIsOpen, data }: IFeedbackModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className={cn("md:max-w-[512px]")} hideInternalClose>
        <DialogTitle className="sr-only">Feedback</DialogTitle>
        <DialogDescription className="sr-only">Feedback</DialogDescription>
        <DialogHeader className="relative border-b border-border p-6">
          <FeedbackHeader setIsOpen={setIsOpen} />
        </DialogHeader>
        <FeedbackContent data={data} />
        <Separator className="my-6 w-full dark:bg-default-100" />
        <DialogFooter>
          <FeedbackForm data={data} setIsOpen={setIsOpen} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FeedbackModal;
