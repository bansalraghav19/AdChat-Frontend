import * as Types from './actionTypes';

const initialState = {
  data: [],
  error: false,
  isLoading: false,
};

export default function get_User(state = initialState, { type, payload }) {
  switch (type) {
    case Types.GET_USER_DETAILS:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case `${Types.GET_USER_DETAILS}.success`:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
        error: false,
      };
    case `${Types.GET_USER_DETAILS}.failed`:
      return {
        ...state,
        isLoading: false,
        data: payload,
        error: true,
      };
    default:
      return state;
  }
}
