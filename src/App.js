import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  // your config => copied from adding firebase to my web app in firebase from their website
  apiKey: "AIzaSyBDALqW57KL5dtfoXPGVQ4Iftxk9OnEi78",
  authDomain: "superchat-tutorial-5531c.firebaseapp.com",
  projectId: "superchat-tutorial-5531c",
  storageBucket: "superchat-tutorial-5531c.appspot.com",
  messagingSenderId: "545662704442",
  appId: "1:545662704442:web:ff079d0c4bbef98c190e03",
  measurementId: "G-6Y7RZWW2NY"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>

      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, {idField: "id"})
}

export default App;
