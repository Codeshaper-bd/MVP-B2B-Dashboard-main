import React, { createContext, useContext } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import type { TOrderDetails } from "@/store/api/order-history/order-history.types";
import type { IApiStateInfo } from "@/components/render-data";

type EventContextType = {
  getAnEventOrderDetails?: TOrderDetails | TNullish;
  getAnEventOrderDetailsApiState?: IApiStateInfo;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function useEventOrderDetailsContext() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error(
      "useEventOrderDetailsContext must be used within EventOrderDetailsProvider",
    );
  }
  return context;
}

function EventOrderDetailsProvider({
  children,
  getAnEventOrderDetails,
  getAnEventOrderDetailsApiState,
}: {
  children: React.ReactNode;
  getAnEventOrderDetails?: TOrderDetails | TNullish;
  getAnEventOrderDetailsApiState?: IApiStateInfo;
}) {
  return (
    <EventContext.Provider
      value={{ getAnEventOrderDetails, getAnEventOrderDetailsApiState }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventOrderDetailsProvider;
