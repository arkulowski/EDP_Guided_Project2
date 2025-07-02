import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";

const Character = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [character, setCharacter] = useState({});
    const [homeworld, setHomeworld] = useState('');
    const [films, setFilms] = useState([]);
    const navigateFilm = (film) => {
        navigate(`/film/${film.id}`)
    }
    const navigatePlanet = (planet) => {
        navigate(`/planet/${planet.id}`)
    }
    const fetchFilms = async () => {
        fetch(`http://localhost:3000/api/characters/${id}/films`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched!');
                }
                return res.json();
            })
            .then((data) => {
                setFilms(data);
            })
            .catch((error) => {
                console.error('Error fetching films:', error);
            });
    }

    const fetchHomeworld = async () => {
        fetch(`http://localhost:3000/api/characters/${id}/planets`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched!');
                }
                return res.json();
            })
            .then((data) => {
                setHomeworld(data);
            })
            .catch((error) => {
                console.error('Error fetching homeworld:', error);
            });
    }

    const fetchCharacter = async () => {
        fetch(`http://localhost:3000/api/characters/${id}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched!');
                }
                return res.json();
            })
            .then((data) => {
                setCharacter(data);
            })
            .catch((error) => {
                console.error('Error fetching characters:', error);
            });
    }

    useEffect(() => {
        fetchCharacter();
        fetchHomeworld();
        fetchFilms();
    }, []);


    return (
        <>
            <h1 id="name">{character.name}</h1>
            <section id="generalInfo">
                <p>Height: {character.height} cm</p>
                <p>Mass: {character.mass} kg</p>
                <p>Born: {character.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <button onClick={() => navigatePlanet(homeworld)} className="btn btn-primary">{homeworld.name}</button>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {
                        films.map((film) => (
                            <li key={film.id}>
                                <button onClick={() => navigateFilm(film)} className="btn btn-primary">{film.title}</button>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    );
}

export default Character;
