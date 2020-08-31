import { useMutation } from "react-query";
import { client } from "graphqlClient/authenticatedGQLClient";
import { gql } from "graphql-request";

const deleteLikesOne = gql`
  mutation DeleteLikesOne($user_id: String!) {
    delete_likes(where: { user_id: { _eq: $user_id } }) {
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

export default function useDeleteLike(variables: any = {}) {
  return useMutation(deleteLikes, variables);
}
