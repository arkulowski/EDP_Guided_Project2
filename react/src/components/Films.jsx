const Film = (props) => {
    const film = props.film

    return (
        <>
            <h1 id="film"></h1>
            <section id="generalInfo">
                <p>Released: </p>
                <p>Director: </p>
                <p>Episode: </p>
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