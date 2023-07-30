import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDocs, query, where } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { userPokemonType } from "../../utils/Types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/pokemonTypes";

export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    try {
      const {
        app: { userInfor },
        pokemon: { userPokemons },
      } = getState() as RootState;
      if (!userInfor) return;
      else {
        const firestoreQuery = query(
          pokemonListRef,
          where("email", "==", userInfor.email)
        );
        const fectchedPokemons = await getDocs(firestoreQuery);
        if (fectchedPokemons.docs.length) {
          const userPokemons: userPokemonType[] = [];
          fectchedPokemons.forEach(async (pokemon) => {
            const pokemons = pokemon.data().pokemon;
            // @ts-ignore
            let image = images[pokemons.id];
            if (!image) {
              // @ts-ignore
              image = defaultImages[pokemons.id];
            }
            const types = pokemons.types.map((name: string) => ({
              // @ts-ignore
              [name]: pokemonTypes[name],
            }));
            userPokemons.push({
              ...pokemons,
              firebaseID: pokemon.id,
              image,
              types,
            });
          });
          return userPokemons;
        }
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
);
