import types from "./types";

const initialState = {
  sender: {},
  receiver: {},
  items: [],
  detail: {
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    note: "",
  },
  shipping: {
    schedule: "",
    service: "",
    service_type: "",
    drop: null,
    cod: null,
    insurance: null,
    cod_value: 0,
    service_type_id: null,
  },
  insurance_fee: 0,
  cod_fee: 0,
  item_value: 0,
  shipping_cost: 0,
  warehouse_id: null,
  error: {
    cod: {
      status: false,
      msg: "",
    },
  },
  history: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SENDER:
      return {
        ...state,
        sender: action.payload,
      };
    case types.SET_RECEIVER:
      return {
        ...state,
        receiver: action.payload,
      };
    case types.SET_WAREHOUSE_ID:
      return {
        ...state,
        warehouse_id: action.payload,
      };
    case types.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case types.SET_ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case types.SET_REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product_id !== action.payload.product_id
        ),
      };
    case types.SET_QTY_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.product_id === action.payload.product_id
            ? {
                ...item,
                quantity: action.payload.quantity,
                weight: action.payload.weight,
                price: action.payload.price,
              }
            : item
        ),
      };
    case types.SET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case types.SET_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
        shipping_cost: action.payload.cost,
      };
    case types.SET_SHIPPING_INSURANCE:
      return {
        ...state,
        shipping: {
          ...state.shipping,
          insurance: action.payload.checked,
          insurance_setting: {
            insurance_fee: action.payload.insurance_setting?.insurance_fee,
            insurance_add_cost:
              action.payload.insurance_setting?.insurance_add_cost,
          },
        },
        insurance_fee: action.payload.insurance_fee,
      };
    case types.SET_SHIPPING_COD:
      return {
        ...state,
        shipping: {
          ...state.shipping,
          cod: action.payload.checked,
          cod_setting: {
            cod_fee: action.payload.cod_setting?.cod_fee,
            minimum_cod_fee: action.payload.cod_setting?.minimum_cod_fee,
          },
        },
        cod_fee: action.payload.cod_fee,
      };
    case types.SET_ITEM_VALUE:
      return {
        ...state,
        item_value: action.payload,
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          ...action.payload,
        },
      };
    case types.GET_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          ...state.history,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          ...state.history,
          loading: action.payload,
        },
      };
    case types.RESET_HISTORY:
      return {
        ...state,
        history: initialState.history,
      };

    default:
      return state;
  }
};

export const getHistoryWaitingPickup = (payload) => ({
  type: types.GET_HISTORY_WAITING_PICKUP,
  payload,
});
export const getHistoryShipped = (payload) => ({
  type: types.GET_HISTORY_SHIPPED,
  payload,
});
export const getHistorySuccess = (payload) => ({
  type: types.GET_HISTORY_SUCCESS,
  payload,
});
export const setIsLoadingGetHistorySuccess = (payload) => ({
  type: types.IS_LOADING_GET_HISTORY_SUCCESS,
  payload,
});
export const resetHistory = (payload) => ({
  type: types.RESET_HISTORY,
  payload,
});

export const setSender = (payload) => ({
  type: types.SET_SENDER,
  payload,
});
export const setReceiver = (payload) => ({
  type: types.SET_RECEIVER,
  payload,
});
export const setWarehouseId = (payload) => ({
  type: types.SET_WAREHOUSE_ID,
  payload,
});
export const setItems = (payload) => ({
  type: types.SET_ITEMS,
  payload,
});
export const setAddItem = (payload) => ({
  type: types.SET_ADD_ITEM,
  payload,
});
export const setRemoveItem = (payload) => ({
  type: types.SET_REMOVE_ITEM,
  payload,
});
export const setQtyItem = (payload) => ({
  type: types.SET_QTY_ITEM,
  payload,
});
export const setDetail = (payload) => ({
  type: types.SET_DETAIL,
  payload,
});
export const setShipping = (payload) => ({
  type: types.SET_SHIPPING,
  payload,
});
export const setInsurance = (payload) => ({
  type: types.SET_SHIPPING_INSURANCE,
  payload,
});
export const setCOD = (payload) => {
  console.log(payload);
  return {
    type: types.SET_SHIPPING_COD,
    payload,
  };
};
export const setItemValue = (payload) => ({
  type: types.SET_ITEM_VALUE,
  payload,
});
export const setError = (payload) => ({
  type: types.SET_ERROR,
  payload,
});
