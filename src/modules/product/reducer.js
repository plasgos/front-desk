import types from './types';

const initialState = {
  count:0,
  data:[],
};

export default (state = initialState, action)=>{
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return {...state, data:action.payload}
    case types.SET_COUNT_GET_PRODUCTS:
      return {...state, count:action.payload}
    case types.IS_LOADING_GET_PRODUCTS:
      return {...state, isLoadingGet:action.payload}

    case types.RESET_PRODUCT:
      return initialState
    default:
      return state;
  }
}
export const getProducts = payload => ({
  type: types.GET_PRODUCTS,
  payload
})
export const getProductsSuccess = payload => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload
})
export const setCountGetProducts = payload => ({
  type: types.SET_COUNT_GET_PRODUCTS,
  payload
})
export const setIsLoadingGetProducts = payload => ({
  type: types.IS_LOADING_GET_PRODUCTS,
  payload
})
export const resetProduct = payload => ({
  type: types.RESET_PRODUCT
})
