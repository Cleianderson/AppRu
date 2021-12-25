import { combineReducers } from 'redux'

import { mainReducer } from './mainReducer'
import { requestReducer } from './requestReducer'

export const Reducers = combineReducers({
  mainState: mainReducer,
  requestState: requestReducer
})
