import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBbWYT3lPHJ3hzL_Q5GtMxa1WssnyNzOLA',
  authDomain: 'project-manager-be4e0.firebaseapp.com',
  projectId: 'project-manager-be4e0',
  storageBucket: 'project-manager-be4e0.appspot.com',
  messagingSenderId: '545514110883',
  appId: '1:545514110883:web:fc3a53bd1309d72cf2e416',
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);

export const db = getFirestore(fb);
