const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;
const _ = require("lodash");

const book = [
  { name: "Bunch of thoughts", id: "1", authorID: "1" },
  { name: "The night in the skys", id: "2", authorID: "1" },
  { name: "The night in the skys", id: "2", authorID: "1" }
];

var author = [
  { name: "Amit rai", age: 44, id: "1" },
  { name: "viba verma", age: 12, id: "2" },
  { name: "Expressive", age: 34, id: "3" }
];

var AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(book, { author: parent.id });
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: "BookType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(author, { id: parent.authorID });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(book, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parens, args) {
        return _.find(author, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return book;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return author;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
