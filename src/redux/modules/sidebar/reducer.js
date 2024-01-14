import types from './types';

const initialState = {
  show: 'responsive'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SIDEBAR:{
      return {...state, show: action.payload }
    }
    default:
      return state
  }
}

export const setSidebar = payload => ({
  type: types.SET_SIDEBAR,
  payload
})
