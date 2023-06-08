import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"

import Api from "~/service/Api"
import { Types } from "~/store/actions"
import { Actions, Keys } from "~/utils/enums"

function* updateWarnings(_warnings: Warning[]) {
  yield put({
    type: Actions.setWarnings,
    payload: { value: _warnings },
  })
  yield writeWarnings()
}

function* updateNewWarning(value: boolean) {
  yield put({
    type: Actions.setNewWarning,
    payload: { value },
  })
  yield writeNewWarning()
}

function* writeWarnings() {
  const warnings: Warning[] = select<Select>((state) => state.warnings)

  yield call(Storage.setItem, Keys.warnings, JSON.stringify(warnings))
}

function* writeNewWarning() {
  const newWarning: boolean = select<Select>((state) => state.newWarning)

  yield call(Storage.setItem, Keys.newWarning, JSON.stringify(newWarning))
}

function* getWarnings() {
  try {
    const warnsResolve: Warning[] = yield call(Api.get, "/warn")

    yield updateWarnings(warnsResolve)
    yield checkNewWarnings()
  } catch {
    // pass
  }
}

export default function* watchWarnings() {
  yield takeLatest(Types.GET_WARNINGS, getWarnings)
}

function* checkNewWarnings() {
  const warnings: Warning[] = select<Select>((state) => state.warnings)
  const strWarningsStorage: string = yield call(Storage.getItem, Keys.warnings)

  let thereIsNewWarning = false
  for (let warning of warnings) {
    if (strWarningsStorage.includes(JSON.stringify(warning)) === false) {
      thereIsNewWarning = true
      break
    }
  }

  yield updateNewWarning(thereIsNewWarning)
}
