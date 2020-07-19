import { client } from "graphqlClient/publicGQLClient";

export const fetchLiveStock = async (
  key?: any,
  query?: string,
  variables?: any
) => {
  if (!variables) {
    variables = {
      cursor: "2030-07-17T03:58:24.268987+00:00",
      SPS: variables["SPS"],
      LPS: "",
      soft_coral: variables["soft_coral"]
    };
  }

  const data = await client.request(query!, variables);
  return data;
};
