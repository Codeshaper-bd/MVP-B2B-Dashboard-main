import { useEffect, useRef, useState } from "react";

type TMeasure = <T extends HTMLElement>(props: {
  ref: React.MutableRefObject<T | null>;
  setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>;
}) => () => void;

const measure: TMeasure =
  ({ ref, setDimensions }) =>
  () => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  };

interface Dimensions {
  width: number;
  height: number;
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current) {
      const measureFunction = measure({ ref, setDimensions });

      const resizeObserver = new ResizeObserver(measureFunction);
      const currentRef = ref.current;
      if (currentRef) {
        resizeObserver.observe(currentRef);
      }

      // Initial measurement
      measureFunction();

      return () => {
        if (currentRef) {
          resizeObserver.unobserve(currentRef);
        }
      };
    }
  }, [ref]);

  return { ref, dimensions };
};

export default useMeasure;
