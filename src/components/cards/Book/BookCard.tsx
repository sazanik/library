import React, { ReactElement, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { booksSelectors, store } from '../../../App/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAllBooks } from '../../../App/hooks';
import bookCover from '../../../assets/images/bookCover.jpg';
import { IBook } from '../../../types/inerfaces';

export default function BookCard(): ReactElement {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { t } = useTranslation('default');

  const books = useAllBooks();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [book, setBook] = useState<IBook | undefined>(
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
        .findIndex((idx) => idx === id);
      setCurrentIndex(index);
      setBook(booksSelectors.selectById(store.getState(), id));
    }
  }, [id]);

  return (
    <Box>
      <Card style={styles.card}>
        <CardMedia
          style={styles.image}
          component='img'
          height='100%'
          image={bookCover}
          alt={t('bookCover')}
        />
        <CardContent style={styles.cardContent}>
          <Typography gutterBottom variant='h5' component='div'>
            {t('placeholders.title')}: {book?.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('placeholders.description')}: {book?.description}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('placeholders.authorName')}: {book?.authorName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('placeholders.pagesCount')}: {book?.pagesCount}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('placeholders.publishingYear')}: {book?.publishingYear}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('placeholders.code')}: {book?.code}
          </Typography>
        </CardContent>
      </Card>
      <CardActions style={styles.cardActions}>
        <Button
          disabled={currentIndex === 0}
          onClick={previousBook}
          size='small'
        >
          {t('previousBook')}
        </Button>
        <Button
          disabled={currentIndex >= books.length - 1}
          onClick={nextBook}
          size='small'
        >
          {t('nextBook')}
        </Button>
      </CardActions>
    </Box>
  );
}
