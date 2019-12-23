const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

// let links = [{
//   id: 'link-0',
//   url: 'wwww.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// }]

// let idCount = links.length

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote,
  // updateLink: (parent, args) => {
  //   let link = links.find(el => el.id === args.id)
  //   link.url = args.url ? args.url : link.url
  //   link.description = args.description ? args.description: link.description
  //   return link
  // },
  // deleteLink: (parent, args) => {
  //   let link = links.find(el => el.id === args.id)
  //   links = links.filter(el => el.id !== args.id)
  //   return link
  // }

  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log('Server is running on PORT 4000'));
