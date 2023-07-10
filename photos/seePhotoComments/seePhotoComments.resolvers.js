import client from '../../client';

export default {
  Query: {
    seePhotoComments: async (_, { id, lastId }) => {
      const comments = await client.photo
        .findUnique({
          where: {
            id,
          },
        })
        .comments({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
          orderBy: {
            createdAt: 'asc',
          },
        });
      //console.log(comments);
      return comments;
    },
  },
};
