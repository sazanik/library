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
import { BookFormProps, BookProps } from '../../types/inerfaces';

const createDoc = async (
  data: BookFormProps
): Promise<BookProps | undefined> => {
  const docRef = await addDoc(collection(db, 'books'), data);
  await setDoc(docRef, { id: docRef.id }, { merge: true });
  return (await getDoc(docRef)).data() as BookProps;
};

const updateDoc = async (data: BookProps): Promise<BookProps | undefined> => {
  const docRef = doc(db, 'books', data.id);
  await setDoc(docRef, data);
  return (await getDoc(docRef)).data() as BookProps;
};

const removeDoc = async (id: string): Promise<string | undefined> => {
  const docRef = doc(db, 'books', id);
  await deleteDoc(docRef);
  return docRef.id;
};

const readDocs = async (): Promise<BookProps[]> => {
  const collectionRef = query(collection(db, 'books'));
  const querySnapshot = await getDocs(collectionRef);
  const books: BookProps[] = [];
  querySnapshot.forEach((docItem) => {
    books.push(docItem.data() as BookProps);
  });
  return books;
};

export const createBook = createAsyncThunk('books/createBook', createDoc);

export const updateBook = createAsyncThunk('books/updateBook', updateDoc);

export const removeBook = createAsyncThunk('books/removeBook', removeDoc);

export const getAllBooks = createAsyncThunk('books/getAllBooks', readDocs);
