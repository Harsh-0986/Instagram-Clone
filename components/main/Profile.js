import React from "react";
import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";

function Profile(props) {
  const { currentUser, posts } = props;
  console.log(currentUser);
  console.log(posts);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  profile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
