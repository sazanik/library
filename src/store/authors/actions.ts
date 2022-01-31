import { createAsyncThunk } from '@reduxjs/toolkit';
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
import { AuthorFormProps, AuthorProps } from '../../types/inerfaces';

const createDoc = async (data: AuthorFormProps): Promise<AuthorProps> => {
  const docRef = await addDoc(collection(db, 'authors'), data);
  await setDoc(docRef, { id: docRef.id }, { merge: true });
  return (await getDoc(docRef)).data() as AuthorProps;
};

const updateDoc = async (data: AuthorProps): Promise<AuthorProps> => {
  const docRef = doc(db, 'authors', data.id);
  await setDoc(docRef, data);
  return (await getDoc(docRef)).data() as AuthorProps;
};

const removeDoc = async (id: string): Promise<string> => {
  const docRef = doc(db, 'authors', id);
  await deleteDoc(docRef);
  return docRef.id;
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
