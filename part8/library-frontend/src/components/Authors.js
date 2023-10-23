import { useQuery, useMutation} from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useState } from 'react'


const Authors = ({authors, setError}) => {
  const [name, setName] = useState(authors.length > 0 ? authors[0].name : '')
  //const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR,{
    refetchQueries:[{query:ALL_AUTHORS}],
    onError:(error) => {
      const message = error.graphQLErrors.map(e => e.message).join('\n')
      setError(message)
    }
  })


  const defaultName = authors.length > 0 ? authors[0].name : ''
 
const handleUpdate = (event) => {
  event.preventDefault()
  editAuthor({variables:{name, setBornTo:parseInt(born)}})
  setName(defaultName)
  setBorn('')
}
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label>
              name
              <select 
                value={name}
                defaultValue={defaultName}
                onChange={event => setName(event.target.value)}
              >
                {authors.map(author => 
                  <option value={author.name}>{author.name}</option>
                )}
              </select>
            </label>
          </div>
          <div>
            born
            <input
              value={born}
              type='number'
              onChange={({target})=> setBorn(target.value)}/>
          </div>
          <button>update author</button>
        </form>
    </div>
  )
}

export default Authors
