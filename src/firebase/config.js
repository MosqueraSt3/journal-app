// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web apps Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCPlqQlau8yiaLj4AHOp1JZx_bdyZBBxZk',
    authDomain: 'portfolio-32860.firebaseapp.com',
    projectId: 'portfolio-32860',
    storageBucket: 'portfolio-32860.appspot.com',
    messagingSenderId: '867119693534',
    appId: '1:867119693534:web:49c6f998964c020aef8c4f'
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
