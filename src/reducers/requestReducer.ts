interface Action {
  type: string
  payload: any
}

const initialState: RequestState = {
  action: undefined,
  textSuccess: 'Success',
  textFailed: 'Failed',
  isRequesting: false,
  isVisible: false,
  success: false
}

export const requestReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_ACTION':
      return { ...state, action: action.payload.action }
    case 'SET_IS_REQUESTING':
      return { ...state, isRequesting: action.payload.isRequesting }
    case 'SET_IS_VISIBLE':
      return { ...state, isVisible: action.payload.isVisible }
    case 'SET_TEXT_SUCCESS':
      return { ...state, textSuccess: action.payload.textSuccess }
    case 'SET_TEXT_FAILED':
      return { ...state, textFailed: action.payload.textFailed }
    case 'SET_SUCCESS':
      return { ...state, success: action.payload.success }
    default:
      return state
  }
}
