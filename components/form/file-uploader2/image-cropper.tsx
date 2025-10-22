"use client";
import React, { useState, useCallback, useMemo } from "react";
import Cropper, { type Area } from "react-easy-crop";

import { getFileUrl } from "@/lib/media/file-to-url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

interface ImageCropperProps {
  file: File;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
  aspectRatio?: number;
  cropWidth?: number;
  cropHeight?: number;
  cropShape?: "rect" | "round";
  removeBackground?: boolean;
}

function ImageCropper({
  file,
  isOpen,
  onClose,
  onCropComplete,
  aspectRatio,
  cropWidth,
  cropHeight,
  cropShape = "rect",
  removeBackground = false,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const cropperAspectRatio = useMemo(
    () => (cropWidth && cropHeight ? cropWidth / cropHeight : aspectRatio),
    [cropWidth, cropHeight, aspectRatio],
  );
  const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // safer for canvas ops
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const finalWidth = cropWidth || pixelCrop.width;
    const finalHeight = cropHeight || pixelCrop.height;

    canvas.width = finalWidth;
    canvas.height = finalHeight;

    ctx.clearRect(0, 0, finalWidth, finalHeight);

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      finalWidth,
      finalHeight,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, "image/png");
    });
  };

  const handleCropSave = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const { url: imageUrl } = getFileUrl({ file });
      const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);

      // Create a new file with the cropped image
      const croppedFile = new File([croppedBlob], file.name, {
        type: "image/png",
        lastModified: Date.now(),
      });

      onCropComplete(croppedFile);
      onClose();
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };
  const { url: imageUrl } = getFileUrl({ file });

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="py-5">
          <DialogTitle className="text-center">Crop Images</DialogTitle>
        </DialogHeader>
        <div className="relative h-96 w-full">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={cropperAspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
            cropShape={cropShape}
            objectFit="contain"
            // classes={{
            //   mediaClassName: "w-full h-full object-cover",
            // }}
            minZoom={1}
          />
        </div>
        <div className="p-6">
          <div className="flex gap-4">
            <label className="text-sm font-medium">Zoom:</label>

            <Slider
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              min={1}
              max={5}
              step={0.1}
              className="w-full"
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button color="secondary" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button onClick={handleCropSave} color="primary" fullWidth>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageCropper;
