import { useSelector, useDispatch } from 'react-redux'
import { displayMessage, hideMessage, setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filters}) => {
        if(filters===''){
            return anecdotes
        }else{
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filters))
        }
    })
    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()
  
    const vote = (id, content ) => {

      dispatch(voteAnecdote(id))
      dispatch(setNotification(`you voted for \'${content}\'`,5))
    }
    return(
        <div>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
        </div>
      )}
        </div>
    )

}

export default AnecdoteList