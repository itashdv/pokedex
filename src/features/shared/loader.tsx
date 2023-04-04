import { Skeleton, Stack } from '@mui/material';

export const Loader = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rounded" height={20} />
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rounded" height={20} />
    </Stack>
  );
};
