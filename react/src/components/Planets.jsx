import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";

const Planet = (props) => {
    const { id } = useParams();


    const navigate = useNavigate();
    const [planet, setPlanet] = useState({});
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    const navigateCharacter = (character) => {
        navigate(`/character/${character.id}`)
    }
    const navigateFilm = (film) => {
        navigate(`/film/${film.id}`)
    }
    const fetchFilms = async () => {
        fetch(`http://localhost:3000/api/planets/${id}/films`)
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


    const fetchPlanet = async () => {
        fetch(`http://localhost:3000/api/planets/${id}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched!');
                }
                return res.json();
            })
            .then((data) => {
                setPlanet(data);
            })
            .catch((error) => {
                console.error('Error fetching planet:', error);
            });
    }

    useEffect(() => {
        fetchPlanet();
        fetchCharacters();
        fetchFilms();
    }, []);


    return (
        <>
            <h1 id="name">{planet.name}</h1>
            <section id="generalInfo">
                <p>Population: {planet.population}</p>
                <p>Climate: {planet.climate}</p>
                <p>Terrain: {planet.terrain}</p>
            </section>
            <section id="characters">
                <h2>Characters that are from this planet:</h2>
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
            <section id="films">
                <h2>Films this planet appears in:</h2>
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
    )
}

export default Planet;