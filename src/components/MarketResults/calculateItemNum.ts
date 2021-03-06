import _ from "lodash";

export function calculateItemNum(param: any) {
  if (!param) return 0;

  let numOfItem = 0;
  _.forEach(param, (group) => {
    numOfItem += group.livestock.length;
  });

  return numOfItem;
}
