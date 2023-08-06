import { useSearchParams } from 'react-router-dom';
import { getSearhedMovies } from 'API';
import { useEffect, useState } from 'react';
import { FilmList } from 'components/FilmList/FilmList';
import { Notify } from 'notiflix';
import { Loader } from 'components/Loader/Loader';

const Movies = () => {
  const [searchInput, setSearchInput] = useState('');
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getFilms = async query => {
      try {
        setIsLoading(true);
        const data = await getSearhedMovies(query);
        if (data.results.length === 0) {
          return Notify.failure('There is no movies with this title');
        }
        setFilms(data.results);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    const searchValue = searchParams.get('query');
    if (searchValue) {
      getFilms(searchValue);
    }
  }, [searchParams]);

  const handleSubmit = event => {
    event.preventDefault();

    if (!searchInput.trim()) {
      return Notify.failure('Please, write something');
    }
    setSearchParams({ query: searchInput.trim() });
    setSearchInput('');
  };

  return (
    <main>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {films.length > 0 && <FilmList films={films} />}
      {isLoading && <Loader />}
      {error && <p>Oops.. Simesing went wrong</p>}
    </main>
  );
};

export default Movies;
