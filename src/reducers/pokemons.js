import { combineReducers } from 'redux';
import combineEvents from '../utils/combineEvents';
import {
  POKEMONS_WAS_LOADED,
  LOAD_POKEMONS_BY_TYPE,
  LOAD_POKEMONS,
  POKEMON_LOADED,
  GO_TO_FIRST_PAGE,
  GO_TO_LAST_PAGE,
  CHANGE_RANGE_DOWN,
  CHANGE_RANGE_UP,
} from '../constants/pokemons';

const list = combineEvents(
  {
    [POKEMONS_WAS_LOADED]: (state, { pokemons }) => pokemons,
  },
  [],
);

const pagination = combineEvents(
  {
    [POKEMONS_WAS_LOADED]: (state, { count, offset }) => ({
      ...state,
      count,
      offset,
      activePage: offset,
    }),
    [CHANGE_RANGE_DOWN]: state => ({ ...state, begin: state.begin - 1 }),
    [CHANGE_RANGE_UP]: state => ({ ...state, begin: state.begin + 1 }),
    [GO_TO_FIRST_PAGE]: state => ({ ...state, begin: 1, activePage: 1 }),
    [GO_TO_LAST_PAGE]: (state, { lastPage }) => ({
      ...state,
      begin: lastPage - 2,
      activePage: lastPage,
    }),
  },
  { offset: 0, count: 0, begin: 1, activePage: 1 },
);

const pokemonFilter = combineEvents(
  {
    [LOAD_POKEMONS_BY_TYPE]: (state, action) => ({
      type: action.pokemonType.toUpperCase(),
    }),
    [LOAD_POKEMONS]: () => ({
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

export default combineReducers({
  list,
  pokemonFilter,
  currentPokemon,
  pagination,
});
