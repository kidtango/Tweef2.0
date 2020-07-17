import { useInfiniteQuery, QueryOptions } from 'react-query';
import { client } from 'graphqlClient/publicGQLClient';

export const getLiveStockQuery = `
  query GetLivestock($cursor: timestamptz) {
    livestock(limit: 6, order_by: {createdAt: desc}, where: {createdAt: {_lt: $cursor}}) {
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

interface Cursor {
  cursor: string;
}

const getLivestocks = async (key: any, variales?: Cursor) => {
  console.log('getLivestocks -> variales', variales);

  // if (variales) return;

  const data = await client.request(getLiveStockQuery, variales);

  return data;
};

export default function useLivestockInfiniteQuery(
  variables: Cursor | boolean = { cursor: '' }
) {
  return useInfiniteQuery('livestock', getLivestocks, {
    getFetchMore: (lastGroup: any, allGroup: any) => {
      console.log('lastGroup', lastGroup);
      if (lastGroup && lastGroup.livestock && lastGroup.livestock[5]) {
        variables = { cursor: lastGroup.livestock[5].createdAt };
      } else {
        variables = false;
      }
      // variables = { cursor: lastGroup.livestock[1].createdAt || false };

      return variables;
    }
  });
}
