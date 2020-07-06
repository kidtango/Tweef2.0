import { useMutation, MutationOptions } from 'react-query';
import { client } from 'graphqlClient';
import { Livestock } from 'models/Livestock';

export const addLivestock = `
  mutation AddLivestock($name: String, $water: String, $class: String, $coralType: String, $description: String, $location: Int, $sellerId: String, $images: [String], $price: Int) {
    insert_livestock_one(input: {
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

export default function useCreateLivestock(
  variables: MutationOptions<any, Livestock>
) {
  return useMutation(createLivestock, variables);
}
