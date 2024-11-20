import types from "./types";

const initialState = {
  costs: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COSTS_SUCCESS:
      return {
        ...state,
        costs: {
          ...state.costs,
          data: action.payload,
        },
      };
    case types.IS_LOADING_GET_COSTS:
      return {
        ...state,
        costs: {
          ...state.costs,
          loading: action.payload,
        },
      };
    case types.RESET_COSTS:
      return { ...state, costs: initialState.costs };
    default:
      return state;
  }
};
