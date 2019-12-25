const express=require("express");
const graphqlHTTP=require("express-graphql");
const Schema=require("./schemas/schama.js")
const app=express();


const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/graphql");
mongoose.connection.once("open",()=>{
    console.log("connected to he database");
})



app.use("/graphql",graphqlHTTP({
schema:Schema,
graphiql:true
}))


app.listen(4000,()=>{ console.log("new listening for request 4000") })