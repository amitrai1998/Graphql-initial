const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID ,GraphQLList} = graphql;

var book = [
  { name: "Name of the Wind", id: "1", genera: "thriller",authorId:"2" },
  { name: "Name of the Wind 2", id: "2", genera: "thriller",authorId:"2" },

  { name: "The Final Empire", id: "3", genera: "comidy" ,authorId:"1"},
  { name: "The Witcher", id: "4", genera: "comidy", authorId:"1"}
];

var author = [
  { name: "Jorge RR martin", id: "1" },
  { name: "Amit rai", id: "2" }
];



const AuthorType=new GraphQLObjectType({
  name:"author",
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    book:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        console.log(parent);
        console.log(args);
        return _.filter(book,{ authorId :parent.id})
      }
    }
  })
})


const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genera: { type: GraphQLString },
    author:{
      type:AuthorType,
      resolve(parent,args){
        console.log(parent);
        console.log(args);
        return _.find(author,{id:parent.authorId})
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
        return _.find(book, { id: args.id });
      }
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        console.log(parent,args);
        return _.find(author,{id:args.id})

      }
    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return book
      }
    },
    author:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
        return author
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
