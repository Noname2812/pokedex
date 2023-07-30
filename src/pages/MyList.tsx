import React, { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Login from "../components/Login";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { getUserPokemons } from "../app/reducers/getUserPokemon";

const MyList = () => {
  const { userInfor } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserPokemons());
  }, [userInfor, userPokemons]);
  return (
    <div className="list">
      {userInfor ? <PokemonCardGrid pokemons={userPokemons} /> : <Login />}
    </div>
  );
};

export default Wrapper(MyList);
