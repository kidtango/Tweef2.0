import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.REACT_APP_TWEEF2_ENDPOINT;

const idToken = localStorage.getItem('idToken') || '';

export const client = new GraphQLClient(endpoint!, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('idToken')}`
  }
});
