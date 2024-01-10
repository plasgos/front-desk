import types from "./types";

const initialState = {
  orders: [],
  payment_method: "",
  payment_method_details: {},
  receiver: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHECKCOUT_PAYMENT:
      return {
        ...state,
        payment_method: action.payload.payment_method,
        payment_method_details: action.payload.payment_method_details,
      };
    case types.SET_CHECKCOUT_RECEIVER:
      return {
        ...state,
        receiver: action.payload,
      };
    case types.SET_CHECKCOUT_SHIPPING:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.store_id === action.payload.store_id) {
            return {
              ...order,
              ...action.payload,
            };
          }

          return order;
        }),
      };
    case types.SET_CHECKCOUT_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case types.SET_CHECKCOUT_SELECT_SENDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          return order.store_id === action.payload.store_id
            ? {
                ...order,
                sender: action.payload,
                warehouse_id: action.payload.id,
              }
            : order;
        }),
      };
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
