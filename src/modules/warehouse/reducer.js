import types from './types';

const initialState = {
  data:[],
  isLoadingGet: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WAREHOUSES_SUCCESS:
      return { ...state, data: action.payload.sort((x, y) => (x.is_default === y.is_default) ? 0 : x.is_default ? -1 : 1) }
    case types.IS_LOADING_GET_WAREHOUSES:
      return { ...state, isLoadingGet: action.payload }

    default:
      return state;
  }
}

export const getWarehouses = payload => ({
  type: types.GET_WAREHOUSES,
  payload
})
export const getWarehousesSuccess = payload => ({
  type: types.GET_WAREHOUSES_SUCCESS,
  payload
})
export const setLoadingGetWarehouses = payload => ({
  type: types.IS_LOADING_GET_WAREHOUSES,
  payload
})
