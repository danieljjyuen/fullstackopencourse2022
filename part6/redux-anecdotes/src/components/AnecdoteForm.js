import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdoteHandler = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.anecdote.value))
        event.target.anecdote.value=''
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdoteHandler}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm