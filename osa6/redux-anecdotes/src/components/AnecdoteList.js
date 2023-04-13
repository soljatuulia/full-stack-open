import { useSelector, useDispatch } from 'react-redux';
import { giveVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(a => 
      a.content.toLowerCase().includes(state.filter.toLowerCase()))
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(giveVote(id));
  };

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;