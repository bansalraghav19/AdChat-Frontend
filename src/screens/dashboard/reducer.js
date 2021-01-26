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
  getUserFriends: makeRequestReducer(Types.GET_FREINDS),
  getFriendData: makeRequestReducer(Types.GET_FRIEND_DATA),
  roomChatData: makeRequestReducer(Types.ROOM_CHAT_DATA),
  changePassword: makeRequestReducer(Types.CHANGE_PASSWORD),
});
