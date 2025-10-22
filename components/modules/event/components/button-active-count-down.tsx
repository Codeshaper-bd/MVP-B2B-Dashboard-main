"use client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import React, { useEffect, useState } from "react";

export function getButtonActiveCountdown(eventStartTime: string) {
  const now = dayjs();
  const adjustedTarget = dayjs.utc(eventStartTime).local().subtract(2, "hour");

  if (!adjustedTarget.isValid()) {
    return { status: "invalid" };
  }

  if (now.isAfter(adjustedTarget)) {
    return { status: "passed" };
  }

  let totalSeconds = Math.max(0, Math.floor(adjustedTarget.diff(now) / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  totalSeconds -= days * 3600 * 24;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    status: "counting",
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function ButtonActiveCountdown({
  eventStartTime,
  onCountdownPassed,
}: {
  eventStartTime: string;
  onCountdownPassed?: (passed: boolean) => void;
}) {
  const [countdown, setCountdown] = useState(() =>
    getButtonActiveCountdown(eventStartTime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getButtonActiveCountdown(eventStartTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [eventStartTime]);

  // Notify parent when countdown status changes
  useEffect(() => {
    onCountdownPassed?.(countdown.status === "passed");
  }, [countdown.status, onCountdownPassed]);

  if (countdown.status === "invalid") {
    return <span>⚠️ Invalid start time</span>;
  }

  if (countdown.status === "passed") {
    return <span>✅ Countdown Passed</span>;
  }

  const timeParts: string[] = [];
  if (countdown.days && countdown.days > 0) {
    timeParts.push(`${countdown.days} day${countdown.days > 1 ? "s" : ""}`);
  }

  timeParts.push(
    `${countdown.hours ?? 0}h`,
    `${countdown.minutes ?? 0}m`,
    `${countdown.seconds ?? 0}s`,
  );

  return <span>Fennec Live available in: {timeParts.join(", ")}</span>;
}
