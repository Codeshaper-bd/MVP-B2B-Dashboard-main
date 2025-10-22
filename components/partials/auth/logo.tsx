"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

function Logo() {
  const { theme: mode } = useTheme();
  return (
    <div>
      <Image
        src="/assets/export-logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="max-w-46"
        priority
      />
    </div>
  );
}

export default Logo;
