export interface AppTypeInitialState {
  toasts: string[];
  userInfor: undefined | { email: string };
}

export interface PokemonTypeInitialState {
  allPokemon: undefined | genericPokemonType[];
  randomPokemon: undefined | generatedPokemonType[];
  compareQueue: generatedPokemonType[];
  userPokemons: userPokemonType[];
}
export interface genericPokemonType {
  name: string;
  url: string;
}
export interface generatedPokemonType {
  name: string;
  id: number;
  image: string;
  types: pokemonTypeInterface[];
}
export interface pokemonTypeInterface {
  [key: string]: {
    image: string;
    resistance: string[];
    strength: string[];
    weakness: string[];
    vulnerable: string[];
  };
}
export interface userPokemonType extends generatedPokemonType {
  firebaseID?: string;
}
export type pokemonStatType =
  | "vulnerable"
  | "weakness"
  | "strength"
  | "resistance";
export interface pokemonStatsType {
  name: string;
  value: string;
}
