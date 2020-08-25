import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'fontsource-roboto';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyATCEL8llnCKfsDCSaXq_-fAvnaM_R1254",
  authDomain: "medi-ebbe5.firebaseapp.com",
  databaseURL: "https://medi-ebbe5.firebaseio.com",
  projectId: "medi-ebbe5",
  storageBucket: "medi-ebbe5.appspot.com",
  messagingSenderId: "922648936971",
  appId: "1:922648936971:web:b3e0bbcc1b873c78cd3d0e"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
