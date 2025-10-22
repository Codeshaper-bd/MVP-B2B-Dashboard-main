import { getRefundStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";

type IChecklistPanelProps = {
  title?: string;
  status?: string;
};

function ChecklistPanelCard({ title, status }: IChecklistPanelProps) {
  return (
    <Card className="space-y-3 px-5 py-4">
      <CardTitle className="text-[16px] font-medium text-default-900">
        {title}
      </CardTitle>
      <Badge className={cn(getRefundStatusColor(status), "font-medium")}>
        <span className="me-1.5 size-2 rounded-full bg-current"></span>
        {status}
      </Badge>
    </Card>
  );
}

export default ChecklistPanelCard;
