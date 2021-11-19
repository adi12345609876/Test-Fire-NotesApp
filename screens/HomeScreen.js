import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { FAB } from "react-native-paper";
import { getAuthInfo, signout, Data, DataColor } from "../Firebase/FireConfig";
// import { Datareciver } from "../Firebase/FireComp";
import { useNavigation } from "@react-navigation/native";
//expo push notification
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
//setting
//*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
//sigh out functions
export const signOut = async () => {
  try {
    await signout();
  } catch (error) {
    console.log(error);
  }
};

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
  // useEffect(() => {
  //   if (currentuser) {
  //     navigation.navigate("Home");
  //   }
  // });

  //expo push notification

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();

  useEffect(
    (currentuser) => {
      schedulePushNotification();
    },
    [currentuser]
  );
  useEffect(() => {
    //using the token we got
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    //get data from the notification to be used in return()
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <Notes />
        <Button
          title="Press to schedule a "
          onPress={schedulePushNotification}
        />
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
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Thank You for resitering",
      body: "youre signin was success",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
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
