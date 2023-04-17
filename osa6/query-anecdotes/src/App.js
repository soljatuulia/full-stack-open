import { useQuery } from 'react-query';
import { getAnecdotes } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote');
  };

  /*
  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ];
*/

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: 1
    });
  console.log(result);

  if ( result.isLoading ) {
    return <div>loading data...</div>
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
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
