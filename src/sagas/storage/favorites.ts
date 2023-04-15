import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"
import { Actions, Keys } from "~/utils/enums"

function* updateFavorites(_favorites: string[]) {
  yield put<Dispatch>({
    type: Actions.setFavorites,
    payload: { value: _favorites },
  })
  yield writeFavorites(_favorites)
}

function* writeFavorites(favorites: string[]) {
  // const favorites: string[] = yield select<Select>((state) => state.storageState.favorites)

  yield call(Storage.setItem, Keys.favorites, JSON.stringify(favorites || []))
}

function* getFavorites() {
  const strFavorites: string = yield call(Storage.getItem, Keys.favorites)

  const favorites = JSON.parse(strFavorites) || []
  yield updateFavorites(favorites)
}

function* addFavorites(action: Dispatch<string>) {
  const currentFavorites: string[] = yield select<Select>((state) => state.storageState.favorites)

  let favorites = [...currentFavorites, action.payload.value]
  favorites = favorites.map((fav) => fav.toUpperCase().trim())

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

function* delFavorites(action: Dispatch<string>) {
  const currentFavorites: string[] = yield select<Select>((state) => state.storageState.favorites)

  let favorites = currentFavorites.filter(
    (fav) => fav.toUpperCase() !== action.payload.value.toUpperCase()
  )

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

export default function* watchFavorites() {
  yield takeLatest(Actions.getFavorites, getFavorites)
  yield takeEvery(Actions.addFavorites, addFavorites)
  yield takeEvery(Actions.delFavorites, delFavorites)
}
