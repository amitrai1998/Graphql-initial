import { Prisma } from "prisma-binding";
const prisma = new Prisma({
  typeDefs: __dirname + "/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
});

prisma.query
  .users(null, "{id name email posts{id title body}}")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
