import React, { Component } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";

export class Main extends Component {
  componentDidMount() {}
  render() {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Logged</Text>
    </View>;
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(null, mapDispatchToProps)(Main);
