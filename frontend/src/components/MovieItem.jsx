import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMovie, setMovie } from '../features/movies/movieSlice';
import { MdDeleteForever } from 'react-icons/md';

const MovieItem = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = async () => {
    await dispatch(setMovie(movie._id));
    await navigate('/movie/' + movie._id);
  };

  return (
    <div className='movie'>
      <button onClick={onClick}>
        <img src={movie.thumb_url} alt='' />
      </button>
      <button
        onClick={() => {
          dispatch(deleteMovie(movie._id));
        }}
        className='delete'
      >
        <MdDeleteForever />
      </button>
    </div>
  );
};

export default MovieItem;
