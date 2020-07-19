import React from "react";
import LivestockBrowse from "./LivestockBrowse";
import { FilterOptionProvider } from "context/FilterOptionContext";
import useLivestockInfiniteQuery from "operations/queries/livestock/useLivestockInfiniteQuery";

const Index = () => {
  return (
    <FilterOptionProvider>
      <LivestockBrowse />
    </FilterOptionProvider>
  );
};

export default Index;
