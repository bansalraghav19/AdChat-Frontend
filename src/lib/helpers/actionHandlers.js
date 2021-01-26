export const tryHandle = (actionType) => ({
  type: actionType,
  payload: { loading: true },
});

export const handleResponse = (actionType, data) => ({
  type: actionType,
  payload: { data },
});

export const handleError = (actionType, error) => ({
  type: actionType,
  payload: { data: error },
});

export const loadingStart = () => ({
  type: "START_LOADING",
  payload: {
    data: true,
  },
});

export const loadingStop = () => ({
  type: "STOP_LOADING",
  payload: {
    data: false,
  },
});


export const isLogged = () => ({
  type: "IS_LOGGED",
  payload: {
    data: true,
  },
});

export const isNotLogged = () => ({
  type: "IS_NOT_LOGGED",
  payload: {
    data: false,
  },
});

export const skeltonLoadingStart = () => ({
  type: "START_SKELTON",
  payload: {
    data: true,
  },
});

export const skeltonLoadingStop = () => ({
  type: "STOP_SKELTON",
  payload: {
    data: false,
  },
});