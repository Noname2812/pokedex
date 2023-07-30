import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  pokemonStatsType,
  pokemonTypeInterface,
  userPokemonType,
} from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { getUserPokemons } from "./getUserPokemon";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addpokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: string[] | pokemonTypeInterface[];
      stats?: pokemonStatsType[];
    },
    { getState, dispatch }
  ) => {
    try {
      const {
        app: { userInfor },
        pokemon: { userPokemons },
      } = getState() as RootState;
      if (!userInfor?.email) {
        return dispatch(setToast("Please login !!!"));
      }
      const index = userPokemons.findIndex((userPokemon: userPokemonType) => {
        return userPokemon.name === pokemon.name;
      });
      if (index === -1) {
        let types: string[] = [];
        if (!pokemon.stats) {
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString())
          );
        } else {
          types = pokemon.types as string[];
        }
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfor.email,
        });
        dispatch(getUserPokemons());
        dispatch(
          setToast(`${pokemon.name.toUpperCase()} added to your collection.`)
        );
      } else {
        dispatch(
          setToast(
            `${pokemon.name.toUpperCase()} already part of your collection.`
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);
