import types from "./types";

const initialState = {
  address: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        address: {
          ...state.address,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_ADDRESS:
      return {
        ...state,
        address: {
          ...state.address,
          loading: action.payload,
        },
      };
    case types.RESET_ADDRESS:
      return { ...state, address: initialState.address };
    default:
      return state;
  }
};
