import { Box, Button, Card, CardActions, CardMedia } from '@mui/material';
import React from 'react';

import { styles } from '../../../screens/BookCard/ScreensBookCard.styles';
import { AuthorProps, BookProps } from '../../../types/inerfaces';

interface CardProps {
  children: JSX.Element;
  entities: AuthorProps[] | BookProps[];
  onPreviousCard: () => void;
  onNextCard: () => void;
  image: string;
  id: number;
  translation: {
    cover: string;
    next: string;
    previous: string;
  };
}

export const LayoutCard = ({
  children,
  entities,
  onPreviousCard,
  onNextCard,
  image,
  id,
  translation,
}: CardProps): JSX.Element => {
  return (
    <Box>
      <Card sx={styles.card}>
        <CardMedia
          style={styles.image}
          component='img'
          height='100%'
          image={image}
          alt={translation.cover}
        />
        {children}
      </Card>
      <CardActions style={styles.cardActions}>
        <Button disabled={id === 0} onClick={onPreviousCard} size='small'>
          {translation.previous}
        </Button>
        <Button
          disabled={id >= entities.length - 1}
          onClick={onNextCard}
          size='small'
        >
          {translation.next}
        </Button>
      </CardActions>
    </Box>
  );
};
