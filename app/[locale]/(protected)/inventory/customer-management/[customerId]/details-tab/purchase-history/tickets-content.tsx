import DetailsCard, { type DetailsCardProps } from "@/components/details-card";

type TicketGroup = {
  groupName: string;
  tickets: DetailsCardProps[];
};

const ticketsData: TicketGroup[] = [
  {
    groupName: "August",
    tickets: [
      {
        title: "Coldplay : Music of the Spheres",
        date: "August 17, 2024",
        time: "08:10",
        price: "200",
        image: "/images/all-img/event1.png",
        viewLink: "/en/inventory/order-history/1/1",
      },
      {
        title: "Coldplay : Music of the Spheres",
        date: "August 17, 2024",
        time: "08:10",
        price: "200",
        image: "/images/all-img/event1.png",
        viewLink: "/en/inventory/order-history/1/1",
      },
    ],
  },
  {
    groupName: "July",
    tickets: [
      {
        title: "Coldplay : Music of the Spheres",
        date: "August 17, 2024",
        time: "08:10",
        price: "200",
        image: "/images/all-img/event1.png",
        viewLink: "/en/inventory/order-history/1/1",
      },
      {
        title: "Coldplay : Music of the Spheres",
        date: "August 17, 2024",
        time: "08:10",
        price: "200",
        image: "/images/all-img/event1.png",
        viewLink: "/en/inventory/order-history/1/1",
      },
    ],
  },
  {
    groupName: "July",
    tickets: [
      {
        title: "Coldplay : Music of the Spheres",
        date: "August 17, 2024",
        time: "08:10",
        price: "200",
        image: "/images/all-img/event1.png",
        viewLink: "/en/inventory/order-history/1/1",
      },
      {
        title: "Coldplay : Music of the Spheres",
        date: "August 17, 2024",
        time: "08:10",
        price: "200",
        image: "/images/all-img/event1.png",
        viewLink: "/en/inventory/order-history/1/1",
      },
    ],
  },
];
function TicketsContent() {
  return (
    <div className="space-y-4">
      {ticketsData.map((item, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-[16px] font-medium">{item.groupName}</h3>
          {item.tickets.map((ticket, index) => (
            <DetailsCard key={index} item={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TicketsContent;
