import { Alert } from '@mui/material';

type Props = {
  message: string;
};

export const ErrorAlert = ({ message }: Props) => (
  <Alert severity="error">{message}</Alert>
);
