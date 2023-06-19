require('dotenv').config();
import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './schema';

const server = new ApolloServer({
  schema,
  context: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3MTUwNTgxfQ.9tnUoDQVkuE3pJt1MusjTY54P6EvLSAvVthdzJ2LMWs',
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`Server is running apollo-server http://localhost:${PORT}/`)
  );
