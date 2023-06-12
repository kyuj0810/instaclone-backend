import client from '../client';
export default {
  Mutation: {
    createdAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check if username or email are already on DB.
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });

      // has password

      // save and return the user
    },
  },
};
