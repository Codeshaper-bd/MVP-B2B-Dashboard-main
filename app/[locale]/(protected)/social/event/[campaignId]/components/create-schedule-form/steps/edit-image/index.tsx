import Image from "next/image";
import React from "react";

import DoubleStarIcon from "@/components/icons/DoubleStarIcon";
import EraseIcon from "@/components/icons/EraseIcon";
import MagicIcon from "@/components/icons/MagicIcon";
import RefreshIcon from "@/components/icons/RefreshIcon";
import ResizeIcon from "@/components/icons/ResizeIcon";
import UpScaleIcon from "@/components/icons/UpScaleIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import DownloadImageModal from "./download-image-modal";

function EditImage() {
  return (
    <Card className="rounded-xl bg-transparent p-6 text-default-1000">
      {/* Download Button */}
      <div className="flex justify-end">
        <DownloadImageModal />
      </div>
      <div className="relative p-20">
        {/* Foreground Image */}
        <div className="relative flex items-center justify-center">
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

        {/* Right Side Buttons */}
        <div className="absolute right-20 top-1/2 flex -translate-y-1/2 flex-col gap-4">
          <Button color="secondary" type="button">
            <RefreshIcon className="me-1 h-4 w-4" /> Try Again
          </Button>
          <Button color="secondary" type="button">
            <UpScaleIcon className="me-1 h-4 w-4" /> Upscale 4x
          </Button>
          <Button color="secondary" type="button">
            <EraseIcon className="me-1 h-4 w-4" /> Remove Bg
          </Button>
          <Button color="secondary" type="button">
            <MagicIcon className="me-1 h-4 w-4" /> Change Style
          </Button>
          <Button color="secondary" type="button">
            <ResizeIcon className="me-1 h-4 w-4" /> Resize
          </Button>
        </div>
      </div>

      <div className="relative w-full">
        {/* Full Width Input Field */}
        <Input
          label="Edit your generated Image"
          placeholder="Describe your background image..."
          className="relative flex h-16 w-full items-center justify-between rounded-lg bg-transparent p-4"
        />

        {/* Coming Soon Button (Centered Inside Input) */}
        <div className="flex items-center justify-center">
          <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 transform">
            <Button className="flex items-center gap-2 rounded-full border-none bg-gradient-to-r from-[#3BB5F3] via-[#4540EA] to-[#A55DCF] text-default-1000">
              Coming Soon
            </Button>
          </div>

          {/* Edit Button (Right Side of Input Field) */}
          <div className="absolute right-1 top-2/3 -translate-y-1/2 transform">
            <Button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF44EC] to-[#FFC833] px-4 py-2 font-medium text-default shadow-md transition-all hover:opacity-90"
            >
              <DoubleStarIcon className="h-6 w-6" />
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div className="my-3 flex gap-2">
        <Button type="button">Change Text...</Button>
        <Button type="button">Change Background...</Button>
        <Button type="button">Add Element...</Button>
      </div>
    </Card>
  );
}

export default EditImage;
