"use client";
import { memo } from "react";

import { Link } from "@/i18n/routing";
import EnvelopeIcon from "@/components/icons/envelope-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { messages, type Message } from "./data";

function Messages() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size={"40"}
          className="focus:ring-none relative hidden h-10 w-10 flex-col items-center justify-center rounded-lg border border-default-200 text-default-700 hover:text-primary focus:outline-none md:flex md:bg-default-50"
        >
          <EnvelopeIcon className="h-5 w-5" />
          <div className="absolute -right-1 -top-1 size-2 animate-pulse rounded-full bg-primary" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-[999] mx-4 p-0 lg:w-[320px]"
      >
        <DropdownMenuLabel>
          <div className="flex justify-between border-b border-default-100 px-4 py-3">
            <div className="text-sm font-medium text-default-800">Messages</div>
            <div className="text-xs text-default-800 md:text-right">
              <Link href="/chats" className="underline">
                View all
              </Link>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="h-[300px] xl:h-[350px]">
          <ScrollArea className="h-full">
            {messages?.map((item: Message, index: number) => (
              <DropdownMenuItem
                key={`inbox-${index}`}
                className="group flex cursor-pointer items-start gap-3 px-4 py-2"
              >
                <div className="flex-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item?.image} />
                    <AvatarFallback> {item?.title?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-1 flex-col gap-0.5">
                  <div className="text-sm font-medium text-default-800">
                    {item.title}
                  </div>

                  <div className="text-xs text-default-600 dark:group-hover:text-default-700">
                    {item.desc}
                  </div>

                  <div className="text-xs text-default-400 dark:text-default-500 dark:group-hover:text-default-600">
                    3 min ago
                  </div>
                </div>

                {item?.hasnotifaction && (
                  <div className="flex-none">
                    <span className="inline-block h-[10px] w-[10px] rounded-full border border-destructive-foreground bg-destructive dark:border-default-400" />
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(Messages);
