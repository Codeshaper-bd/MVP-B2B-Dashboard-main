import { useEffect, useState } from "react";

const useRenderCount = () => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    if (
      process.env.NEXT_PUBLIC_NODE_ENV === "development" &&
      isInitialRender &&
      renderCount === 1
    ) {
      setIsInitialRender(false);
    } else if (
      process.env.NEXT_PUBLIC_NODE_ENV === "production" &&
      isInitialRender &&
      renderCount === 0
    ) {
      setIsInitialRender(false);
    }
  }, [isInitialRender, renderCount]);

  return {
    renderCount,
    isInitialRender,
  };
};

export default useRenderCount;
