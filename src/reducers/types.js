import combineEvents from '../utils/combineEvents';
import { TYPES_LOADED } from '../constants/types';

const types = combineEvents(
  {
    [TYPES_LOADED]: (state, action) => action.types,
  },
  [],
);

export default types;
