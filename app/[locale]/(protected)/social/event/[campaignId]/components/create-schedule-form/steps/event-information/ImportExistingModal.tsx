import { useState } from "react";

import CloudDownloadIcon from "@/components/icons/CloudDownloadIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IconBorder from "@/components/ui/icon-border";
import SearchComponent from "@/components/ui/search-component";
import { Separator } from "@/components/ui/separator";

import Events from "./Events";
import type { IEventProps } from "./ImportEvent";

function ImportExistingModal() {
  const [selectedId, setSelectedId] = useState<Omit<
    IEventProps,
    "selectedId" | "onClick"
  > | null>(null);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button color="secondary">
            <CloudDownloadIcon className="me-1 w-5" />
            Import existing events
          </Button>
        </DialogTrigger>

        <DialogContent size="md" className="p-0">
          <div>
            <DialogHeader className="">
              <DialogTitle className="px-6 pt-5 text-lg">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="flex flex-1 items-center gap-3">
                    <IconBorder>
                      <CloudDownloadIcon className="w-5" />
                    </IconBorder>
                    <p className="text-lg font-semibold text-default-900">
                      Import Event{" "}
                    </p>
                  </div>

                  <div className="flex flex-none items-center gap-5 pe-8">
                    <SearchComponent
                      placeholder="Search"
                      className="text-text-default-1000 w-64 border border-default-600 bg-transparent focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <Separator />

            <Events selectedId={selectedId?.id} onClick={setSelectedId} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImportExistingModal;
