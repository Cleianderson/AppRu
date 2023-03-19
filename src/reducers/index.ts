import { combineReducers } from "redux"

import { mainReducer } from "./mainReducer"
import { requestReducer } from "./requestReducer"
import { storageReducer } from "./storageReducer"

export const Reducers = combineReducers({
  mainState: mainReducer,
  requestState: requestReducer,
  storageState: storageReducer,
})
