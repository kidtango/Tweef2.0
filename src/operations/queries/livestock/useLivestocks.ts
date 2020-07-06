import { useQuery } from 'react-query';
import { client } from 'graphqlClient';

export const getAllLiveStock = `{
  livestock {
    id
    likes
    location
    price
    isLiked 
    createdAt
    updatedAt
    description
    member {
      id
      firstName
      lastName
      avatar
      rating
      }
    name
    water
    class
    coralType
    images
    }
}`;

const getLivestocks = async () => {
  const data = await client.request(getAllLiveStock);

  return data;
};

export default function useLivestocks() {
  return useQuery('livestock', getLivestocks);
}
