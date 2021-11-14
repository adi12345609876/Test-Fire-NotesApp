import { setStatusBarBackgroundColor, setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function CreateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your tirle"
      // onChangeText={(text) => {
      //   setTitle(text);
      // }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your description"
      // onChangeText={(text) => {
      //   setTitle(text);
      // }}
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
          setColor("#e0e")
        }}
      >
      </TouchableOpacity>

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
          setColor("#fff")
        }}
      >

      </TouchableOpacity>
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
          setColor("#f03")
        }}
      >

      </TouchableOpacity>

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
          setColor("#0d0")
        }}
      >

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
