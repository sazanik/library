import {
  CollectionReference,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore/lite';

import { ServerSortedRowsParams } from '../types/inerfaces';

export const getSortedCollectionArray = async (
  collectionRef: CollectionReference,
  params: ServerSortedRowsParams
): Promise<DocumentData[]> => {
  const { field, page, pageSize, sort } = params;
  const sortedCollectionRef = query(collectionRef, orderBy(field, sort));
  const snapshot = await getDocs(sortedCollectionRef);
  return snapshot.docs
    .slice(page * pageSize, page * pageSize + pageSize)
    .map((item) => item.data());
};
