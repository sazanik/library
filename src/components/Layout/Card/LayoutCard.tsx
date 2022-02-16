import { Box, Button, Card, CardActions, CardMedia } from '@mui/material';
import React from 'react';

import { AuthorProps, BookProps } from '../../../types/inerfaces';
import { styles } from './LayoutCard.styles';

interface CardProps {
  children: JSX.Element;
  entities: AuthorProps[] | BookProps[];
  onPreviousCard: () => void;
  onNextCard: () => void;
  image: string;
  id: number;
  content: {
    altImageText: string;
    previousButtonText: string;
    nextButtonText: string;
  };
}

export const LayoutCard = ({
  children,
  entities,
  onPreviousCard,
  onNextCard,
  image,
  id,
  content,
}: CardProps): JSX.Element => {
  return (
    <Box>
      <Card sx={styles.card}>
        <CardMedia
          style={styles.image}
          component='img'
          height='100%'
          image={image}
          alt={content.altImageText}
        />
        {children}
      </Card>
      <CardActions style={styles.cardActions}>
        <Button disabled={id === 0} onClick={onPreviousCard} size='small'>
          {content.previousButtonText}
        </Button>
        <Button disabled={id >= entities.length - 1} onClick={onNextCard} size='small'>
          {content.nextButtonText}
        </Button>
      </CardActions>
    </Box>
  );
};
