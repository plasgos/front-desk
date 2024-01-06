import types from "./types";

const initialState = {
  orders: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADDRESSES_STORE_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_ADDRESSES_STORE:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: action.payload,
        },
      };
    case types.RESET_ORDERS:
      return { ...state, orders: initialState.orders };
    default:
      return state;
  }
};
