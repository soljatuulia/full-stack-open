import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, addVote } from './requests';
import { useMessageDispatch } from './AnecdoteContext';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useMessageDispatch();

  const updateAnecdoteMutation = useMutation(addVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  });

  const handleVote = async (anecdote) => {
    console.log('vote');
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    await dispatch({ type: 'SHOW_NOTIFICATION', payload: `You voted: ${anecdote.content}`});
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: 1
    });
  console.log(result);

  if ( result.isLoading ) {
    return <div>Loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
