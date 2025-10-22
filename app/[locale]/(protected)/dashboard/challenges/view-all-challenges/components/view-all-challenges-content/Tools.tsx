"use client";
import SearchComponent from "@/components/ui/search-component";

import Filter from "./Filter";
import CreateChallengeModal from "../../../components/Modals/CreateChallengeModal";

function Tools() {
  return (
    <>
      <SearchComponent className="min-h-12" />

      <CreateChallengeModal triggerButtonHeight="48" mode="server-create" />

      <Filter />
    </>
  );
}

export default Tools;
