import { useDispatch } from 'react-redux';
import { deleteMovie } from '../features/movies/movieSlice';

const MovieItem = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div className='goal'>
      <div>{new Date(movie.createdAt).toLocaleString()}</div>
      <h2>{movie.title}</h2>
      <button
        onClick={() => {
          dispatch(deleteMovie(movie._id));
        }}
        className='close'
      >
        X
      </button>
    </div>
  );
};

export default MovieItem;
