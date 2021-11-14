import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from "react-native-paper";

export default function NotesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={[styles.container, { flexDirection: "column" }]}>

        <View style={[styles.ColourBox, { backgroundColor: "#e0e", }]} >
          <Text style={styles.Heading}>Title</Text>
          <Text style={styles.description}>Use flex in a component's style to have the component expand and shrink dynamically based on available space. Normally you will use flex: 1, which tells a component to fill all available space, shared evenly amongst other components with the same parent. The larger the flex given, the higher the ratio of space a component will take compared to its siblings.
          </Text>
        </View>


      </View>


      <FAB
        style={styles.fab}
        small
        icon="pencil"
        onPress={() => console.log("Edited")}
      />
      <StatusBar style="auto" />
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
