import Image from "next/image";
import React from "react";

import DialogContextProvider from "@/components/CustomizedDialog/DialogContext";
import DownloadIcon from "@/components/icons/DownloadIcon";
import XIcon from "@/components/icons/X";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const borderOptions = [
  { label: "1px", value: "1px" },
  { label: "2px", value: "2px" },
  { label: "3px", value: "3px" },
  { label: "4px", value: "4px" },
  { label: "5px", value: "5px" },
];
const formatOptions = [
  { label: "JPG", value: "1px" },
  { label: "PNG", value: "2px" },
  { label: "SVG", value: "3px" },
  { label: "JPEG", value: "4px" },
  { label: "WEBP", value: "5px" },
];

function DownloadImageModal() {
  return (
    <div className="">
      <DialogContextProvider>
        <Dialog>
          <DialogTrigger asChild>
            <Button color="secondary">
              <DownloadIcon className="me-1 h-4 w-4" /> Download
            </Button>
          </DialogTrigger>

          {/* Modal Content */}
          <DialogContent
            hideInternalClose
            size="default"
            className="w-full md:!max-w-[480px]"
          >
            <ScrollArea className=" ">
              <DialogHeader>
                <DialogTitle className="px-6 py-5 text-sm">
                  Download Image
                </DialogTitle>
                {/* Close Button */}
                <DialogClose className="absolute right-7 top-6 rounded-sm opacity-70">
                  <XIcon className="h-3 w-3" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogHeader>

              <Separator />

              {/* Image Preview */}
              <div className="flex items-center justify-center px-32 py-4">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/assets/social-svg/ChooseTemplatesImage/ChristmasCharm.svg"
                    alt="Edited Image"
                    width={300}
                    height={450}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <hr />
              {/* Next Button */}
              <div className="flex flex-col justify-around p-4 md:flex-row">
                <SelectInput
                  value="1px"
                  placeholder="Select Venue"
                  options={borderOptions}
                  className="inset-0 w-full"
                />
                <SelectInput
                  value="1px"
                  placeholder="JPG"
                  options={formatOptions}
                  className="inset-0 w-full"
                />
                <Button className="flex items-center gap-2 bg-transparent px-5 py-2 text-white">
                  <DownloadIcon className="h-4 w-4" /> Download
                </Button>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </DialogContextProvider>
    </div>
  );
}

export default DownloadImageModal;
