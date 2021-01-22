export default `
  type Mutation {
    signIn(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!): AuthPayload!
    
    requestResetToken(email: String!): ResetTokenPayload!
    resetPasswordWithToken(password: String!, token: String!): AuthPayload!    
    
    addRecord(title: String!, description: String!): Record!
  }
`;
