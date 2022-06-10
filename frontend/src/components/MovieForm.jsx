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

    const onChangeGenre = (e) => {
        dispatch(setGenre(e.target.value));
    };

    return (
        <section className='d-flex flex-column gap-2 mb-3 align-items-center'>
            <div className='d-flex'>
                <label htmlFor='genre' className='me-3'>
                    Filter by genre:{' '}
                </label>
                <select name='genre' value={genre} onChange={onChangeGenre}>
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
