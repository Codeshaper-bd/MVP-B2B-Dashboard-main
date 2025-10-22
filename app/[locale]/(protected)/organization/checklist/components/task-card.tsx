import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import IconBorder from "@/components/ui/icon-border";

interface ITaskCardProps {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}
function TaskCard({ number, title, description, children }: ITaskCardProps) {
  return (
    <Card className="bg-secondary">
      <CardContent className="p-5">
        <IconBorder className="size-8 rounded-full bg-primary text-default">
          {number}
        </IconBorder>
        <div className="mt-4">
          <h3 className="mb-2 text-base font-semibold text-default-1000">
            {title}
          </h3>
          <p className="text-sm text-default-700">{description}</p>
        </div>
        {children && <div>{children}</div>}
      </CardContent>
    </Card>
  );
}

export default TaskCard;
