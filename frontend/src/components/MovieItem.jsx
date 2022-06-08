import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMovie } from '../features/movies/movieSlice';

const MovieItem = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = async () => {
    await dispatch(setMovie(movie._id));
    await navigate('/movie/' + movie._id);
  };

  return (
    <div className='col-6 col-md-4 col-lg-3 d-flex mb-3 align-items-center justify-content-center'>
      <button onClick={onClick}>
        <img className='img-fluid' src={movie.thumb_url} alt='' />
      </button>
    </div>
  );
};

export default MovieItem;
