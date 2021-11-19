import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Glogin,
  Anonymouslogin,
  getAuthInfo,
  db,
} from "../Firebase/FireConfig";
import {
  getFirestore,
  onSnapshot,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

export const customidcreated = async (users) => {
  await setDoc(doc(db, "Users", users.user.uid, "Notes", "notes id"), {
    color: "#e0e",
    title: "own title",
    description: "owndescription",
  });
};

export function LoginScreen({ navigation }) {
  const currentuser = getAuthInfo();
  console.log("current user =", currentuser?.uid);
  function GoogleLogin() {
    Glogin()
      .then((users) => {
        customidcreated(users);
      })
      .catch(() => alert("Login Failed"));
  }
  const GuestLogin = () => {
    Anonymouslogin()
      .then((users) => {
        customidcreated(users);
      })
      .catch(() => alert("Login Failed"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Welcome To-Do list</Text>
      <View style={styles.button}>
        <Button title="Google log in" onPress={GoogleLogin} />
        <Button title="Guest" onPress={GuestLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
