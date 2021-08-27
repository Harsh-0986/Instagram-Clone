import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Button } from "react-native-elements";

export default function Landing({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Button
        titleStyle={{ width: 100 }}
        style={{
          minWidth: 80,

          justifyContent: "center",
          alignItems: "center",
          // height: 50,
          padding: 10,
        }}
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Login"
        titleStyle={{ width: 100 }}
        style={{
          minWidth: 80,
          justifyContent: "center",
          alignItems: "center",
          height: 50,
        }}
        onPress={() => navigation.navigate("Login")}
      />
    </SafeAreaView>
  );
}
