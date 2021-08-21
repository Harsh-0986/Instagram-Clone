import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import firebase from "firebase/app";

const Stack = createStackNavigator();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATNDh1d2RmfUvflBtBpCtDRayBdDtxleI",
  authDomain: "ultronic-insta-7a778.firebaseapp.com",
  projectId: "ultronic-insta-7a778",
  storageBucket: "ultronic-insta-7a778.appspot.com",
  messagingSenderId: "158217758017",
  appId: "1:158217758017:web:4c0a7147245325be686dc0",
  measurementId: "G-YZDF5Y3BLN",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
