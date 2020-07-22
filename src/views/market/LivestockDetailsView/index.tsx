import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { queryCache } from "react-query";
import _ from "lodash";
import { Livestock } from "models/Livestock";

interface MatchParams {
  livestockId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const Index: React.FC<MatchProps> = ({ match, location }) => {
  const livestockId = match.params.livestockId;
  //Retrieve livestock from React-Query's cache
  const livestockItems: any = queryCache.getQueryData(["livestock"]);
  let livestock: Livestock | undefined;

  // Loop through cache and return the selected livestock item
  livestockItems.map((livestockGroup: { livestock: Livestock[] }) => {
    return (livestock = _.find(livestockGroup.livestock, (element) => {
      debugger;
      return element.id === livestockId;
    }));
  });

  console.log("livestock", livestock);

  if (!livestock) return <div>No livestock found</div>;

  return <div>"id:" {livestock.id}</div>;
};

export default Index;
