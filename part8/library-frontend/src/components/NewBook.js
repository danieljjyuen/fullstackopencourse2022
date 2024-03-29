import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { useMutation, useReadQuery } from '@apollo/client'
import { updateCache } from '../App'

const NewBook = ({setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const [ createBook ] = useMutation(CREATE_BOOK,{
    onError:(error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      //console.log(error.graphQLErrors[0].message)
      setError(messages)
    },
    update: (cache, response) => {
      console.log(response.data.addBook)
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
    refetchQueries:[{query:ALL_AUTHORS}, {query:ALL_BOOKS}]
    
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {title, author, 
        published:parseInt(published), 
        genres
      } 
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook