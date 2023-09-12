import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    // createAnecdote(state, action){ 
    //     const content = action.payload
    //     return state.concat(asObject(content))
    // },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const updatedAnecdote = action.payload.updated
      return state.map(state => state.id === id ? updatedAnecdote : state)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes(state,action){
      return state.concat(action.payload)
    }
  }
})

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const findAnecdote = state.anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = {
      ...findAnecdote,
      votes: findAnecdote.votes+1
    }
    const updated = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote({id, updated}))

  }
}
export const createAnecdote =  (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    await anecdoteService.getAll().then(response => dispatch(setAnecdotes(response)))
  }
}

export const { updateAnecdote, setAnecdotes, appendAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer