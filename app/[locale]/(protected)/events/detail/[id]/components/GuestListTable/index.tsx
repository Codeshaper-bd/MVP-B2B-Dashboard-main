"use client";
import { getSeoMeta } from "@/lib/get-seo-meta";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

export const metadata = getSeoMeta({ title: "Promotions" });

function GuestListTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      {/* <DefaultTable.TitleContainer>
        <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
          <FlashIcon className="text-default-1000 w-[15.3px] h-[21.6px]" />
          Top Challenges
        </DefaultTable.TitleContainer.Title>
      </DefaultTable.TitleContainer> */}

      <DefaultTable.Table />

      {/* <DefaultTable.Footer>
        <ViewAllButton />
      </DefaultTable.Footer> */}
    </DefaultTable>
  );
}

export default GuestListTable;
