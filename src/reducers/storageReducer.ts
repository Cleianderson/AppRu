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

export const storageReducer = (state = initialState, action: Dispatch) => {
  const setAcceptedNotification = (state: Storage, action: Dispatch) => {
    if (action.payload !== undefined) {
      const { acceptedNotification } = action.payload
      return { ...state, acceptedNotification }
    }

    return state
  }

  const setConfigurations = (state: Storage, action: Dispatch) => {
    if (action.payload !== undefined) {
      const { configurations } = action.payload
      return {
        ...state,
        configurations: { ...state.configurations, ...configurations },
      }
    }

    return state
  }

  const setFavorites = (state: Storage, action: Dispatch) => {
    if (action.payload !== undefined) {
      const { value } = action.payload
      return { ...state, favorites: value }
    }

    return state
  }

  const setIsOnBoarded = (state: Storage, action: Dispatch) => {
    return state
  }

  const setWeek = (state: Storage, action: Dispatch) => {
    if (action.payload !== undefined) {
      const { week } = action.payload
      return { ...state, week }
    }

    return state
  }

  const setNewWarning = (state: Storage, action: Dispatch) => {
    if (action.payload !== undefined) {
      const { newWarning } = action.payload
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

  const actions = new Map<StorageActionType, FNReducer>([
    ["SET_ACCEPTED_NOTIFICATION", setAcceptedNotification],
    ["SET_FAVORITES", setFavorites],
    ["SET_WARNINGS", setWarnings],
    ["SET_QUESTIONS", setQuestions],
    ["SET_NEW_WARNING", setNewWarning],
    ["SET_WEEK", setWeek],
    ["SET_IS_ONBOARDED", setIsOnBoarded],
    ["SET_CONFIGURATIONS", setConfigurations],
  ])
  // const actions = {
  //   SET_ACCEPTED_NOTIFICATION,
  // SET_CONFIGURATIONS,
  // SET_FAVORITES,
  // SET_IS_ONBOARDED,
  // SET_WEEK,
  // SET_NEW_WARNING,
  // SET_QUESTIONS,
  // SET_WARNINGS,
  // }

  let fn_action = actions.get(action.type)
  if (fn_action === undefined) {
    fn_action = (state, action) => state
  }

  return fn_action(state, action)
}
