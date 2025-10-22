import { useEffect, useState } from "react";

const onChangeHandler =
  ({ setValue }: { setValue: React.Dispatch<React.SetStateAction<boolean>> }) =>
  (event: MediaQueryListEvent) => {
    setValue(event.matches);
  };

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const onChange = onChangeHandler({ setValue });

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => {
      result.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
}
