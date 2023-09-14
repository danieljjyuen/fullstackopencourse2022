import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      //queryClient.invalidateQueries({queryKey:['anecdotes']})

      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log(anecdotes)
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({content, votes:0}) 
    event.target.anecdote.value = ''
     
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
