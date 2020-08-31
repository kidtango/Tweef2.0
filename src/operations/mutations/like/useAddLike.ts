import { useMutation } from "react-query";
import { client } from "graphqlClient/authenticatedGQLClient";
import { CreateLike } from "models/Livestock";
import { gql } from "graphql-request";

const insertLikesOne = gql`
  mutation InsertLikes($livestock_id: String) {
    insert_likes_one(object: { livestock_id: $livestock_id }) {
      id
    }
  }
`;

const insertLikes = async (variables: CreateLike) => {
  const data = await client.request(insertLikesOne, variables);
  return data;
};

export default function useInsertLike(variables = {}) {
  return useMutation(insertLikes, variables);
}
