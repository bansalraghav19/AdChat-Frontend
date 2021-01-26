import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as actionHandlers from "../../lib/helpers/actionHandlers";
import options from "../../lib/utils/headers";

export const getUserFriends = () => (dispatch) => {
  dispatch(actionHandlers.skeltonLoadingStart());
  dispatch(actionHandlers.tryHandle(actionTypes.GET_FREINDS));
  return axios
    .get(`https://advchatapp.herokuapp.com/getfriends`, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.GET_FREINDS_SUCCESS,
            response.data
          )
        );
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.GET_FREINDS_FAILED, error)
      );
    });
};

export const getFriendData = (id) => (dispatch) => {
  dispatch(actionHandlers.tryHandle(actionTypes.GET_FRIEND_DATA));
  return axios
    .get(`https://advchatapp.herokuapp.com/friend/${id}`, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.GET_FRIEND_DATA_SUCCESS,
            response.data
          )
        );
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.GET_FRIEND_DATA_FAILED, error)
      );
    });
};

export const roomChatData = (roomId) => (dispatch) => {
  dispatch(actionHandlers.skeltonLoadingStart());
  return axios
    .get(`https://advchatapp.herokuapp.com/roominfo/${roomId}`, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.ROOM_CHAT_DATA_SUCCESS,
            response.data
          )
        );
        dispatch(actionHandlers.skeltonLoadingStop());
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.ROOM_CHAT_DATA_FAILED, error)
      );
      dispatch(actionHandlers.skeltonLoadingStop());
    });
};

export const changePassword = (payload) => (dispatch) => {
  dispatch(actionHandlers.tryHandle(actionTypes.CHANGE_PASSWORD));
  return axios
    .put(`https://advchatapp.herokuapp.com/changepassword`, payload, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.CHANGE_PASSWORD_SUCCESS,
            response.data
          )
        );
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.CHANGE_PASSWORD_FAILED, error)
      );
    });
};
