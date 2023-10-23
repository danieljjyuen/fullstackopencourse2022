import { gql } from '@apollo/client'

export const ME = gql`
query{
  me{
   username
   favoriteGenre
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
      born
      bookCount
      id
      name
    }
  }
  `

export const ALL_BOOKS = gql`
query {
    allBooks {
      author{
        name
      }
      genres
      id
      published
      title
    }
  }
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $genres: [String!]!, $author: String!) {
  addBook(
    title: $title, 
    published: $published, 
    genres: $genres, 
    author: $author
  ) {
    author{
      name,
      id,
      born,
      bookCount
    }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username:$username, password: $password){
      value
    }
  }
`

