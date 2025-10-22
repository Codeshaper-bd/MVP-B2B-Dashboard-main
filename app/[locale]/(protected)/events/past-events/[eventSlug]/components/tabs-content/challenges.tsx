import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";

import ChallengeProvider from "../../../../upcoming-events/[eventSlug]/components/tabs-content/challenges/challenge-context";
import ChallengesTable from "../../../../upcoming-events/[eventSlug]/components/tabs-content/challenges/challenges-table";

export default function Challenges() {
  const { getAnEventData } = useFetchAnEventData();

  return (
    <div className="mt-7">
      <ChallengeProvider challengesData={getAnEventData?.challenges}>
        <ChallengesTable challengesData={getAnEventData?.challenges} />
      </ChallengeProvider>
    </div>
  );
}
