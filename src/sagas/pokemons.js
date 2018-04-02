import { takeEvery, put, call } from 'redux-saga/effects';
import {
  LOAD_ALL_POKEMONS,
  LOAD_POKEMONS_BY_TYPE,
} from '../constants/pokemons';
import { pokemonsLoaded } from '../actions/pokemons';
import api from '../utils/api';

// *** MOCK DATA**** //
import { type } from '../utils/mockData/type';
import pokemon from '../utils/mockData/pokemon.json';
// *** *** //

function* loadAllPokemonsSaga({ offset, limit }) {
  try {
    const offsetUrl = `?limit=${limit}&offset=${offset}`;
    let pokemons = window.localStorage.getItem('pokemons');

    if (!pokemons) {
      const response = yield call(
        api.get,
        `pokemons/${offset ? offsetUrl : ''}`,
      );

      const { count } = response;

      const promises = response.results.map(pokemon =>
        api.get(`pokemon/${pokemon.name}/`),
      );

      pokemons = yield Promise.all(promises);

      window.localStorage.setItem(
        'pokemons',
        JSON.stringify({
          list: pokemons,
          count,
          pagination: { offset, limit },
        }),
      );
    }

    pokemons = JSON.parse(pokemons);

    yield put(pokemonsLoaded(pokemons));
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

    yield put(
      pokemonsLoaded({
        list: getPokemonsResult,
        count: 0,
        pagination: { offset: 0, limit: 0 },
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* pokemonsSaga() {
  yield* [
    takeEvery(LOAD_ALL_POKEMONS, loadAllPokemonsSaga),
    takeEvery(LOAD_POKEMONS_BY_TYPE, loadPokemonsByTypeSaga),
  ];
}
