const graphql = require("graphql");
const _ = require("lodash");
const Book=require("../models/Books")
const Author=require("../models/Author")

const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLSchema, GraphQLID ,GraphQLList} = graphql;




const AuthorType=new GraphQLObjectType({
  name:"author",
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:new GraphQLNonNull(GraphQLString)},
    age:{type:new GraphQLNonNull(GraphQLString)},
    book:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        console.log(parent);
        console.log(args);
        return Book.find({authorId:parent.id})
      }
    }
  })
})


const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    genera: { type: new GraphQLNonNull(GraphQLString) },
    author:{
      type:AuthorType,
      resolve(parent,args){
        console.log(parent);
        console.log(args);
        return Author.findById(parent.authorId)
      }
    }
  })
}); 



const RootQuery = new GraphQLObjectType({
  name: "RootQuertyType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(book, { id: args.id });
        return Book.findById(args.id)
      }
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        console.log(parent,args);
        // return _.find(author,{id:args.id})
        return Author.findById(args.id)


      }
    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find()
      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
        return Author.find()
      }
    }
  }
});



const Mutation=new GraphQLObjectType({
  name:"Mutaion",
  fields:{
    addAuthor:{
      type:AuthorType,
      args:{
        name:{type:GraphQLString},
        age:{type:GraphQLString}
      },
      resolve(parent,args){
        let author=new Author({
          name:args.name,
          age:args.age
        })
       return author.save()
      }
    },
    addBook:{
      type:BookType,
      args:{
        title:{type:GraphQLString},
        genra:{type:GraphQLString},
        authorId:{type:GraphQLID}
      },
      resolve(parent,args){
        let book=new Book({
          title:args.title,
          genera:args.genera,
          authorId:args.authorId
        })

        return book.save();
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
