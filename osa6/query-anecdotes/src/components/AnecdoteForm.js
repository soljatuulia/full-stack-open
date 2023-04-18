import { useMutation, useQueryClient } from 'react-query';
import { addAnecdote } from '../requests';
import { useMessageDispatch } from '../AnecdoteContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useMessageDispatch();

  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `${error.response.data.error}` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  });

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0});
    await dispatch({ type: 'SHOW_NOTIFICATION', payload: `You added: ${content}` });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
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
