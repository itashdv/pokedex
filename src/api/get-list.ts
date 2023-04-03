import { PokemonClient } from 'pokenode-ts';

import type { ListPokemon, IPokemon } from '../types';
import { mapPokemons } from '../utils';

const api = new PokemonClient();

export const getList = async (
  offset: number,
  limit: number
): Promise<IPokemon[]> => {
  const list: ListPokemon[] = (await api.listPokemons(offset, limit)).results;

  const names: string[] = list.map((item: ListPokemon) => item.name);

  const listArray = await names.reduce(async (acc, name) => {
    const pokemonArray: any = await acc;

    const pokemon: any = await api.getPokemonByName(name);

    pokemonArray.push(pokemon);

    return pokemonArray;
  }, Promise.resolve([]));

  return mapPokemons(listArray);
};
