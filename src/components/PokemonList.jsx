const PokemonList = ({ pokemon }) => {
    return (
        <div>
            {pokemon.map((name) => (
                <div key={name} className="pokemon-list">
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;
