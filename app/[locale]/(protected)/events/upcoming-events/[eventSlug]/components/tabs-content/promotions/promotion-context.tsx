import { createContext, useContext, useState, memo, useEffect } from "react";

import type { TNullish } from "@/store/api/common-api-types";
import type { TPromotion } from "@/store/api/promotion/promotion.types";

type TAddMode = "start" | "end";

interface PromotionContextType {
  promotions: TPromotion[] | TNullish;
  addPromotion: (promotion: TPromotion, mode?: TAddMode) => void;
  removePromotion: (id: number) => void;
  updatePromotion: (id: number, updatedPromotion: TPromotion) => void;
}

const PromotionContext = createContext<PromotionContextType | undefined>(
  undefined,
);

type TPromotionProviderProps = {
  children: React.ReactNode | ((data: PromotionContextType) => React.ReactNode);
  promotionsData: TPromotion[] | TNullish;
};

function PromotionProvider({
  children,
  promotionsData,
}: TPromotionProviderProps) {
  const [promotions, setPromotions] = useState<TPromotion[] | TNullish>(
    promotionsData,
  );

  useEffect(() => {
    setPromotions(promotionsData);
  }, [promotionsData]);

  const addPromotion = (promotion: TPromotion, mode: TAddMode = "end") => {
    setPromotions((prev) => {
      if (!Array.isArray(prev)) {
        return [promotion];
      }

      // Check for duplicates by id (assuming id is the unique identifier)
      if (
        promotion?.id &&
        prev?.some((c) => !!c?.id && !!promotion?.id && c?.id === promotion?.id)
      ) {
        return prev; // Return unchanged if duplicate found
      }

      // Create new array and add promotion at start or end
      return mode === "start" ? [promotion, ...prev] : [...prev, promotion];
    });
  };

  const removePromotion = (id: number) => {
    setPromotions(
      (prev) =>
        prev?.filter(
          (promotion) => !!promotion?.id && !!id && promotion?.id !== id,
        ) ?? [],
    );
  };

  const updatePromotion = (id: number, updatedPromotion: TPromotion) => {
    setPromotions(
      (prev) =>
        prev?.map((promotion) =>
          !!promotion?.id && !!id && promotion?.id === id
            ? updatedPromotion
            : promotion,
        ) ?? [],
    );
  };

  return (
    <PromotionContext.Provider
      value={{ promotions, addPromotion, removePromotion, updatePromotion }}
    >
      {typeof children === "function"
        ? children?.({
            promotions,
            addPromotion,
            removePromotion,
            updatePromotion,
          })
        : children}
    </PromotionContext.Provider>
  );
}

export default memo(PromotionProvider) as typeof PromotionProvider;

export const usePromotionContext = (): PromotionContextType => {
  const context = useContext(PromotionContext);
  if (!context) {
    throw new Error(
      "usePromotionContext must be used within a PromotionProvider",
    );
  }
  return context;
};
