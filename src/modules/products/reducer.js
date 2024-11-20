import types from "./types";

const initialState = {
  products: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          loading: action.payload,
        },
      };
    case types.RESET_PRODUCTS:
      return { ...state, products: initialState.products };
    default:
      return state;
  }
};
