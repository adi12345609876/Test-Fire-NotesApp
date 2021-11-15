import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { FAB } from "react-native-paper";
import { setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, getAuthInfo } from "../Firebase/FireConfig";
export default function EditScreen({ navigation, route }) {
  const { title } = route.params;
  const { color } = route.params;
  const { id } = route.params;
  const { description } = route.params;
  const [newtitle, setNewtitle] = useState(title);
  const [newdescription, setNewdescription] = useState(description);
  const [newcolor, setNewcolor] = useState(color);
  const currentuser = getAuthInfo();
  const Editing = async () => {
    const docRef = doc(db, "Users", currentuser?.uid, "Notes", id);
    const payload = {
      title: newtitle,
      color: newcolor,
      description: newdescription,
    };
    await setDoc(docRef, payload);
    navigation.navigate("Home");

    console.log(id);
  };

  const Deleteing = async () => {
    const docRef = doc(db, "Users", currentuser?.uid, "Notes", id);
    await deleteDoc(docRef);
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={[styles.ColourBox, { backgroundColor: `${newcolor}` }]}>
          {/* text input with vale of title */}
          <TextInput
            style={styles.Heading}
            placeholder="Title"
            value={newtitle}
            onChangeText={(text) => {
              setNewtitle(text);
            }}
          />
          <Text>{}</Text>
          <TextInput
            style={styles.Heading}
            placeholder="description"
            value={newdescription}
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
          <Button title="Create" onPress={Editing} />
          <FAB style={styles.fab} small icon="delete" onPress={Deleteing} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // paddingBottom: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  //put the box in left corner of the screen
  ColourBox: {
    //make space in the botoom of the each boxes

    width: "100%",
    height: "100%",

    borderRadius: 10,
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  //center text bold headings
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  //center text with light font
  description: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
});
