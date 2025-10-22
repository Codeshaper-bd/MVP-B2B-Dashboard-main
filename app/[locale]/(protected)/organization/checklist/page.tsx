import Link from "next/link";

import ClockRewindIcon from "@/components/icons/ClockRewindIcon";
import PageHeader from "@/components/partials/header/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ChecklistTop from "./components/checklist-top";
import ConfigureChecklist from "./components/configure-checklist";

function ChecklistPage() {
  return (
    <div>
      <PageHeader title="Checklist" description="" />
      <Separator />
      <ChecklistTop />
      <ConfigureChecklist />
      <div className="flex justify-center py-16">
        <Button type="button" asChild color="primary">
          <Link href="./checklist/checklist-history">
            <ClockRewindIcon className="me-1.5 size-4 text-default-200" />{" "}
            Checklist History
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ChecklistPage;
