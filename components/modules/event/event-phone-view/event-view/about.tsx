import Link from "next/link";

import type { TNullish } from "@/store/api/common-api-types";
interface IAboutProps {
  title: string;
  aboutText: string | TNullish;
}

function About({ title, aboutText }: IAboutProps) {
  const isLongText = aboutText && aboutText?.length > 120;
  return (
    <div className="mt-2">
      <h3 className="mb-3.5 text-lg font-medium text-default-1000">{title}</h3>

      <p className="line-clamp-4 text-sm font-medium text-default-700">
        {aboutText}
      </p>
      {isLongText && (
        <Link href="#" className="text-sm text-primary hover:underline">
          Read More
        </Link>
      )}
    </div>
  );
}

export default About;
