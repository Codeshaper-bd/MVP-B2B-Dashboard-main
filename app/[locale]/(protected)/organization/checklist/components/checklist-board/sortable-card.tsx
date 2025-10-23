import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

import { getResponseTypeStatusColor } from "@/lib/get-status-colors";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import DragIcon from "@/components/icons/DragIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import IconBorder from "@/components/ui/icon-border";
import { Separator } from "@/components/ui/separator";

import AddEditChecklist from "../add-edit-checklist";
import type { TSortableCardProps } from "./data";

function SortableCard({ card }: TSortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-secondary"
    >
      <CardContent className="px-2 py-4">
        <div className="flex gap-4">
          <DragIcon
            className="size-6 flex-none cursor-grab text-default-1000"
            {...listeners}
          />
          <div className="flex-1">
            <IconBorder className="size-8 rounded-full bg-primary text-default">
              {card.id}
            </IconBorder>
            <h3 className="mb-3 mt-4 font-semibold text-default-1000">
              {card.title}
            </h3>
            <ul className="space-y-3">
              <li className="flex text-base text-default-700">
                <div className="w-fit sm:w-[168px]">Variable Name</div>
                <div>: {card.variableName} </div>
              </li>
              <li className="flex text-base text-default-700">
                <div className="w-fit sm:w-[168px]">Response Type</div>
                <div>
                  :{" "}
                  <Badge
                    className={getResponseTypeStatusColor(
                      card?.responseType?.toLocaleLowerCase(),
                    )}
                  >
                    {card?.responseType}
                  </Badge>{" "}
                </div>
              </li>
              {card?.JacketsLeft && (
                <li className="flex text-base text-default-700">
                  <div className="w-fit sm:w-[168px]">Jackets Left</div>
                  <div>: {card?.JacketsLeft}</div>
                </li>
              )}
              {card?.onLight && (
                <li className="flex text-base text-default-700">
                  <div className="w-fit sm:w-[168px]">On Light</div>
                  <div className="font-medium capitalize">
                    : {card?.onLight}
                  </div>
                </li>
              )}
            </ul>
            <Separator className="my-4" />
            <div className="flex items-center gap-6">
              <AddEditChecklist id={card.id} />

              <div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-semibold text-[#F97066]"
                >
                  <DeleteIcon className="me-1.5 size-5" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SortableCard;
