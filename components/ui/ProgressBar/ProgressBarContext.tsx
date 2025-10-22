"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context value
interface ProgressBarContextProps {
  value: number;
}

// Create the context with a default value
const ProgressBarContext = createContext<ProgressBarContextProps | undefined>(
  undefined,
);

// Create a provider component
interface IProgressBarProviderProps {
  value?: number;
  children: React.ReactNode;
}

function ProgressBarProvider({ value, children }: IProgressBarProviderProps) {
  let progressValue: number = 0;
  if (value !== null && value !== undefined) {
    progressValue = value;
  }
  if (value !== null && value !== undefined && progressValue > 100) {
    progressValue = 100;
  }
  if (value !== null && value !== undefined && progressValue < 0) {
    progressValue = 0;
  }

  const [delayedValue, setDelayedValue] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedValue(progressValue);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [progressValue]);

  return (
    <ProgressBarContext.Provider value={{ value: delayedValue }}>
      {children}
    </ProgressBarContext.Provider>
  );
}

export default ProgressBarProvider;

// Custom hook to use the ProgressBarContext
export const useProgressBar = (): ProgressBarContextProps => {
  const context = useContext(ProgressBarContext);
  if (!context) {
    throw new Error("useProgressBar must be used within a ProgressBarProvider");
  }
  return context;
};
