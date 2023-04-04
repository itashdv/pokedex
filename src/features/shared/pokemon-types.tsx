import { Chip, Stack } from '@mui/material';

import { POKEMON_TYPES } from '../../constants';

type Props = {
  types: string[];
};

export const PokemonTypes = ({ types }: Props) => {
  const filteredTypes = POKEMON_TYPES.filter(arrayType =>
    types.some(type => type === arrayType.name)
  );

  return (
    <Stack direction="column" spacing={1}>
      {filteredTypes.map(type => (
        <Chip
          key={type.name}
          label={type.name}
          variant="outlined"
          style={{ background: type.color }}
        />
      ))}
    </Stack>
  );
};
