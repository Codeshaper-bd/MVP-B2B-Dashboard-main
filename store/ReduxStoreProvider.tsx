/* eslint-disable react-compiler/react-compiler */
"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import { memo, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { type Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore, type TAppStore } from "@/store";

interface ReduxStoreProviderProps {
  readonly children: React.ReactNode;
}

function ReduxStoreProvider({ children }: ReduxStoreProviderProps) {
  const storeRef = useRef<TAppStore | null>(null);
  const persistorRef = useRef<Persistor>({} as Persistor);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const store = makeStore();
    storeRef.current = store;
    persistorRef.current = persistStore(store);
  }

  useEffect(() => {
    if (storeRef.current !== null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default memo(ReduxStoreProvider);
