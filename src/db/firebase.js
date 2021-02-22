import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC4to4VT6dEWdln3zJv1XCioSfl9HsFWYA',
  authDomain: 'resource-management-4fe8c.firebaseapp.com',
  projectId: 'resource-management-4fe8c',
  storageBucket: 'resource-management-4fe8c.appspot.com',
  messagingSenderId: '823781464503',
  appId: '1:823781464503:web:02fd56bccb9030391ef032',
  measurementId: 'G-ZDFP5615BY',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
