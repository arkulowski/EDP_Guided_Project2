import { useParams } from 'react-router-dom';
import planets from '../assets/planets.json' 

const Planet = (props) => {
    const { id } = useParams();

    const planet = planets.find(film => film.id === parseInt(id));

    if (!planet) {
        return <p>Film not found</p>;
    }

    return (
        <>
            <h1 id="name"></h1>
            <section id="generalInfo">
                <p>Population: {planet.population}</p>
                <p>Climate: {planet.climate}</p>
                <p>Terrain: {planet.terrain}</p>
            </section>
            <section id="characters">
                <h2>Characters that are from this planet:</h2>
                <ul></ul>
            </section>
            <section id="films">
                <h2>Films this planet appears in:</h2>
                <ul></ul>
            </section>
        </>
    )
}

export default Planet;