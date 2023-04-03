import { Container, Typography } from '@mui/material';

import { PokemonList } from './features/pokemons/components';

const App = () => {
  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h3" component="div">
        Pokedex
      </Typography>
      <PokemonList offset={0} limit={10} />
    </Container>
  );
};

export default App;
