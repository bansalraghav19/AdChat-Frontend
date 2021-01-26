import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as actionHandlers from "../helpers/actionHandlers";
import options from "../utils/headers";

export const getUserDetails = () => (dispatch) => {
  dispatch(actionHandlers.loadingStart());
  dispatch(actionHandlers.tryHandle(actionTypes.GET_USER_DETAILS));
  return axios
    .get(`https://advchatapp.herokuapp.com/user`, options())
    .then((response) => {
      if (response.data) {
        dispatch(
          actionHandlers.handleResponse(
            actionTypes.GET_USER_DETAILS_SUCCESS,
            response.data
          )
        );
        dispatch(actionHandlers.isLogged());
        dispatch(actionHandlers.loadingStop());
      }
    })
    .catch((error) => {
      dispatch(
        actionHandlers.handleError(actionTypes.GET_USER_DETAILS_FAILED, error)
      );
      dispatch(actionHandlers.isNotLogged());
      dispatch(actionHandlers.loadingStop());
    });
};
