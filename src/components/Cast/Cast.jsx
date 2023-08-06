import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCastById } from 'API';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams(null);

  useEffect(() => {
    const getCurrentMovie = async () => {
      try {
        setIsLoading(true);
        const response = await getCastById(id);
        if (response.data.cast.length === 0) {
          return Notify.failure('Oops.. There is no casts');
        }
        setCast(response.data.cast);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentMovie();
  }, [id]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Oops.. Simesing went wrong</p>}
      {cast.length > 0 ? (
        <ul>
          {cast.map(actor => {
            const actorsPhoto = actor.profile_path
              ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
              : 'http://dummyimage.com/92x138';
            return (
              <li key={actor.id}>
                <img src={actorsPhoto} alt="NonPhoto" />
                <p>{actor.original_name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any casts for this movie.</p>
      )}
    </>
  );
};

export default Cast;
