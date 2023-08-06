import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const FilmList = ({ films }) => {
  const location = useLocation();

  return (
    <ul>
      {films.map(film => {
        return (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`} state={{ from: location }}>
              {film.title || film.name || film.original_title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      original_title: PropTypes.string,
    })
  ).isRequired,
};
