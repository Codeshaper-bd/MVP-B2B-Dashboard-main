import React from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { useSelectInputContext } from "./SelectProvider";

function Trigger() {
  const { toggle } = useBooleanContext();
  const { value } = useSelectInputContext();
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      fullWidth
      className="flex items-center justify-between md:px-3.5"
      onClick={toggle}
    >
      {value ? (
        <span className="text-base text-[#85888E]">{value?.name}</span>
      ) : (
        <span className="text-base text-default-1000">Select Product</span>
      )}
      <ChevronDownIcon className="size-5 text-default-500" />
    </Button>
  );
}

export default Trigger;
