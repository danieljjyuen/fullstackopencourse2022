const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

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
        console.log('allauthors')
        return await Author.find({}).populate('books')
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
        pubsub.publish('BOOK_ADDED', { bookAdded: book})
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
      },
  }

  module.exports = resolvers