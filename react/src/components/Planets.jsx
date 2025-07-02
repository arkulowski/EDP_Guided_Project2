const Planet = (props) => {
    const planet = props.planet

    return (
        <>
            <h1 id="name"></h1>
            <section id="generalInfo">
                <p>Population: </p>
                <p>Climate: </p>
                <p>Terrain: </p>
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