import { combineReducers } from "redux";

import get_User from "../lib/auth/reducer";
import authentication from "../screens/authorization/reducer";
import { setLoader, setSkeltonLoader } from "../lib/loading/action";
import setIsLogged from "../lib/loading/isLoggedAction";
import dashBoard from "../screens/dashboard/reducer";

const rootReducer = combineReducers({
  getUserDetails: get_User,
  isLogged: setIsLogged,
  authentication,
  setLoader,
  dashBoard,
  setSkeltonLoader,
});

export default rootReducer;
