import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { IPokemon } from '../../../types';
import { PokemonTypes } from '../../shared';

type Props = {
  pokemon: IPokemon;
  handlePokemonClick: (pokemon: IPokemon) => void;
};

export const ListItem = ({ pokemon, handlePokemonClick }: Props) => {
  const onClick = () => handlePokemonClick(pokemon);

  return (
    <Grid item xs={6} md={3}>
      <Card sx={{ maxWidth: '160px', paddingTop: '20px' }} onClick={onClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={pokemon.avatar}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              style={{ textTransform: 'capitalize' }}
              align="center"
              gutterBottom
              variant="h5"
              component="div"
            >
              {pokemon.name}
            </Typography>

            <PokemonTypes types={pokemon.types} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
