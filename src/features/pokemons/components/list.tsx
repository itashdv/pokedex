import { useEffect } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import { IPokemon } from '../../../types';
import { requester } from '../../../api';
import { requestFetch, setList, setError } from '../pokemon-slice';

type Props = {
  offset: number;
  limit: number;
};

export const PokemonList = ({ offset, limit }: Props) => {
  const dispatch = useAppDispatch();

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

  return <div>Pokemon list</div>;
};
