import combineEvents from '../utils/combineEvents';
import { POKEMONS_WAS_LOADED } from '../constants/pokemons';

const pokemonsList = combineEvents(
  {
    [POKEMONS_WAS_LOADED]: (state, action) => action.pokemons,
  },
  [],
);

export default pokemonsList;
