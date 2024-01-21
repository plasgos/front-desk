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
        orders: [
          {
            ...action.payload,
          },
        ],
      };
    case types.SET_SELECT_SENDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          return order.store_id === action.payload.store_id
            ? {
                ...order,
                sender: action.payload,
                warehouse_id: action.payload.id,
              }
            : {
                ...order,
              };
        }),
      };
    case types.SET_DESTINATION:
      return {
        ...state,
        destination: action.payload.destination,
        receiver: action.payload.receiver,
      };
    case types.SET_WEIGHT_AND_PRICE:
      console.log("payload", action.payload);
      console.log("state", state);

      return {
        ...state,
        // item_value: action.payload.price,
        orders: state.orders.map((order) => {
          console.log("payload", action.payload);

          return {
            ...order,
            products: action.payload,
          };
        }),
      };
    case types.REDUCE_PRODUCT_LIST:
      return {
        ...state,
        orders: state.orders.map((order) => ({
          ...order,
          products: order.products.filter(
            (product) => product.product_id !== action.payload
          ),
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
