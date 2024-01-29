import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCMo2Jm3wK2y89V5ZOI5dNvdp7UDu7H9wI',
  authDomain: 'challenge-c8579.firebaseapp.com',
  projectId: 'challenge-c8579',
  storageBucket: 'challenge-c8579.appspot.com',
  messagingSenderId: '837495032720',
  appId: '1:837495032720:web:92ce5784c75934e2778115'
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {
  auth
}