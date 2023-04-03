import { combineReducers } from '@reduxjs/toolkit';

import { pokemonReducer } from '../features/pokemons';

export const reducer = combineReducers({
  pokemons: pokemonReducer,
});
