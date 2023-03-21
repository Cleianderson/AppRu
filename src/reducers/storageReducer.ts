const initialState: Storage = {
  acceptedNotification: undefined,
  configurations: {},
  favorites: [],
  isOnboarded: undefined,
  menu: [],
  newWarning: undefined,
  questions: [],
  warnings: [],
}

export const storageReducer = (state = initialState, action: StorageAction) => {
  const SET_ACCEPTED_NOTIFICATION = (state: Storage, action: StorageAction) => {
    const _state = { ...state, acceptedNotification: action.payload.value }
    return _state
  }

  const SET_CONFIGURATIONS = (state: Storage, action: StorageAction) => {
    return state
  }

  const SET_FAVORITES = (state: Storage, action: StorageAction) => {
    const _state = { ...state, favorites: action.payload.value }
    // console.info(_state)
    return _state
  }

  const SET_IS_ONBOARDED = (state: Storage, action: StorageAction) => {
    return state
  }

  const SET_MENU = (state: Storage, action: StorageAction) => {
    return state
  }

  const SET_NEW_WARNING = (state: Storage, action: StorageAction) => {
    const _state = { ...state, newWarning: action.payload.value }
    return _state
  }

  const SET_QUESTIONS = (state: Storage, action: StorageAction) => {
    return state
  }

  const SET_WARNINGS = (state: Storage, action: StorageAction) => {
    return state
  }

  const actions: MapAction = {
    SET_ACCEPTED_NOTIFICATION,
    SET_CONFIGURATIONS,
    SET_FAVORITES,
    SET_IS_ONBOARDED,
    SET_MENU,
    SET_NEW_WARNING,
    SET_QUESTIONS,
    SET_WARNINGS,
  }

  let fn_action = actions[action.type]
  if (fn_action === undefined) {
    fn_action = (state, action) => state
  }

  return fn_action(state, action)
}
