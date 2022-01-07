import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styles } from './ErrorFallback.styles';

interface Props {
  error: Error;
}

export const ErrorFallback = ({ error }: Props): JSX.Element => {
  return (
    <Container sx={styles.container} maxWidth={false}>
      <Box sx={styles.box}>
        <Typography variant='h3' align='center'>
          Something went wrong:
        </Typography>
        <Typography variant='h5' align='center'>
          {error.message}
        </Typography>
      </Box>
    </Container>
  );
};
