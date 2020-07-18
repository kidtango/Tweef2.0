import gql from 'graphql-tag';

export const getLiveStockQuery = (queryParams: string) => {
  console.log('getLiveStockQuery -> queryParams', queryParams);

  let query: string;

  return (query = gql`
    {
    livestock(limit: 6, where: {createdAt: {_lte: ${queryParams}}) {
      id
      likes {
        id
        user {
          auth0_id
        }
      }
      location
      price
      createdAt
      updatedAt
      description
      user {
        auth0_id
        nick_name
        picture
        rating
        }
      name
      water
      class
      coral_type
      images
      }
  }`);
};
