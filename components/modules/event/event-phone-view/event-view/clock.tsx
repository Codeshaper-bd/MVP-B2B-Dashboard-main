"use client";

import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[10px] font-medium text-default-1000">
      {time.format("hh:mm A")}
    </div>
  );
}

export default Clock;
