import InfoRingsIcon from "@/components/icons/InfoRingsIcon";
import { Card } from "@/components/ui/card";

function InfoRow() {
  return (
    <Card className="flex items-center gap-2 rounded-xl border border-solid border-default-200 bg-default-50 px-4 py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
      <InfoRingsIcon className="w-9 shrink-0" />

      <p className="text-sm font-semibold leading-5 text-default-700">
        Upload limit reached. Let&apos;s keep it to 4! Please remove one picture
        to continue
      </p>
    </Card>
  );
}

export default InfoRow;
