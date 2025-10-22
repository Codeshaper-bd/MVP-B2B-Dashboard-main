"use client";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import ChatBody from "./chat-body";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";

function ChatAi() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-1 right-1 z-[9999]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Avatar className="h-[72px] w-[72px] cursor-pointer bg-background">
            <AvatarImage src="/assets/avatar/chat-ai.png" alt="dashcode" />
            <AvatarFallback> FI </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-0 md:w-[432px]">
          <ChatHeader setOpen={setOpen} />
          <Separator />
          <ChatBody />
          <Separator />
          <ChatFooter />
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ChatAi;
