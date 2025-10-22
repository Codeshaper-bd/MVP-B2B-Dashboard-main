import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";
import {
  Pagination,
  PaginationButton,
  PaginationButtonNext,
  PaginationButtonPrevious,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";

import DraftPosts from "./components/DraftPosts";
import ScheduledPosts from "./components/ScheduledPosts";

function DraftSchedulePostPage() {
  return (
    <div>
      <PageHeader title="A.I Generated Campaigns" description="By Fennec AI" />

      <DynamicBreadcrumb />

      <DraftPosts className="mb-[30px]" />

      <ScheduledPosts />

      <Separator className="mb-5 mt-4" />

      <Pagination className="mb-20">
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationButtonPrevious />
          </PaginationItem>

          <PaginationItem>
            <PaginationContent>
              <PaginationItem>
                <PaginationButton>1</PaginationButton>
              </PaginationItem>

              <PaginationItem>
                <PaginationButton isActive>2</PaginationButton>
              </PaginationItem>

              <PaginationItem>
                <PaginationButton>3</PaginationButton>
              </PaginationItem>

              <PaginationItem>
                <PaginationButton>...</PaginationButton>
              </PaginationItem>

              <PaginationItem>
                <PaginationButton>8</PaginationButton>
              </PaginationItem>

              <PaginationItem>
                <PaginationButton>9</PaginationButton>
              </PaginationItem>

              <PaginationItem>
                <PaginationButton>10</PaginationButton>
              </PaginationItem>
            </PaginationContent>
          </PaginationItem>

          <PaginationItem>
            <PaginationButtonNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DraftSchedulePostPage;
