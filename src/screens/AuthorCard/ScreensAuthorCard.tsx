import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import authorPhoto from '../../assets/images/authorPhoto.jpg';
import { useAllAuthors } from '../../hooks';
import { AuthorProps } from '../../types/inerfaces';
import { authorsSelectors, store } from '../../store/store';
import { styles } from './ScreensAuthorCard.styles';
import { ScreensNotFound } from '../NotFound/ScreensNotFound';
import { Entities } from '../../types/enums';
import { LayoutCard } from '../../components/Layout/Card/LayoutCard';

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

  return (
    <LayoutCard
      id={currentIndex}
      entity={Entities.Author}
      entities={authors}
      onNextCard={nextAuthor}
      onPreviousCard={previousAuthor}
      image={authorPhoto}
    >
      <CardContent sx={styles.cardContent}>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders.firstName')}: {author.firstName}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders.lastName')}: {author.lastName}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders.country')}: {author.country}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders.birthDate')}: {author.birthDate}
        </Typography>
      </CardContent>
    </LayoutCard>
  );
};
