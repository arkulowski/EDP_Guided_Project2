import { useParams } from 'react-router-dom';
import films from '../assets/films.json' 

const Film = (props) => {
    const { id } = useParams();

    const film = films.find(film => film.id === parseInt(id));

    if (!film) {
        return <p>Film not found</p>;
    }

    return (
        <>
            <h1 id="film"></h1>
            <section id="generalInfo">
                <p>Released: {film.release_date}</p>
                <p>Director: {film.director}</p>
                <p>Episode: {film.episode_id}</p>
            </section>
            <section id="characters">
                <h2>Characters</h2>
                <ul></ul>
            </section>
            <section id="planets">
                <h2>Planets</h2>
                <ul></ul>
            </section>
        </>
    )
}

export default Film;