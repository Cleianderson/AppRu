import { createReducer } from "reduxsauce"

import { Types } from "~/store/actions"

const initialState: MainState = {
  warns: [],
  foods: undefined,
  favorites: undefined,
  day: undefined,
  homeView: undefined,
  thereIsWarn: false,
}

const setDay = (state = initialState, action: any) => ({
  ...state,
  day: action.day,
})

const setHomeView = (state = initialState, action: any) => ({
  ...state,
  homeView: action.homeView,
})

const reducers = {
  [Types.SET_DAY]: setDay,
  [Types.SET_HOME_VIEW]: setHomeView,
}

export default createReducer(initialState, reducers)
