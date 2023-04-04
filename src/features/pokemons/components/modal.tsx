import { Grid, Modal, Typography, Box } from '@mui/material';
import { IPokemon } from '../../../types';

type Props = {
  current: IPokemon | null;
  handleClose: (pokemon: IPokemon) => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PokemonModal = ({ current, handleClose }: Props) => {
  return (
    <Modal
      open={Boolean(current)}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ textTransform: 'capitalize' }}
        >
          {current.name}
        </Typography>

        <img src={current.avatar} />

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Height: {current.height}
        </Typography>
      </Box>
    </Modal>
  );
};
