"use client";
import { useEffect, useState } from "react";

import type { TCountries } from "@/lib/get-countries";

const CACHE_KEY = "countriesData";
const CACHE_EXPIRY_KEY = "countriesDataExpiry";
const CACHE_EXPIRY_TIME = 2 * 24 * 60 * 60 * 1000; // 2 days

type TFetchClientSideCountryData = {
  signal: AbortSignal;
  setData: React.Dispatch<React.SetStateAction<TCountries>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const fetchClientSideCountryData = async ({
  signal,
  setData,
  setIsLoading,
  setError,
}: TFetchClientSideCountryData) => {
  try {
    setIsLoading(true);
    setError(null);

    const cachedData = sessionStorage.getItem(CACHE_KEY);
    const cachedExpiry = sessionStorage.getItem(CACHE_EXPIRY_KEY);
    const now = Date.now();

    if (cachedData && cachedExpiry) {
      const expiryTime = parseInt(cachedExpiry, 10);
      if (now < expiryTime) {
        setData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      } else {
        // Remove expired cache
        sessionStorage.removeItem(CACHE_KEY);
        sessionStorage.removeItem(CACHE_EXPIRY_KEY);
      }
    }

    const response = await fetch("/json/countries.json", {
      cache: "force-cache",
      signal,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch countries data");
    }

    const data = await response.json();
    setData(data?.length ? data : []);
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
    sessionStorage.setItem(
      CACHE_EXPIRY_KEY,
      (now + CACHE_EXPIRY_TIME).toString(),
    );
  } catch (error) {
    if (error instanceof Error && error?.name !== "AbortError") {
      console.error("error getting country data: ", error);
      setError(error?.message);
    }
  } finally {
    setIsLoading(false);
  }
};

const useGetCountries = () => {
  const [data, setData] = useState<TCountries>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    fetchClientSideCountryData({ signal, setData, setIsLoading, setError });

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
};

export default useGetCountries;
