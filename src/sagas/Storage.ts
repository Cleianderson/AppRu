import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects"
import Storage from "@react-native-async-storage/async-storage"
import Api from "~/service/Api"

function* updateFavorites(_favorites: string[]) {
  yield put<StorageAction>({ type: "SET_FAVORITES", payload: { value: _favorites } })
}

function* writeFavorites(_favorites: string[]) {
  const key: StorageKeys = "@RUral:favorites"

  yield call(Storage.setItem, key, JSON.stringify(_favorites))
}

function* getFavorites() {
  const key: StorageKeys = "@RUral:favorites"
  const strFavorites: string = yield call(Storage.getItem, key)

  const favorites = JSON.parse(strFavorites) || []
  yield updateFavorites(favorites)
}

function* addFavorites(action: StorageAction<string>) {
  const key: StorageKeys = "@RUral:favorites"

  const favorites = action.payload.state?.favorites || []
  let _favorites = [...favorites, action.payload.value]
  _favorites = _favorites.map((fav) => fav.toUpperCase())

  yield writeFavorites(_favorites)
  yield updateFavorites(_favorites)
}

function* delFavorites(action: StorageAction<string>) {
  const favorites = action.payload.state?.favorites || []
  let _favorites = favorites.filter(
    (fav) => fav.toUpperCase() !== action.payload.value.toUpperCase()
  )

  yield writeFavorites(_favorites)
  yield updateFavorites(_favorites)
}

function* watchFavorites() {
  yield takeLatest("GET_FAVORITES", getFavorites)
  yield takeEvery("ADD_FAVORITES", addFavorites)
  yield takeEvery("DEL_FAVORITES", delFavorites)
}

function* storageSaga() {
  yield all([watchFavorites()])
}

export default storageSaga
