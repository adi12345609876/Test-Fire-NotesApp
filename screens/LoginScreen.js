import React, { useEffect, useRef, useState } from "react";
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

export default function LoginScreen({ navigation }) {
  const currentuser = getAuthInfo();

  function GoogleLogin() {
    Glogin()
      .then((user) => console.log("success"))
      .catch(() => alert("Login Failed"));
  }
  useEffect(() => {
    if (currentuser) {
      navigation.navigate("Home");
    }
  }, [currentuser]);

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
