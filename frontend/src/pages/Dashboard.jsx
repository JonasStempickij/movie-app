import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MovieForm from '../components/MovieForm';
import {
  reset,
  setPage,
  getMovies,
  imdbMovies,
} from '../features/movies/movieSlice';
import Spinner from '../components/Spinner';
import MovieItem from '../components/MovieItem';
import ReactPaginate from 'react-paginate';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    movies,
    page,
    genre,
    totalMovies,
    numOfPages,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.movies);

  const handlePageClick = (e) => {
    dispatch(setPage(e.selected));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(getMovies({ page, genre }));

    // if (!isError) {
    //   dispatch(reset());
    // }
  }, [user, genre, navigate, isError, message, dispatch, page, totalMovies]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='text-center p-5'>
        <div className='h1'>Welcome to {user && user.name} movie dashboard</div>
        {totalMovies ? <small>you have {totalMovies} movies</small> : ''}
      </section>

      {totalMovies === 0 ? '' : <MovieForm genre={genre} />}

      <section
        className='content'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {totalMovies > 0 ? (
          <div className='row mb-3'>
            {movies.map((movie) => {
              return <MovieItem key={movie._id} movie={movie} />;
            })}
          </div>
        ) : (
          <>
            <h3>You have no movies</h3>
            <p>Would you like to add IMDB top 250 movies ?</p>
            <button
              className='btn btn-outline-light'
              onClick={() => dispatch(imdbMovies())}
            >
              Populate dashboard
            </button>
          </>
        )}
      </section>
      {totalMovies > 16 ? (
        <ReactPaginate
          className='paginate'
          onPageChange={handlePageClick}
          pageCount={numOfPages}
          forcePage={page}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Dashboard;
