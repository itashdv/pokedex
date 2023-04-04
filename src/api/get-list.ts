import { PokemonClient } from 'pokenode-ts';

import type { ListPokemon, OffsetLimit, PaginationPayload } from '../types';
import { mapPokemons } from '../utils';

const api = new PokemonClient();

export const getList = async (
  offset: number,
  limit: number
): Promise<PaginationPayload> => {
  const list: ListPokemon[] = (await api.listPokemons(offset, limit)).results;

  const fullList: any = await api.listPokemons(offset, limit);

  const nextOffset: OffsetLimit | null = fullList.next
    ? {
        offset: parseInt(
          new URLSearchParams(fullList.next.replace('?', '&')).get('offset')
        ),
        limit: parseInt(
          new URLSearchParams(fullList.next.replace('?', '&')).get('limit')
        ),
      }
    : null;

  const previousOffset: OffsetLimit | null = fullList.previous
    ? {
        offset: parseInt(
          new URLSearchParams(fullList.previous.replace('?', '&')).get('offset')
        ),
        limit: parseInt(
          new URLSearchParams(fullList.previous.replace('?', '&')).get('limit')
        ),
      }
    : null;

  const names: string[] = list.map((item: ListPokemon) => item.name);

  const listArray = await names.reduce(async (acc, name) => {
    const pokemonArray: any = await acc;

    const pokemon: any = await api.getPokemonByName(name);

    pokemonArray.push(pokemon);

    return pokemonArray;
  }, Promise.resolve([]));

  return {
    list: mapPokemons(listArray),
    count: fullList.count,
    next: nextOffset,
    previous: previousOffset,
  };
};
