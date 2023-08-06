import { useEffect, useState } from 'react';
import { getMovies } from 'API';
import { FilmList } from 'components/FilmList/FilmList';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix';

const Home = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchMovies = async () => {
        const response = await getMovies();
        const movies = response.results;
        if (movies.length === 0) {
          return Notify.failure('Oops.. Simesing went wrong');
        }
        setFilms(movies);
      };
      fetchMovies();
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      {films.length > 0 && <FilmList films={films} />}
      {isLoading && <Loader />}
      {error && <p>Oops.. Simesing went wrong</p>}
    </main>
  );
};

export default Home;
