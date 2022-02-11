import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  Query,
  query,
  QuerySnapshot,
  setDoc,
  startAfter,
} from 'firebase/firestore/lite';

import { FIRST_LOAD_ROWS_COUNT } from '../../constants';
import { db } from '../../firebase';
import { Entities } from '../../types/enums';
import { BookFormProps, BookProps } from '../../types/inerfaces';
import { readAllDocs } from '../../utils/readAllDocs';

const createDoc = async (data: BookFormProps): Promise<BookProps> => {
  const docRef = await addDoc(collection(db, 'books'), data);
  await setDoc(docRef, { id: docRef.id }, { merge: true });
  return (await getDoc(docRef)).data() as BookProps;
};

export const createBook = createAsyncThunk('books/createBook', createDoc);

const updateDoc = async (data: BookProps): Promise<BookProps> => {
  const docRef = doc(db, 'books', data.id);
  await setDoc(docRef, data);
  return (await getDoc(docRef)).data() as BookProps;
};

export const updateBook = createAsyncThunk('books/updateBook', updateDoc);

const removeDoc = async (id: string): Promise<string> => {
  const docRef = doc(db, 'books', id);
  await deleteDoc(docRef);
  return docRef.id;
};

export const removeBook = createAsyncThunk('books/removeBook', removeDoc);

let snapshot: QuerySnapshot;
let collectionRef: Query;
let lastVisible;

const readDocs = async (docsCount?: number): Promise<BookProps[]> => {
  if (docsCount === undefined) {
    collectionRef = query(
      collection(db, 'books'),
      limit(FIRST_LOAD_ROWS_COUNT)
    );
    snapshot = await getDocs(collectionRef);
  } else {
    lastVisible = snapshot.docs[snapshot.docs.length - 1];
    collectionRef = query(collectionRef, startAfter(lastVisible));
    snapshot = await getDocs(collectionRef);
  }

  const books: BookProps[] = [];
  snapshot.forEach((docItem) => {
    books.push(docItem.data() as BookProps);
  });
  return books;
};

export const getBooksCollection = createAsyncThunk(
  'books/getBooksCollection',
  readDocs
);

export const getBooksCollectionSize = createAsyncThunk(
  'books/getBooksCollectionSize',
  () => readAllDocs(Entities.BOOKS)
);
