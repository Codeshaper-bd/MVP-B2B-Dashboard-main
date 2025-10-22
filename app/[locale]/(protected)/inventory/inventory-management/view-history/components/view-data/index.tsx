import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationButton,
  PaginationButtonNext,
  PaginationButtonPrevious,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";

import { historyData } from "./data";
import HistoryCard from "./history-card";
function ViewData() {
  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <div className="custom-scrollbar max-h-[80vh]">
          {historyData.map((item, index) => (
            <HistoryCard key={index} {...item} />
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="px-6 py-3.5">
        <Pagination>
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

                <PaginationItem className="hidden md:block">
                  <PaginationButton>3</PaginationButton>
                </PaginationItem>

                <PaginationItem>
                  <PaginationButton>...</PaginationButton>
                </PaginationItem>

                <PaginationItem className="hidden md:block">
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
      </CardFooter>
    </Card>
  );
}

export default ViewData;
