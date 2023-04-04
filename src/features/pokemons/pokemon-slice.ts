import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import type { OffsetLimit, IPokemon, PaginationPayload } from '../../types';

interface IPokemonState {
  list: IPokemon[];
  current: IPokemon | null;
  pending: boolean;
  error: string;
  currentOffset: OffsetLimit | null;
  nextOffset: OffsetLimit | null;
  previousOffset: OffsetLimit | null;
  count: number | null;
  page: number | null;
}

const initialState: IPokemonState = {
  list: [],
  current: null,
  pending: false,
  error: '',
  currentOffset: {
    offset: 0,
    limit: 10,
  },
  nextOffset: null,
  previousOffset: null,
  count: 100,
  page: 0,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    requestFetch: state => ({ ...state, pending: true }),
    setList: (state, action: PayloadAction<PaginationPayload>) => ({
      ...state,
      list: action.payload.list,
      count: action.payload.count,
      nextOffset: action.payload.next,
      previousOffset: action.payload.previous,
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
    setPage: (state, action: PayloadAction<number>) => {
      const nextPage = action.payload;

      const currentPage = state.page;

      if (nextPage > currentPage && state.nextOffset) {
        return { ...state, page: nextPage, currentOffset: state.nextOffset };
      }

      if (nextPage < currentPage && state.previousOffset) {
        return {
          ...state,
          page: nextPage,
          currentOffset: state.previousOffset,
        };
      }

      return state;
    },
    setLimit: (state, action: PayloadAction<number>) => ({
      ...state,
      currentOffset: { ...state.currentOffset, limit: action.payload },
    }),
  },
});

export const { requestFetch, setList, setError, setLimit, setPage } =
  pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemons;

export default pokemonSlice.reducer;
