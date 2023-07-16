import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    editCommnet(id: Int!, payload: String!): MutationResponse!
  }
`;
