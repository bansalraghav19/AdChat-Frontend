const IS_LOGGED = "IS_LOGGED";
const IS_NOT_LOGGED = "IS_NOT_LOGGED";

const initialState = {
  isLogged: false,
};

export default function setIsLogged(state = initialState, { type, payload }) {
  switch (type) {
    case IS_LOGGED:
      return {
        ...state,
        isLogged: payload.data,
      };
    case IS_NOT_LOGGED:
      return {
        ...state,
        isLogged: payload.data
      };
    default:
      return state;
  }
}

