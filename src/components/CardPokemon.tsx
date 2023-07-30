import React from "react";
import { pokemonTypeInterface, userPokemonType } from "../utils/Types";
import { IoGitCompare } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCompare } from "../app/slices/PokemonSlice";
import { setToast } from "../app/slices/AppSlice";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
import { removePokemonUserList } from "../app/reducers/removePokemonUserList";

const CardPokemon = ({ pokemon }: { pokemon: userPokemonType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfor } = useAppSelector(({ app }) => app);
  return (
    <div className="card-pokemon">
      <div className="flex-in-card">
        <div className="pokemon-list">
          {location.pathname.includes("/search") ||
          location.pathname.includes("/pokemon") ? (
            <FaPlus
              color="green"
              onClick={() => {
                if (userInfor) {
                  dispatch(addPokemonToList(pokemon));
                } else {
                  navigate("/list");
                  dispatch(setToast("Please login !!"));
                }
              }}
            />
          ) : (
            <FaTrash
              color="red"
              onClick={() => {
                dispatch(removePokemonUserList(pokemon.firebaseID!));
                dispatch(
                  setToast(
                    `${pokemon.name.toUpperCase()} removed successfull !`
                  )
                );
              }}
            />
          )}
        </div>
        <div className="pokemon-compare">
          <IoGitCompare
            color="blue"
            onClick={() => {
              dispatch(addToCompare(pokemon));
              dispatch(
                setToast(
                  `Add success ${pokemon.name.toUpperCase()} to compare `
                )
              );
            }}
          />
        </div>
      </div>
      <h3>{pokemon.name}</h3>
      <img
        src={pokemon.image}
        alt="pokemon-image"
        loading="lazy"
        className="card-pokemon-image"
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      />
      <div className="card-pokemon-types">
        {pokemon.types.map((type: pokemonTypeInterface, index: number) => {
          const keys = Object.keys(type);
          return (
            <div className="card-pokemon-types-type" key={index}>
              <img
                src={type[keys[0]].image}
                alt="type-pokemon"
                className="card-pokemon-types-type-image"
                loading="lazy"
              />
              <h6 className="card-pokemon-types-type-text">{keys[0]}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardPokemon;
