import HostEventButton from "@/components/Buttons/HostEventButton";

function FennecLiveEventNotFound() {
  return (
    <div className="grid w-full place-content-center py-20 text-center lg:h-[calc(100vh-350px)]">
      <div>
        <h3 className="text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)] text-3xl font-bold text-default-1000 lg:text-7xl">
          No Fennec Live
        </h3>
        <p className="my-10 max-w-[600px] text-base font-medium leading-8 text-default-700 lg:text-xl">
          There has no live Event yet. You can create a new event click on below
          button and go to the host an event page.
        </p>
        <HostEventButton />
      </div>
    </div>
  );
}

export default FennecLiveEventNotFound;
