import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import firebase from "firebase";
// Run if there is any error
// import 'react-native-community/masked-view'

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        error(error);
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
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
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
          onPress={() => this.onSignUp()}
          title="Sign Up"
        />
      </SafeAreaView>
    );
  }
}

export default Register;
