import React from "react";
import { View, Image, Button } from "react-native";

export default function Preview(props) {
  // https://us05web.zoom.us/j/85200750534?pwd=amJ6WlZtVFEraGhySFAxZjZuSWVTQT09#success
  const image = props.route.params.image;

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image style={{ flex: 1 }} source={{ uri: image }} />
      <Button
        // TODO : Style The button
        title="Save Picture"
        onPress={() => {
          props.navigation.navigate("Save", { image });
        }}
      />
    </View>
  );
}
