import types from "./types";

const initialState = {
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    default:
      return state;
  }
};
