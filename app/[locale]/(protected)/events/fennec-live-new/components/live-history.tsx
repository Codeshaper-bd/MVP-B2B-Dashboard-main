import type { TEvent, TEventStatus } from "@/store/api/events/events.types";
import EventCard from "@/components/modules/event/EventList/EventCard";

export default function LiveHistory() {
  const getAllEventData: TEvent[] = [
    {
      details: {
        id: 2,
        name: "Past Event",
        slug: "past-event-5630",
        description:
          "Past Event at Main Venue - Admin One Org. Join us for a night to remember!",
        isGratuity: false,
        publishDate: "2025-07-17T08:28:19.645Z",
        startTime: "2025-07-12T20:00:00.000Z",
        endTime: "2025-07-12T23:00:00.000Z",
        checkInEnd: "2025-07-12T20:15:00.000Z",
        isRecurring: false,
        isFennecLive: false,
        hideGuestlist: false,
        isCrowdMeterEnabled: true,
        isGroupDiscountEnabled: false,
        isDiscountEnabled: false,
        isAddOnEnabled: false,
        status: "Ended" as TEventStatus,
        createdAt: "2025-07-17T08:28:19.646Z",
        updatedAt: "2025-07-17T08:28:19.646Z",
        media: [
          {
            id: 22,
            name: "714e0521-f112-494d-84a4-4294e53a64ca-event-2.jpg?org=1",
            originalName: "Event Image 2",
            type: "image/jpg",
            url: "https://fennecappcommonstorage.blob.core.windows.net/dev/714e0521-f112-494d-84a4-4294e53a64ca-event-2.jpg?org=1",
            size: 65577,
            tags: ["Event"],
            isFeatured: true,
            createdAt: "2025-07-17T08:30:08.270Z",
            updatedAt: "2025-07-17T08:30:08.270Z",
            deletedAt: null,
          },
        ],
      },
      venue: {
        id: 1,
        name: "Main Venue - Admin One Org",
        slug: "main-venue-1",
        email: "mainvenue-1@example.com",
        phone: "555-0001",
        address: "123 Main St, Admin One Org",
        city: "Cityville",
        state: "Stateville",
        postalCode: "12345",
        countryCode: "US",
        latitude: 37.7749,
        longitude: -122.4194,
        capacity: 300,
        isPrimary: true,
        createdAt: "2025-07-17T08:24:02.656Z",
        updatedAt: "2025-07-17T08:24:02.656Z",
        deletedAt: null,
        media: [
          {
            id: 16,
            name: "d819036c-ab80-4598-8899-6368fd27e96a-venue-0.jpg?org=1",
            originalName: "Venue Image 1",
            type: "image/jpg",
            url: "https://fennecappcommonstorage.blob.core.windows.net/dev/d819036c-ab80-4598-8899-6368fd27e96a-venue-0.jpg?org=1",
            size: 808153,
            tags: ["Venue"],
            isFeatured: true,
            createdAt: "2025-07-17T08:30:05.130Z",
            updatedAt: "2025-07-17T08:30:05.130Z",
            deletedAt: null,
          },
        ],
      },
      ticketTiers: [],
      discounts: [],
      linkTracking: [],
      groupDiscount: {
        id: -1,
        eventId: 25,
        type: "PERCENTAGE",
        amount: 0,
        minQty: 0,
        maxQty: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      addOns: [
        {
          id: 3,
          name: "Premium Mixer",
          slug: "premium-mixer-9463",
          price: 1.5,
          maxQty: 10,
          status: "Active",
          createdAt: "2025-07-17T08:28:02.364Z",
          updatedAt: "2025-07-17T08:28:02.364Z",
          deletedAt: null,
          media: null,
          description: "Enjoy a premium mixer with your drink.",
        },
      ],
      challenges: [],
      promotions: [],
      createdBy: {
        id: 1,
        firstName: "Admin",
        lastName: "One",
        email: "admin.one@example.com",
      },
    },
  ];
  const type = "ended";
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-default-900">Live History</h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {getAllEventData?.map((event) => (
          <EventCard
            {...event}
            key={event?.details?.id}
            eventCardType={type ?? "upcoming"}
          />
        ))}
      </div>
    </div>
  );
}
