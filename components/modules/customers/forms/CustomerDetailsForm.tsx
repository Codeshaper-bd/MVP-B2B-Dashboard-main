import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import type { TGender } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TCustomerLookup } from "@/store/api/customer-lookup/customer-lookup.types";
import { CopyInput } from "@/components/copy-input";
import { CalendarIcon as CalendarIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { Textarea } from "@/components/ui/textarea";

export type TGenderTypeOption = { value: TGender; label: string };
export const genderTypeOptions: TGenderTypeOption[] = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

interface ICustomerInfoFormProps {
  customerLookupData: TCustomerLookup | TNullish;
}

function CustomerDetailsForm({ customerLookupData }: ICustomerInfoFormProps) {
  return (
    <form className="mt-6" noValidate>
      <div className="space-y-6">
        <Input
          id="customerName"
          type="text"
          value={
            customerLookupData?.fullName ||
            `${customerLookupData?.firstName} ${customerLookupData?.lastName}`
          }
          label="Customer Name"
          backgroundColor={"secondary"}
          readOnly
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Input
            id="customerEmail"
            type="email"
            label="Email Address"
            backgroundColor="secondary"
            value={customerLookupData?.email}
            readOnly
          />

          <Input
            id="customerPhone"
            type="text"
            label="Phone number"
            backgroundColor="secondary"
            value={customerLookupData?.phone}
            readOnly
          />
        </div>

        <CopyInput
          id="customerId"
          type="text"
          label="Customer ID"
          backgroundColor="secondary"
          value={customerLookupData?.customerId?.toString()}
          readOnly
          className="ps-4"
        />
        <Input
          type="text"
          label="Gender"
          backgroundColor="secondary"
          value={customerLookupData?.gender?.toLocaleLowerCase()}
          readOnly
        />

        <Textarea
          id="customerAddress"
          label="Address"
          backgroundColor="secondary"
          rows={4}
          placeholder="Address"
          value={customerLookupData?.address}
          readOnly
        />

        <LabelErrorWrapper label="Date of Birth">
          <Button
            variant="outline"
            color="secondary"
            fullWidth
            size="lg"
            className={cn(
              "justify-start border-default-200 bg-secondary text-left text-sm font-normal md:px-4",
              !customerLookupData?.birthday && "text-muted-foreground",
            )}
            type="button"
          >
            <CalendarIcon className="me-1 size-5" />
            {convertUTCToLocal({
              utcDateTime: customerLookupData?.birthday,
              format: "DD-MMM-YYYY",
            })}
          </Button>
        </LabelErrorWrapper>
      </div>
    </form>
  );
}

export default CustomerDetailsForm;
