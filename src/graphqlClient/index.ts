import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.REACT_APP_TWEEF2_ENDPOINT;

export const client = new GraphQLClient(endpoint!, {
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': process.env.REACT_APP_TWEEF2_API_KEY!
  }
});
