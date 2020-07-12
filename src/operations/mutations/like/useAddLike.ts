import { useMutation, MutationOptions } from 'react-query';
import { client } from 'graphqlClient/authenticatedGQLClient';
import { CreateLike } from 'models/Livestock';

const insertLikesOne = `
  mutation InsertLikes($livestock_id: String) {
    insert_likes_one(object: {livestock_id: $livestock_id}) {
      id
    }  
  }
`;

const insertLikes = async (variables: CreateLike) => {
  const data = await client.request(insertLikesOne, variables);

  return data;
};

export default function useInsertLike(
  variables: MutationOptions<any, CreateLike> = {}
) {
  return useMutation(insertLikes, variables);
}
