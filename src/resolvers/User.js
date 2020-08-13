const User = {
  posts(parent, args, { db }, info) {
    // ! first the resolvers query of Users is run which in inside Query
    //! every time the user runs it will call user as its parent object
    // ! so we use filter in posts by the user id i.e parent.id
    return db.posts.filter((post) => {
      return post.id === parent.id;
    });
  },
  comments(parent, args, { db }, info) {
    // ! user is passed as parent,
    return db.comments.filter((comment) => {
      console.log(comment);
      return comment.author === parent.id;
    });
  },
};

export { User as default };
