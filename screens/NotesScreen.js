import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

export default function NotesScreen({ navigation, route }) {
  const { title } = route.params;
  const { color } = route.params;
  const { id } = route.params;
  const { description } = route.params;

  return (
    <View style={styles.container}>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={[styles.ColourBox, { backgroundColor: `${color}` }]}>
          <Text style={styles.Heading}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <FAB
        style={styles.fab}
        small
        icon="pencil"
        onPress={navigation.navigate("Edit", {
          title,
          color,
          id,
          description,
        })}
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
