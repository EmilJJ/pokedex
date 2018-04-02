import { LOAD_TYPES, TYPES_LOADED } from '../constants/types';

export const loadTypes = () => ({
  type: LOAD_TYPES,
});

export const typesLoaded = types => ({
  type: TYPES_LOADED,
  types,
});
