export default `
  type Account {
    id: ID!,
    name: String!,
    email: String!,
  }
  
  type Record {
    id: ID!,
    title: String!,
    description: String!
    account: Account!
  }
  
  type AuthPayload {
    token: String!,
    account: Account!
  }
  
  type ResetTokenPayload {
    token: String!
  }
`;
