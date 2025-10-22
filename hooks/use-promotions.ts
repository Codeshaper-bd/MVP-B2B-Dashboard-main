import { atom, useAtom } from "jotai";

export type PromotionConfig = {
  status: "active" | "inactive";
};

const promotionConfigAtom = atom<PromotionConfig>({
  status: "active",
});

export function usePromotionConfig() {
  return useAtom(promotionConfigAtom);
}
