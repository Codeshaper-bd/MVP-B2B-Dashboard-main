"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";

import ProductsContent from "./product-content";
import TicketsContent from "./tickets-content";

function PurchaseHistory() {
  const [open, setOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("Tickets");
  const toggleOpen = () => setOpen(!open);
  return (
    <div>
      <div className="flex items-center py-5">
        <h3 className="flex-1 text-xl">Order History</h3>
        <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1 rounded-[10px] border border-default-100 p-1">
            {["Tickets", "Product"].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => setTab(item)}
                className={cn("", {
                  "bg-default-50 text-primary hover:text-primary": tab === item,
                })}
              >
                {item}
              </Button>
            ))}
          </div>
          <Button
            color={open ? "primary" : "secondary"}
            onClick={toggleOpen}
            size="lg"
            className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
          >
            <FilterIcon className="me-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
      {tab === "Tickets" && <TicketsContent />}
      {tab === "Product" && <ProductsContent />}
    </div>
  );
}

export default PurchaseHistory;
