import { DialogDescription } from "@radix-ui/react-dialog";

import { CalendarIcon as CalenderIcon } from "@/components/icons";
import BgRings from "@/components/ui/BgRings";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import SelectEventForm from "../Forms/SelectEventForm";
import { useSalesRevenueFilterContext } from "../SalesRevenueFilterContext";

function SelectEventModal() {
  const {
    modals: { eventSelect },
  } = useSalesRevenueFilterContext();

  return (
    <Dialog open={eventSelect?.isOpen} onOpenChange={eventSelect?.setIsOpen}>
      <DialogContent className="p-6">
        <DialogTitle className="sr-only" />
        <DialogDescription className="sr-only" />
        <div>
          <div className="-mx-6 -mt-6 h-56 overflow-hidden rounded-xl p-6">
            <BgRings>
              <BgRings.Rings />

              <BgRings.Content>
                <CalenderIcon className="h-5 w-[18px] text-[#1A1A1A]" />
              </BgRings.Content>
            </BgRings>
          </div>

          <div className="relative -mt-[150px]">
            <DialogTitle className="mb-5 mt-4 text-lg font-semibold leading-7 text-default-900">
              Select Event
            </DialogTitle>

            <SelectEventForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SelectEventModal;
