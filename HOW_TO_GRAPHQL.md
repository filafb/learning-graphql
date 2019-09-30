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
