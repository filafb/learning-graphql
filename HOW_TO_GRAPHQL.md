# GraphQL

- A query langague for API's (not a database technology)
- An alternative to REST

## GraphQL vs REST

1. Efficient data loading
2. Client access precisely the data it needs
3. Expectation for rapid feature development

- Main gain: `avoid over- and uderfetching data`

## Fundamental language

- The schema Definition Language (SDL)
- Graphql server usually exposes only one endpoint
- Object & Scalar Types:
  - Scalar: `String`, `Int`, `Float`, `Boolean`, `ID`
  - Object: It has fields that express the properties of that type and are composable. Eg: Person and Post (below)

### Schema and relationship:

- Bang mark (!) means the field is required
- Below: Defined one to many relationship (Person has many posts)

```
  type Person {
    name: String!
    age: Int!
    posts: [Post!]!
  }

  type Post {
    title: String!
    author: Person!
  }
```

### Queries

- Only query for the data needed
- Can pass arguments

```
{
  allPersons(last: 2) {
    name
    age
    posts {
      title
    }
  }
}
```

### Mutations

- Changes in the data ( from client to server)
  - Creating new data
  - updating existing data
  - deleting existing data
- Same syntactical structure as queries, but needs start with `mutation`

  ```
  mutation {
    createPerson(name: 'Bob', age: 36) {
      id
      name
      age
    }
  }
  ```

### Subscriptions

- Realtime Updates with Subscriptions - a stream of data
  Client initiates and holds a stable connection to server. When it happens, the server push the info to client

```
subscrtion {
  newPerson {
    name
    age
  }
}
```

### Defining a Schema

- Specifies the capabilities of the API and definis how clients can request the data

```
type Query {
  allPersons (last: Int): [Person!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
}

type Subscription {
  newPerson: Person!
}

type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}

```

### Resolvers Functions

    - When a server receives a query, it will call all the functions for the fiedls that are specified in the query's payload.
    - Called with 4 arguments:
      1. object - The previous object
      2. args - The arguments provided ot the field in the GraphQL query
      3. Context - A value which is provided to every resolver and holds important contextual information, like the currently logged in user, or access to a database
      4. info - a value which holds field-specific information relevevant to the current query as well as the schema details

### Graphql features

#### Fragement

For reusability

```
  type User {
      name: String!
      age: Int!
      email: String!
      street: String!
      zipcode: String!
      city: String!
  }
```

We could have for the address fields:

```
  fragment addressDetails on User {
    name
    street
    zipcode
    city
  }
```

Now we can query using it:

```
  {
    allUsers {
      ...addressDetails
    }
  }
```

#### Fields with arguments

```
  type Query {
    allUsers(olderThan: Int = -1):[User!]!
  }
```

Now, we can query like this:

```
{
  allUsers(olderThan: 30) {
    name
    age
  }
}
```

And the default value will be `>= 0`

#### Named Query Results with Aliases

```
{
  first: User(id: "1") {
    name
  }
  second: User(id: "2") {
    name
  }
}
```

The result:

```
{
  "first": {
    "name": "Alice"
  },
  "second": {
    "name": "Sarah"
  }
}
```

### Subscriptions

- Send server info to client, usually through `WebSockets`
