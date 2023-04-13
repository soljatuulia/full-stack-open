import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';


const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault();
    const inputFilter = event.target.value;
    dispatch(filterChange(inputFilter));
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input name="filter" 
                    onChange={handleChange} />
    </div>
  );
};

export default Filter;