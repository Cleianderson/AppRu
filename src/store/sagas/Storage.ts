import OneSignal from "react-native-onesignal"
import Storage from "@react-native-async-storage/async-storage"
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"

import { Actions, Keys } from "~/utils/enums"
import watchFavorites from "~/store/sagas/storage/favorites"
import watchMenu from "~/store/sagas/storage/menu"
import watchWarnings from "~/store/sagas/storage/warnings"
import watchConfigs from "~/store/sagas/storage/configs"

import {Types} from '~/store/actions'

function* watchOneSingal() {
  yield takeLatest(Types.INIT_ONE_SIGNAL, initOneSignal)
}

function* storageSaga() {
  yield all([
    watchConfigs(),
    watchFavorites(),
    watchMenu(),
    watchOneSingal(),
    watchWarnings(),
  ])
}

function* initOneSignal() {
  OneSignal.setRequiresUserPrivacyConsent(true)

  const configsStr: string = yield call(Storage.getItem, Keys.configuration)
  const configs: Configurations = JSON.parse(configsStr)

  if (typeof configs.acceptedNotification === "boolean") {
    OneSignal.provideUserConsent(configs.acceptedNotification)
  } else {
    OneSignal.provideUserConsent(false)
  }

  const appId = __DEV__
    ? "9cf90441-8151-4e1a-91a5-ce90b102410c"
    : "85b3451d-6f7d-481f-b66e-1f93fe069135"

  OneSignal.init(appId)
  OneSignal.addEventListener("received", async (pushNot: any) => {
    // await setItem('@warns', { data: pushNot.payload.additionalData.warns })
    // setWarns(pushNot.payload.additionalData.warns)
    // setThereIsWarn(true)
    put({ type: Actions.getWarnings })
    // await setItem('@thereIsWarn', { data: true })
  })
}

export default storageSaga
