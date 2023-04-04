import { ChangeEvent, useState, useEffect } from 'react';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

import { POKEMON_TYPES } from '../../../constants';
import { PokemonType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectPokemons, filterByTypes } from '../pokemon-slice';

export const TypesFilter = () => {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector(selectPokemons);

  const [types, setTypes] = useState<string[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const arr: string[] = event.target.checked
      ? [...types, event.target.name]
      : types.filter(type => type !== event.target.name);

    setTypes(arr);
  };

  useEffect(() => {
    const filteredPokemons = list.filter(pokemon =>
      pokemon.types.some(type => types.includes(type))
    );

    dispatch(filterByTypes(filteredPokemons));
  }, [types]);

  return (
    <FormGroup row>
      {POKEMON_TYPES.map((type: PokemonType) => (
        <FormControlLabel
          key={type.name}
          control={
            <Checkbox
              name={type.name}
              onChange={onChange}
              style={{ color: type.color }}
            />
          }
          label={type.name}
        />
      ))}
    </FormGroup>
  );
};
