import { getStatusColors } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

export interface IEmployeeItem {
  name: string;
  roles: string[];
  image?: string;
}
function EmployeeItem({ name, image, roles }: IEmployeeItem) {
  return (
    <div className="flex gap-4 px-5 py-4">
      <div className="flex-none">
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <h2 className="mb-0.5 text-base font-semibold text-default-700">
          {name}
        </h2>
        <div className="flex items-center gap-1.5">
          {roles.map((role, index) => (
            <Badge
              key={`role-badge-${index}`}
              className={cn(getStatusColors(role))}
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeItem;
