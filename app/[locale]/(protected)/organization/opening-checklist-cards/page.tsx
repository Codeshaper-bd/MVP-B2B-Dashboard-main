import React from "react";

import BartenderCard from "./bartender-card";
import UserRoleCard from "./user-role-card";
import VenueInfos from "./venue-infos";

const page = () => (
  <div className="grid grid-cols-4 pt-5">
    <VenueInfos />
    <div className="col-span-3 grid grid-cols-3 gap-6">
      <UserRoleCard />
      <BartenderCard />
    </div>
  </div>
);

export default page;
