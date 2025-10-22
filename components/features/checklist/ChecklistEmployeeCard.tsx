import { getEmployeeStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";

type IChecklistEmployeeProps = {
  name?: string;
  bar?: string;
  status?: string;
  media?: { url: string }[];
};

function ChecklistEmployeeCard({
  name,
  bar,
  status,
  media = [],
}: IChecklistEmployeeProps) {
  return (
    <Card className="flex gap-4 px-4 py-3.5">
      <div className="flex items-center">
        <Avatar className="size-10">
          <AvatarImage src={media[0]?.url || ""} />
          <AvatarFallback className="h-full w-full bg-[#1F242F]">
            {name?.slice(0, 2)}{" "}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-1">
        <div className="flex items-center">
          <CardTitle className="text-[14px] font-normal text-default-900">
            {name}
          </CardTitle>
          {bar && (
            <Badge className="border-none text-sm font-normal text-default-700">
              <span className="me-1.5 size-1 rounded-full bg-current"></span>
              {bar}
            </Badge>
          )}
        </div>
        <Badge
          className={cn(getEmployeeStatusColor(status ?? ""), "font-medium")}
        >
          {status}
        </Badge>
      </div>
    </Card>
  );
}

export default ChecklistEmployeeCard;
