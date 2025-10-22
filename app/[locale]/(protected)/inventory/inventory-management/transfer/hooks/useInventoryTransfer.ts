"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { useGetAllBarsQuery } from "@/store/api/bars/bars-api";
import {
  useGetAllInventoryItemQuery,
  useGetAllInventoryItemIncludingBarQuery,
} from "@/store/api/inventory-item/inventory-item-api";
import type {
  TGroupInventoryItemData,
  TSoldBy,
} from "@/store/api/inventory-item/inventory-item.types";
import { useCreateInventoryTransferMutation } from "@/store/api/inventory-transfer/inventory-transfer-api";
import { useToast } from "@/components/ui/use-toast";

interface TransferItem {
  productId: number;
  quantity: number;
  productName: string;
  productImage?: string;
  productDetails: {
    id: number;
    stock: number;
    stockInCases: number;
    price: number;
    unit?: string;
    volume?: string;
  };
}

interface UseInventoryTransferProps {
  initialSourceBarSlug?: string | null;
}

export function useInventoryTransfer({
  initialSourceBarSlug,
}: UseInventoryTransferProps = {}) {
  const router = useRouter();
  const toastProps = useToast();

  // State for selected bars
  const [sourceBarId, setSourceBarId] = useState<number | null>(null);
  const [sourceBarSlug, setSourceBarSlug] = useState<string | null>(
    initialSourceBarSlug || null,
  );
  const [destBarId, setDestBarId] = useState<number | null>(null);

  // State for transfer quantities
  const [transferQuantities, setTransferQuantities] = useState<
    Record<number, number>
  >({});

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for notes
  const [notesState, setNotesState] = useState<string>("");

  // Get filter parameters
  const { getAParamValue } = useManageSearchParams<{
    tab?: string;
    soldBy?: string;
    volume?: string;
    search?: string;
    categories?: string;
    notes?: string;
  }>();
  const tab = getAParamValue("tab");
  const soldBy = getAParamValue("soldBy");
  const volume = getAParamValue("volume");
  const search = getAParamValue("search");
  const categories = getAParamValue("categories");
  const notesParam = getAParamValue("notes");

  // Update notes state when URL param changes
  useEffect(() => {
    setNotesState(notesParam || "");
  }, [notesParam]);

  // Fetch bars data
  const { data: barsData } = useGetAllBarsQuery({});

  // Fetch inventory items for the source bar or stock room
  const { data: barInventoryData } = useGetAllInventoryItemIncludingBarQuery(
    {
      barSlug: sourceBarSlug,
      type: tab === "non-alcoholic" ? "NON_ALCOHOLIC" : "ALCOHOLIC",
      soldBy: soldBy as TSoldBy,
      search,
      categories,
    },
    { skip: !sourceBarSlug || sourceBarId === null },
  );

  // Fetch inventory items for stock room
  const { data: stockRoomInventoryData } = useGetAllInventoryItemQuery(
    {
      type: tab === "non-alcoholic" ? "NON_ALCOHOLIC" : "ALCOHOLIC",
      soldBy: soldBy as TSoldBy,
      search,
      categories,
    },
    { skip: sourceBarId !== null },
  );

  // Mutation for creating inventory transfer
  const [createTransfer, createTransferResult] =
    useCreateInventoryTransferMutation();

  // Pre-select the current bar as source when bars data is loaded
  useEffect(() => {
    if (barsData?.data && sourceBarSlug) {
      const currentBar = barsData.data.find(
        (bar) => bar.slug === sourceBarSlug,
      );
      if (currentBar) {
        setSourceBarId(currentBar.id);
      }
    }
  }, [barsData, sourceBarSlug]);

  // Define type-safe accessor functions for different data structures
  const getBarInventoryItems = useCallback(
    () => barInventoryData?.data?.items || [],
    [barInventoryData],
  );

  const getStockRoomItems = useCallback(
    () => stockRoomInventoryData?.data || [],
    [stockRoomInventoryData],
  );

  // Get the appropriate items based on selection with memoization
  const inventoryItems = useMemo(() => {
    let items =
      sourceBarId === null ? getStockRoomItems() : getBarInventoryItems();

    // Apply volume filter if present
    if (volume) {
      items = items.filter((item) => {
        // Check if any child has the matching volume
        if (item.children && item.children.length > 0) {
          return item.children.some(
            (child) => child.volume && child.volume.toString() === volume,
          );
        }
        return false;
      });
    }

    return items;
  }, [
    sourceBarId,
    getStockRoomItems,
    getBarInventoryItems,
    volume,
    categories,
  ]);

  // Handle source bar change
  const handleSourceBarChange = useCallback(
    (id: number | null) => {
      setSourceBarId(id);
      if (id === null) {
        setSourceBarSlug(null);
      } else {
        const bar = barsData?.data?.find((b) => b.id === id);
        if (bar) {
          setSourceBarSlug(bar.slug);
        }
      }

      // Reset transfer quantities when source bar changes
      setTransferQuantities({});
    },
    [barsData?.data],
  );

  // Handle quantity change with debounce to prevent excessive re-renders
  const { debounce } = useDebounce<
    { productId: number; quantity: number },
    { productId: number; quantity: number }, // Explicitly set fallback type
    { productId: number; quantity: number } // Explicitly set non-debounced fallback type
  >({
    debouncedFunction: (value) => {
      setTransferQuantities((prev) => ({
        ...prev,
        [value.productId]: value.quantity,
      }));
    },
    delay: 100,
    value: { productId: 0, quantity: 0 },
    debouncedFallbackValue: { productId: 0, quantity: 0 },
    nonDebouncedValueFallback: { productId: 0, quantity: 0 },
  });

  const handleQuantityChange = useCallback(
    (productId: number, quantity: number) => {
      debounce()({ productId, quantity });
    },
    [debounce],
  );

  // Handle item removal from the transfer summary modal
  const handleItemRemove = useCallback((itemId: number) => {
    // Reset the quantity for the removed item to 0
    setTransferQuantities((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  }, []);

  // Get items with quantity > 0
  const itemsToTransfer = useMemo(
    () =>
      // Using the TransferItem interface defined at the top of the file

      Object.entries(transferQuantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([productId, quantity]) => {
          // Find the product or volume variant in the inventory data
          // Using a more flexible type that matches the actual structure
          // Using Record<string, unknown> to allow accessing properties while avoiding 'any'
          let productData: Record<string, unknown> | null = null;
          let parentProduct: Record<string, unknown> | null = null;

          // Get items from the appropriate source - use the memoized value directly
          const typedItems = inventoryItems as TGroupInventoryItemData[];

          // First check if it's a volume variant (child)
          for (const item of typedItems) {
            if (item.children && item.children.length > 0) {
              const child = item.children.find(
                (c) => c.id === Number(productId),
              );
              if (child) {
                productData = child;
                parentProduct = item;
                break;
              }
            }
          }

          // If not found as a child, check if it's a parent product
          if (!productData) {
            productData =
              typedItems.find((p) => p.id === Number(productId)) || null;
          }

          // Skip this item if productData is undefined (happens when changing filters)
          if (!productData) {
            return null;
          }

          // Extract the featured image URL from the parent product or the product itself
          // Using type assertions to specify the expected types
          const mediaUrl = parentProduct
            ? (
                parentProduct.media as Array<{
                  isFeatured: boolean;
                  url?: string;
                }>
              )?.filter((m) => m.isFeatured)[0]?.url
            : (
                productData?.media as Array<{
                  isFeatured: boolean;
                  url?: string;
                }>
              )?.filter((m) => m.isFeatured)[0]?.url;

          return {
            productId: Number(productId),
            quantity,
            productName: parentProduct
              ? (parentProduct.name as string)
              : (productData?.name as string | undefined) || "Unknown Product",
            productImage: mediaUrl,
            productDetails: {
              id: Number(
                (productData.inventoryItemId as number | undefined) || 0,
              ),
              stock: (productData?.currentStock as number | undefined) || 0,
              stockInCases:
                (productData?.currentStockInCases as number | undefined) || 0,
              price: (productData?.pricePerUnit as number | undefined) || 0,
              unit: (productData?.unit as string | undefined) || "",
              volume: (productData?.volume as string | undefined) || "",
            },
          } as TransferItem;
        })
        .filter((item): item is TransferItem => item !== null),
    [transferQuantities, inventoryItems],
  );

  // Handle transfer submission
  const handleTransfer = useCallback(async () => {
    if (itemsToTransfer.length === 0) {
      toastProps.toast({
        title: "Error",
        description: "No items selected for transfer",
        variant: "destructive",
      });
      return;
    }

    const toastId = toastProps.toast({
      variant: "loading",
      title: "Processing Inventory Transfer...",
      description: "Please wait while we process your inventory transfer.",
    });

    try {
      await createTransfer({
        sourceId: sourceBarId,
        destinationId: destBarId,
        items: itemsToTransfer.map((item) => ({
          productId:
            sourceBarId === null
              ? item.productId
              : (item.productDetails?.id ?? 0),
          quantity: item.quantity,
        })),
        notes: notesState || undefined,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Transfer Completed Successfully",
        description: "Inventory transfer has been completed successfully.",
      });

      // Navigate back to the source bar inventory page
      const locale = window.location.pathname.split("/")[1]; // Extract locale from URL
      if (sourceBarSlug) {
        router.push(
          `/${locale}/inventory/inventory-management/bar-inventory/${sourceBarSlug}`,
        );
      } else {
        router.push(`/${locale}/inventory/inventory-management`);
      }
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Transfer Failed",
          description:
            "Failed to complete inventory transfer. Please try again.",
        }),
      });
    }
  }, [
    toastProps,
    sourceBarId,
    destBarId,
    itemsToTransfer,
    createTransfer,
    router,
    sourceBarSlug,
    notesState,
  ]);

  // Reset all transfer quantities
  const resetTransferQuantities = useCallback(() => {
    setTransferQuantities({});
  }, []);

  return {
    // State
    sourceBarId,
    sourceBarSlug,
    destBarId,
    transferQuantities,
    isModalOpen,

    // Filter params
    tab,
    soldBy,
    volume,
    search,
    categories,
    notes: notesState,

    // Data
    barsData: barsData?.data || [],
    // Return the memoized value directly
    inventoryItems,
    itemsToTransfer,

    // Functions
    setSourceBarId,
    setSourceBarSlug,
    setDestBarId,
    setIsModalOpen,
    handleSourceBarChange,
    handleQuantityChange,
    handleItemRemove,
    handleTransfer,
    resetTransferQuantities,
    setNotesState,
  };
}
