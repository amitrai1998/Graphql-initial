const Post = {
  author(parent, args, { db }, info) {
    //  ! for each individual posts going to all  this function with post arguments
    return db.users.find((user) => {
      return user.id == parent.author;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => {
      return (comment.post = parent.id);
    });
  },
};

export { Post as default };
