const { combineReducers } = require("redux");
import { user } from "./user";

const Reducers = combineReducers({
  userState: user,
});

export default Reducers;
