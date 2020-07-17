import { useQuery } from 'react-query';
import { client } from 'graphqlClient/publicGQLClient';
import { Livestock } from 'models/Livestock';

export const getAllLiveStock = `{
  livestock(limit: 10, where: {is_public: {_eq: true}}) {
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

const getLivestocks = async () => {
  const data = await client.request(getAllLiveStock);

  return data;
};

export default function useLivestocks() {
  return useQuery('livestock', getLivestocks);
}
