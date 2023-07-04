export default {
  User: {
    totalFollowing: (root) => {
      console.log(root._count);
      return root._count.following;
    },
    totalFollowers: (root) => root._count.followers,
  },
};
