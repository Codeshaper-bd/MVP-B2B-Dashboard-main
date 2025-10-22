"use client";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { data } from "./data";
import StatsCard from "./stats-card";
interface DataType {
  type: string;
  lists: {
    label: string;
    value: string;
  }[];
  series: {
    name: string;
    data: number[];
  }[];
}
function BoothBox() {
  const [selectedData, setSelectedData] = useState<DataType | null>(null);

  const handleStats = (type: string) => {
    const filteredData = data.find((item) => item.type === type) || null;
    setSelectedData((prevData) =>
      prevData?.type === type ? null : filteredData,
    );
  };

  return (
    <Card className="h-full pb-3">
      <CardContent className="relative">
        <Button
          className="absolute start-0 top-11 z-10 rounded-s-none bg-primary/80 shadow-xl"
          color="primary"
        >
          Coming Soon
        </Button>
        {selectedData && (
          <StatsCard
            data={selectedData}
            onClose={() => setSelectedData(null)}
          />
        )}
        <div className="mx-auto w-full max-w-[280px] py-12">
          <div className="relative h-20">
            <Image
              src="/assets/all/shape-1.png"
              alt=""
              width={550}
              height={180}
              className="h-full w-full"
              priority
            />
            <h3 className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium text-default-900">
              DJ BOOTH
            </h3>
          </div>
        </div>
        <div className="mx-auto grid h-[230px] w-full max-w-[370px] grid-cols-12 gap-2">
          <div className="relative col-span-3">
            <Image
              src="/assets/all/shape-2.png"
              alt=""
              width={500}
              height={180}
              priority
              className="h-full w-full"
            />
            <Button
              className="absolute start-1/2 top-1/2 h-[35px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-[13px] border-none text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground md:px-0"
              onClick={() => handleStats("A")}
            >
              A
            </Button>
          </div>
          <div className="col-span-6 flex flex-col justify-center">
            <div>
              <div className="relative h-[147px]">
                <Image
                  src="/assets/all/shape-3.png"
                  alt=""
                  width={688}
                  height={378}
                  className="h-full w-full"
                  priority
                />
                <Button
                  className="absolute start-1/2 top-1/2 h-[35px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-[13px] border-none text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground md:px-0"
                  onClick={() => handleStats("B")}
                >
                  B
                </Button>
              </div>
            </div>
          </div>
          <div className="relative col-span-3">
            <Image
              src="/assets/all/shape-2.png"
              alt=""
              width={500}
              height={180}
              className="h-full w-full"
            />

            <Button
              className="absolute start-1/2 top-1/2 h-[35px] w-[29px] -translate-x-1/2 -translate-y-1/2 rounded-[13px] border-none text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground md:px-0"
              onClick={() => handleStats("C")}
            >
              C
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BoothBox;
