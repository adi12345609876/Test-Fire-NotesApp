import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, signOut } from "./screens/HomeScreen";
import { LoginScreen, customidcreated } from "./screens/LoginScreen";
import EditScreen from "./screens/EditorScreen";
import CreateScreen from "./screens/CreateScreen";
import { useNavigation } from "@react-navigation/native";
import NotesScreen from "./screens/NotesScreen";
import { FAB } from "react-native-paper";
import { getAuthInfo, Data } from "./Firebase/FireConfig";
import {
  getFirestore,
  onSnapshot,
  collection,
  getDoc,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  const currentuser = getAuthInfo();
  const photoURL = currentuser?.photoURL;
  return (
    <View>
      <Image
        style={{
          width: 50,
          height: 50,
          backgroundColor: "grey",
          resizeMode: "center",
          borderRadius: 50,
          borderColor: "#000",
          borderWidth: 4,
        }}
        source={{
          uri: photoURL,
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {currentuser?.email}
      </Text>
    </View>
  );
}
//left Button
function LeftButton() {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        title="Sign Out"
        onPress={() => {
          navigation.navigate("Login"), signOut();
        }}
        color="red"
      />
    </View>
  );
}

export default function App({ navigation }) {
  const currentuser = getAuthInfo();
  const data = Data();
  useEffect(() => {
    if (currentuser) {
      navigation.navigate("Home");
    }
  }, [currentuser]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <LogoTitle />,
            title: null,
            headerLeft: null,
            headerRight: () => <LeftButton />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerLeft: null,
          }}
        />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
