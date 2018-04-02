import { combineReducers } from 'redux';
import combineEvents from '../utils/combineEvents';
import {
  POKEMONS_WAS_LOADED,
  LOAD_POKEMONS_BY_TYPE,
  LOAD_ALL_POKEMONS,
} from '../constants/pokemons';

const pokemonsList = combineEvents(
  {
    [POKEMONS_WAS_LOADED]: (
      state,
      { pokemons: { list, count, pagination: { offset, limit } } },
    ) => ({
      list,
      count,
      pagination: {
        offset,
        limit,
      },
    }),
  },
  { list: [], count: 0, pagination: { offset: 0, limit: 0 } },
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

export default combineReducers({ pokemonsList, pokemonFilter });
