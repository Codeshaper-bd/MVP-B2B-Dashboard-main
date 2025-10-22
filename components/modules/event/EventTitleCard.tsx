import { cn } from "@/lib/utils";
import CloudDownloadIcon from "@/components/icons/CloudDownloadIcon";
import { Button } from "@/components/ui/button";
import { CardContent, Card, CardTitle } from "@/components/ui/card";
export type EventTitleCardProps = {
  title: string;
  date: string;
  filePath: string;
  className?: string;
};
function EventTitleCard({
  title,
  date,
  filePath,
  className,
}: EventTitleCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[320px] flex-1">
            <CardTitle className="mb-0.5 font-semibold">{title}</CardTitle>
            <p className="text-sm text-default-600">{date}</p>
          </div>

          <Button color="secondary" asChild className="flex-none">
            <a href={filePath} target="_blank" download={"event.png"}>
              <CloudDownloadIcon className="me-2 size-5" />
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventTitleCard;
