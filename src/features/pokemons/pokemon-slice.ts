import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import type { IPokemon } from '../../types';

interface IPokemonState {
  list: IPokemon[];
  current: IPokemon | null;
  pending: boolean;
  error: string;
}

const initialState: IPokemonState = {
  list: [],
  current: null,
  pending: false,
  error: '',
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    requestFetch: state => ({ ...state, pending: true }),
    setList: (state, action: PayloadAction<IPokemon[]>) => ({
      ...state,
      list: action.payload,
      pending: false,
    }),
    setPokemon: (state, action: PayloadAction<IPokemon>) => ({
      ...state,
      current: action.payload,
    }),
    setError: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
      pending: false,
    }),
  },
});

export const { requestFetch, setList, setError } = pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemons;

export default pokemonSlice.reducer;
