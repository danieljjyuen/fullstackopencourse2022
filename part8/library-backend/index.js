const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuidv1 } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/


mongoose.set('strictQuery', false)


const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(()=> {
    console.log('connecting to ', MONGODB_URI)
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username:String!,
    favoriteGenre:String!,
    id:ID!
  }
  type Token {
    value:String!
  }
  type Author {
    name: String!,
    id:ID!,
    born:Int,
    bookCount:Int
  }
  type Book {
    title: String!,
    published:Int!,
    author:Author!,
    id:ID!,
    genres:[String!]!
  }
  type Mutation {
    addBook(
        title: String!,
        published:Int!,
        author:String!,
        genres:[String!]!
    ): Book,
    editAuthor(
        name:String!,
        setBornTo:Int!
    ):Author,
    createUser(
      username: String!
      favoriteGenre:String!
    ): User,
    login(
      username:String!
      password:String!
    ):Token
  }
  type Query {
    me: User,
    bookCount: Int,
    authorCount: Int
    allBooks(author:String, genre: String): [Book!]!
    allAuthors: [Author!]!
  } 
`

const resolvers = {
  Query: {
    bookCount:async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks:async (root, args) => {
        const findAuthor = await Author.findOne({name: args.author})

        if(args.author && args.genre){
            return await Book.find({author:findAuthor.id, genres:{$in:args.genre}}).populate('author')
        }else if(args.author){
            return await Book.find({author:findAuthor.id}).populate('author')
        }else if(args.genre){
            return await Book.find({genres:{$in: args.genre}}).populate('author')
        }else{
            return await Book.find({}).populate('author')
        }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root,args, context) => {
      return context.currentUser
    }

  },

  Author: {
    bookCount: async (root) => {
        const findAuthor = await Author.findOne({name: root.name})
        const booksByAuthor = await Book.find({author: findAuthor.id})
        return booksByAuthor.length
    }
  },


  Mutation: {
    createUser: async (root,args)=> {
      const user = new User({ username:args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new GraphQLError('creating the user failed', {
            extension: {
              code: 'BAD_USER_INPUT',
              invalidArgs:args,
              error
            }
          })
        })
    },
    login: async(root,args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== 'password') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
    addBook: async (root, args, context) => {

      const authorExist = await Author.findOne({name: args.author})
      const currentUser = context.currentUser

     
      if(!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      if(!authorExist){
        const newAuthor = new Author({name:args.author,})
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs:args,
              error
            }
          })
        }
      }
      const authorfound = await Author.findOne({name: args.author})
      
      const book = new Book({...args, author:authorfound})

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving Book Failed', {
          extensions: {
            code:'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      return book
    },
    editAuthor: async (root,args, context) => {
          const currentUser = context.currentUser
          const authorToBeEdit = await Author.findOne({name:args.name})

          if(!currentUser){
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          authorToBeEdit.born = args.setBornTo

          try {
            await authorToBeEdit.save()
          } catch (error) {
            throw new GraphQLError('Saving update failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
            }
          return authorToBeEdit
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})