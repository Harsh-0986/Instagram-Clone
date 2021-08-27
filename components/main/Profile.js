import React from "react";
import { Image, Platform, View } from "react-native";
import { FlatList } from "react-native";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { Dimensions } from "react-native";

function Profile(props) {
  const { currentUser, posts } = props;
  // console.log(currentUser);
  // console.log(posts);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Text>{currentUser?.name}</Text>
        <Text>{currentUser?.email}</Text>
      </View>
      <View style={styles.postsGallery}>
        {Platform.OS !== "web" && (
          <View style={styles.containerPosts}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={posts}
              renderItem={({ item }) => (
                <Image style={styles.post} source={{ uri: item.downloadUrl }} />
              )}
            />
          </View>
        )}
        {Platform.OS === "web" && (
          <View style={styles.containerPosts}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={posts}
              renderItem={({ item }) => (
                <Image
                  style={styles.postWeb}
                  resizeMode="contain"
                  source={{ uri: item.downloadUrl }}
                />
              )}
            />
          </View>
        )}
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
    margin: 20,
  },
  postsGallery: {
    flex: 1,
  },
  post: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  postWeb: {
    flex: 1,
    aspectRatio: 1 / 1,
    height: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width / 3,
  },
  containerPosts: {
    flex: 1 / 3,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
