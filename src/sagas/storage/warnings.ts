import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"

import Api from "~/service/Api"
import { StorageActionTypes, StorageKeys } from "~/utils/enums"

function* updateWarnings(_warnings: WarningType[]) {
  yield put<StorageAction>({
    type: StorageActionTypes.setWarnings,
    payload: { value: _warnings },
  })
  yield writeWarnings()
}

function* updateNewWarning(value: boolean) {
  yield put<StorageAction>({
    type: StorageActionTypes.setNewWarning,
    payload: { value },
  })
  yield writeNewWarning()
}

function* writeWarnings() {
  const warnings: WarningType[] = select<Select>((state) => state.warnings)

  yield call(Storage.setItem, StorageKeys.warnings, JSON.stringify(warnings))
}

function* writeNewWarning() {
  const newWarning: boolean = select<Select>((state) => state.newWarning)

  yield call(Storage.setItem, StorageKeys.newWarning, JSON.stringify(newWarning))
}

function* getWarnings() {
  try {
    const warnsResolve: WarningType[] = yield call(Api.get, "/warn")

    yield updateWarnings(warnsResolve)
    yield checkNewWarnings()
  } catch {
    // pass
  }
}

export default function* watchWarnings() {
  yield takeLatest(StorageActionTypes.getWarnings, getWarnings)
}

function* checkNewWarnings() {
  const warnings: WarningType[] = select<Select>((state) => state.warnings)
  const strWarningsStorage: string = yield call(Storage.getItem, StorageKeys.warnings)

  let thereIsNewWarning = false
  for (let warning of warnings) {
    if (strWarningsStorage.includes(JSON.stringify(warning)) === false) {
      thereIsNewWarning = true
      break
    }
  }

  yield updateNewWarning(thereIsNewWarning)
}
