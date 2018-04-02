import { fork } from 'redux-saga/effects';
import pokemonsSaga from './pokemons';
import typesSaga from './types';

export default function* rootSaga() {
  return yield [fork(pokemonsSaga), fork(typesSaga)];
}
