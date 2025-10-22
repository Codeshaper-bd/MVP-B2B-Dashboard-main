import { useCallback } from "react";

import CalenderIcon from "@/components/icons/CalenderIcon";
import BgRings from "@/components/ui/BgRings";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import CompareEventsForm from "../Forms/CompareEventsForm";
import { useSalesRevenueFilterContext } from "../SalesRevenueFilterContext";
import type { ISalesRevenueFilterContextProps } from "../SalesRevenueFilterContext/types";

// import CompareEventsForm from "../Forms/CompareEventsForm";
// import { useSalesRevenueFilterContext } from "../SalesRevenueFilterContext";
// import type { ISalesRevenueFilterContextProps } from "../SalesRevenueFilterContext/types";

type THandleModalClose = ({
  derived,
  dropdowns,
  modals,
  values,
}: ISalesRevenueFilterContextProps) => (open: boolean) => void;

function CompareEventsModal() {
  const filterContextValues = useSalesRevenueFilterContext();
  const { modals } = filterContextValues;

  const handleModalClose: THandleModalClose = useCallback(
    ({ modals, values }) =>
      (open) => {
        values?.tempFilterType?.set((prev) => {
          values?.filterType?.set(prev);
          return prev;
        });
        modals?.compareEvents?.setIsOpen(open);
      },
    [],
  );

  return (
    <Dialog
      open={modals?.compareEvents?.isOpen}
      onOpenChange={handleModalClose(filterContextValues)}
    >
      <DialogContent className="p-6 md:max-w-[600px]">
        <div>
          <div className="bg-red-500# -mx-6# -mt-6 flex h-56 justify-center overflow-hidden rounded-xl p-6">
            <BgRings>
              <BgRings.Rings />

              <BgRings.Content>
                <CalenderIcon className="h-5 w-[18px] text-[#1A1A1A]" />
              </BgRings.Content>
            </BgRings>
          </div>

          <div className="relative -mt-[150px]">
            <h4 className="mb-5 mt-4 text-center text-lg font-semibold leading-7 text-default-900">
              Compare Events
            </h4>

            <CompareEventsForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CompareEventsModal;
