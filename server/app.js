const express=require("express");
const graphqlHTTP=require("express-graphql");
const Schema=require("./schemas/schama.js")
const app=express();


app.use("/graphql",graphqlHTTP({
schema:Schema,
graphiql:true
}))


app.listen(4000,()=>{ console.log("new listening for request 4000") })