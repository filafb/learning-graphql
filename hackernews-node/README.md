# GraphQL and Node.js

## Technologies

- `graphql-yoga` - built on top of `Express`, `appolo-server`, and `graphql-js`
- `Prisma`: Replace a ORM. Help with resolvers
- `GraphQL Playground`

### Create a server

- Using `graphql-yoga`, passing `schema types` (GraphQL schema), `resolvers` (schema implementation), and context
- The structure of `resolvers` are the sme as the `schema types`
- `Schema Types` (typeDefs) can be defined in a `.grapql` file

#### GraphQL Schema

- Special Roots:
  - `Query`, `Mutation`, `Subscription`
  - Fields on these roots types `Root Field`

#### Basic Rules for creating a GRAPHQL API

also known as _Schema-driven_ or _Schema-first development_

1. Extend the GraphQL Schema
2. Implement corresponding resolver

- All fields in the Schema have to have a resolver functions. However, the server can infer some scalar fields

#### The query resolution process

- Every resolvers receives a parent object. The parent element is the result of the previous resolver execution level. Each level of nesting in the Schema is a execution level

- The second argument a resolver receives is the `arguments` for the operation defined in the Schema definition

- The third argument - `context` - is a plain object all resolver can read from and write to. It's a way to pass arbritatry data or functions to the resolvers. Here, we are attaching the `prisma` object to it. Also, in the example, making the context as a function allow us to acces the HTTP Request
