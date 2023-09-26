import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Query: {
    seeFeed: protectedResolver((_, { offset }, { loggedInUser }) => {
      console.log(offset);
      const Feeds = client.photo.findMany({
        take: 2,
        skip: offset,
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      console.log(Feeds);
      return Feeds;
    }),
  },
};
