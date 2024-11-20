import types from '../types';

export const getLogin = payload => ({
  type: types.LOGIN,
  payload
})
export const getLoginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
})
export const setIsLoadingLogin = payload => ({
  type: types.IS_LOADING_LOGIN,
  payload
})
export const setMessageLogin = payload => ({
  type: types.SET_MESSAGE_LOGIN,
  payload
})

export const getLogout = payload => ({
  type: types.LOGOUT,
  payload
})
export const getLogoutSuccess = payload => ({
  type: types.LOGOUT_SUCCESS,
  payload
})
export const setIsLoadingLogout = payload => ({
  type: types.IS_LOADING_LOGOUT,
  payload
})

export const resetLogin = payload => ({
  type: types.RESET_LOGIN
})
