import type { THandleDeleteDiscount, THandleUpdateDiscount } from "./types";

export const handleUpdateDiscount: THandleUpdateDiscount =
  ({ discount, discounts, setTargetData, setEditModalOpen, setValue }) =>
  () => {
    setTargetData?.(discount);
    setEditModalOpen?.()?.();
  };

export const handleDeleteDiscount: THandleDeleteDiscount =
  ({ discount, discounts, setValue, deleteADiscount }) =>
  async () => {
    try {
      if (discount?.mode === "edit") {
        await deleteADiscount?.({
          id: discount?._id,
        }).unwrap();
      }
      const newDiscounts = discounts?.filter(
        (item) => item?.formIdentifier !== discount?.formIdentifier,
      );
      setValue("discounts", newDiscounts);
    } catch (error) {
      console.error("Error deleting discount:", error);
      // Handle error if needed
    }
  };
