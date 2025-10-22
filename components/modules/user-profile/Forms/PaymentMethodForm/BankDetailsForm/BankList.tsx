"use client";

import { useGetAllBankDetailsQuery } from "@/store/api/bank-details/bank-details-api";
import RenderData from "@/components/render-data";

import BankCard from "./BankCard";

export interface IBankDetailsCheckboxProps {
  handleUpdateBankDetails?: (id?: number) => void;
}

function BankList({ handleUpdateBankDetails }: IBankDetailsCheckboxProps) {
  const { data: getBankDetailsRes, ...getBankDetailsApiState } =
    useGetAllBankDetailsQuery();

  const getBankDetailsData = getBankDetailsRes?.data;

  return (
    <RenderData
      expectedDataType="array"
      data={getBankDetailsData}
      {...getBankDetailsApiState}
    >
      <h2 className="mb-3 text-sm font-medium text-default-700">
        Bank Details
      </h2>

      <div className="w-full max-w-lg space-y-3">
        {getBankDetailsData?.map((bank) => (
          <BankCard
            key={bank.id}
            bank={bank}
            handleUpdateBankDetails={handleUpdateBankDetails}
          />
        ))}
      </div>
    </RenderData>
  );
}

export default BankList;
