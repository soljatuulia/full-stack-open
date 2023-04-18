import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, addAnecdote } from '../requests';

const AnecdoteForm = () => {

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  });

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0});
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={createAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
