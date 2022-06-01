import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMovie } from '../features/movies/movieSlice';

const MovieForm = () => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addMovie({ name }));
    setName('');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Title</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Movie
          </button>
        </div>
      </form>
    </section>
  );
};

export default MovieForm;
