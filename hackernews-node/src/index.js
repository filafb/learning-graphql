const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// let links = [{
//   id: 'link-0',
//   url: 'wwww.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// }]

// let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: (root, args, context, info) => context.prisma.links(),
    // link: (parent, args) => links.find(el => el.id === args.id)
  },
  Mutation: {
    post: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    },
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
  },
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log('Server is running on PORT 4000'))
