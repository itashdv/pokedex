import { IPokemon } from '../types';

export const mapPokemons = (pokemons: any[]): IPokemon[] => {
  const result: IPokemon[] = pokemons.map((pokemon: any) => {
    const item: IPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      avatar: pokemon.sprites.front_default,
      height: pokemon.height,
      moves: pokemon.moves.map((move: any) => move.move.name),
      types: pokemon.types.map((type: any) => type.type.name),
    };

    return item;
  });

  return result;
};
