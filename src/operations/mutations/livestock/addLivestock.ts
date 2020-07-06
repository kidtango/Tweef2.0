import { useQuery } from 'react-query';
import { client } from 'graphqlClient';

export const addLivestock = `
  mutation AddLivestock($id: ID, $name: String, $water: String, $class: String, $coralType: String, $description: String, $location: Int, $seller: ID, $media: [String]) {
    addLivestock(input: {
      id: $id,
      name: $name,
      water: $water,
      class: $class,
      coralType: $coralType,
      description: $description,
      location: $location,
      seller: $seller,
      media: $media
    })
  }
`;
