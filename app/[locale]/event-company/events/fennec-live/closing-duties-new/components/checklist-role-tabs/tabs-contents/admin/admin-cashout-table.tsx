import VueSaxArrowCircleUpIcon from "@/components/icons/VueSaxArrowCircleUpIcon";
import { Input } from "@/components/ui/input";

const denominations = {
  COINS: ["$0.25", "$1", "$2", "$5", "$10", "$20", "$50", "$100"],
};

function Row({ label }: { label: string }) {
  return (
    <div className="col-span-12 grid grid-cols-12 border-b border-default-100 px-5 py-2.5">
      <div className="col-span-6 flex items-center">{label}</div>
      <div className="col-span-3">
        <Input className="h-fit w-[104px] p-2" value={0} />
      </div>
      <div className="col-span-3 flex items-center">$0</div>
    </div>
  );
}

function AdminCashOutTable() {
  return (
    <div className="w-full overflow-x-auto rounded-[12px] bg-default px-6 py-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-medium uppercase text-default-900">
          Cash On Hand
        </h3>
        <VueSaxArrowCircleUpIcon className="size-6 cursor-pointer text-default-500" />
      </div>
      <div className="mt-5 min-w-[600px] space-y-2">
        <div className="grid grid-cols-12 rounded-[8px] bg-default-50 px-6 py-2.5 text-xs font-medium text-default-700">
          <div className="col-span-6 uppercase">Denomination</div>
          <div className="col-span-3 uppercase">Quantity</div>
          <div className="col-span-3 uppercase">Subtotal</div>
        </div>

        <div className="grid grid-cols-12 gap-2.5 rounded-[8px] bg-default py-2.5 text-xs font-medium text-default-700">
          {Object.entries(denominations).map(([section, values]) => (
            <div key={section} className="col-span-12">
              <div className="px-5 py-3.5">{section}</div>
              {values.map((value) => (
                <Row key={value} label={value} />
              ))}
            </div>
          ))}
          <div className="col-span-12">
            <div className="flex items-center justify-between border-b border-default-100 px-5 py-2.5 text-base">
              <h3>Total Cashout:</h3>{" "}
              <h3 className="font-semibold text-primary">$171.00</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCashOutTable;
