import React, { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData";
import { getPokemonData } from "../app/reducers/getPokemonData";
import PokemonCardGrid from "../components/PokemonCardGrid";

const Search = () => {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemon } = useAppSelector(
    ({ pokemon }) => pokemon
  );

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, []);
  useEffect(() => {
    if (allPokemon) {
      const data = [...allPokemon];
      const randomPokemonID = data
        .sort(() => Math.random() - Math.random())
        .slice(0, 60);
      dispatch(getPokemonData(randomPokemonID));
    }
  }, [allPokemon, dispatch]);
  const getPokemons = async (text: string) => {
    if (text.length) {
      const pokemons = allPokemon?.filter((pokemon) => {
        if (pokemon.name.includes(text.toLocaleLowerCase())) return pokemon;
      });
      dispatch(getPokemonData(pokemons!));
    } else {
      const data = [...(allPokemon as [])];
      const randomPokemonID = data
        .sort(() => Math.random() - Math.random())
        .slice(0, 60);
      dispatch(getPokemonData(randomPokemonID));
    }
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          className="pokemon-search"
          placeholder="Search pokemon"
          onChange={(e) => getPokemons(e.target.value)}
        />
        <PokemonCardGrid pokemons={randomPokemon!} />
      </div>
    </>
  );
};

export default Wrapper(Search);
