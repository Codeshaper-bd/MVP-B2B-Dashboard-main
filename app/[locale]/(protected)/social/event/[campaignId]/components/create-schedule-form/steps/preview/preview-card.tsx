import CustomRadioGroup from "@/components/CustomRadioGroup";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function PreviewCard() {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Preview</h3>
          <p className="text-sm font-semibold text-default-600">
            Fill in the essential information about your event.
          </p>
        </div>

        <Button
          className="w-full max-w-[212px] gap-1 bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-90"
          rounded="full"
          type="button"
        >
          <span className="inline-flex items-center gap-1">
            <InstagramIcon className="h-5 w-5 text-foreground" />
            Log in with Instagram
          </span>
        </Button>

        <CustomRadioGroup
          options={[
            {
              label: "Post Now",
              value: "post-now",
              radioProps: {
                mode: "label-right",
                textSize: "16px",
              },
            },
            {
              label: "Schedule Post",
              value: "schedule-post",
              radioProps: {
                mode: "label-right",
                textSize: "16px",
              },
            },
          ]}
        />

        <Input
          id="name"
          placeholder="Input Name"
          label="Name"
          className="h-11 border-default-200 bg-default-50"
        />
      </CardContent>
    </Card>
  );
}
export default PreviewCard;
