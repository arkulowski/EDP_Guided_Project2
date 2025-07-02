import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  const navigateToFilm = (film) => {
    navigate(`/film/${film.id}`);
  };

  const navigateToPlanet = () => {
    if (homeworld?.id) {
      navigate(`/planet/${homeworld.id}`);
    }
  };

  const fetchCharacter = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/characters/${id}`);
      if (!res.ok) throw new Error('Data could not be fetched!');
      const data = await res.json();
      setCharacter(data);
      if (data.homeworld) {
        fetchHomeworld(data.homeworld);
      }
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  };

  const fetchHomeworld = async (homeworldId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/planets/${homeworldId}`);
      if (!res.ok) throw new Error('Homeworld could not be fetched!');
      const data = await res.json();
      setHomeworld(data);
    } catch (error) {
      console.error('Error fetching homeworld:', error);
    }
  };

  const fetchFilms = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/characters/${id}/films`);
      if (!res.ok) throw new Error('Data could not be fetched!');
      const data = await res.json();
      setFilms(data);
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  useEffect(() => {
    fetchCharacter();
    fetchFilms();
  }, []);

  return (
    <div>
      <h1 id="name">{character.name}</h1>

      <section id="generalInfo">
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        <p>Born: {character.birth_year}</p>
        {homeworld && (
          <p>
            Homeworld:{' '}
            <button onClick={navigateToPlanet} className="btn btn-link">
              {homeworld.name}
            </button>
          </p>
        )}
      </section>

      <section id="films">
        <h2>Films appeared in:</h2>
        <ul>
          {films.map((film) => (
            <li key={film.id}>
              <button onClick={() => navigateToFilm(film)} className="btn btn-primary">
                {film.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Character;
