import { createReducer } from "reduxsauce"

import { Types } from "~/store/actions"

const initialState: Storage = {
  acceptedNotification: undefined,
  configurations: {
    acceptedNotification: false,
    showDate: false,
    showWeekDays: false,
    onBoarded: undefined,
  },
  favorites: [],
  week: undefined,
  newWarning: undefined,
  questions: [],
  warnings: [],
}

const setAcceptedNotification = (state: Storage, action: any) => {
  if (action.accepted !== undefined) {
    return { ...state, acceptedNotification: action.accepted }
  }

  return state
}

const setConfigs = (state: Storage, action: any) => {
  if (action.configs !== undefined) {
    return {
      ...state,
      configurations: { ...state.configurations, ...action.configs },
    }
  }

  return state
}

const setFavorites = (state: Storage, action: any) => {
  if (action.favorites !== undefined) {
    const value = action.favorites
    return { ...state, favorites: value }
  }

  return state
}

const setIsOnBoarded = (state: Storage, action: any) => {
  return {...state, configurations: {...state.configurations, onBoarded: action.isOnBoarded}}
}

const setWeek = (state: Storage, action: any) => {
  if (action.week !== undefined) {
    const week = action.week
    return { ...state, week }
  }

  return state
}

const setNewWarning = (state: Storage, action: any) => {
  if (action.newWarning !== undefined) {
    const newWarning = action.newWarning
    return { ...state, newWarning }
  }

  return state
}

const setQuestions = (state: Storage, action: Dispatch) => {
  return state
}

const setWarnings = (state: Storage, action: Dispatch) => {
  return state
}

const reducers = {
  [Types.SET_ACCEPTED_NOTIFICATION]: setAcceptedNotification,
  [Types.SET_FAVORITES]: setFavorites,
  [Types.SET_WARNINGS]: setWarnings,
  [Types.SET_QUESTIONS]: setQuestions,
  [Types.SET_NEW_WARNING]: setNewWarning,
  [Types.SET_WEEK]: setWeek,
  [Types.SET_IS_ON_BOARDED]: setIsOnBoarded,
  [Types.SET_CONFIGS]: setConfigs,
}

export default createReducer(initialState, reducers)
