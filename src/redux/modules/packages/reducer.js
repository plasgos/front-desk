import types from "./types";

const initialState = {
  origin: {},
  // destination: {},
  totalWeight: 0,
  insurance: 1,
  item_value: 0,
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
            store_id: action.payload.store_id,
            sender: action.payload.sender,
            warehouse_id: action.payload.warehouse_id,
          },
        ],
      };
    case types.SET_SELECT_SENDER:
      return {
        ...state,
        origin: action.payload.origin,
        orders: state.orders.map((order) => {
          return order.store_id === action.payload.store_id
            ? {
                ...order,
                sender: action.payload.sender,
                warehouse_id: action.payload.warehouse_id,
              }
            : {
                ...order,
              };
        }),
      };
    case types.SET_DESTINATION:
      return {
        ...state,
        // destination: action.payload.destination,
        receiver: action.payload.receiver,
      };
    case types.SET_PRODUCTS:
      const totalWeightOrders = action.payload.reduce(
        (total, product) => total + product.totalWeight,
        0
      );

      const totalPriceOrders = action.payload.reduce(
        (total, product) => total + product.totalPrice,
        0
      );
      console.log("🚀 ~ totalPriceOrders:", totalPriceOrders);

      return {
        ...state,
        item_value: totalPriceOrders,
        totalWeight: totalWeightOrders,
        orders: state.orders.map((order) => {
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
