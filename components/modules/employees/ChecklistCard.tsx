"use client";
import Link from "next/link";

import RightArrowIcon from "@/components/icons/RightArrowIcon";
import { useRouter } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";

export interface ChecklistCardProps {
  icon: React.ReactNode;
  iconColor?: string;
  title: string;
  description: string;
  link: string;
  hasArrow?: boolean;
}
function ChecklistCard({
  icon,
  iconColor,
  title,
  description,
  link,
  hasArrow,
}: ChecklistCardProps) {
  const router = useRouter();
  return (
    <Card
      className="group cursor-pointer border-none bg-secondary"
      onClick={() => router.push(link)}
    >
      <CardContent className="relative p-6">
        <div
          className="grid size-14 place-content-center rounded-full"
          style={{ backgroundColor: iconColor }}
        >
          {icon}
        </div>
        <h3 className="mb-2 mt-6 text-xl font-semibold text-foreground group-hover:text-primary">
          <Link href={link}>{title}</Link>
        </h3>
        <div className="flex gap-6">
          <div className="flex-1">
            <p className="text-default-700">{description}</p>
          </div>
          {hasArrow && (
            <div className="flex-none self-end">
              <Link href={link}>
                <RightArrowIcon className="size-5 text-default-700 hover:text-primary" />
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ChecklistCard;
