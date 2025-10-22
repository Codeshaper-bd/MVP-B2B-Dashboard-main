"use client";

import Image from "next/image";
import React, { useState } from "react";

import dgBooth from "@/public/assets/booth.png";
import seat from "@/public/assets/foorSeat.png";
import seatBottom from "@/public/assets/foorSeatBottom.png";
import tableImage from "@/public/assets/table.png";

import StatsCard from "./components/stats-card";

type TDataType = {
  id: string;
  title: string;
  status: string;
  totalPos: number;
};

const data = [
  {
    id: "A",
    title: "Jhon Doe",
    status: "Checked In",
    totalPos: 345000,
  },
  {
    id: "B",
    title: "Jhon Doe",
    status: "Checked In",
    totalPos: 345000,
  },
  {
    id: "C",
    title: "Jhon Doe",
    status: "Expected",
    totalPos: 345000,
  },
];

export default function FloorPlanContent() {
  const [selectedData, setSelectedData] = useState<TDataType | null>(null);

  const handleStats = (type: string) => {
    const filteredData = data.find((item) => item.id === type) || null;
    setSelectedData((prevData) =>
      prevData?.id === type ? null : filteredData,
    );
  };

  return (
    <div className="relative">
      <p className="text-lg text-default-900">Floor Plan</p>
      <div className="mt-6 rounded-[21px] bg-default-100 p-[25px]">
        <div className="flex items-center gap-3 rounded-[16px] bg-[#0C111D] px-7 pb-[55px] pt-[50px]">
          <div className="relative flex w-[30%] justify-center">
            <Image
              src={seat.src}
              width={20}
              height={80}
              alt="table"
              className="absolute left-0 top-0"
            />

            <div className="h-[300px] w-[75%] xl:w-auto 2xl:h-[440px] 2xl:w-[89%]">
              <Image
                src={tableImage.src}
                alt="table"
                layout="fill"
                objectFit="contain"
              />
            </div>

            <Image
              src={seat.src}
              alt="table"
              width={20}
              height={80}
              className="absolute bottom-0 left-0"
            />

            <Image
              src={seatBottom.src}
              width={80}
              height={20}
              alt="table"
              className="absolute bottom-[-30px] left-1/2 translate-x-[-50%]"
            />

            <h2
              onClick={() => handleStats("A")}
              className={` ${selectedData?.id === "A" ? "text-primary" : "text-white"} absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer text-5xl`}
            >
              A
            </h2>
          </div>

          <div className="relative w-[40%]">
            <div className="relative text-center">
              <Image
                src={seat.src}
                alt="table"
                width={20}
                height={80}
                className="absolute left-[-20px] top-[55px] 2xl:top-[85px]"
              />

              <div className="relative">
                <div className="m-auto h-[97px] w-[80%] xl:w-auto 2xl:h-[125px] 2xl:w-full">
                  <Image
                    src={dgBooth.src}
                    alt="table"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h2 className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl">
                  DJ Booth
                </h2>
              </div>

              <Image
                src={seat.src}
                alt="table"
                width={20}
                height={80}
                className="absolute right-[-20px] top-[55px] h-[80px] w-[20px] 2xl:top-[85px]"
              />
            </div>

            <p className="pb-[50px] pt-[70px] text-center text-2xl uppercase text-white 2xl:pb-[80px] 2xl:pt-[100px]">
              Dancer Floor
            </p>

            <div className="relative">
              <Image
                src={seat.src}
                alt="table"
                width={20}
                height={80}
                className="absolute bottom-[25px] left-[-20px] 2xl:bottom-[65px]"
              />

              <div className="m-auto h-[97px] w-[80%] xl:w-auto 2xl:h-[125px] 2xl:w-full">
                <Image
                  src={dgBooth.src}
                  alt="table"
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <h2
                onClick={() => handleStats("B")}
                className={`${selectedData?.id === "B" ? "text-primary" : "text-white"} absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer text-5xl`}
              >
                B
              </h2>

              <Image
                src={seat.src}
                alt="table"
                width={20}
                height={80}
                className="absolute bottom-[25px] right-[-20px] h-[80px] w-[20px] 2xl:bottom-[65px]"
              />

              <Image
                src={seatBottom.src}
                width={80}
                height={20}
                alt="table"
                className="absolute bottom-[-30px] left-7 h-[20px] w-[80px]"
              />

              <Image
                src={seatBottom.src}
                width={80}
                height={20}
                alt="table"
                className="absolute bottom-[-30px] right-[-40px] h-[20px] w-[80px]"
              />
            </div>
          </div>

          <div className="relative flex w-[30%] justify-center">
            <Image
              src={seat.src}
              alt="table"
              width={20}
              height={80}
              className="absolute right-[-5px] top-0"
            />

            <div className="h-[300px] w-[75%] xl:w-auto 2xl:h-[440px] 2xl:w-[85%]">
              <Image
                src={tableImage.src}
                alt="table"
                layout="fill"
                objectFit="contain"
              />
            </div>

            <Image
              src={seat.src}
              alt="table"
              width={20}
              height={80}
              className="absolute bottom-0 right-[-5px]"
            />

            <Image
              src={seatBottom.src}
              alt="table"
              width={80}
              height={20}
              className="absolute bottom-[105px] left-[-50px] h-[20px] w-[80px] 2xl:bottom-[140px]"
            />

            <h2
              onClick={() => handleStats("C")}
              className={`${selectedData?.id === "C" ? "text-primary" : "text-white"} absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer text-5xl`}
            >
              C
            </h2>
          </div>
        </div>
      </div>

      {!!selectedData && (
        <StatsCard data={selectedData} onClose={() => setSelectedData(null)} />
      )}
    </div>
  );
}
