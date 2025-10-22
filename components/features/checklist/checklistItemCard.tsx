import { getRefundStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChecklistItemCardProps {
  stepNumber: number | string;
  title: string;
  description: string;
  status: string;
  children?: React.ReactNode;
}

export function ChecklistItemCard({
  stepNumber,
  title,
  description,
  status,
  children,
}: ChecklistItemCardProps) {
  return (
    <Card className="bg-default-50">
      <CardHeader className="flex flex-col items-start gap-4 !px-5 !py-4 md:flex-row md:items-center">
        <div className="me-1.5 size-8 rounded-full bg-primary p-2 text-center text-sm font-semibold text-default">
          {stepNumber}
        </div>
        <div className="flex-1 space-y-1">
          <CardTitle className="text-sm font-semibold text-default-900">
            {title}
          </CardTitle>
          <CardDescription className="text-default-700">
            {description}
          </CardDescription>
        </div>
        <Badge className={cn(getRefundStatusColor(status), "font-medium")}>
          {status}
        </Badge>
      </CardHeader>
      {children && (
        <CardContent className="!px-5 !py-4">{children}</CardContent>
      )}
    </Card>
  );
}
