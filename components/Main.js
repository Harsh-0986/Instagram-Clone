import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Feed from "../components/main/Feed";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
} from "../redux/actions";
import Profile from "./main/Profile";
import Search from "./main/Search";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

const Empty = () => {
  return null;
};

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
  }
  render() {
    return (
      <Tab.Navigator initialRouteName="Home" labeled={false}>
        <Tab.Screen
          name="Home"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={26} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person-search" size={26} color={color} />
            ),
            headerShown: false,
          }}
          navigation={this.props.navigation}
        />
        <Tab.Screen
          name="New Post"
          component={Empty}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();

              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={26} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();

              navigation.navigate("Profile", {
                uid: firebase.auth().currentUser.uid,
              });
            },
          })}
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="users" size={26} color={color} />
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
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Main);
