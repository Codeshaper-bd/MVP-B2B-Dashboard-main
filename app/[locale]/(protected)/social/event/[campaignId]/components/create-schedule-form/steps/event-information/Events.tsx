import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import Event, { type IEventProps } from "./ImportEvent";

export const eventListData: Omit<IEventProps, "selectedId" | "onClick">[] = [
  {
    id: 1,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium",
    date: "2021-01-01",
    status: "scheduled",
    image: "/images/all-img/event1.png",
  },
  {
    id: 2,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium",
    date: "2021-01-01",
    status: "published",
    image: "/assets/all/event2.png",
  },
  {
    id: 3,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
    date: "2021-01-01",
    status: "published",
    image: "/images/all-img/event1.png",
  },
  {
    id: 4,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
    date: "2021-01-01",
    status: "draft",
    image: "/assets/all/event2.png",
  },
  {
    id: 5,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
    date: "2021-01-01",
    status: "published",
    image: "/images/all-img/event1.png",
  },
  {
    id: 6,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium",
    date: "2021-01-01",
    status: "draft",
    image: "/assets/all/event2.png",
  },
  {
    id: 7,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium",
    date: "2021-01-01",
    status: "scheduled",
    image: "/images/all-img/event1.png",
  },
  {
    id: 8,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium",
    date: "2021-01-01",
    status: "published",
    image: "/assets/all/event2.png",
  },
  {
    id: 9,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
    date: "2021-01-01",
    status: "published",
    image: "/images/all-img/event1.png",
  },
  {
    id: 10,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
    date: "2021-01-01",
    status: "draft",
    image: "/assets/all/event2.png",
  },
  {
    id: 11,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium, Jakarta, Indonesia",
    date: "2021-01-01",
    status: "published",
    image: "/images/all-img/event1.png",
  },
  {
    id: 12,
    title: "Coldplay : Music of the Spheres",
    location: "Gelora Bung Karno Stadium",
    date: "2021-01-01",
    status: "draft",
    image: "/assets/all/event2.png",
  },
];

export interface IEventSProps
  extends Pick<IEventProps, "selectedId" | "onClick"> {}

function Events({ selectedId, onClick }: IEventSProps) {
  return (
    <>
      <ScrollArea className="h-[calc(100vh_-_300px)] p-4">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          {eventListData.map((event) => (
            <Event
              key={event.id}
              {...event}
              onClick={onClick}
              selectedId={selectedId}
            />
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="flex justify-end gap-3 p-4 text-sm">
        <Button type="button">Cancel</Button>
        <Button
          disabled={!selectedId}
          color={selectedId ? "primary" : "secondary"}
        >
          Import
        </Button>
      </div>
    </>
  );
}

export default Events;

/* 
step-1: check true or false the selectedId
step-2: if selected Id is true then the import button will be able otherwise enable.
step-3: Import any data from the modal
step-4: If import any data from the modal then the button icon will be replaced by the title of the data and icon will be changed by card image.
step-5: If i import any data and wants to again come in this modal then the import button text will be replaced by Clear.
*/
