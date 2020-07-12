import { useMutation, MutationOptions } from 'react-query';
import { client } from 'graphqlClient/authenticatedGQLClient';

const deleteLikesOne = `
  mutation DeleteLikesOne($user_id: String!) {
    delete_likes(where: {user_id: {_eq: $user_id}}) {
      affected_rows
    }
  }
`;

export interface LikeDelete {
  user_id: string;
}

const deleteLikes = async (variables: LikeDelete) => {
  const data = await client.request(deleteLikesOne, variables);

  return data;
};

export default function useDeleteLike(
  variables: MutationOptions<any, LikeDelete> = {}
) {
  return useMutation(deleteLikes, variables);
}
