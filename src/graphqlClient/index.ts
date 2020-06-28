import { request, GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('http://localhost:9002/graphql');
