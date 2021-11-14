import { getFirestore, onSnapshot, collection, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "./FireConfig";

//get data and store it on usestae named data using OnSnapshot
export const Datareciver = () => {
  const [data, setData] = useState([]);
  const collectionRef = collection(db, "users");
  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(documents);
    });
    return () => unsubscribe();
  }, []);

  return data;
};
