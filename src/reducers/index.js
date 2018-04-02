import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pokemons from './pokemons';
import types from './types';

export default function createReducer() {
  return combineReducers({
    routing: routerReducer,
    pokemons,
    types,
  });
}
