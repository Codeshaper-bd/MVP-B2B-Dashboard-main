import { useState, useEffect, useRef, useCallback } from "react";

// Type for callback function
type TCallback = (...args: unknown[]) => void;
type TClearDelayType = "callback" | "util" | "promise" | "all";

// Custom Hook
export function useDelay<T extends TCallback>(
  defaultDelay: number = 2000, // Default delay time in milliseconds
  callback?: T,
  options?: {
    disableInitialCallbackInvoke?: boolean;
  },
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const promiseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isCallbackWaiting, setIsCallbackWaiting] = useState(false);
  const [isPromiseWaiting, setIsPromiseWaiting] = useState(false);
  const [isUtilWaiting, setIsUtilWaiting] = useState(false);

  // Function to cancel any ongoing delay
  const clearDelay = useCallback((type: TClearDelayType = "all") => {
    switch (type) {
      case "callback":
        if (callbackTimeoutRef.current) {
          clearTimeout(callbackTimeoutRef.current); // Clear the callback timeout
          callbackTimeoutRef.current = null; // Reset the ref
        }
        setIsCallbackWaiting(false);
        break;

      case "util":
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Clear the delay timeout
          timeoutRef.current = null; // Reset the ref
        }
        setIsUtilWaiting(false);
        break;

      case "promise":
        if (promiseTimeoutRef.current) {
          clearTimeout(promiseTimeoutRef.current); // Clear the promise timeout
          promiseTimeoutRef.current = null; // Reset the ref
        }
        setIsPromiseWaiting(false);
        break;

      case "all":
        clearDelay("callback");
        clearDelay("util");
        clearDelay("promise");
        break;

      default:
        break;
    }
  }, []);

  // Function to cancel delay for specific type
  const cancelDelay = useCallback(
    (type: TClearDelayType) => clearDelay(type),
    [clearDelay],
  );

  // Function to start delay with optional custom delay time
  const startDelay = useCallback(
    (delay: number = defaultDelay) => {
      try {
        clearDelay("util"); // Clear any previous delay
        setIsUtilWaiting(true);

        timeoutRef.current = setTimeout(() => {
          callback?.();
          setIsUtilWaiting(false); // Update the state after the callback is executed
        }, delay); // Set the timeout with the specified delay
      } catch (error) {
        console.error("Error in starting delay:", error);
      }
    },
    [defaultDelay, clearDelay, callback],
  );

  // Function to create delay and return a promise
  const promiseDelay = useCallback(
    (delay: number = defaultDelay) =>
      new Promise<void>((resolve) => {
        try {
          clearDelay("promise"); // Clear any previous delay
          setIsPromiseWaiting(true);

          promiseTimeoutRef.current = setTimeout(() => {
            callback?.();
            setIsPromiseWaiting(false); // Update the state after the callback is executed
            resolve(); // Resolve the promise after callback
          }, delay); // Set the timeout with the specified delay
        } catch (error) {
          console.error("Error in starting delay:", error);
        }
      }),
    [defaultDelay, clearDelay, callback],
  );

  // Function to trigger the callback after a delay
  const triggerCallbackAfterDelay = useCallback(() => {
    if (callback) {
      try {
        clearDelay("callback"); // Ensure previous callback timeout is cleared
        setIsCallbackWaiting(true);
        callbackTimeoutRef.current = setTimeout(() => {
          setIsCallbackWaiting(false); // Reset state after callback execution
          callback?.(); // Execute the latest callback
        }, defaultDelay); // Ensure the callback is executed only once
      } catch (error) {
        console.error("Error in starting delay:", error);
      }
    }
  }, [defaultDelay, clearDelay, callback]);

  // Default callback delay on mount (if not disabled)
  useEffect(() => {
    if (!options?.disableInitialCallbackInvoke && callback) {
      try {
        setIsCallbackWaiting(true);
        callbackTimeoutRef.current = setTimeout(() => {
          callback?.(); // Use the latest callback
          setIsCallbackWaiting(false);
        }, defaultDelay); // Invoke callback after the default delay
      } catch (error) {
        console.error("Error in starting default delay:", error);
      }
    }
  }, [options?.disableInitialCallbackInvoke, defaultDelay, callback]);

  // Cleanup function on component unmount
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      clearDelay("all"); // Cleanup all timeouts on unmount
    };
  }, [clearDelay]);

  // Return the functions and state
  return {
    startDelay,
    cancelDelay,
    promiseDelay,
    triggerCallbackAfterDelay,
    waiting: {
      isCallbackWaiting,
      isUtilWaiting,
      isPromiseWaiting,
    },
  };
}
