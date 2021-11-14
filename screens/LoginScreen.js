import React, { useRef, useState } from "react";
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

import { Glogin, getAuthInfo } from "../Firebase/FireConfig";
import { getFirestore, onSnapshot, collection, doc } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const currentuser = getAuthInfo();

  // function GoogleLogin() {
  //   Glogin()
  //     .then((user) => console.log(user))
  //     .catch(() => alert("Login Failed"));
  // }
  function GoogleLogin() {
    Glogin()
      .then((users) => {
        const docRef = doc(db, "Users", users.user.uid, "Notes", id);
        const payload = {
          title: "newtitle",
          color: "newcolor",
          description: "newdescription",
        };
        setDoc(docRef, payload);
        console.log(users);
      })
      .catch(() => alert("Login Failed"));
  }
  console.log(currentuser?.email);
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Welcome To-Do list</Text>
      <View style={styles.button}>
        <Button title="Google sign in" onPress={GoogleLogin} />
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
