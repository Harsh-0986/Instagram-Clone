import React, { Component } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import Feed from "../components/main/Feed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import Search from "./main/Search";
import Add from "./main/Add";
import Profile from "./main/Profile";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person-search" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="users" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
