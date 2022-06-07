import { useDispatch } from 'react-redux';
import { setGenre } from '../features/movies/movieSlice';

const MovieForm = ({ genre }) => {
  const dispatch = useDispatch();

  const genres = [
    'all',
    'horror',
    'action',
    'drama',
    'thriller',
    'crime',
    'mystery',
    'music',
    'sport',
    'animation',
    'adventure',
    'family',
    'romance',
    'sci-fi',
    'comedy',
    'western',
    'war',
    'biography',
    'film-noir',
  ];

  const onChange = (e) => {
    dispatch(setGenre(e.target.value));
  };

  return (
    <section className='text-center mb-3'>
      <div className='form-group'>
        <p>Filter by genre: </p>
        <select name='genre' value={genre} onChange={onChange}>
          {genres.map((genreOption, index) => {
            return (
              <option key={index} value={genreOption}>
                {genreOption}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
};

export default MovieForm;
