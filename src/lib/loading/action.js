const START_LOADING = "START_LOADING";
const STOP_LOADING = "STOP_LOADING";

const START_SKELTON = "START_SKELTON";
const STOP_SKELTON = "STOP_SKELTON";

const initialState = {
  isLoading: false,
};

function setLoader(state = initialState, { type, payload }) {
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: payload.data,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: payload.data,
      };
    default:
      return state;
  }
}

const initialState1 = {
  isLoading: false,
};

function setSkeltonLoader(state = initialState1, { type, payload }) {
  switch (type) {
    case START_SKELTON:
      return {
        ...state,
        isLoading: payload.data,
      };
    case STOP_SKELTON:
      return {
        ...state,
        isLoading: payload.data,
      };
    default:
      return state;
  }
}

export { setLoader, setSkeltonLoader };
