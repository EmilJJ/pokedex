import {
  LOAD_ALL_POKEMONS,
  LOAD_POKEMONS_BY_TYPE,
  POKEMONS_WAS_LOADED,
  POKEMONS_LOADING_FAILED,
  LOAD_POKEMON_BY_ID,
  POKEMON_LOADED,
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

export const loadPokemonById = id => ({
  type: LOAD_POKEMON_BY_ID,
  id,
});

export const pokemonLoaded = pokemon => ({
  type: POKEMON_LOADED,
  pokemon,
});
