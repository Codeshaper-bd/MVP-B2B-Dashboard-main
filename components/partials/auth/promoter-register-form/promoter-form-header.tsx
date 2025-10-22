"use client";

import FormProgressBar from "@/components/ui/FormProgressBar";

interface PromoterFormHeaderProps {
  progress: number;
}

function PromoterFormHeader({ progress }: PromoterFormHeaderProps) {
  return (
    <>
      <div className="mb-10 flex flex-col items-center gap-1">
        <h3 className="text-xl font-semibold text-[#F5F5F6]">
          👋 Welcome to FENNEC Promoter!
        </h3>
        <p className="text-[16px] font-normal text-[#CECFD2]">
          {` Let’s complete your profile to get started as a promoter.`}
        </p>
      </div>
      <div className="mb-8">
        <FormProgressBar
          progress={progress}
          title="Complete Your Profile"
          showPercentage={false}
        />
      </div>
    </>
  );
}

export default PromoterFormHeader;
