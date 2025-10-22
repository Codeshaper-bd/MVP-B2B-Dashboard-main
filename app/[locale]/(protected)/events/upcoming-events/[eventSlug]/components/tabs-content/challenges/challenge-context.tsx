import { createContext, useContext, useState, memo, useEffect } from "react";

import type { TChallenge } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";

type TAddMode = "start" | "end";

interface ChallengeContextType {
  challenges: TChallenge[] | TNullish;
  addChallenge: (challenge: TChallenge, mode?: TAddMode) => void;
  removeChallenge: (id: number) => void;
  updateChallenge: (id: number, updatedChallenge: TChallenge) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined,
);

type TChallengeProviderProps = {
  children: React.ReactNode | ((data: ChallengeContextType) => React.ReactNode);
  challengesData: TChallenge[] | TNullish;
};

function ChallengeProvider({
  children,
  challengesData,
}: TChallengeProviderProps) {
  const [challenges, setChallenges] = useState<TChallenge[] | TNullish>(
    challengesData,
  );

  useEffect(() => {
    setChallenges(challengesData);
  }, [challengesData]);

  const addChallenge = (challenge: TChallenge, mode: TAddMode = "end") => {
    setChallenges((prev) => {
      if (!Array.isArray(prev)) {
        return [challenge];
      }

      // Check for duplicates by id (assuming id is the unique identifier)
      if (
        challenge?.id &&
        prev?.some((c) => !!c?.id && !!challenge?.id && c?.id === challenge?.id)
      ) {
        return prev; // Return unchanged if duplicate found
      }

      // Create new array and add challenge at start or end
      return mode === "start" ? [challenge, ...prev] : [...prev, challenge];
    });
  };

  const removeChallenge = (id: number) => {
    setChallenges(
      (prev) =>
        prev?.filter(
          (challenge) => !!challenge?.id && !!id && challenge?.id !== id,
        ) ?? [],
    );
  };

  const updateChallenge = (id: number, updatedChallenge: TChallenge) => {
    setChallenges(
      (prev) =>
        prev?.map((challenge) =>
          !!challenge?.id && !!id && challenge?.id === id
            ? updatedChallenge
            : challenge,
        ) ?? [],
    );
  };

  return (
    <ChallengeContext.Provider
      value={{ challenges, addChallenge, removeChallenge, updateChallenge }}
    >
      {typeof children === "function"
        ? children?.({
            challenges,
            addChallenge,
            removeChallenge,
            updateChallenge,
          })
        : children}
    </ChallengeContext.Provider>
  );
}

export default memo(ChallengeProvider) as typeof ChallengeProvider;

export const useChallengeContext = (): ChallengeContextType => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error(
      "useChallengeContext must be used within a ChallengeProvider",
    );
  }
  return context;
};
