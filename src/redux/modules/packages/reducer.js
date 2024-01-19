import types from "./types";

const initialState = {
  origin: {},
  destination: {},
  weight: {},
  insurance: 1,
  item_value: {},
  orders: [],
  receiver: {},
  expeditions: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORIGIN:
      return {
        ...state,
        origin: action.payload.origin,
        orders: [
          {
            sender: action.payload.sender,
          },
        ],
      };
    case types.SET_DESTINATION:
      return {
        ...state,
        destination: action.payload.destination,
        receiver: action.payload.receiver,
      };
    case types.SET_WEIGHT_AND_PRICE:
      return {
        ...state,
        weight: action.payload.weight,
        item_value: action.payload.price,
        orders: state.orders.map((order) => ({
          ...order,
          product: action.payload.product,
        })),
      };
    case types.SET_PICKUP_OPTIONS:
      return {
        ...state,
        orders: state.orders.map((order) => ({
          ...order,
          drop: action.payload,
        })),
      };
    case types.SET_PAYMENT_METHOD:
      return {
        ...state,
        orders: state.orders.map((order) => ({
          ...order,
          cod: action.payload,
        })),
      };
    case types.SET_IS_LOADING_GET_SHIPPING_COST:
      return {
        ...state,
        expeditions: {
          ...state.expeditions,
          loading: action.payload,
        },
      };
    case types.GET_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        expeditions: {
          ...state.expeditions,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
