import Storage from "@react-native-async-storage/async-storage"
import { AxiosResponse } from "axios"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"

import Api from "~/service/Api"
import { StorageActionTypes, StorageKeys } from "~/utils/enums"

function* watchWeek() {
  yield takeEvery(StorageActionTypes.getWeek, getWeek)
  yield takeLatest(StorageActionTypes.requestWeek, requestWeek)
  // yield takeEvery(StorageActionTypes.updateWeek, updateWeek)
}

function* getWeek() {
  const strWeek: string = yield call(Storage.getItem, StorageKeys.week)
  const week: Week = JSON.parse(strWeek)

  if (week === null) {
    yield put<StorageAction>({ type: StorageActionTypes.requestWeek })
  } else {
    yield updateWeek(week)
  }
}

function* requestWeek() {
  yield put<StorageAction>({ type: StorageActionTypes.setIsRequesting, payload: { value: true } })
  const { data: week, status }: AxiosResponse<Week> = yield call(Api.get, "/thisweek")

  if (week.data.length > 0 && status.toString().startsWith("2")) {
    yield updateWeek(week)
  }

  yield put({ type: StorageActionTypes.setIsRequesting, payload: { value: false } })
}

function* updateWeek(week: Week) {
  yield put<StorageAction>({ type: StorageActionTypes.setWeek, payload: { value: week } })
  yield writeWeek()
}

function* writeWeek() {
  const week: Week = yield select<Select>((state) => state.mainState.week)

  yield call(Storage.setItem, StorageKeys.week, JSON.stringify(week))
}

export default watchWeek
