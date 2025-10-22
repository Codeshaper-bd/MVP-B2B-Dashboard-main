import { useCallback, useEffect, useState } from "react";

import { localStorageUtil } from "@/lib/localStorageUtil";

type UseLocalStorageReturn<T> = {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
  loading: boolean;
  error: string | null;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> => {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const storedValue = await localStorageUtil.getItemAsync<T>(key);
        setValue(storedValue?.data !== null ? storedValue?.data : initialValue);
      } catch (err) {
        setError(`Error getting item ${key} from localStorage`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStoredValue = useCallback(
    (key: string) => async (newValue: T) => {
      try {
        setError(null);
        setLoading(true);
        await localStorageUtil.setItemAsync(key, newValue);
        setValue(newValue);
      } catch (err) {
        setError(`Error setting item ${key} in localStorage`);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const removeStoredValue = useCallback(
    (key: string) => async () => {
      try {
        setError(null);
        setLoading(true);
        await localStorageUtil.removeItemAsync(key);
        setValue(null);
      } catch (err) {
        setError(`Error removing item ${key} from localStorage`);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    value,
    setValue: setStoredValue(key),
    removeValue: removeStoredValue(key),
    loading,
    error,
  };
};
