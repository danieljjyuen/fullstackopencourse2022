import { useSelector, useDispatch } from 'react-redux'
import { displayMessage, hideMessage } from '../reducers/notificationReducer'


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

      dispatch({type:'anecdotes/voteAnecdote', payload:id})
      dispatch(displayMessage(`you voted for \'${content}\'`))
      setTimeout(()=>{
        dispatch(hideMessage())
      },5000)
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