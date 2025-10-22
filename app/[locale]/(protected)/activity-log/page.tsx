import { getSeoMeta } from "@/lib/get-seo-meta";
import ActivityLogs from "@/components/partials/header/activity-log";
import PageHeader from "@/components/partials/header/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = getSeoMeta({ title: "Activity Logs" });
export default function ActivityLogPage() {
  return (
    <>
      <PageHeader title="Activity Log" />
      <Card>
        <CardHeader className="text-lg font-semibold text-default-1000">
          Activity History
        </CardHeader>
        <Separator />
        <CardContent>
          <ActivityLogs />
        </CardContent>
      </Card>
    </>
  );
}
