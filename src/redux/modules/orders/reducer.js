import types from "./types";

const initialState = {
  orders: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: action.payload,
        },
      };
    case types.SET_ADDRESSES_STORE:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: state.orders.data.map((order) => {
            return order.store_id === action.payload.store_id
              ? {
                  ...order,
                  sender: action.payload,
                }
              : order;
          }),
        },
      };

    case types.RESET_ORDERS:
      return { ...state, orders: initialState.orders };
    default:
      return state;
  }
};
