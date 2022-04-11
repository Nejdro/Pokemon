import "./App.css";
import Navbar from "./components/Navbar";
import Pokemon from "./components/Pokemon";
import { useEffect, useState } from "react";
import DarkMode from "./components/DarkMode";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [loadMore, setLoadMore] = useState(
    `https://pokeapi.co/api/v2/pokemon/`
  );
  const getPokemons = async () => {
    const resposne = await fetch(loadMore);
    const data = await resposne.json();

    setLoadMore(data.next);
    console.log(data);

    function createPokemon(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setPokemon((currentList) => [...currentList, data]);
      });
    }
    createPokemon(data.results);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      <Navbar />
      <div className="app-container">
        <AnimatePresence>
          <DarkMode />
          <div className="pokemon-container">
            <input
              className="form-control"
              type="text"
              placeholder="Search by name..."
              onChange={(e) => {
                setFilterData(e.target.value);
              }}
            />
            <div className="all-container">
              {pokemon
                .sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
                .filter((val) => {
                  if (filterData === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(filterData.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((pokemon, index) => (
                  <Pokemon
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other.dream_world.front_default}
                    type={pokemon.types[0].type.name}
                    type2={pokemon.types[1]?.type?.name}
                    weight={pokemon.weight}
                    height={pokemon.height}
                    key={index}
                  />
                ))}
            </div>
            <button className="load-more" onClick={() => getPokemons()}>
              Load More
            </button>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
