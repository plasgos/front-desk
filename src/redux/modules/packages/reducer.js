import types from "./types";

const initialState = {
  origin: 0,
  destination: 0,
  weight: 0,
  insurance: 1,
  item_value: 0,
  orders: [],
  receiver: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORIGIN:
      return {
        ...state,
        origin: action.payload,
      };
    case types.SET_DESTINATION:
      return {
        ...state,
        destination: action.payload.id,
        receiver: action.payload.receiver,
      };
    case types.SET_WEIGHT_AND_PRICE:
      return {
        ...state,
        weight: action.payload.weight,
        item_value: action.payload.price,
      };
    default:
      return state;
  }
};
