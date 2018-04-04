import {
  LOAD_POKEMONS,
  LOAD_POKEMONS_BY_TYPE,
  POKEMONS_WAS_LOADED,
  POKEMONS_LOADING_FAILED,
  LOAD_POKEMON_BY_ID,
  POKEMON_LOADED,
  GO_TO_FIRST_PAGE,
  GO_TO_LAST_PAGE,
  CHANGE_RANGE_UP,
  CHANGE_RANGE_DOWN,
} from '../constants/pokemons';

export const loadPokemons = (page = 1) => ({
  type: LOAD_POKEMONS,
  page,
});

export const loadPokemonsByType = pokemonType => ({
  type: LOAD_POKEMONS_BY_TYPE,
  pokemonType,
});

export const pokemonsLoaded = (pokemons, count, page) => ({
  type: POKEMONS_WAS_LOADED,
  pokemons,
  count,
  page,
});

export const pokemonsLoadingFailed = error => ({
  type: POKEMONS_LOADING_FAILED,
  error,
});

export const loadPokemonById = id => ({
  type: LOAD_POKEMON_BY_ID,
  id,
});

export const pokemonLoaded = pokemon => ({
  type: POKEMON_LOADED,
  pokemon,
});

export const goToFirstPage = () => ({
  type: GO_TO_FIRST_PAGE,
});

export const goToLastPage = lastPage => ({
  type: GO_TO_LAST_PAGE,
  lastPage,
});

export const changeRangeUp = () => ({
  type: CHANGE_RANGE_UP,
});

export const changeRangeDown = () => ({
  type: CHANGE_RANGE_DOWN,
});
