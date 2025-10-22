import { useState, useEffect, useRef } from "react";

export function useRenderTracker() {
  const [renderCount, setRenderCount] = useState(0);
  const [isFirstRenderDev, setIsFirstRenderDev] = useState(true);
  const [isFirstRenderProd, setIsFirstRenderProd] = useState(true);
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    if (renderCountRef.current) {
      // Not first render anymore
      setIsFirstRenderDev(false);
      setIsFirstRenderProd(false);
    } else {
      renderCountRef.current = Number(renderCountRef.current || 0) + 1;

      switch (process?.env?.NEXT_PUBLIC_NODE_ENV) {
        case "development":
          {
            if (renderCountRef.current % 2 === 0) {
              setIsFirstRenderDev(true);
            }
            setIsFirstRenderProd(false);
          }
          break;

        case "production":
          {
            if (renderCountRef.current % 2 === 1) {
              setIsFirstRenderProd(true);
            }
            setIsFirstRenderDev(false);
          }
          break;

        default:
          break;
      }
    }

    setRenderCount((prev) => prev + 1);
  }, []);

  return {
    totalRenders: renderCount,
    isFirstRenderDev,
    isFirstRenderProd,
    isFirstRendered:
      process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? isFirstRenderDev
        : isFirstRenderProd,
  };
}
