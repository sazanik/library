import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAj6wdVcxp6MnYRo2BQ2mkGH5Nr3E4mV8w',
  authDomain: 'library-10012022.firebaseapp.com',
  databaseURL:
    'https://library-10012022-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'library-10012022',
  storageBucket: 'library-10012022.appspot.com',
  messagingSenderId: '38698012730',
  appId: '1:38698012730:web:29684284aae59061832503',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
