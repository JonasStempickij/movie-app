import React from 'react';
import { useSelector } from 'react-redux';
import { FaLongArrowAltLeft } from 'react-icons/fa';

const Movie = () => {
  const { setMovie } = useSelector((state) => state.movies);

  return (
    <>
      <FaLongArrowAltLeft />
      <div className='movie-container'>
        <img
          className='poster'
          width={230}
          height={345}
          src={setMovie.image_url}
          alt=''
        />
        <div className='movie-details'>
          <div className='movie-header'>
            <h2>{setMovie.name}</h2>
            <small className='year'>{setMovie.year}</small>
            <p>
              Directed by <span>{setMovie.directors}</span>{' '}
            </p>
          </div>
          <section className='movie-desc'>
            <p>{setMovie.desc}</p>
            <div className='genre-group'>
              {setMovie.genre.map((genre, index) => {
                return (
                  <div className='genre' key={index}>
                    {genre}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Movie;
