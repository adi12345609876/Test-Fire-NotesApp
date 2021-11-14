import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { getAuthInfo, signout, Data, DataColor } from "../Firebase/FireConfig";
// import { Datareciver } from "../Firebase/FireComp";
//sigh out functions
export const signOut = async () => {
  try {
    await signout();
  } catch (error) {
    console.log(error);
  }
};
// useEffect(() => {
//   const datas = Datareciver();
//   console.log(datas);
// }, []);
export const Notes = () => {
  const currentuser = getAuthInfo();
  const data = Data();
  const [color, setColor] = useState("#e0e");

  //map the data and setColor

  return (
    <View>
      {data.map((item) => (
        <View style={[styles.ColourBox, { backgroundColor: `${item.color}` }]}>
          <Text style={styles.Heading}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};
export function HomeScreen({ navigation }) {
  const currentuser = getAuthInfo();
  const data = Data();
  return (
    <View style={styles.container}>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <Notes />
      </View>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
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
    marginBottom: 10,
    width: "90%",
    height: 100,
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
});
