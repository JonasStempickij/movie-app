import React from 'react';
import { useSelector } from 'react-redux';

const Movie = () => {
  const { setMovie } = useSelector((state) => state.movies);

  return (
    <>
      <div>
        <a href='/'>Back</a>
      </div>
      <div className='d-flex align-items-md-center flex-column flex-md-row'>
        <div className=''>
          <h2 className='d-md-none'>{setMovie.name}</h2>
          <p className='d-md-none'>{setMovie.year}</p>
          <img
            className='d-block w-75  mx-auto'
            src={setMovie.image_url}
            alt=''
          />
        </div>
        <div className='w-100'>
          <h2 className='d-none d-md-block'>{setMovie.name}</h2>
          <p className='d-none d-md-block'>{setMovie.year}</p>
          <div className='d-flex gap-3 my-3'>
            {setMovie.genre.map((genre, index) => {
              return (
                <span
                  className='border border-light border-1 rounded-pill px-3'
                  key={index}
                >
                  {genre}
                </span>
              );
            })}
          </div>
          <p className='my-3'>{setMovie.desc}</p>
          <div className='d-flex align-items-center flex-wrap'>
            <p className='m-0 me-1'>{setMovie.rating} </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-star'
              viewBox='0 0 16 16'
            >
              <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
            </svg>
          </div>
          <hr />
          <div className='d-flex gap-3'>
            <b>Directors</b>
            {setMovie.directors.map((director, index) => {
              return <span key={index}> {director}</span>;
            })}
          </div>
          <hr />
          <div className='d-flex gap-3 flex-wrap'>
            <b>Actors</b>
            {setMovie.actors.map((actor, index) => {
              return <span key={index}> {actor}</span>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
