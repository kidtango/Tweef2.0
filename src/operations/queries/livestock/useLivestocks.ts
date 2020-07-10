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

const getLivestocks = async () => {
  const data = await client.request(getAllLiveStock);

  return data;
};

export default function useLivestocks() {
  return useQuery('livestock', getLivestocks);
}
