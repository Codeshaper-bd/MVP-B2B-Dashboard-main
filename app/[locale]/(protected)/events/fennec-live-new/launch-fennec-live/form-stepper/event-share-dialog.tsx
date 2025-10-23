"use client";
import { useCallback, useState } from "react";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

import { clientEnv } from "@/config/client-config";
import { copyText } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { CrossIcon as CrossIcon } from "@/components/icons";
import { MailIcon as EmailIcon } from "@/components/icons";
import FacebookIcon from "@/components/icons/FacebookIcon";
import Link2Icon from "@/components/icons/Link2Icon";
import MessengerIcon from "@/components/icons/MessengerIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
interface EventCreatedDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  getAnEventData: TEvent | TNullish;
}
function EventShareDialog({
  open,
  setOpen,
  getAnEventData,
}: EventCreatedDialogProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const siteURL = clientEnv.SITE_URL;
  const eventURL = `${siteURL}/en/events/upcoming-events/${getAnEventData?.details?.slug}`;
  const handleCopy = useCallback(
    (text: string) => async () => {
      if (!text) {
        return;
      }
      const wasCopied = await copyText(text);
      if (wasCopied?.success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({
          title: "Copied to Clipboard",
          description: "The web link has been copied to your clipboard.",
          variant: "success",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "The web link has not been copied to your clipboard.",
        });
      }
    },
    [toast],
  );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="min-w-[256px] max-w-[480px]">
        <div className="relative p-6">
          <h2 className="text-center text-lg font-semibold text-default-700">
            Share
          </h2>
          <CrossIcon
            className="absolute right-6 top-6 size-5 cursor-pointer hover:text-warning"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="space-y-2 px-6 text-base font-medium">
          <FacebookShareButton
            url={eventURL}
            title={getAnEventData?.details?.name}
            className="flex items-center gap-2 !p-2.5"
          >
            <FacebookIcon className="size-5" />
            <span className="text-[#F5F5F6]">Share to Facebook</span>
          </FacebookShareButton>

          <FacebookMessengerShareButton
            appId=""
            url={eventURL}
            title={getAnEventData?.details?.name}
            className="flex items-center gap-2 !p-2.5"
          >
            <MessengerIcon className="size-5" />
            <span className="text-[#F5F5F6]">Share to Messenger</span>
          </FacebookMessengerShareButton>

          <TwitterShareButton
            url={eventURL}
            title={getAnEventData?.details?.name}
            className="flex items-center gap-2 !p-2.5"
          >
            <TwitterIcon className="size-5" />
            <span className="text-[#F5F5F6]">Share to X</span>
          </TwitterShareButton>

          <EmailShareButton
            url={eventURL}
            title={getAnEventData?.details?.name}
            className="flex items-center gap-2 !p-2.5"
          >
            <EmailIcon className="size-5" />
            <span className="text-[#F5F5F6]">Share Via Email</span>
          </EmailShareButton>

          <div
            onClick={handleCopy(eventURL)}
            className="flex cursor-pointer items-center gap-2 !p-2.5"
          >
            <Link2Icon className="size-5" />
            <span className="text-[#F5F5F6]">Copy Weblink</span>
          </div>
        </div>
        <div className="p-6">
          <Button onClick={() => setOpen(false)} fullWidth>
            Cancel
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EventShareDialog;
