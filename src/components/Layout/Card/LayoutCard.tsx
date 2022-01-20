import { Box, Button, Card, CardActions, CardMedia } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { styles } from '../../../screens/BookCard/ScreensBookCard.styles';
import { Entities } from '../../../types/enums';
import { AuthorProps, BookProps } from '../../../types/inerfaces';

interface CardProps {
  children: JSX.Element;
  entity: Entities;
  entities: AuthorProps[] | BookProps[];
  onPreviousCard: () => void;
  onNextCard: () => void;
  image: string;
  id: number;
}

export const LayoutCard = ({
  children,
  entity,
  entities,
  onPreviousCard,
  onNextCard,
  image,
  id,
}: CardProps): JSX.Element => {
  const { t } = useTranslation();
  const cardsTranslation = {
    author: {
      cover: t('glossary:authorCover'),
      previous: t('buttons:previousAuthor'),
      next: t('buttons:nextAuthor'),
    },
    book: {
      cover: t('glossary:bookCover'),
      previous: t('buttons:previousBook'),
      next: t('buttons:nextBook'),
    },
  };

  return (
    <Box>
      <Card sx={styles.card}>
        <CardMedia
          style={styles.image}
          component='img'
          height='100%'
          image={image}
          alt={cardsTranslation[entity].cover}
        />
        {children}
      </Card>
      <CardActions style={styles.cardActions}>
        <Button disabled={id === 0} onClick={onPreviousCard} size='small'>
          {cardsTranslation[entity].previous}
        </Button>
        <Button
          disabled={id >= entities.length - 1}
          onClick={onNextCard}
          size='small'
        >
          {cardsTranslation[entity].next}
        </Button>
      </CardActions>
    </Box>
  );
};
