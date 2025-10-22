"use client";
import { memo, useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetPromoterPermissionsQuery } from "@/store/api/promoter/promoter-api";
import { EGuestListType } from "@/store/api/promoters/promoters.types";
import RenderData from "@/components/render-data";
import ComingSoon from "@/components/templates/coming-soon";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GuestList } from "./guest-list";

type TTabValue = "guestList" | "tableManagement";
type TTabState = { tab?: TTabValue };

type TTabOption = {
  value: TTabValue;
  label: string;
};

function EventCoordination() {
  const { getAParamValue, updateAParam } = useManageSearchParams<
    TTabState & {
      eventId: string;
    }
  >();

  const eventId = getAParamValue("eventId");

  const { data: getPromoterPermissionsRes, ...getPromoterPermissionsApiState } =
    useGetPromoterPermissionsQuery(
      {
        eventId,
      },
      {
        skip: !checkIsValidId(eventId, {
          type: "number",
        }),
      },
    );
  const getPromoterPermissionsData = getPromoterPermissionsRes?.data;
  const hasTableManagement = getPromoterPermissionsData?.permissions?.includes(
    EGuestListType.TableManagement,
  );

  const tabs: TTabOption[] = [
    {
      label: "Guest List",
      value: "guestList",
    },
    ...(hasTableManagement
      ? [
          {
            label: "Table Management",
            value: "tableManagement" as TTabValue,
          },
        ]
      : []),
  ];

  const tab = useMemo(
    () => (getAParamValue("tab") || "guestList") as TTabValue,
    [getAParamValue],
  );

  const handleTabChange = useMemo(
    () => (tabValue: TTabValue) => {
      updateAParam({
        key: "tab",
        value: tabValue === "guestList" ? undefined : tabValue,
      });
    },
    [updateAParam],
  );

  const renderTabContent = useMemo(() => {
    if (tab === "guestList") {
      return <GuestList />;
    }
    if (tab === "tableManagement") {
      return <ComingSoon />;
    }
    return null;
  }, [tab]);

  return (
    <RenderData
      expectedDataType="object"
      data={getPromoterPermissionsData}
      {...getPromoterPermissionsApiState}
    >
      <div>
        <Tabs defaultValue={tab} className="w-full">
          <TabsList className="w-fit border border-secondary">
            {tabs?.map((tabOption) => (
              <TabsTrigger
                key={tabOption.value}
                value={tabOption.value}
                className="font-normal"
                onClick={() => handleTabChange(tabOption.value)}
              >
                {tabOption.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-4">{renderTabContent}</div>
        </Tabs>
      </div>
    </RenderData>
  );
}

export default memo(EventCoordination);
