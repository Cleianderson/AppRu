import { createReducer } from "reduxsauce"

import { Types } from "~/store/actions"

const initialState: RequestState = {
  action: undefined,
  textSuccess: "Success",
  textFailed: "Failed",
  isRequesting: false,
  isVisible: false,
  success: false,
}

const setAction = (state = initialState, action: any) => {
  return { ...state, action: action.action }
}

const setIsRequesting = (state = initialState, action: any) => {
  return { ...state, isRequesting: action.isRequesting }
}

const setIsVisible = (state = initialState, action: any) => {
  return { ...state, setIsVisible: action.isVisible }
}

const setTextSuccess = (state = initialState, action: any) => {
  return { ...state, textSuccess: action.textSuccess }
}

const setTextFailed = (state = initialState, action: any) => {
  return { ...state, textFailed: action.textFailed }
}

const setSuccess = (state = initialState, action: any) => {
  return { ...state, success: action.success }
}

const reducers = {
  [Types.SET_ACTION]: setAction,
  [Types.SET_IS_REQUESTING]: setIsRequesting,
  // [Types.SET_IS_VISIBLE]: setIsVisible,
  // [Types.SET_IS_TEXT_SUCCESS]: setTextSuccess,
  // [Types.SET_IS_TEXT_FAILED]: setTextFailed,
  // [Types.SET_SUCCESS]: setSuccess,
}

export default createReducer(initialState, reducers)
