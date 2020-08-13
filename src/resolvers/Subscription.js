const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count: count,
        });
      }, 1000);
      return pubsub.asyncIterator("count");
    },
  },
  comment: {
    subscribe(parent, { postId }, { pubsub, db }, info) {
      let post = db.posts.some((p) => p.id == postId);
      console.log(postId, post);
      if (!post) {
        throw new Error("Post Not found");
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("post");
    },
  },
};

export { Subscription as default };
