import { useEffect, MouseEvent, ChangeEvent } from 'react';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { IPokemon, PaginationPayload } from '../../../types';
import { requester } from '../../../api';
import { Pagination, Loader, ErrorAlert } from '../../shared';

import {
  requestFetch,
  setList,
  setError,
  setLimit,
  setPage,
  setPokemon,
  selectPokemons,
} from '../pokemon-slice';

import { ListItem } from './list-item';
import { PokemonModal } from './modal';
import { TypesFilter } from './types-filter';

export const PokemonList = () => {
  const dispatch = useAppDispatch();

  const {
    list,
    filtered,
    current,
    pending,
    error,
    currentOffset,
    count,
    page,
  } = useAppSelector(selectPokemons);

  const { offset, limit } = currentOffset;

  const handlePokemonClick = (pokemon: IPokemon) => {
    dispatch(setPokemon(pokemon));
  };

  const handleClose = () => handlePokemonClick(null);

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

  const renderList = filtered.length !== 0 ? filtered : list;

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

  if (pending) return <Loader />;

  if (error) return <ErrorAlert message={error} />;

  return (
    <div>
      {current && <PokemonModal current={current} handleClose={handleClose} />}

      <TypesFilter />

      <Pagination
        count={count}
        page={page}
        limit={limit}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />

      <Grid container spacing={2}>
        {renderList.map((pokemon: IPokemon) => (
          <ListItem
            key={pokemon.id}
            pokemon={pokemon}
            handlePokemonClick={handlePokemonClick}
          />
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
