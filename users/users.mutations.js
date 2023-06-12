import bcrypt from 'bcrypt';
import client from '../client';

export default {
  Mutation: {
    createdAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
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
        if (existingUser) {
          throw new Error('This username/email is already taken.');
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });

        // save and return the user
      } catch (e) {
        return e;
      }
    },
  },
};
