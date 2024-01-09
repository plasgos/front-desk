import types from "./types";

const initialState = {
  checkout: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHECKCOUT:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          data: action.payload,
        },
      };
    case types.IS_LOADING_SET_CHECKCOUT:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          loading: action.payload,
        },
      };
    case types.GET_CHECKOUT_SUCCESS:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_CHECKOUT:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          loading: action.payload,
        },
      };
    case types.RESET_CHECKOUT:
      return { ...state, checkout: initialState.checkout };
    default:
      return state;
  }
};
