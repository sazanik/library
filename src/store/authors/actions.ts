import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorFormProps, AuthorProps } from '../../types/inerfaces';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore/lite';
import { db } from '../../firebase';
import { store } from '../store';
import { setError } from '../app/appSlice';

const createDoc = async (
  data: AuthorFormProps
): Promise<AuthorProps | undefined> => {
  try {
    const docRef = await addDoc(collection(db, 'authors'), data);
    await setDoc(docRef, { id: docRef.id }, { merge: true });
    return (await getDoc(docRef)).data() as AuthorProps;
  } catch (error) {
    store.dispatch(setError(error as Error));
  }
};

const updateDoc = async (
  data: AuthorProps
): Promise<AuthorProps | undefined> => {
  try {
    const docRef = doc(db, 'authors', data.id);
    await setDoc(docRef, data);
    return (await getDoc(docRef)).data() as AuthorProps;
  } catch (error) {
    store.dispatch(setError(error as Error));
  }
};

const removeDoc = async (id: string): Promise<string | undefined> => {
  try {
    const docRef = doc(db, 'authors', id);
    await deleteDoc(docRef);
    return docRef.id;
  } catch (error) {
    store.dispatch(setError(error as Error));
  }
};

const readDocs = async (): Promise<AuthorProps[]> => {
  const collectionRef = query(collection(db, 'authors'));
  const querySnapshot = await getDocs(collectionRef);
  const authors: AuthorProps[] = [];
  querySnapshot.forEach((docItem) => {
    authors.push(docItem.data() as AuthorProps);
  });
  return authors;
};

export const createAuthor = createAsyncThunk('authors/createAuthor', createDoc);

export const updateAuthor = createAsyncThunk('authors/updateAuthor', updateDoc);

export const removeAuthor = createAsyncThunk('authors/removeAuthor', removeDoc);

export const getAllAuthors = createAsyncThunk(
  'authors/getAllAuthors',
  readDocs
);
