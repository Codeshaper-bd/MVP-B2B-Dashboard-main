"use client";
import Image from "next/image";

import { useGetOrganizationQrCodeQuery } from "@/store/api/organization/organization-api";

import RenderData from "../render-data";
import LabelErrorWrapper from "../ui/LabelErrorWrapper";
import { Skeleton } from "../ui/skeleton";

function PreviewQrCode() {
  const { data: getOrganizationQrCodeData, ...getOrganizationQrCodeApiState } =
    useGetOrganizationQrCodeQuery();
  return (
    <RenderData
      loadingSkeleton={<Skeleton className="h-[130px] w-[130px]" />}
      {...getOrganizationQrCodeApiState}
      data={getOrganizationQrCodeData}
      expectedDataType="string"
      {...getOrganizationQrCodeApiState}
    >
      <LabelErrorWrapper label="QR Code">
        <Image
          src={getOrganizationQrCodeData || ""}
          alt="qrCode"
          width={130}
          height={130}
        />
      </LabelErrorWrapper>
    </RenderData>
  );
}

export default PreviewQrCode;
