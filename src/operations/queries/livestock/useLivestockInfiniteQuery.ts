import { useInfiniteQuery, QueryOptions } from "react-query";
import { client } from "graphqlClient/publicGQLClient";

interface Cursor {
  cursor: string;
}

export const getLiveStockQuery = (queryParams: string) => {
  // Dynamically construct Hasura GQL query
  // Provide query state & values
  // If params are empty, then set them to empty strings

  const coral_type = `coral_type: `;
  const SPS = "LPS";
  const soft_coral = "Soft Coral";

  const options = `"${SPS}", "${soft_coral}" , "${""}"`;
  const query_options = `{_in: [${options}]}`;

  return `{
    livestock(limit: 6, order_by: {createdAt: desc}, where: {createdAt: {_lt: ${`"`}${queryParams}${`"`}}, ${coral_type}${query_options}}) {
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
  }`;
};

const getLivestocks = async (key: any, variables?: Cursor) => {
  let queryParams = variables?.cursor || "2030-07-17T03:58:24.268987+00:00";

  const query = getLiveStockQuery(queryParams);
  console.log("getLivestocks -> query", query);

  const data = await client.request(query);
  return data;
};

export default function useLivestockInfiniteQuery(
  variables: Cursor | boolean = { cursor: "" }
) {
  return useInfiniteQuery("livestock", getLivestocks, {
    getFetchMore: (lastGroup: any) => {
      console.log("lastGroup", lastGroup);
      // Cursor pagination using createdAt as the cursor.
      // Cursor point is on the last group & last item in group. Each group has 6 items.
      // You can see that by looking at the GQL query from above. Make sure to make the
      // cursor point if you change the LIMIT # in the query
      if (lastGroup && lastGroup.livestock && lastGroup.livestock[5]) {
        variables = { cursor: lastGroup.livestock[5].createdAt };
      } else {
        // return false when end of list. This will stop query from calling getLiveStock
        variables = false;
      }

      return variables;
    }
  });
}
