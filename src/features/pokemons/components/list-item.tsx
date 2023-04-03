import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { IPokemon } from '../../../types';

type Props = {
  pokemon: IPokemon;
};

export const ListItem = ({ pokemon }: Props) => {
  return (
    <Grid item xs={6} md={3}>
      <Card sx={{ maxWidth: 200 }}>
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
              gutterBottom
              variant="h5"
              component="div"
            >
              {pokemon.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
