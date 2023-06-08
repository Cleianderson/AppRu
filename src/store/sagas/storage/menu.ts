import Storage from "@react-native-async-storage/async-storage"
import { AxiosResponse } from "axios"
import moment from "moment"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"

import Api from "~/service/Api"
import { Creators, Types } from "~/store/actions"
import { Actions, Keys } from "~/utils/enums"

function* watchWeek() {
  yield takeEvery(Types.GET_WEEK, getWeek)
  yield takeLatest(Types.REQUEST_WEEK, requestWeek)
  // yield takeEvery(Actions.updateWeek, updateWeek)
}

function* getWeek() {
  const strWeek: string = yield call(Storage.getItem, Keys.week)
  const week: Week = JSON.parse(strWeek)
  const tomorrowIsoWeek = moment().add(1, "days").isoWeek()
  const tomorrowYear = moment().add(1, "days").year()

  const weekOutdated =
    week === undefined ||
    week === null ||
    (week.year === tomorrowYear && week.number_week < tomorrowIsoWeek)

  if (weekOutdated) {
    yield put(Creators.requestWeek())
  }

  yield updateWeek(week)
}

function* requestWeek() {
  yield put(Creators.setIsRequesting(true))
  // const _action = async () => {
  const { data: week, status } = yield call(Api.get, "/thisweek")

  const checkWeek = week.data.length > 0 && status.toString().startsWith("2")
  // console.info(checkWeek, week)

  if (checkWeek) {
    // yield call(updateWeek, week)
    yield updateWeek(week)

    // call(_putFn)
    yield put(Creators.setIsRequesting(false))

    // for await(const i of _fn()){
    //   console.log(i)
    // }
    // while (fn.next().done === false) {
    //   fn.next()
    // }

    // const _put = _putFn()
    // while (_put.next().done === false) {
    //   _put.next()
    // }
  }

  // return checkWeek
  // }

  // yield put(Creators.setAction(_action))
  // yield put({ type: Actions.setIsRequesting, payload: { isRequesting: false } })
}

function* updateWeek(week: Week) {
  // yield put({ type: Actions.setWeek, payload: { week } })
  yield put(Creators.setWeek(week))
  yield writeWeek(week)
}

function* writeWeek(week: Week) {
  // const week: Week = yield select<Select>((state) => state.mainState.week)

  yield call(Storage.setItem, Keys.week, JSON.stringify(week))
}

export default watchWeek
