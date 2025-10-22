"use client";

import ChecklistRoleTabs from "./checklist-role-tabs";
import EventInfo from "./event-info";

function PageContent() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 xl:gap-10">
        <div className="col-span-12 xl:col-span-3">
          <div className="sticky top-16">
            <EventInfo />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-9">
          <ChecklistRoleTabs />
        </div>
      </div>
    </div>
  );
}

export default PageContent;
