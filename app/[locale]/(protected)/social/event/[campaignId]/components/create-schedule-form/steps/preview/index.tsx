import React from "react";

import PreviewCard from "./preview-card";
import InstagramPostCard from "../../../../../components/instagram-postcard";

function PreviewStep() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7">
        <PreviewCard />
      </div>
      <div className="col-span-12 lg:col-span-5">
        {/* <InstagramPostCard /> */}
        <InstagramPostCard />
      </div>
    </div>
  );
}

export default PreviewStep;
