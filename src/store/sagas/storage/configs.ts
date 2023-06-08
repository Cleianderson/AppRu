import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery } from "redux-saga/effects"
import { Actions, Keys } from "~/utils/enums"

import { Creators, Types } from "~/store/actions"

function* watchConfigs() {
  yield takeEvery(Types.UPDATE_CONFIG, updateConfig)
  yield takeEvery(Types.GET_CONFIGS, getConfigs)
}

function* updateConfig(action: any) {
  if (action.configs !== undefined) {
    const configs: Configurations = yield select<Select>(
      (state) => state.storageState.configurations
    )
    const configurations = action.configs
    const _configs = { ...configs, ...configurations }

    yield put(Creators.setConfigs(_configs))

    yield writeConfig(_configs)
  }
}

function* writeConfig(_configs: Configurations) {
  // const _configs: object = yield select<Select>(
  //   (state) => state.storageState.configurations
  // )

  yield call(Storage.setItem, Keys.configuration, JSON.stringify(_configs))
}

function* getConfigs() {
  const defaultConfig: Configurations = {
    acceptedNotification: false,
    showDate: false,
    showWeekDays: false,
    onBoarded: false,
  }

  const configsStr: string = yield call(Storage.getItem, Keys.configuration)
  const configurations: Configurations = JSON.parse(configsStr) || defaultConfig

  if (configurations.onBoarded === undefined) {
    configurations.onBoarded = false
  }

  if (configurations !== null) {
    yield updateConfig(Creators.setConfigs(configurations))
  }
}

export default watchConfigs
