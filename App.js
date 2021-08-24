import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Landing from "./components/auth/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Main from "./components/Main";
import rootReducer from "./redux/reducers";

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));
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

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
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

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
