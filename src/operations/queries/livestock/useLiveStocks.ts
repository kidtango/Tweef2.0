import { useQuery } from 'react-query';
import { client } from 'graphqlClient';

export const getAllLiveStockQuery = `{
  livestock {
    id
    likes
    isLiked
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
      location
      createdAt
      rating
    }
    name
    water
    class {
      species
      type
    }
    media
  }
}`;

const getLivestocks = async () => {
  const data = await client.request(getAllLiveStockQuery);

  return data;
};

export default function useLivestocks() {
  return useQuery('livestocks', getLivestocks);
}
