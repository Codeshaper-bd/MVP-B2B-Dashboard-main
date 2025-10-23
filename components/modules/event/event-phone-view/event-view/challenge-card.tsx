import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

function ChallengeCard({ challenge }: { challenge: TChallenge }) {
  const { name, pointsEarned, startDate } = challenge;

  return (
    <Card className="border border-primary/30">
      <CardContent className="p-3">
        <h3 className="text-xs font-medium text-primary/70">
          Challenge will activate on
          {convertUTCToLocal({
            utcDateTime: startDate,
            format: "MMMM D, YYYY",
          })}
        </h3>
        <h2 className="mt-2.5 text-sm font-medium text-default-1000">{name}</h2>
        <p className="my-2.5 text-xs text-default-1000">
          Get discount from Fennec with completing the mission and earn{" "}
          {pointsEarned} points!{" "}
        </p>
        <Slider defaultValue={[50]} color="primary" disabled />
        <div className="mt-2.5 flex items-center gap-1">
          <InfoIcon className="size-4 text-primary" />
          <p className="text-xs text-default-700">
            You need to buy a ticket to access the Club Challenges
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChallengeCard;
