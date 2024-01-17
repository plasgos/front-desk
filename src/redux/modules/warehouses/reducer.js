import types from "./types";

const initialState = {
  warehouses: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WAREHOUSES_SUCCESS:
      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_WAREHOUSES:
      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          loading: action.payload,
        },
      };
    case types.RESET_WAREHOUSES:
      return { ...state, warehouses: initialState.warehouses };
    default:
      return state;
  }
};
