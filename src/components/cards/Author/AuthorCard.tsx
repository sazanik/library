import React, { ReactElement, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import styles from '../Book/styles';
import { authorsSelectors, store } from '../../../App/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAllAuthors } from '../../../App/hooks';
import authorPhoto from '../../../assets/images/authorPhoto.jpg';
import { IAuthor } from '../../../types/inerfaces';

export default function AuthorCard(): ReactElement {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { t } = useTranslation('default');

  const authors = useAllAuthors();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [author, setAuthor] = useState<IAuthor | undefined>(
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
        .findIndex((idx) => idx === id);
      setCurrentIndex(index);
      setAuthor(authorsSelectors.selectById(store.getState(), id));
    }
  }, [id]);

  return (
    <Box>
      <Card style={styles.card}>
        <CardMedia
          style={styles.image}
          component='img'
          image={authorPhoto}
          height='100%'
          alt={t('authorPhoto')}
        />
        <CardContent style={styles.cardContent}>
          <Typography gutterBottom variant='h5' component='div'>
            {t('placeholders.firstName')}: {author?.firstName}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {t('placeholders.lastName')}: {author?.lastName}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {t('placeholders.country')}: {author?.country}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {t('placeholders.birthDate')}: {author?.birthDate}
          </Typography>
        </CardContent>
      </Card>
      <CardActions style={styles.cardActions}>
        <Button
          disabled={currentIndex === 0}
          onClick={previousAuthor}
          size='small'
        >
          {t('previousAuthor')}
        </Button>
        <Button
          disabled={currentIndex >= authors.length - 1}
          onClick={nextAuthor}
          size='small'
        >
          {t('nextAuthor')}
        </Button>
      </CardActions>
    </Box>
  );
}
