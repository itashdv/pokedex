import { useEffect } from 'react';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { IPokemon } from '../../../types';
import { requester } from '../../../api';
import {
  requestFetch,
  setList,
  setError,
  selectPokemons,
} from '../pokemon-slice';

import { ListItem } from './list-item';

type Props = {
  offset: number;
  limit: number;
};

export const PokemonList = ({ offset, limit }: Props) => {
  const dispatch = useAppDispatch();

  const { list, current, pending, error } = useAppSelector(selectPokemons);

  useEffect(() => {
    (async () => {
      try {
        dispatch(requestFetch());

        const pokemons: IPokemon[] = await requester.getList(offset, limit);

        dispatch(setList(pokemons));
      } catch (error) {
        dispatch(setError('Error fetching pokemons!'));
      }
    })();
  }, [offset, limit]);

  if (pending) return <p>Loading..</p>;

  if (error) return <p>{error}</p>;

  return (
    <Grid container spacing={2}>
      {list.map((pokemon: IPokemon) => (
        <ListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </Grid>
  );
};
