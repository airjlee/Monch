import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDErox-9e_8_FXoiyfOcule4CMlJD0dheQ",
  authDomain: "monch-428ae.firebaseapp.com",
  projectId: "monch-428ae",
  storageBucket: "monch-428ae.appspot.com",
  messagingSenderId: "495685574015",
  appId: "1:495685574015:web:15d4d2a349afab8368ce4a",
  measurementId: "G-C3N6VKQQ15"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);