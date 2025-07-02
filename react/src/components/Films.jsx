import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";


const Film = () => {
    const { id } = useParams();


    const navigate = useNavigate();
    const [film, setFilm] = useState({});
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const navigateCharacter = (character) => {
        navigate(`/character/${character.id}`)
    }
    const navigatePlanet = (planet) => {
        navigate(`/planet/${planet.id}`)
    }
    const fetchPlanets = async () => {
        fetch(`http://localhost:3000/api/films/${id}/planets`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched!');
                }
                return res.json();
            })
            .then((data) => {
                setPlanets(data);
            })
            .catch((error) => {
                console.error('Error fetching planets:', error);
            });
    }
    const fetchCharacters = async () => {
        fetch(`http://localhost:3000/api/films/${id}/characters`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched!');
                }
                return res.json();
            })
            .then((data) => {
                setCharacters(data);
            })
            .catch((error) => {
                console.error('Error fetching films:', error);
            });
    }


    const fetchFilm = async () => {
        fetch(`http://localhost:3000/api/films/${id}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched!');
                }
                return res.json();
            })
            .then((data) => {
                setFilm(data);
            })
            .catch((error) => {
                console.error('Error fetching characters:', error);
            });
    }

    useEffect(() => {
        fetchFilm();
        fetchCharacters();
        fetchPlanets();
    }, []);


    return (
        <>
            <h1 id="film">{film.title}</h1>
            <section id="generalInfo">
                <p>Released: {film.release_date}</p>
                <p>Director: {film.director}</p>
                <p>Episode: {film.episode_id}</p>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul>
                    {
                        characters.map((character) => (
                            <li key={character.id}>
                                <button onClick={() => navigateCharacter(character)} className="btn btn-primary">{character.name}</button>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section id="planets">
                <h2>Planets</h2>
                <ul>
                    {
                        planets.map((planet) => (
                            <li key={planet.id}>
                                <button onClick={() => navigatePlanet(planet)} className="btn btn-primary">{planet.name}</button>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    )
}

export default Film;