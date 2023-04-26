import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery } from "redux-saga/effects"
import { Actions, Keys } from "~/utils/enums"

function* watchConfigs() {
  yield takeEvery(Actions.updateConfig, updateConfig)
  yield takeEvery(Actions.getConfigs, getConfigs)
}

function* updateConfig(action: Dispatch) {
  if (action.payload.configurations !== undefined) {
    const configs: Configurations = yield select<Select>(
      (state) => state.storageState.configurations
    )
    const { configurations } = action.payload
    const _configs = { ...configs, ...configurations }

    yield put<Dispatch>({
      type: Actions.setConfigs,
      payload: { configurations: _configs },
    })

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
    yield updateConfig({
      type: Actions.setConfigs,
      payload: {
        configurations,
      },
    })
  }
}

export default watchConfigs
