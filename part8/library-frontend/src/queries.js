import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query AllAuthors {
    allAuthors {
      born
      bookCount
      id
      name
    }
  }
  `

export const ALL_BOOKS = gql`
query AllBooks {
    allBooks {
      author
      genres
      id
      published
      title
    }
  }
`

export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $published: Int!, $genres: [String!]!, $author: String) {
  addBook(title: $title, published: $published, genres: $genres, author: $author) {
    author
    genres
    id
    published
    title
  }
}
`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}`