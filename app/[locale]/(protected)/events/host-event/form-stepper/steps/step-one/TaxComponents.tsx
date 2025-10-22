import Link from "next/link";
import React, { useEffect } from "react";

import { useGetAuthenticatedUserOrganizationDetailsQuery } from "@/store/api/organization/organization-api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import useManageEventForm from "./useManageEventForm";

function TaxComponents() {
  const { formContextProps, eventSlug } = useManageEventForm();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formContextProps;

  const isTaxEnabled = !!watch("eventDetails.isTaxEnabled");

  const {
    data: authenticatedUserOrganizationDetailsRes,
    ...authenticatedUserOrganizationDetailsApiState
  } = useGetAuthenticatedUserOrganizationDetailsQuery(undefined, {
    skip: !!eventSlug,
  });
  const authenticatedUserOrganizationDetailsData =
    authenticatedUserOrganizationDetailsRes?.data;

  useEffect(() => {
    if (
      !authenticatedUserOrganizationDetailsApiState?.isLoading &&
      !authenticatedUserOrganizationDetailsApiState?.isFetching &&
      !eventSlug
    ) {
      const taxRate = authenticatedUserOrganizationDetailsData
        ? Number(authenticatedUserOrganizationDetailsData?.taxRate) || 0
        : 0;
      formContextProps.setValue("eventDetails.isTaxEnabled", taxRate > 0);
      formContextProps.setValue(
        "eventDetails.taxId",
        authenticatedUserOrganizationDetailsData?.taxId || "",
      );
      formContextProps.setValue(
        "eventDetails.taxName",
        authenticatedUserOrganizationDetailsData?.taxName || "",
      );
      formContextProps.setValue("eventDetails.taxRate", taxRate);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authenticatedUserOrganizationDetailsApiState?.isFetching,
    authenticatedUserOrganizationDetailsApiState?.isLoading,
    authenticatedUserOrganizationDetailsData,
    eventSlug,
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch
            color="primary"
            checked={isTaxEnabled}
            onCheckedChange={(checked) =>
              setValue("eventDetails.isTaxEnabled", checked)
            }
            id="eventDetails.isTaxEnabled"
          />
          <Label htmlFor="eventDetails.isTaxEnabled" className="mb-0">
            Enable Taxes on Ticketing Sales
          </Label>
        </div>
        <Link
          href="/en/dashboard/user-profile"
          className="text-sm font-medium text-primary"
        >
          Configure Default Values
        </Link>
      </div>
      {isTaxEnabled && (
        <Card className="bg-secondary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Tax. Id"
                type="text"
                {...register("eventDetails.taxId")}
                placeholder="e.g. 1234556RT0001"
                className="placeholder:opacity-40"
                error={errors?.eventDetails?.taxId?.message}
              />
              <Input
                label="Tax. Name"
                type="text"
                {...register("eventDetails.taxName")}
                placeholder="e.g. GST, HST, VAT"
                className="placeholder:opacity-40"
                error={errors?.eventDetails?.taxName?.message}
              />
              <Input
                label="Tax. Rate(%)"
                type="text"
                rightContent="%"
                max={100}
                {...register("eventDetails.taxRate", {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const inputValue = Number(e.target.value);

                    const clampedValue = Math.max(0, Math.min(inputValue, 100));
                    setValue("eventDetails.taxRate", clampedValue);
                  },
                })}
                error={errors?.eventDetails?.taxRate?.message}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default TaxComponents;
