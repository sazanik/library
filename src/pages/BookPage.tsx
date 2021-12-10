import React, { MouseEvent, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import styles from '../styles/book';
import { booksSelectors, store, useAllBooks } from '../App/store';
import { Book } from '../features/books/booksSlice';
import { useParams } from 'react-router-dom';

export default function MediaCard(): JSX.Element {
  const { id } = useParams();
  console.log(id);
  const { t } = useTranslation('translation');
  const books = useAllBooks();
  const [book, setBook] = useState<Book | undefined>(books[0]);

  const previousBook = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log(event);
    setBook(books[0]);
  };

  const nextBook = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log(event);
    setBook(books[0]);
  };

  useEffect(() => {
    if (id) {
      setBook(booksSelectors.selectById(store.getState(), id));
    }
  }, [id]);

  return (
    <Card style={styles.box}>
      <CardMedia component='img' height='140' image='' alt={t('bookCover')} />
      <CardContent>
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
      <CardActions>
        <Button onClick={previousBook} size='small'>
          {t('previousBook')}
        </Button>
        <Button onClick={nextBook} size='small'>
          {t('nextBook')}
        </Button>
      </CardActions>
    </Card>
  );
}
