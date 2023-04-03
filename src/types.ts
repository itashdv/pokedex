type ListPokemon = {
  name: string;
  url: string;
};

interface IPokemon {
  id: number;
  name: string;
  avatar: string;
  height: number;
  moves: string[];
  types: string[];
}

export { ListPokemon, IPokemon };
