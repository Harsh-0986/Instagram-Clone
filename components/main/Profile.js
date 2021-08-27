import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";

function Profile(props) {
  const { currentUser, posts } = props;
  console.log(currentUser);
  console.log(posts);
  return (
    <SafeAreaView>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
