import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { styles } from './Book.styles';
import { useNavigate, useParams } from 'react-router-dom';
import bookCover from '../../assets/images/bookCover.jpg';
import { useAllBooks } from '../../hooks';
import { BookProps } from '../../types/inerfaces';
import { booksSelectors, store } from '../../store/store';
import { NotFound } from '../NotFound/NotFound';
import { CardLayout } from '../../components/layouts/CardLayout/CardLayout';
import { Entities } from '../../types/enums';

export const Book = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { t } = useTranslation('default');

  const books = useAllBooks();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [book, setBook] = useState<BookProps | undefined>(
    booksSelectors.selectById(store.getState(), id)
  );

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

  return (
    <CardLayout
      id={currentIndex}
      entity={Entities.Book}
      entities={books}
      onNextCard={nextBook}
      onPreviousCard={previousBook}
      image={bookCover}
    >
      <CardContent style={styles.cardContent}>
        <Typography gutterBottom variant='h5' component='div'>
          {t('placeholders.title')}: {book.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders.description')}: {book.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders.authorName')}: {book.authorName}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders.pagesCount')}: {book.pagesCount}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders.publishingYear')}: {book.publishingYear}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t('placeholders.code')}: {book.code}
        </Typography>
      </CardContent>
    </CardLayout>
  );
};
