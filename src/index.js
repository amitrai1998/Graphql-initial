import { GraphQLServer, PubSub } from "graphql-yoga";
// pub sub for subscription
import db from "./db.js";
import Comment from "./resolvers/Comment";
import User from "./resolvers/User";
import Query from "./resolvers/Query";
import Mutations from "./resolvers/Mutations";
import Subscription from "./resolvers/Subscription";
import "./prisma1";
//! new pub sub for subscription
const pubsub = new PubSub();
//! resolvers for API
const resolvers = {
  // ! resolvers for the post authors->
  Query: Query,
  // ! reoslvers ofr costue query in USer
  User: User,
  Comment: Comment,
  Mutation: Mutations,
  Subscription: Subscription,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log("The server is up");
});

// ! 14 relation ships
