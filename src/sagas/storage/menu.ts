import Storage from "@react-native-async-storage/async-storage"
import { AxiosResponse } from "axios"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"

import Api from "~/service/Api"
import { Actions, Keys } from "~/utils/enums"

function* watchWeek() {
  yield takeEvery(Actions.getWeek, getWeek)
  yield takeLatest(Actions.requestWeek, requestWeek)
  // yield takeEvery(Actions.updateWeek, updateWeek)
}

function* getWeek() {
  const strWeek: string = yield call(Storage.getItem, Keys.week)
  const week: Week = JSON.parse(strWeek)

  if (week === null) {
    yield put<Dispatch>({ type: Actions.requestWeek })
  } else {
    yield updateWeek(week)
  }
}

function* requestWeek() {
  yield put<Dispatch<boolean>>({
    type: Actions.setIsRequesting,
    payload: true,
  })
  const { data: week, status }: AxiosResponse<Week> = yield call(
    Api.get,
    "/thisweek"
  )

  if (week.data.length > 0 && status.toString().startsWith("2")) {
    yield updateWeek(week)
  }

  yield put({ type: Actions.setIsRequesting, payload: { value: false } })
}

function* updateWeek(week: Week) {
  yield put<Dispatch>({ type: Actions.setWeek, payload: { week } })
  yield writeWeek(week)
}

function* writeWeek(week: Week) {
  // const week: Week = yield select<Select>((state) => state.mainState.week)

  yield call(Storage.setItem, Keys.week, JSON.stringify(week))
}

export default watchWeek
