import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MovieForm from '../components/MovieForm';
import { reset, getMovies } from '../features/movies/movieSlice';
import Spinner from '../components/Spinner';
import MovieItem from '../components/MovieItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { movies, isLoading, isError, message } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(getMovies());

    if (!isError) {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Movies Dashboard</p>
      </section>

      <MovieForm />

      <section className='content'>
        {movies.length > 0 ? (
          <div className='goals'>
            {movies.map((movie) => {
              return <MovieItem key={movie._id} movie={movie} />;
            })}
          </div>
        ) : (
          <h3>You have no movies added</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
