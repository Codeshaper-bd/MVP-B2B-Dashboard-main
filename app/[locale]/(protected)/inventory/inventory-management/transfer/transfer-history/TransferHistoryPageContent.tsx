"use client";

import HistoryTable from "./components/HistoryTable";
import TransferEventCardList from "./components/TransferEventCardList";

function TransferHistoryPageContent() {
  return (
    <div className="space-y-6">
      <TransferEventCardList />
      <HistoryTable />
    </div>
  );
}

export default TransferHistoryPageContent;
