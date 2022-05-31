import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMovie } from '../features/movies/movieSlice';

const MovieForm = () => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addMovie({ title }));
    setTitle('');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
