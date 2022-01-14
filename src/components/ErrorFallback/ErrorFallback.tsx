import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styles } from './ErrorFallback.styles';
import { useAppSelector } from '../../hooks';

interface Props {
  error: Error;
}

export const ErrorFallback = ({ error }: Props): JSX.Element => {
  const { additionalError } = useAppSelector((state) => state.app);

  return (
    <Container sx={styles.container} maxWidth={false}>
      <Box sx={styles.box}>
        <Typography variant='h3' align='center'>
          Something went wrong:
        </Typography>
        <Typography variant='h5' align='center'>
          {additionalError || error}
        </Typography>
      </Box>
    </Container>
  );
};
