import { CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import bookCover from '../../assets/images/bookCover.jpg';
import { LayoutCard } from '../../components/Layout/Card/LayoutCard';
import { useAllBooks } from '../../hooks';
import { authorsSelectors, booksSelectors, store } from '../../store/store';
import { BookProps } from '../../types/inerfaces';
import { NotFound } from '../NotFound';
import { styles } from './styles';

export const BookCard = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { t } = useTranslation('default');

  const books = useAllBooks();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [book, setBook] = useState<BookProps | undefined>(
    booksSelectors.selectById(store.getState(), id)
  );

  const getAuthorName = (): string | undefined => {
    if (!book) {
      return;
    }
    const author = authorsSelectors.selectById(store.getState(), book.authorId);
    return `${author?.firstName} ${author?.lastName}`;
  };

  const previousBook = (): void => {
    const previousId = booksSelectors.selectIds(store.getState())[
      currentIndex - 1
    ];
    navigate(`/books/${previousId}`);
  };

  const nextBook = (): void => {
    const nextId = booksSelectors.selectIds(store.getState())[currentIndex + 1];
    navigate(`/books/${nextId}`);
  };

  useEffect(() => {
    if (id) {
      const index = booksSelectors
        .selectIds(store.getState())
        .findIndex((entityId) => entityId === id);
      setCurrentIndex(index);
      setBook(booksSelectors.selectById(store.getState(), id));
    }
  }, [id]);

  if (!book) {
    return <NotFound />;
  }

  const content = {
    altImageText: t('glossary:bookCover'),
    previousButtonText: t('buttons:previousBook'),
    nextButtonText: t('buttons:nextBook'),
  };

  return (
    <LayoutCard
      id={currentIndex}
      entities={books}
      onNextCard={nextBook}
      onPreviousCard={previousBook}
      image={bookCover}
      content={content}
    >
      <CardContent style={styles.cardContent}>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders:title')}: {book.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders:description')}: {book.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders:authorName')}: {getAuthorName()}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders:pagesCount')}: {book.pagesCount}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders:publishingYear')}: {book.publishingYear}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders:code')}: {book.code}
        </Typography>
      </CardContent>
    </LayoutCard>
  );
};
