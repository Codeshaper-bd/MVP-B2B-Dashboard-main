import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BudgetingTable from "./budgeting-table";
import TransactionTable from "./transactions-table";

export default function BudgetingAccounts() {
  return (
    <div className="mt-6">
      <Tabs defaultValue="event">
        <div className="overflow-x-auto md:w-fit">
          <TabsList className="w-max min-w-full rounded-lg border border-secondary">
            <TabsTrigger className="font-normal" value="event">
              Event Payout
            </TabsTrigger>
            <TabsTrigger className="font-normal" value="transaction">
              Transaction History
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="event" className="mt-4">
          <BudgetingTable />
        </TabsContent>
        <TabsContent value="transaction" className="mt-4">
          <TransactionTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
