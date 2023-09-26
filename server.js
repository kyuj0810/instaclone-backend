require('dotenv').config();
import http from 'http';
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser, protectResolver } from './users/users.utils';
import { graphqlUploadExpress } from 'graphql-upload';

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        protectResolver,
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    //connectionParams는 기본적으로 우리가 볼 수 있는 HTTP headers.(user가 connect를 시도 할 때만!오직 딱 한 번 발생)
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return { loggedInUser };
    },
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
