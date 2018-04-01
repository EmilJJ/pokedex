import { takeEvery, put, call } from 'redux-saga/effects';
import { LOAD_ALL_POKEMONS } from '../constants/pokemons';
import { pokemonsLoaded } from '../actions/pokemons';
import api from '../utils/api';

function* loadAllPokemonsSaga() {
  try {
    let pokemons = window.localStorage.getItem('pokemons');

    if (!pokemons) {
      const pokemonsUrls = yield call(api.get, 'pokemon');

      const promises = pokemonsUrls.results.map(pokemon =>
        api.get(`pokemon/${pokemon.name}/`),
      );

      pokemons = yield Promise.all(promises);

      window.localStorage.setItem('pokemons', JSON.stringify(pokemons));
    }

    pokemons = JSON.parse(pokemons);

    yield put(pokemonsLoaded(pokemons));
  } catch (error) {
    console.log(error);
  }
}

export default function* pokemonsSaga() {
  yield* [takeEvery(LOAD_ALL_POKEMONS, loadAllPokemonsSaga)];
}
