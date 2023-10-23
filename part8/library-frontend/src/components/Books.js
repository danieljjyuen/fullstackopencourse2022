import { useQuery} from '@apollo/client'
import { useState } from 'react'

const Books = ({books}) => {
  const [genre, setGenre] = useState(null)
  const filteredBooks = genre === null? books: books.filter(book => book.genres.includes(genre))
 
  const listGenres = [...new Set(books.map(book => book.genres).flat())]

  const handleGenre = (genre)=> {
    
    setGenre(genre)
  }
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {listGenres.map(genre => 
        <button onClick={() =>handleGenre(genre)}>{genre}</button>)
      }
      <button onClick={()=>handleGenre(null)}>all genre</button>
    </div>
  )
}

export default Books
