// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, onSnapshot, collection, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7R6x7gtRdkMdZfQimVgBUIPVawXHw1PQ",
  authDomain: "test-notes-74306.firebaseapp.com",
  projectId: "test-notes-74306",
  storageBucket: "test-notes-74306.appspot.com",
  messagingSenderId: "147156765452",
  appId: "1:147156765452:web:95d4446d457b273a475729",
  measurementId: "G-N0NVDS7PR3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const db = getFirestore();
//google sign in
export const Glogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

//get auth info through onAuthStateChanged
export function getAuthInfo() {
  const [currentuser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);
  return currentuser;
}
//sign out
export const signout = () => {
  return signOut(auth);
};
export const Data = () => {
  const currentuser = getAuthInfo();
  const [data, setData] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "Users", "userid", "Notes");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(results);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return data;
};
