"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TPromoterRegisterArgs } from "@/store/api/auth/auth.types";
import { useGetPromoterStatusQuery } from "@/store/api/promoter/promoter-api";
import PromoterRegisterForm from "@/components/partials/auth/promoter-register-form";
import RenderData from "@/components/render-data";

import AcceptedComponent from "./AcceptedPage";

function PageContent() {
  // get params from url
  const { getAllParamValue } = useManageSearchParams<
    TPromoterRegisterArgs & { code: string }
  >();
  const { code: codeParam } = getAllParamValue();
  const { data: getPromoterStatusRes, ...getPromoterStatusApiState } =
    useGetPromoterStatusQuery({
      invitationCode: codeParam ?? "",
    });

  const getPromoterStatusData = getPromoterStatusRes?.data;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <RenderData
        expectedDataType="object"
        data={getPromoterStatusData}
        {...getPromoterStatusApiState}
      >
        {getPromoterStatusData?.invitationStatus === "ACCEPTED" ? (
          <AcceptedComponent />
        ) : (
          <PromoterRegisterForm />
        )}
      </RenderData>
    </div>
  );
}

export default PageContent;
