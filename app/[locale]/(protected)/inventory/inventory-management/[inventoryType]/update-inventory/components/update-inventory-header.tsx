import { memo } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import SeparatorLabel from "@/components/separator-label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import ProductImport from "./product-import";

function UpdateInventoryHeader() {
  const { state: isMinimized, toggle: toggleMinimized } = useBooleanState({
    defaultValue: true,
  });

  return (
    <div>
      <SeparatorLabel>
        <Button
          type="button"
          className="border-secondary bg-default-50"
          onClick={toggleMinimized()}
        >
          <ChevronDownIcon className="me-1.5 size-5 text-default-700" />{" "}
          {isMinimized ? "  Minimize" : "Maximize"}
        </Button>
      </SeparatorLabel>

      <Collapsible open={isMinimized}>
        <CollapsibleContent>
          <ProductImport />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default memo(UpdateInventoryHeader);
