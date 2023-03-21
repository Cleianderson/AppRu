import { all, put, takeEvery } from "redux-saga/effects"
import Storage from "@react-native-async-storage/async-storage"

import watchFavorites from "./storage/favorites"
import { StorageActionTypes } from "~/utils/enums"
import watchWarnings from "./storage/warnings"

function* setAcceptedNotification(action: StorageAction) {
  yield put({ type: "" })
}

function* watchAcceptedNotification() {
  yield takeEvery(StorageActionTypes.setAcceptedNotification, setAcceptedNotification)
}

function* storageSaga() {
  yield all([watchFavorites(), watchAcceptedNotification(), watchWarnings()])
}

export default storageSaga
