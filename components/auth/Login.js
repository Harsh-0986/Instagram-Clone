import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "firebase";
import { Alert } from "react-native";
// Run if there is any error
// import 'react-native-community/masked-view'

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        // console.error(error.message);
        let title = error.code;
        let message = error.message;
        Alert.alert(
          { title },
          { message },
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          margin: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
        />
        <Button
          buttonStyle={{
            backgroundColor: "#11c5ed",

            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => this.onLogin()}
          title="Login"
        />
      </SafeAreaView>
    );
  }
}

export default Login;
