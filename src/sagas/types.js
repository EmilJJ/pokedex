import { takeEvery, put, call } from 'redux-saga/effects';
import { LOAD_TYPES } from '../constants/types';
import { typesLoaded } from '../actions/types';
import api from '../utils/api';

import { types } from '../utils/mockData/types.js';

function* loadTypesSaga() {
  try {
    // const response = yield call(api.get, 'type/');
    // const { result } = response;
    const { results } = types;
    yield put(typesLoaded(results));
  } catch (error) {
    console.log(error);
  }
}

export default function* typesSaga() {
  yield* [takeEvery(LOAD_TYPES, loadTypesSaga)];
}
