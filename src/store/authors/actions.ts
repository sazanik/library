import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorProps } from '../../types/inerfaces';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore/lite';
import { db } from '../../firebase';

const getBdEntity = async (
  data: AuthorProps
): Promise<AuthorProps | undefined> => {
  try {
    await setDoc(doc(db, 'authors', data.id), data);
    return data;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const bdCreateAuthor = createAsyncThunk(
  'authors/bdCreateAuthor',
  getBdEntity
);

export const bdUpdateAuthor = createAsyncThunk(
  'authors/bdUpdateAuthor',
  getBdEntity
);

export const bdGetAllAuthors = createAsyncThunk(
  'authors/bdGetAllAuthors',
  async (): Promise<AuthorProps[]> => {
    const q = query(collection(db, 'authors'));
    const querySnapshot = await getDocs(q);
    const authors: AuthorProps[] = [];
    querySnapshot.forEach((docItem) => {
      authors.push(docItem.data() as AuthorProps);
    });
    return authors;
  }
);
