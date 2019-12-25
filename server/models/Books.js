const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const BookSchema=new Schema({
    title:String,
    genera:String,
    authorId:String,
})

module.exports=mongoose.model("Book",BookSchema)