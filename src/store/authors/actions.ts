import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorProps } from '../../types/inerfaces';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../../firebase';

export const bdCreateAuthor = createAsyncThunk(
  'authors/bdCreateAuthor',
  async (data: AuthorProps) => {
    try {
      const docRef = await addDoc(collection(db, 'authors'), data);
      const newData = {
        ...data,
        id: docRef.id,
      };
      await setDoc(doc(db, 'authors', docRef.id), newData);

      return newData;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
);
