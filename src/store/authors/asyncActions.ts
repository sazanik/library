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

import { FIRST_LOAD_ROWS_COUNT } from '../../constants/constants';
import { db } from '../../firebase';
import { AuthorFormProps, AuthorProps } from '../../types/inerfaces';

const createDoc = async (data: AuthorFormProps): Promise<AuthorProps> => {
  const docRef = await addDoc(collection(db, 'authors'), data);
  await setDoc(docRef, { id: docRef.id }, { merge: true });
  return (await getDoc(docRef)).data() as AuthorProps;
};

export const createAuthor = createAsyncThunk('authors/createAuthor', createDoc);

const updateDoc = async (data: AuthorProps): Promise<AuthorProps> => {
  const docRef = doc(db, 'authors', data.id);
  await setDoc(docRef, data);
  return (await getDoc(docRef)).data() as AuthorProps;
};

export const updateAuthor = createAsyncThunk('authors/updateAuthor', updateDoc);

const removeDoc = async (id: string): Promise<string> => {
  const docRef = doc(db, 'authors', id);
  await deleteDoc(docRef);
  return docRef.id;
};

export const removeAuthor = createAsyncThunk('authors/removeAuthor', removeDoc);

let snapshot: QuerySnapshot;
let collectionRef: Query;
let lastVisible;

const readDocs = async (docsCount?: number): Promise<AuthorProps[]> => {
  if (docsCount === undefined) {
    console.log('---PATH-1---');
    collectionRef = query(
      collection(db, 'authors'),
      limit(FIRST_LOAD_ROWS_COUNT)
    );
    snapshot = await getDocs(collectionRef);
  } else {
    console.log('---PATH-2---');
    lastVisible = snapshot.docs[snapshot.docs.length - 1];
    collectionRef = query(collectionRef, startAfter(lastVisible));
    snapshot = await getDocs(collectionRef);
  }

  const authors: AuthorProps[] = [];
  snapshot.forEach((docItem) => {
    authors.push(docItem.data() as AuthorProps);
  });
  console.log('---authors---', authors);
  return authors;
};

export const getCollectionAuthors = createAsyncThunk(
  'authors/getCollectionAuthors',
  readDocs
);
