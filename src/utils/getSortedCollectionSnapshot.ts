import {
  CollectionReference,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore/lite';

import { FieldsList, ServerSortedRowsParams, Sort } from '../types/inerfaces';

interface ReturnObject {
  visibleList: DocumentData[];
  sortModel: { field: FieldsList; sort: Sort };
}

export const getSortedCollectionArray = async (
  collectionRef: CollectionReference,
  params: ServerSortedRowsParams
): Promise<ReturnObject> => {
  const { field, page, pageSize, sort } = params;
  const sortedCollectionRef = query(collectionRef, orderBy(field, sort));
  const snapshot = await getDocs(sortedCollectionRef);

  const visibleList = snapshot.docs
    .slice(page * pageSize, page * pageSize + pageSize)
    .map((item) => item.data());

  return {
    visibleList,
    sortModel: {
      field,
      sort,
    },
  };
};
