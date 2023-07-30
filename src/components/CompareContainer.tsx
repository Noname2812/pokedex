import React from "react";
import {
  pokemonStatType,
  pokemonTypeInterface,
  userPokemonType,
} from "../utils/Types";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { pokemonTypes } from "../utils/pokemonTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeFromCompare } from "../app/slices/PokemonSlice";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
const CompareContainer = (props: {
  pokemon: userPokemonType;
  isEmty: boolean;
}) => {
  const navigate = useNavigate();
  const createStatsArray = (
    types: pokemonTypeInterface[],
    statType: pokemonStatType
  ) => {
    const statsArray: any = [];
    const statsSet = new Set<string>();
    types.forEach((type: pokemonTypeInterface) => {
      const key = Object.keys(type)[0];
      type[key][statType].forEach((stat: string) => {
        if (!statsSet.has(stat)) {
          // @ts-ignore
          statsArray.push({ name: stat, image: pokemonTypes[stat].image });
          statsSet.add(stat);
        }
      });
    });
    return statsArray;
  };
  const getStats = () => {
    return (
      <>
        <div className="compare-types">
          <h4 className="pokemon-types-title">Strength</h4>
          <div className="pokemon-types-icons">
            {createStatsArray(props.pokemon?.types!, "strength").map(
              (stat: { image: string }) => (
                <div
                  className="pokemon-type"
                  key={`${stat.image} ${Math.random()}`}
                >
                  <img src={stat.image} className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="compare-types">
          <h4 className="pokemon-types-title">Weakness</h4>
          <div className="pokemon-types-icons">
            {createStatsArray(props.pokemon?.types!, "weakness").map(
              (stat: { image: string }) => (
                <div
                  className="pokemon-type"
                  key={`${stat.image} ${Math.random()}`}
                >
                  <img src={stat.image} className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="compare-types">
          <h4 className="pokemon-types-title">Vulnerable</h4>
          <div className="pokemon-types-icons">
            {createStatsArray(props.pokemon?.types!, "vulnerable").map(
              (stat: { image: string }) => (
                <div
                  className="pokemon-type"
                  key={`${stat.image} ${Math.random()}`}
                >
                  <img src={stat.image} className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="compare-types">
          <h4 className="pokemon-types-title">Resistance</h4>
          <div className="pokemon-types-icons">
            {createStatsArray(props.pokemon?.types!, "resistance").map(
              (stat: { image: string }) => (
                <div
                  className="pokemon-type"
                  key={`${stat.image} ${Math.random()}`}
                >
                  <img src={stat.image} className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
      </>
    );
  };
  const dispatch = useAppDispatch();
  return (
    <div className="compare-item">
      {props.pokemon && (
        <div className="compare-element">
          <div className="compare-infor">
            <div className="compare-details">
              <h3>{props.pokemon.name.toUpperCase()}</h3>
              <img
                src={props.pokemon.image}
                alt="name pokemon"
                className="compare-image"
              />
            </div>
            <div className="compare-types-container">
              <div className="compare-types">
                <h4 className="pokemon-types-title">Type</h4>
                <div className="pokemon-types-icons">
                  {props.pokemon.types.map(
                    (type: pokemonTypeInterface, key) => {
                      const keys = Object.keys(type);
                      return (
                        <div className="pokemon-type" key={key}>
                          <img
                            src={type[keys[0]].image}
                            alt="type"
                            className="pokemon-type-image"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {getStats()}
            </div>
          </div>
          <div className="compare-actions-buttons">
            <button
              className="compare-btn"
              onClick={() => dispatch(addPokemonToList(props.pokemon))}
            >
              ADD
            </button>
            <button
              className="compare-btn"
              onClick={() => navigate(`/pokemon/${props.pokemon?.id}`)}
            >
              VIEW
            </button>
            <button
              className="compare-btn"
              onClick={() =>
                dispatch(removeFromCompare({ id: props.pokemon.id }))
              }
            >
              REMOVE
            </button>
          </div>
        </div>
      )}
      {props.isEmty && (
        <div className="emty-compare">
          <FaPlus onClick={() => navigate("/search")} />
          <h3>Add Pokemon to Comparison</h3>
        </div>
      )}
    </div>
  );
};

export default CompareContainer;
