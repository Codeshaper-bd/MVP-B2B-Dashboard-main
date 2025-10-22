"use client";

import { useGetCustomerId } from "@/hooks/feature/useGetCustomerId";
import { useGetACustomerLookupQuery } from "@/store/api/customer-lookup/customer-lookup-api";
import CustomerCard from "@/components/modules/customers/CustomerCard";
import CustomerDetailsForm from "@/components/modules/customers/forms/CustomerDetailsForm";
import RenderData from "@/components/render-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function CustomerDetails() {
  const { userId, isValidUserId } = useGetCustomerId();
  const { data: aCustomerLookupRes, ...aCustomerLookupApiState } =
    useGetACustomerLookupQuery(
      { id: userId },
      {
        skip: !isValidUserId,
      },
    );
  const aCustomerLookupData = aCustomerLookupRes?.data;

  return (
    <RenderData
      {...aCustomerLookupApiState}
      data={aCustomerLookupData}
      expectedDataType="object"
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <CustomerCard
            customerId={aCustomerLookupData?.customerId?.toString() || "N/A"}
            customerName={
              aCustomerLookupData?.fullName ||
              `${aCustomerLookupData?.firstName} ${aCustomerLookupData?.lastName}` ||
              "N/A"
            }
            email={aCustomerLookupData?.email || "N/A"}
            url={
              aCustomerLookupData?.media?.find((m) => m?.isFeatured)?.url ||
              aCustomerLookupData?.media?.[0]?.url ||
              ""
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Personal info</CardTitle>
              <p>Useful customer information</p>
            </CardHeader>

            <CardContent>
              <Separator />
              <CustomerDetailsForm customerLookupData={aCustomerLookupData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </RenderData>
  );
}

export default CustomerDetails;
