import { useState, useEffect } from 'react';

import type { IPokemon } from '../types';
import { requester } from '../api';

export const usePokemons = (offset: number, limit: number) => {
  const [pending, setPending] = useState(false);

  const [error, setError] = useState('');

  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setError('');

        setPending(true);

        const pokemons: IPokemon[] = await requester.getList(offset, limit);

        setPokemons(pokemons);

        setPending(false);
      } catch (error) {
        setError('Error fetching pokemons!');

        setPending(false);
      }
    })();
  }, [offset, limit]);

  return { pending, error, pokemons };
};
