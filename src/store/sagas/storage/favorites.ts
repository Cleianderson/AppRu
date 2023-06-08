import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"
import { Actions, Keys } from "~/utils/enums"

import { Creators, Types } from "~/store/actions"

function* updateFavorites(_favorites: string[]) {
  yield put(Creators.setFavorites(_favorites))
  yield writeFavorites(_favorites)
}

function* writeFavorites(favorites: string[]) {
  // const favorites: string[] = yield select<Select>((state) => state.storageState.favorites)

  yield call(Storage.setItem, Keys.favorites, JSON.stringify(favorites || []))
}

function* getFavorites() {
  const strFavorites: string = yield call(Storage.getItem, Keys.favorites)

  const favorites = JSON.parse(strFavorites || "[]")
  yield updateFavorites(favorites)
}

function* addFavorites(action: any) {
  const currentFavorites: string[] = yield select<Select>(
    (state) => state.storageState.favorites
  )

  let favorites = [...currentFavorites, action.favorite]
  favorites = favorites.map((fav) => fav.toUpperCase().trim())

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

function* delFavorites(action: any) {
  const currentFavorites: string[] = yield select<Select>(
    (state) => state.storageState.favorites
  )

  let favorites = currentFavorites.filter(
    (fav) => fav.toUpperCase() !== action.favorite.toUpperCase()
  )

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

export default function* watchFavorites() {
  yield takeLatest(Types.GET_FAVORITES, getFavorites)
  yield takeEvery(Types.ADD_FAVORITES, addFavorites)
  yield takeEvery(Types.DEL_FAVORITES, delFavorites)
}
