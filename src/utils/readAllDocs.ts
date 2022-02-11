import { collection, getDocs } from 'firebase/firestore/lite';

import { db } from '../firebase';
import { Entities } from '../types/enums';

export const readAllDocs = async (entities: Entities): Promise<number> => {
  const fullCollectionRef = collection(db, entities);
  const fullCollectionSnapshot = await getDocs(fullCollectionRef);

  return fullCollectionSnapshot.size;
};
