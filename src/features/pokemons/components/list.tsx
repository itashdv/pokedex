import { useEffect, MouseEvent, ChangeEvent } from 'react';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { IPokemon, PaginationPayload } from '../../../types';
import { requester } from '../../../api';
import { Pagination } from '../../shared';

import {
  requestFetch,
  setList,
  setError,
  setLimit,
  setPage,
  selectPokemons,
} from '../pokemon-slice';

import { ListItem } from './list-item';

export const PokemonList = () => {
  const dispatch = useAppDispatch();

  const { list, current, pending, error, currentOffset, count, page } =
    useAppSelector(selectPokemons);

  const { offset, limit } = currentOffset;

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setLimit(parseInt(event.target.value, 10)));
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(requestFetch());

        const payload: PaginationPayload = await requester.getList(
          offset,
          limit
        );

        dispatch(setList(payload));
      } catch (error) {
        dispatch(setError('Error fetching pokemons!'));
      }
    })();
  }, [offset, limit]);

  if (pending) return <p>Loading..</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Pagination
        count={count}
        page={page}
        limit={limit}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />

      <Grid container spacing={2}>
        {list.map((pokemon: IPokemon) => (
          <ListItem key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid>

      <Pagination
        count={count}
        page={page}
        limit={limit}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
};
