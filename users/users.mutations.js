import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        console.log('test');
        return {
          ok: false,
          error: 'User not found.',
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password.',
        };
      }
    },
  },
};
