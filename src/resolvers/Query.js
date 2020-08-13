const Query = {
  greeting(parent, args, { db }, info) {
    return args.name ? `Hello ${args.name}` : "Hello their ";
  },
  me(parent, args, { db }, info) {
    return {
      id: 1232,
      name: "Amit rai",
      email: "aformitrai@gmail.com",
    };
  },
  post(parent, args, ctx, info) {
    return {
      id: 1232,
      title: "Thi is a basic title",
      body: "thi is sthe long body og the post",
      published: true,
    };
  },
  posts(parent, args, { db }, info) {
    console.log(args);
    return !args.query
      ? db.posts
      : db.posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
          );
        });
  },
  users(parent, { query }, { db }, info) {
    console.log(query);
    return !query
      ? db.users
      : db.users.filter(({ name }) => {
          console.log(name);
          return name.toLowerCase().includes(query.toLowerCase());
        });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
