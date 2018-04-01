import {
  LOAD_ALL_POKEMONS,
  POKEMONS_WAS_LOADED,
  POKEMONS_LOADING_FAILED,
} from '../constants/pokemons';

export const loadAllPokemons = () => ({
  type: LOAD_ALL_POKEMONS,
});

export const pokemonsLoaded = pokemons => ({
  type: POKEMONS_WAS_LOADED,
  pokemons,
});

export const pokemonsLoadingFailed = error => ({
  type: POKEMONS_LOADING_FAILED,
  error,
});
