// Dynamically generate GQL queries
function getLiveStockBy(cursor) {
  // const cursor = '123';
  return `
  livestock(limit: 6, order_by: {createdAt: desc}, where: {createdAt: {_lt: ${cursor}}}) {
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
}
  `;
}

const query = getLiveStockBy(123);
console.log('query', query);
