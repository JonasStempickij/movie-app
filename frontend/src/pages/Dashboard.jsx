import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import MovieForm from '../components/MovieForm'; // Maybe use later for adding movies
import { reset, getMovies, imdbMovies } from '../features/movies/movieSlice';
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
        <h1>Welcome to {user && user.name}</h1>
        <p>Movies Dashboard</p>
      </section>

      {/* <MovieForm />  */}

      <section
        className='content'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {movies.length > 0 ? (
          <div className='movies'>
            {movies.map((movie) => {
              return <MovieItem key={movie._id} movie={movie} />;
            })}
          </div>
        ) : (
          <>
            <h3>You have no movies</h3>
            <p>Would you like to add IMDB top 250 movies ?</p>
            <button className='btn' onClick={() => dispatch(imdbMovies())}>
              Populate dashboard
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
