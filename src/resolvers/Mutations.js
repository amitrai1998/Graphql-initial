import { v4 as uuidv4 } from "uuid";

const Mutations = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email;
    });
    if (emailTaken) {
      throw Error("Email is allready Taken");
    }
    const user = {
      id: uuidv4(),
      name: args.data.name,
      email: args.data.email,
      age: args.data.age,
    };
    db.users.push(user);
    return user;
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) {
      new Error("User does not existes");
    }
    const post = {
      id: uuidv4(),
      title: args.data.title,
      body: args.data.body,
      age: args.data.age,
      published: args.data.published,
    };
    db.posts.push(post);
    pubsub.publish("post", { post });
    return post;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExist = db.users.some((user) => user.id == args.data.author);
    const postExist = db.posts.some((post) => post.id == args.data.post);
    if (!userExist || !postExist) {
      new Error("Require Data not available");
    }
    const comment = {
      id: uuidv4(),
      text: args.data.text,
      author: args.data.author,
      post: args.data.post,
    };
    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, { comment: comment });
    return comment;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => (user.id = args.id));
    if (userIndex === -1) {
      throw Error("User does not exist");
    }
    const deletedUser = db.users.splice(userIndex, 1);
    posts = db.posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        comments = db.comments.filter((comment) => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });
    comments = db.comments.filter((comment) => comment.author !== args.id);
    return deletedUser[0];
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => (post.id = args.id));
    if (postIndex === -1) {
      throw Error("Post does not exist ");
    }
    const deletedPost = db.posts.splice(postIndex, 1);
    comments = comments.filter((comment) => comment.post !== args.id);
    return deletedPost[0];
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);

    if (!post) {
      throw new Error("Post not Found");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }
    if (typeof data.body === "string") {
      post.body = data.body;
    }
    if (typeof data.published === "boolean") {
      post.published = data.published;
    }
    return post;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (!commentIndex === -1) {
      throw new Error("Comment bnot found");
    }

    const deletedComment = db.comments.splice(commentIndex, 1);
    return deletedComment[0];
  },
  updateUser(parent, args, { db }, info) {
    const user = db.users.find((user) => user.id == args.id);
    console.log(args);
    if (!user) {
      throw new Error("No use found");
    }
    if (typeof args.data.email === "string") {
      const emailTaken = db.users.some(
        (user) => user.email === args.data.email
      );
      if (emailTaken) {
        throw new Error("Email Taken");
      }
    }

    if (typeof args.data.name === "string") {
      user.name = args.data.name;
    }
    if (typeof args.data.age !== "undefined") {
      user.age = args.data.age;
    }
    return user;
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (typeof data.text === "string") {
      comment.text = data.text;
    }
    return comment;
  },
};

export { Mutations as default };
