import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pokemons from './pokemons';

export default function createReducer() {
  return combineReducers({
    routing: routerReducer,
    pokemons,
  });
}
