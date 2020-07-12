import { useMutation, MutationOptions } from 'react-query';
import { client } from 'graphqlClient/authenticatedGQLClient';
import { Livestock } from 'models/Livestock';

export const addLivestock = `
  mutation AddLivestock($name: String!, $water: String!, $class: String!, $coral_type: String!, $description: String!, $location: Int!, $images: jsonb!, $price: money!) {
    insert_livestock_one(object: {
      class: $class,
      coral_type: $coral_type,
      name: $name,
      water: $water,
      description: $description,
      location: $location,
      images: $images,
      price: $price
    }) {
    id
    }
  }
`;

const createLivestock = async (variables: Livestock) => {
  const data = await client.request(addLivestock, variables);

  return data;
};

export default function useAddLivestock(
  variables: MutationOptions<any, Livestock> = {}
) {
  return useMutation(createLivestock, variables);
}
