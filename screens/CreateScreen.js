import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { db, getAuthInfo } from "../Firebase/FireConfig";
import { addDoc, collection } from "firebase/firestore";
//firebase add doc

export default function CreateScreen({ navigation }) {
  const [newtitle, setNewtitle] = useState("");
  const [newdescription, setNewdescription] = useState("");
  const [newcolor, setNewcolor] = useState("");
  const currentuser = getAuthInfo();
  const addColor = async () => {
    const colRef = collection(db, "Users", currentuser?.uid, "Notes");
    const values = {
      title: newtitle,
      description: newdescription,
      color: newcolor,
    };
    const DocRef = await addDoc(colRef, values);
    navigation.navigate("Home");
  };
  return (
    <View style={[styles.container, { backgroundColor: `${newcolor}` }]}>
      <TextInput
        style={styles.input}
        placeholder="Enter your tirle"
        onChangeText={(text) => {
          setNewtitle(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your description"
        onChangeText={(text) => {
          setNewdescription(text);
        }}
      />

      <TouchableOpacity
        style={{
          marginBottom: 10,
          width: "10%",
          height: "10%",
          borderRadius: 100,
          borderBottomWidth: 2,
          borderColor: "#000",
          backgroundColor: "#e0e",
          flexDirection: "column",
        }}
        onPress={() => {
          setNewcolor("#e0e");
        }}
      ></TouchableOpacity>

      <TouchableOpacity
        style={{
          marginBottom: 10,
          width: "10%",
          height: "10%",
          borderRadius: 100,
          borderBottomWidth: 2,
          borderColor: "#000",
          backgroundColor: "#fff",
        }}
        onPress={() => {
          setNewcolor("#fff");
        }}
      ></TouchableOpacity>
      <TouchableOpacity
        style={{
          marginBottom: 10,
          width: "10%",
          height: "10%",
          borderRadius: 100,
          borderBottomWidth: 2,
          borderColor: "#000",
          backgroundColor: "#f03",
        }}
        onPress={() => {
          setNewcolor("#f03");
        }}
      ></TouchableOpacity>

      <TouchableOpacity
        style={{
          marginBottom: 10,
          width: "10%",
          height: "10%",
          borderRadius: 100,
          borderBottomWidth: 2,
          borderColor: "#000",
          backgroundColor: "#0d0",
        }}
        onPress={() => {
          setNewcolor("#0d0");
        }}
      ></TouchableOpacity>
      <Button title="Create" onPress={addColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  //round color button
  colorButton: {
    marginBottom: 10,
    width: "90%",
    height: 100,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderColor: "#000",
    backgroundColor: "#e0e",
  },
  input: {
    marginBottom: 10,
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
  },
});
