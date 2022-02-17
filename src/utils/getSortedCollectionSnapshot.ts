import {
  CollectionReference,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore/lite';

import { FieldsList, ServerSortedRowsParams, Sort } from '../types/inerfaces';

interface ReturnObject {
  sortedList: DocumentData[];
  sortModel: { field: FieldsList; sort: Sort };
}

export const getSortedCollectionArray = async (
  collectionRef: CollectionReference,
  params: ServerSortedRowsParams
): Promise<ReturnObject> => {
  const { field, page, pageSize, sort } = params;
  const sortedCollectionRef = query(collectionRef, orderBy(field, sort));
  const snapshot = await getDocs(sortedCollectionRef);
  const sortedList = snapshot.docs.slice(0, (page + 1) * pageSize).map((item) => item.data());
  return {
    sortedList,
    sortModel: {
      field,
      sort,
    },
  };
};
