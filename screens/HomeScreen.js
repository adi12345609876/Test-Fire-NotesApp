import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, FAB } from "react-native-paper";
import { getAuthInfo, signout, Data, DataColor } from "../Firebase/FireConfig";
// import { Datareciver } from "../Firebase/FireComp";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  //map the data and setColor

  return (
    <View>
      {data.map((item) => (
        <View>
          <TouchableOpacity
            style={[styles.ColourBox, { backgroundColor: `${item.color}` }]}
            onPress={() =>
              navigation.navigate("Notes", {
                color: item.color,
                id: item.id,
                title: item.title,
                description: item.description,
              })
            }
          >
            <Text style={styles.Heading}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
export function HomeScreen({ navigation }) {
  const currentuser = getAuthInfo();
  const data = Data();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    if (timer === 0 && !currentuser) {
      navigation.navigate("Login");
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <Notes />
      </View>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("Create")}
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
