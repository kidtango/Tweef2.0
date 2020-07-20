import React from "react";

import Results from "components/MarketResults/Results";

interface ResultsProps {
  filterObj: any;
  [x: string]: any;
}

const FilteredResults: React.FC<ResultsProps> = ({ filterObj, ...rest }) => {
  return <Results filterObj={filterObj} {...rest} />;
};

export default FilteredResults;
