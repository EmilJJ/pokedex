import {
  LOAD_ALL_POKEMONS,
  LOAD_POKEMONS_BY_TYPE,
  POKEMONS_WAS_LOADED,
  POKEMONS_LOADING_FAILED,
} from '../constants/pokemons';

export const loadAllPokemons = (offset, limit) => ({
  type: LOAD_ALL_POKEMONS,
  offset,
  limit,
});

export const loadPokemonsByType = pokemonType => ({
  type: LOAD_POKEMONS_BY_TYPE,
  pokemonType,
});

export const pokemonsLoaded = pokemons => ({
  type: POKEMONS_WAS_LOADED,
  pokemons,
});

export const pokemonsLoadingFailed = error => ({
  type: POKEMONS_LOADING_FAILED,
  error,
});
