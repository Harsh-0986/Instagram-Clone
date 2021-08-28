import React, { useState } from "react";
import { Image, Platform, View } from "react-native";
import { FlatList } from "react-native";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import firebase from "firebase";
import { Button } from "react-native-elements";
require("firebase/firestore");

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;

    // Our profile
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    }

    //User that was searched
    else {
      // User data
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("Does not exists");
          }
        });
      //User Posts
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;

            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  // For following a user
  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  // For un following a user
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>

        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button
                style={{
                  marginTop: 15,
                  marginHorizontal: 30,
                  border: "0.5px solid black",
                }}
                buttonStyle={{
                  backgroundColor: "rgb(0 0 0 / 0%)",
                }}
                titleStyle={{ color: "black" }}
                title="Following"
                onPress={() => onUnfollow()}
              />
            ) : (
              <Button
                style={{
                  marginTop: 15,
                  marginHorizontal: 30,
                }}
                title="Follow"
                onPress={() => onFollow()}
              />
            )}
          </View>
        ) : null}
      </View>
      <View style={styles.postsGallery}>
        {Platform.OS !== "web" && (
          <View style={styles.containerPosts}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={userPosts}
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
              data={userPosts}
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
