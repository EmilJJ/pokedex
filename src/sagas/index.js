import { fork } from 'redux-saga/effects';
import pokemonSaga from './pokemon';

export default function* rootSaga() {
  return yield [fork(pokemonSaga)];
}
