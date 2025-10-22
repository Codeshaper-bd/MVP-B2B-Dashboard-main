import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";

export type TPrepareEventDetailsFormStateDataProps = {
  getAnEventData: TEvent;
};

export const prepareChallengeFormStateData = async ({
  getAnEventData,
}: TPrepareEventDetailsFormStateDataProps) => {
  let localChallenges: TChallenge[] | TNullish = null;
  try {
    const localChallengesGetRes =
      await localStorageUtil.getItemAsync<TChallenge[]>("challenges");
    if (!localChallengesGetRes?.success) {
      throw new Error("Failed to get challenges from local storage");
    }
    localChallenges = Array.isArray(localChallengesGetRes.data)
      ? localChallengesGetRes.data
      : null;
  } catch (error) {
    console.error("Failed to get challenges from local storage", error);
  }

  return {
    challenges:
      localChallenges ||
      (Array.isArray(getAnEventData?.challenges)
        ? getAnEventData?.challenges
        : null),
  };
};
