require('dotenv').config();
import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './schema';
import { getUser, protectResolver } from './users/users.utils';

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`Server is running apollo-server http://localhost:${PORT}/`)
  );
