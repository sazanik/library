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
import { AuthorFormProps, AuthorProps } from '../../types/inerfaces';
import { readAllDocs } from '../../utils/readAllDocs';

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

let collectionRef: Query;
let snapshot: QuerySnapshot;
let lastVisible;

const readDocs = async (docsCount?: number): Promise<AuthorProps[]> => {
  if (docsCount === undefined) {
    collectionRef = query(
      collection(db, 'authors'),
      limit(FIRST_LOAD_ROWS_COUNT)
    );
    snapshot = await getDocs(collectionRef);
  } else {
    lastVisible = snapshot.docs[snapshot.docs.length - 1];
    collectionRef = query(collectionRef, startAfter(lastVisible));
    snapshot = await getDocs(collectionRef);
  }

  const authors: AuthorProps[] = [];
  snapshot.forEach((docItem) => {
    authors.push(docItem.data() as AuthorProps);
  });
  return authors;
};

export const getAuthorsCollection = createAsyncThunk(
  'authors/getAuthorsCollection',
  readDocs
);

export const getAuthorsCollectionSize = createAsyncThunk(
  'authors/getAuthorsCollectionSize',
  () => readAllDocs(Entities.AUTHORS)
);

/*const readSortDocs = async (
  sortModel: GridSortModel,
  page: number,
  pageSize: number
) => {
  const sortedCollectionRef = query(collection(db, 'authors'), limit(pageSize));
};

export const getServerSortedRows = createAsyncThunk(
  'authors/getServerSortRows',
  readSortDocs
);*/
