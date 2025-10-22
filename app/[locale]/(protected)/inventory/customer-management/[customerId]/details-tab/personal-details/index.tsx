import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UserBlock from "@/components/widgets/user-block";

import PersonalDetailsForm from "./details-form";

function PersonalDetails() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="w-[286px] flex-none">
        <UserBlock
          name="Albert Neilsen"
          email="albertneilsen@gmail.com"
          id="123456"
        />
      </div>
      <Card className="flex-1">
        <CardHeader className="space-y-1">
          <CardTitle className="font-semibold">Personal info</CardTitle>
          <p>Lorem Ipsum dolor sit amet</p>
        </CardHeader>
        <CardContent>
          <Separator className="mb-6" />
          <PersonalDetailsForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default PersonalDetails;
