import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import React, { useEffect, useState } from 'react';
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
  const { t } = useTranslation('default');
  const translations = {
    author: {
      cover: 'authorCover',
      previous: 'previousAuthor',
      next: 'nextAuthor',
    },
    book: {
      cover: 'bookCover',
      previous: 'previousBook',
      next: 'nextBook',
    },
  };

  const [translation, setTranslation] = useState<typeof translations.author>(
    translations[entity]
  );
  // eslint-disable-next-line
  useEffect(() => setTranslation(translations[entity]), [entity]);

  return (
    <Box>
      <Card sx={styles.card}>
        <CardMedia
          style={styles.image}
          component='img'
          height='100%'
          image={image}
          alt={t(translation.cover)}
        />
        {children}
      </Card>
      <CardActions style={styles.cardActions}>
        <Button disabled={id === 0} onClick={onPreviousCard} size='small'>
          {t(translation.previous)}
        </Button>
        <Button
          disabled={id >= entities.length - 1}
          onClick={onNextCard}
          size='small'
        >
          {t(translation.next)}
        </Button>
      </CardActions>
    </Box>
  );
};
