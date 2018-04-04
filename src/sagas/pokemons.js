import { takeEvery, put, call } from 'redux-saga/effects';
import {
  LOAD_POKEMONS,
  LOAD_POKEMONS_BY_TYPE,
  LOAD_POKEMON_BY_ID,
} from '../constants/pokemons';
import { pokemonsLoaded, pokemonLoaded } from '../actions/pokemons';
import api from '../utils/api';
import config from '../../config';
// *** MOCK DATA**** //
import type from '../utils/mockData/type.json';
import pokemon from '../utils/mockData/pokemon.json';
import { list } from '../utils/mockData/pokemons.json';
// *** *** ******** //

const { pagination: { limit } } = config;

function calculateOffset(limit, page) {
  let offset = 0;
  if (page === 1) return offset;

  for (let i = 2; i <= page; i += 1) {
    offset += limit;
  }

  return offset;
}

function* loadPokemonsSaga({ page }) {
  try {
    const offset = calculateOffset(limit, page);
    const offsetUrl = `?limit=${20}&offset=${offset}`;

    // const response = yield call(api.get, `pokemons/${offset ? offsetUrl : ''}`);

    // const { count } = response;

    // const promises = response.results.map(pokemon =>
    //   api.get(`pokemon/${pokemon.name}/`),
    // );

    // const pokemons = yield Promise.all(promises);

    yield put(pokemonsLoaded(list, 888, page));

    //  yield put(pokemonsLoaded(pokemons, count, pagae));
  } catch (error) {
    console.log(error);
  }
}

function* loadPokemonsByTypeSaga({ pokemonType }) {
  try {
    // const response = yield call(api.get, `type/${pokemonType.toLowerCase()}`);

    // const { pokemon: pokemons } = response;
    const { pokemon: pokemons } = type;

    const getPokemonsResult = [pokemon];

    // const promises = pokemons.map(pokemon =>
    //   api.get(`pokemon/${pokemon.name}/`),
    // );

    // const getPokemonsResult = yield Promise.all(promises);

    yield put(pokemonsLoaded(getPokemonsResult, 0, 1));
  } catch (error) {
    console.log(error);
  }
}

function* loadPokemonById({ id }) {
  try {
    //  const getPokemonResult = yield call(api.get, `/pokemon/${id}/`);

    yield put(pokemonLoaded(pokemon));
  } catch (error) {
    console.log(error);
  }
}

export default function* pokemonsSaga() {
  yield* [
    takeEvery(LOAD_POKEMONS, loadPokemonsSaga),
    takeEvery(LOAD_POKEMONS_BY_TYPE, loadPokemonsByTypeSaga),
    takeEvery(LOAD_POKEMON_BY_ID, loadPokemonById),
  ];
}
