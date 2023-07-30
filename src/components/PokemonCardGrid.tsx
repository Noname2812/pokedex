import React from "react";
import CardPokemon from "./CardPokemon";
import { userPokemonType } from "../utils/Types";
const PokemonCardGrid = ({ pokemons }: { pokemons: userPokemonType[] }) => {
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: userPokemonType) => {
            return <CardPokemon pokemon={data} key={data.id} />;
          })}
      </div>
    </div>
  );
};

export default PokemonCardGrid;
// {pokemons && pokemons.length > 0 && (
//   <InfiniteScroll
//     dataLength={pokemons.length}
//     next={() => dispatch(getInitialPokemonData())}
//     hasMore={pokemons.length < 50}
//     loader={<Loading />}
//     height={1000}
//   >
//     <div className="pokemon-card-grid">
//       {pokemons?.map((data: userPokemonType) => {
//         return <CardPokemon pokemon={data} key={data.id} />;
//       })}
//     </div>
//   </InfiniteScroll>
// )}
