import { useMutation, MutationOptions } from 'react-query';
import { client } from 'graphqlClient';
import { Livestock } from 'models/Livestock';

export const addLivestock = `
  mutation AddLivestock($name: String!, $water: String!, $class: String!, $coralType: String!, $description: String!, $location: Int!, $sellerId: String!, $images: jsonb!, $price: money!) {
    insert_livestock_one(object: {
      class: $class,
      coralType: $coralType,
      name: $name,
      water: $water,
      description: $description,
      location: $location,
      sellerId: $sellerId,
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
  variables: MutationOptions<any, Livestock>
) {
  return useMutation(createLivestock, variables);
}
