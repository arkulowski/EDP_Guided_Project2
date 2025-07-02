import { useParams } from 'react-router-dom';
import characters from '../assets/characters.json' // Ensure this path is correct

const Character = () => {
    // Use useParams to get the id from the URL
    const { id } = useParams();

    // Find the character with the matching id
    const character = characters.find(char => char.id === parseInt(id));

    // Check if character exists
    if (!character) {
        return <p>Character not found</p>;
    }

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
                <p>{character.homeworld}</p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                </ul>
            </section>
        </>
    );
}

export default Character;
