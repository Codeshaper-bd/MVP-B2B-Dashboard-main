"use client";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import dynamic from "next/dynamic";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { getData } from "./get-data";
import { option } from "./options";

interface InsightGraphProps {
  height?: number;
}

type THandleCheckboxChange = (props: {
  setCheckedData: React.Dispatch<
    React.SetStateAction<{
      view?: boolean;
      like?: boolean;
      comment?: boolean;
    }>
  >;
  setSeriesData?: React.Dispatch<
    React.SetStateAction<ApexAxisChartSeries | ApexNonAxisChartSeries>
  >;
  name: "view" | "like" | "comment";
}) => (e: boolean | React.FormEvent<HTMLButtonElement>) => void;

const handleCheckboxChange: THandleCheckboxChange =
  ({ setCheckedData, setSeriesData, name }) =>
  (e) => {
    if (typeof e === "boolean" || e === null || e === undefined) {
      setSeriesData?.(
        (prevSeriesData) =>
          (prevSeriesData?.map((data) => {
            if (typeof data === "object" && data.name === name) {
              return {
                ...data,
                hidden: !e,
              };
            }
            return data;
          }) ?? []) as ApexAxisChartSeries | ApexNonAxisChartSeries,
      );

      setCheckedData((prev) => ({
        ...prev,
        [name]: !!e,
      }));
    }
  };

function InsightGraph({ height = 200 }: InsightGraphProps) {
  const [checkedData, setCheckedData] = useState<{
    view?: boolean;
    like?: boolean;
    comment?: boolean;
  }>(() => ({
    view: true,
    like: true,
    comment: true,
  }));

  return (
    <div>
      <div className="mb-5 flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold leading-7 text-default-900">
          Insight
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="view"
              value={"view"}
              className="data-[state=checked]:border-[#1570EF] data-[state=checked]:bg-[#1570EF] [&_svg]:stroke-white"
              onChange={handleCheckboxChange({
                setCheckedData,
                name: "view",
                // setSeriesData,
              })}
              checked={checkedData.view}
            />

            <label
              htmlFor="view"
              className="cursor-pointer text-sm font-medium leading-5 text-default-700"
            >
              View
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="like"
              value={"like"}
              className="data-[state=checked]:border-[#DD2590] data-[state=checked]:bg-[#DD2590] [&_svg]:stroke-white"
              onChange={handleCheckboxChange({
                setCheckedData,
                name: "like",
                // setSeriesData,
              })}
              checked={checkedData.like}
            />
            <label
              htmlFor="like"
              className="cursor-pointer text-sm font-medium leading-5 text-default-700"
            >
              Like
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="comment"
              value={"comment"}
              className="data-[state=checked]:border-[#EAAA08] data-[state=checked]:bg-[#EAAA08] [&_svg]:stroke-white"
              onChange={handleCheckboxChange({
                setCheckedData,
                name: "comment",
                // setSeriesData,
              })}
              checked={checkedData.comment}
            />
            <label
              htmlFor="comment"
              className="cursor-pointer text-sm font-medium leading-5 text-default-700"
            >
              Comment
            </label>
          </div>
        </div>
      </div>

      <Chart
        options={option}
        series={getData(checkedData)}
        type="area"
        height={height}
        width={"100%"}
      />
    </div>
  );
}

export default InsightGraph;
