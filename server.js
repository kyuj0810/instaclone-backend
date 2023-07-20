require('dotenv').config();
import http from 'http';
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser, protectResolver } from './users/users.utils';
import { graphqlUploadExpress } from 'graphql-upload';
import pubsub from './pubsub';

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  context: async ({ req }) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectResolver,
      };
    }
  },
});

const app = express();
app.use(graphqlUploadExpress());
app.use(logger('tiny'));
apollo.applyMiddleware({ app });
app.use('/static', express.static('uploads'));

const httpsServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpsServer); // subscription에 대한 정보를, 다시 말해 웹소켓에 대한 정보를 우리 서버에 설치함.

httpsServer.listen(PORT, () => {
  console.log(
    `🚀 Server is running apollo-server http://localhost:${PORT}/graphql ✅`
  );
});
