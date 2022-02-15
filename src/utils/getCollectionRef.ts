import { CollectionReference } from 'firebase/firestore/lite';
import { collection } from 'firebase/firestore/lite';

import { db } from '../firebase';
import { Entities } from '../types/enums';

export const getCollectionRef = (entities: Entities): CollectionReference => {
  return collection(db, entities);
};
