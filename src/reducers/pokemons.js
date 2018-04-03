import { combineReducers } from 'redux';
import combineEvents from '../utils/combineEvents';
import {
  POKEMONS_WAS_LOADED,
  LOAD_POKEMONS_BY_TYPE,
  LOAD_ALL_POKEMONS,
  POKEMON_LOADED,
} from '../constants/pokemons';

const pokemonsList = combineEvents(
  {
    [POKEMONS_WAS_LOADED]: (
      state,
      { pokemons: { list, count, pagination: { offset, limit, currentPage } } },
    ) => ({
      list,
      pagination: {
        offset,
        limit,
        count,
        currentPage,
      },
    }),
  },
  {
    list: [],
    pagination: {
      offset: 0,
      limit: 0,
      count: 0,
      currentPage: 1,
      previousPage: 1,
    },
  },
);

const pokemonFilter = combineEvents(
  {
    [LOAD_POKEMONS_BY_TYPE]: (state, action) => ({
      type: action.pokemonType.toUpperCase(),
    }),
    [LOAD_ALL_POKEMONS]: () => ({
      type: 'ALL',
    }),
  },
  {
    type: 'ALL',
  },
);

const currentPokemon = combineEvents(
  {
    [POKEMON_LOADED]: (state, action) => action.pokemon,
  },
  null,
);

export default combineReducers({ pokemonsList, pokemonFilter, currentPokemon });
