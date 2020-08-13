// !data demo

const users = [
  { id: 1, name: "Amit rai", email: "amit@gmail.com" },
  { id: 2, name: "siddhi rai ", email: "siddhi@gmail.com", age: 13 },
  { id: 3, name: "Amit rai", email: "amit@gmail.com" },
];

const posts = [
  {
    id: 10,
    title: "A title in sort GraphQL",
    body: "this is body of post one ",
    published: true,
    author: 1,
  },
  {
    id: 11,
    title: "A title in sort node js",
    body: "This is body of post three ",
    published: true,
    author: 2,
  },
  {
    id: 12,
    title: "A title in sort react js",
    body: "this is sa body of four",
    published: true,
    author: 3,
  },
];
const comments = [
  { id: 1, text: "this is comment one", author: 1, post: 12 },
  { id: 2, text: "this is comment two", author: 2, post: 11 },
  { id: 3, text: "this is comment three", author: 3, post: 11 },
  { id: 4, text: "this is comment four", author: 1, post: 10 },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
