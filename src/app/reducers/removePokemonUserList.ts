import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/firebaseConfig";

export const removePokemonUserList = createAsyncThunk(
  "pokemon/removePokemon",
  async (id: string) => {
    try {
      await deleteDoc(doc(pokemonListRef, id));
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);
