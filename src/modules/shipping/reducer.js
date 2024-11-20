import types from './types';

const initialState = {
  cost: {
    data: [],
    loading: false
  },
};

export default (state = initialState, action) => {
  switch(action.type){
    case types.CHECK_COSTS_SUCCESS:
      return {
        ...state,
        cost: {
          ...state.cost,
          data: action.payload
        }
      }
    case types.IS_LOADING_CHECK_COSTS:
      return {
        ...state,
        cost: {
          ...state.cost,
          loading: action.payload
        }
      }
    case types.RESET_CHECK_COSTS:
      return { ...state, cost: initialState.cost }



    default:
      return state
  }
}

export const checkCosts = payload => ({
  type: types.CHECK_COSTS,
  payload
})
export const checkCostsSuccess = payload => ({
  type: types.CHECK_COSTS_SUCCESS,
  payload
})
export const setIsLoadingCheckCosts = payload => ({
  type: types.IS_LOADING_CHECK_COSTS,
  payload
})
export const resetCheckCosts = payload => ({
  type: types.RESET_CHECK_COSTS,
  payload
})
