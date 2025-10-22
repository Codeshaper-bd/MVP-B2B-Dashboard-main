import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnEventRelationMutation } from "@/store/api/events/events-api";
import BackButton from "@/components/Buttons/back-button";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import SeparatorLabel from "@/components/separator-label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import AddChallengeDialog from "./add-challenge-dialog";
import ChallengeProvider from "./challenge-context";
import ChallengesTable from "./challenges-table";
import ConfigureChallenge from "./ConfigureChallenges";

type TPageParams = Params & {
  locale: string;
  eventSlug: string;
};

export default function Challenges() {
  const { getAnEventData } = useFetchAnEventData();
  const challengesData = useMemo(
    () => getAnEventData?.challenges,
    [getAnEventData?.challenges],
  );
  const [updateAnEventRelation, { isLoading: isUpdateEventLoading }] =
    useUpdateAnEventRelationMutation();
  const { toast } = useToast();
  const { eventSlug } = useParams<TPageParams>();

  const handleSaveClick =
    (challenges: TChallenge[] | TNullish) => async (): Promise<boolean> => {
      const toastId = toast({
        variant: "loading",
        title: "Updating Challenge",
        description: "Please wait while we update challenges",
      });

      try {
        // 🛠 Call update API with updated challenges list
        const res = await updateAnEventRelation({
          slug: eventSlug,
          body: {
            challenges:
              challenges?.map((challenge) => ({ id: challenge?.id })) ??
              undefined,
          },
        }).unwrap();

        if (!res?.success) {
          throw new Error(res?.message || "Failed to update challenges");
        }

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Updated Challenges",
          description: "Challenges had been updated successfully.",
        });

        return true;
      } catch (error) {
        toastId.update({
          id: toastId.id,
          variant: "destructive",
          ...getApiErrorMessages({
            error,
            title: "Failed to Update Challenges",
            description: "Something went wrong while updating challenges.",
          }),
        });

        return false;
      }
    };

  return (
    <ChallengeProvider challengesData={challengesData}>
      {({ challenges }) => (
        <div className="mt-7">
          <ChallengesTable challengesData={challenges} />

          <SeparatorLabel>
            <AddChallengeDialog />
          </SeparatorLabel>

          <ConfigureChallenge
            haveChanges={challengesData?.length !== challenges?.length}
            onSave={handleSaveClick(challenges)}
          />

          <div className="mt-6 flex justify-end gap-3">
            <BackButton disabled={isUpdateEventLoading} />

            <Button
              type="button"
              color="primary"
              onClick={handleSaveClick(challenges)}
              disabled={
                isUpdateEventLoading ||
                challengesData?.length === challenges?.length
              }
            >
              <ButtonLoadingContent
                actionContent="Save"
                isLoading={isUpdateEventLoading}
              />
            </Button>
          </div>
        </div>
      )}
    </ChallengeProvider>
  );
}
