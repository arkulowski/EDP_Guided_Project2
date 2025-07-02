import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    const navigateCharacter = (char) => {
        navigate(`/character/${char.id}`)   
    }
    useEffect(() => {
        fetch(`http://localhost:3000/api/characters`)
        .then((res) => {
            if (!res.ok) {
              throw new Error('Data could not be fetched!');
            }
            return res.json();
          })
          .then((data) => {
            setCharacters(data);
            //console.log(data);
          })
          .catch((error) => {
            console.error('Error fetching characters:', error);
          });
      }, []);
    

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
