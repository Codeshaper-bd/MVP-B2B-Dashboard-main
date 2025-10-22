"use client";
import React, { useEffect, useRef } from "react";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

function TopLoadingBar({ isLoading }: { isLoading: boolean }) {
  const loadingBarRef = useRef<LoadingBarRef | null>(null);
  useEffect(() => {
    if (isLoading) {
      loadingBarRef.current?.continuousStart();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [isLoading]);

  return <LoadingBar color="#fbbf24" ref={loadingBarRef} height={4} />;
}

export default TopLoadingBar;
