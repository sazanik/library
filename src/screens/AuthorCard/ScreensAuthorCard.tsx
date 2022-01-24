import { CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import authorPhoto from '../../assets/images/authorPhoto.jpg';
import { LayoutCard } from '../../components/Layout/Card/LayoutCard';
import { useAllAuthors } from '../../hooks';
import { authorsSelectors, store } from '../../store/store';
import { AuthorProps } from '../../types/inerfaces';
import { ScreensNotFound } from '../NotFound/ScreensNotFound';
import { styles } from './ScreensAuthorCard.styles';

export const ScreensAuthorCard = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { t } = useTranslation('default');

  const authors = useAllAuthors();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [author, setAuthor] = useState<AuthorProps | undefined>(
    authorsSelectors.selectById(store.getState(), id)
  );

  const previousAuthor = (): void => {
    const previousId = authorsSelectors.selectIds(store.getState())[
      currentIndex - 1
    ];
    navigate(`/authors/${previousId}`);
  };

  const nextAuthor = (): void => {
    const nextId = authorsSelectors.selectIds(store.getState())[
      currentIndex + 1
    ];
    navigate(`/authors/${nextId}`);
  };

  useEffect(() => {
    if (id) {
      const index = authorsSelectors
        .selectIds(store.getState())
        .findIndex((entityId) => entityId === id);
      setCurrentIndex(index);
      setAuthor(authorsSelectors.selectById(store.getState(), id));
    }
  }, [id]);

  if (!author) {
    return <ScreensNotFound />;
  }

  const content = {
    altImageText: t('glossary:authorCover'),
    previousButtonText: t('buttons:previousAuthor'),
    nextButtonText: t('buttons:nextAuthor'),
  };

  return (
    <LayoutCard
      id={currentIndex}
      entities={authors}
      onNextCard={nextAuthor}
      onPreviousCard={previousAuthor}
      image={authorPhoto}
      content={content}
    >
      <CardContent sx={styles.cardContent}>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders:firstName')}: {author.firstName}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders:lastName')}: {author.lastName}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders:country')}: {author.country}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders:birthDate')}: {author.birthDate}
        </Typography>
      </CardContent>
    </LayoutCard>
  );
};
