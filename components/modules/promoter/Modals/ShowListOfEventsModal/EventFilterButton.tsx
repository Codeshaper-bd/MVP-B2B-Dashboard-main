import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type { TEventStatus } from "@/store/api/events/events.types";
import type { TGetAnPromotersArgs } from "@/store/api/promoters/promoters.types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface IEventFilterButtonProps {
  eventStatus: TEventStatus;
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetAnPromotersArgs, void>
  >;
}
function EventFilterButton({
  eventStatus,
  manageStateParams,
}: IEventFilterButtonProps) {
  const { updateMultipleParam } = manageStateParams;
  return (
    <div>
      <div className="flex items-center gap-6 px-6">
        <Button
          type="button"
          variant="ghost"
          className="rounded-none border-0 border-b-2 border-transparent px-1 text-sm font-semibold capitalize text-[#94969C] hover:bg-transparent data-[active=true]:border-primary data-[active=true]:text-primary md:px-0"
          onClick={() => {
            updateMultipleParam({
              eventStatus: "Published",
            });
          }}
          data-active={eventStatus === "Published"}
        >
          Upcoming Events
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="rounded-none border-0 border-b-2 border-transparent px-1 text-sm font-semibold capitalize text-[#94969C] hover:bg-transparent data-[active=true]:border-primary data-[active=true]:text-primary md:px-0"
          onClick={() => {
            updateMultipleParam({
              eventStatus: "Completed",
            });
          }}
          data-active={eventStatus === "Completed"}
        >
          Past Events
        </Button>
      </div>

      <Separator className="-mt-[1px] h-0.5 w-full bg-[#1F242F]" />
    </div>
  );
}

export default EventFilterButton;
