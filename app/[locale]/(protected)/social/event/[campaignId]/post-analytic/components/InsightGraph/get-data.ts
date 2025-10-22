import { generateRandomNumbers } from "@/lib/utils";

type TGetData = (props: {
  view?: boolean;
  like?: boolean;
  comment?: boolean;
}) => ApexAxisChartSeries | ApexNonAxisChartSeries;

export const getData: TGetData = ({ view, like, comment }) => {
  const data: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: "view",
      data: view ? generateRandomNumbers(12) : [],
      // hidden: !view,
    },
    {
      name: "like",
      data: like ? generateRandomNumbers(12) : [],
      // hidden: !like,
    },
    {
      name: "comment",
      data: comment ? generateRandomNumbers(12) : [],
      // hidden: !comment,
    },
  ];

  return data;
};
