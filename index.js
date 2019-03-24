const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./Schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("POst started ate 50000");
});

// this is a devlopment branch
