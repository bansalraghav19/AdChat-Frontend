import { combineReducers } from "redux";
import * as Types from "./actionTypes";

function makeRequestReducer(actionType, initialState = {}) {
  const init = {
    data: [],
    error: false,
    isLoading: false,
    ...initialState,
  };

  return (state = init, { type, payload }) => {
    switch (type) {
      case actionType:
        return {
          ...state,
          isLoading: true,
          error: false,
          data: [],
        };
      case `${actionType}.success`:
        return {
          ...state,
          isLoading: false,
          data: payload.data,
          error: false,
        };
      case `${actionType}.failed`:
        return {
          ...state,
          isLoading: false,
          data: payload,
          error: true,
        };
      default:
        return state;
    }
  };
}
export default combineReducers({
  loginUser: makeRequestReducer(Types.LOGIN_USER),
  logoutUser: makeRequestReducer(Types.LOGIN_USER),
  registerUser: makeRequestReducer(Types.REGISTER_USER),
  checkAvailable: makeRequestReducer(Types.CHECK_EMAIL),
  sendEmailOtp: makeRequestReducer(Types.SEND_EMAIL_OTP),
  editUserDetails: makeRequestReducer(Types.EDIT_USER),
  resetPassword: makeRequestReducer(Types.RESET_PASSWORD),
});
