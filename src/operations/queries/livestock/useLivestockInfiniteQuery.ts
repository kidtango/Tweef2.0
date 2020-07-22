import { useInfiniteQuery, QueryOptions } from "react-query";
import { client } from "graphqlClient/publicGQLClient";

interface Variables {
  cursor?: string;
  SPS?: string;
  LPS?: string;
  soft_coral?: string;
}

export const getLiveStockQuery = () => {
  const query = `
    query LivestockWithFilter( $cursor: timestamptz, $SPS: String!, $LPS: String!, $soft_coral: String!) {
      livestock(limit: 6, order_by: {createdAt: desc}, where: { createdAt: {_lt: $cursor }, coral_type: {_in: [$SPS, $LPS, $soft_coral]}}) {
        id
        likes {
          id
          user {
            auth0_id
          }
        }
        location
        price
        createdAt
        updatedAt
        description
        user {
          auth0_id
          nick_name
          picture
          rating
          }
        name
        water
        class
        coral_type
        images
      }
    }
  `;

  return query;
};

export default function useLivestockInfiniteQuery(variables?: any) {
  //Set initial values in case Variables is undefined
  let SPS: string = "";
  let LPS: string = "";
  let soft_coral: string = "";

  if (variables) {
    SPS = variables.SPS ? variables.SPS : "";
    LPS = variables.LPS ? variables.LPS : "";
    soft_coral = variables["Soft Coral"] ? variables["Soft Coral"] : "";
  }

  const query = getLiveStockQuery();

  const fetchLiveStock = async (key?: any, variables?: any) => {
    //Set init values for the first sequence of infinite query
    if (!variables) {
      variables = {
        cursor: "2030-07-17T03:58:24.268987+00:00",
        SPS,
        LPS,
        soft_coral
      };
    }

    const data = await client.request(query, variables);
    return data;
  };

  return useInfiniteQuery("livestock", fetchLiveStock, {
    getFetchMore: (lastGroup: any) => {
      // Cursor pagination using createdAt as the cursor.
      // Cursor point is on the last group & last item in group. Each group has 6 items.
      // You can see that by looking at the GQL query from above. Make sure to make the
      // cursor point if you change the LIMIT # in the query
      if (lastGroup && lastGroup.livestock && lastGroup.livestock[5]) {
        variables = {
          cursor: lastGroup.livestock[5].createdAt,
          SPS,
          LPS,
          soft_coral
        };
      } else {
        // return false when end of list. This will stop query from calling getLiveStock
        variables = false;
      }

      return variables;
    }
  });
}
