import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as authActionTypes from "../../lib/auth/actionTypes";
import * as actionHandlers from "../../lib/helpers/actionHandlers";
import options from "../../lib/utils/headers";

export const loginUser = (payload) => (dispatch) => {
  dispatch(actionHandlers.loadingStart());
  dispatch(actionHandlers.tryHandle(actionTypes.LOGIN_USER));
  return axios
    .post(`https://advchatapp.herokuapp.com/login`, payload)
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.LOGIN_USER_SUCCESS,
            response.data
          )
        );
        localStorage.setItem("id_token", response?.data?.data?.token?.[1]);
        dispatch(actionHandlers.loadingStop());
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.LOGIN_USER_FAILED, error)
      );
      dispatch(actionHandlers.loadingStop());
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(actionHandlers.loadingStart());
  dispatch(actionHandlers.tryHandle(actionTypes.LOGOUT_USER));
  return axios
    .get(`https://advchatapp.herokuapp.com/logout`, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.LOGOUT_USER_SUCCESS,
            response.data
          )
        );
        dispatch(
          actionHandlers.handleResponse(actionTypes.LOGIN_USER_SUCCESS, [])
        );
        dispatch(actionHandlers.isNotLogged());
        dispatch(actionHandlers.loadingStop());
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.LOGOUT_USER_FAILED, error)
      );
      dispatch(actionHandlers.isNotLogged());
      dispatch(actionHandlers.loadingStop());
    });
};

export const registerUser = (payload) => (dispatch) => {
  dispatch(actionHandlers.loadingStart());
  dispatch(actionHandlers.tryHandle(actionTypes.REGISTER_USER));
  return axios
    .post(`https://advchatapp.herokuapp.com/register`, payload)
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.REGISTER_USER_SUCCESS,
            response.data
          )
        );
        localStorage.setItem("id_token", response?.data?.data?.token?.[0]);
        dispatch(actionHandlers.loadingStop());
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.REGISTER_USER_FAILED, error)
      );
      dispatch(actionHandlers.loadingStop());
    });
};

export const checkAvailable = (payload) => (dispatch) => {
  dispatch(actionHandlers.tryHandle(actionTypes.CHECK_EMAIL));
  return axios
    .post(`https://advchatapp.herokuapp.com/checkUser`, payload)
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.CHECK_EMAIL_SUCCESS,
            response.data
          )
        );
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.CHECK_EMAIL_FAILED, error)
      );
    });
};

export const sendEmailOtp = (payload) => (dispatch) => {
  dispatch(actionHandlers.tryHandle(actionTypes.SEND_EMAIL_OTP));
  return axios
    .post(`https://advchatapp.herokuapp.com/verifyotp`, payload)
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.SEND_EMAIL_OTP_SUCCESS,
            response.data
          )
        );
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.SEND_EMAIL_OTP_FAILED, error)
      );
    });
};

export const editUser = (payload, callback) => (dispatch) => {
  dispatch(actionHandlers.tryHandle(actionTypes.EDIT_USER));
  return axios
    .put(`https://advchatapp.herokuapp.com/edituser`, payload, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.EDIT_USER_SUCCESS,
            response.data
          )
        );
        dispatch(
          actionHandlers.handleResponse(
            authActionTypes.GET_USER_DETAILS_SUCCESS,
            response.data
          )
        );
        callback();
      }
    })
    .catch((error) => {
      dispatch(actionHandlers.handleError(actionTypes.EDIT_USER_FAILED, error));
    });
};

export const resetPassword = (payload, callback) => (dispatch) => {
  dispatch(actionHandlers.tryHandle(actionTypes.RESET_PASSWORD));
  return axios
    .post(`https://advchatapp.herokuapp.com/resetpassword`, payload, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.RESET_PASSWORD_SUCCESS,
            response.data
          )
        );
        dispatch(
          actionHandlers.handleResponse(actionTypes.SEND_EMAIL_OTP_SUCCESS, [])
        );
        dispatch(
          actionHandlers.handleResponse(actionTypes.CHECK_EMAIL_SUCCESS, [])
        );
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.RESET_PASSWORD_FAILED, error)
      );
      dispatch(
        actionHandlers.handleResponse(actionTypes.SEND_EMAIL_OTP_FAILED, [])
      );
      dispatch(
        actionHandlers.handleResponse(actionTypes.CHECK_EMAIL_FAILED, [])
      );
    });
};

export const clearResetData = () => (dispatch) => {
  dispatch(
    actionHandlers.handleResponse(actionTypes.RESET_PASSWORD_SUCCESS, [])
  );
};
