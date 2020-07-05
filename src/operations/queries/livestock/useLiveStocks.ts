import { useQuery } from 'react-query';
import { client } from 'graphqlClient';

export const getAllLiveStockQuery = `{
  allLivestock {
      id
      likes
      location
      price
      isLiked {
        id
      }
      createdAt
      updatedAt
      description
      subcribers {
        id
      }
      seller {
        id
        firstName
        lastName
        avatar
        address
        createdAt
        rating
      }
      name
      water
      class
      coralType
      media
    }
}`;

const getLivestocks = async () => {
  const data = await client.request(getAllLiveStockQuery);

  return data;
};

export default function useLivestocks() {
  return useQuery('allLivestock', getLivestocks);
}
