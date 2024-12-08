import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import PokemonList from './components/PokemonList';
import Loader from './components/Loader';

const url = 'https://pokeapi.co/api/v2/pokemon';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPageUrl, setCurrentPageUrl] = useState(url);
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    useEffect(() => {
        setLoading(true);
        axios
            .get(currentPageUrl)
            .then((response) => {
                setPokemon(response.data.results.map((result) => result.name));
                setLoading(false);
                setNextPageUrl(response.data.next);
                setPrevPageUrl(response.data.previous);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [currentPageUrl]);
    if (loading)
        return (
            <h2>
                <Loader />
            </h2>
        );
    function goToNextPage() {
        setCurrentPageUrl(nextPageUrl);
    }
    function goToPrevPage() {
        setCurrentPageUrl(prevPageUrl);
    }

    return (
        <>
            <section className="pokemon-section">
                <PokemonList pokemon={pokemon} />
                <div className="buttons">
                    <button
                        onClick={prevPageUrl ? goToPrevPage : null}
                        style={{
                            opacity: prevPageUrl || '0.5',
                            pointerEvents: prevPageUrl || 'none',
                        }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextPageUrl ? goToNextPage : null}
                        style={{
                            opacity: nextPageUrl || '0.5',
                            pointerEvents: nextPageUrl || 'none',
                        }}
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
}

export default App;
