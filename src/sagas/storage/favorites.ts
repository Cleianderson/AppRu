import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"
import { StorageActionTypes, StorageKeys } from "~/utils/enums"

function* updateFavorites(_favorites: string[]) {
  yield put<StorageAction>({
    type: StorageActionTypes.setFavorites,
    payload: { value: _favorites },
  })
  yield writeFavorites(_favorites)
}

function* writeFavorites(favorites: string[]) {
  // const favorites: string[] = yield select<Select>((state) => state.storageState.favorites)

  yield call(Storage.setItem, StorageKeys.favorites, JSON.stringify(favorites || []))
}

function* getFavorites() {
  const strFavorites: string = yield call(Storage.getItem, StorageKeys.favorites)

  const favorites = JSON.parse(strFavorites || String([]))
  yield updateFavorites(favorites)
}

function* addFavorites(action: StorageAction<string>) {
  const currentFavorites: string[] = yield select<Select>((state) => state.storageState.favorites)
  
  let favorites = [...currentFavorites, action.payload.value]
  favorites = favorites.map((fav) => fav.toUpperCase().trim())

  console.info(favorites)

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

function* delFavorites(action: StorageAction<string>) {
  const currentFavorites: string[] = yield select<Select>((state) => state.storageState.favorites)

  let favorites = currentFavorites.filter(
    (fav) => fav.toUpperCase() !== action.payload.value.toUpperCase()
  )

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

export default function* watchFavorites() {
  yield takeLatest(StorageActionTypes.getFavorites, getFavorites)
  yield takeEvery(StorageActionTypes.addFavorites, addFavorites)
  yield takeEvery(StorageActionTypes.delFavorites, delFavorites)
}
