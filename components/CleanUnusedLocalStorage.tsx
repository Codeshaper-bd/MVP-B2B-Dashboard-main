"use client";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TUserVerifiedData } from "@/store/api/profile/profile.types";

type TLocalStorage = Record<"userVerificationToken", TUserVerifiedData | null> &
  Record<"ab", TUserVerifiedData | null>;
type TLocalStorageKey = keyof TLocalStorage;

const localStorageKeys: TLocalStorageKey[] = ["userVerificationToken"];

function CleanUnusedLocalStorage() {
  const interValRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(dayjs().toDate());

  useEffect(() => {
    if (
      !!startTimeRef?.current &&
      compareDateTimes({
        providedDateTime: dayjs().toDate(),
        comparisonUnit: "minutes",
      })?.result <= 60 &&
      interValRef.current
    ) {
      clearInterval(interValRef.current);
    }

    interValRef.current = setInterval(
      () => {
        const manageLocalStorage = async () => {
          try {
            const promiseResults = await Promise.allSettled(
              localStorageKeys.map(async (localStorageKey) => {
                const localStorageResponse =
                  await localStorageUtil.getItemAsync<
                    TLocalStorage[TLocalStorageKey]
                  >(localStorageKey);

                if (localStorageResponse?.data?.verifyUserExpiresAt) {
                  const isExpired =
                    compareDateTimes({
                      providedDateTime:
                        localStorageResponse?.data?.verifyUserExpiresAt,
                    })?.status !== "after";

                  if (isExpired) {
                    await localStorageUtil.removeItemAsync(localStorageKey);
                  }
                }

                return localStorageResponse;
              }),
            );

            promiseResults?.forEach((result, index) => {
              if (result.status === "rejected") {
                console.error(
                  `⚠️ Failed to manage localStorage key ${localStorageKeys[index]} data:`,
                  result.reason,
                );
              }
            });
          } catch (error) {
            console.error("", error);
          }
        };

        manageLocalStorage();
      },
      1000 * 60 * 1,
    );

    return () => {
      if (interValRef.current) {
        clearInterval(interValRef.current);
      }
    };
  }, []);

  return null;
}

export default CleanUnusedLocalStorage;
