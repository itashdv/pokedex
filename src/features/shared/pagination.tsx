import { ChangeEvent, MouseEvent } from 'react';
import { TablePagination } from '@mui/material';

type Props = {
  count: number;
  page: number;
  limit: number;
  handlePageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleLimitChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const Pagination = ({
  count,
  page,
  limit,
  handlePageChange,
  handleLimitChange,
}: Props) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      labelRowsPerPage={'Per page'}
      onPageChange={handlePageChange}
      rowsPerPage={limit}
      onRowsPerPageChange={handleLimitChange}
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0',
      }}
    />
  );
};
