import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage, hideMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdoteHandler = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))
        dispatch(displayMessage(`added ${content}`))
        event.target.anecdote.value=''
        setTimeout(()=> {
            dispatch(hideMessage())
        }, 5000)
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