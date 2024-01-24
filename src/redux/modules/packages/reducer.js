import types from "./types";

const initialState = {
  origin: {},
  // destination: {},
  notes: "",
  totalWeight: 0,
  dimension: {},
  insurance: 1,
  item_value: 0,
  orders: [],
  receiver: {},
  expeditions: {
    data: [],
    loading: false,
  },
  selectedExpedtion: {},
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
    case types.SET_TOTAL_WEIGHT_ORDERS:
      return {
        ...state,
        totalWeight: action.payload,
      };
    case types.SET_DIMENSION:
      return {
        ...state,
        dimension: {
          ...state.dimension,
          ...action.payload,
        },
      };
    case types.RESET_PRODUCT_TOTAL_WEIGHT:
      return {
        ...state,
        totalWeight: initialState.totalWeight,
      };
    case types.SET_NOTES:
      return {
        ...state,
        notes: action.payload,
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
    case types.SET_SELECT_COURIR:
      return {
        ...state,
        selectedExpedtion: action.payload,
      };
    default:
      return state;
  }
};
