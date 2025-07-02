import { BrowserRouter as Router, Route, Routes, Link, useNavigate} from "react-router-dom";

const Home = (props) => {
    const navigate = useNavigate();
    const characters = props.characters;
    const navigateCharacter = (char) => {
        navigate(`/character/${char.id}`)   
    }

    return (
        <>
            <div>
                <h1>Star Wars Universe Lookup</h1>
            </div>
            <section id="charactersList">
                <ul>
                    {
                        characters.map((char) => (
                            <li key={char.id}>
                                <button onClick={() => navigateCharacter(char)} className="btn btn-primary">{char.name}</button>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    );
}

export default Home;
