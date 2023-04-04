type ListPokemon = {
  name: string;
  url: string;
};

type OffsetLimit = {
  offset: number;
  limit: number;
};

interface IPokemon {
  id: number;
  name: string;
  avatar: string;
  height: number;
  moves: string[];
  types: string[];
}

type PaginationPayload = {
  list: IPokemon[];
  count: number;
  next: OffsetLimit | null;
  previous: OffsetLimit | null;
};

export { ListPokemon, OffsetLimit, IPokemon, PaginationPayload };
