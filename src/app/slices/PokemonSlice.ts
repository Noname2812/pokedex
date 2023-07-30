import { createSlice } from "@reduxjs/toolkit";
import { PokemonTypeInitialState } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";
import { getUserPokemons } from "../reducers/getUserPokemon";
import { removePokemonUserList } from "../reducers/removePokemonUserList";

const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
  randomPokemon: undefined,
  compareQueue: [],
  userPokemons: [],
};
export const PokemonSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        if (state.compareQueue.length === 2) state.compareQueue.pop();
        state.compareQueue.unshift(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );
      const tempQueue = [...state.compareQueue];
      tempQueue.splice(index, 1);
      state.compareQueue = tempQueue;
    },
    resetListUser: (state) => {
      state.userPokemons = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      // if (!state.allPokemon) {
      //   state.allPokemon = action.payload;
      // } else {
      //   const temp = [...state.allPokemon, action.payload];
      //   console.log(temp);
      //   state.allPokemon = temp;
      // }
      state.allPokemon = action.payload;
    });
    builder.addCase(getPokemonData.fulfilled, (state, action) => {
      state.randomPokemon = action.payload;
    });
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      state.userPokemons = action.payload!;
    });
    builder.addCase(removePokemonUserList.fulfilled, (state, action) => {
      const tempList = [...state.userPokemons];
      tempList.filter((item) => {
        return item.firebaseID !== action.payload;
      });
      state.userPokemons = tempList;
      console.log(tempList);
    });
  },
});
export const { addToCompare, removeFromCompare, resetListUser } =
  PokemonSlice.actions;
