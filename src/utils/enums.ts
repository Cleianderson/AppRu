export enum StorageKeys {
  acceptedNotification = "@RUral:acceptedNotification",
  configuration = "@RUral:configuration",
  favorites = "@RUral:favorites",
  isOnboarded = "@RUral:isOnboarded",
  week = "@RUral:week",
  _oldWeek = "@weeks",
  newWarning = "@RUral:newWarning",
  questions = "@RUral:questions",
  warnings = "@RUral:warnings",
}

export enum StorageActionTypes {
  addFavorites = "ADD_FAVORITES",
  addWarnings = "ADD_WARNINGS",
  delFavorites = "DEL_FAVORITES",
  delWarnings = "DEL_WARNINGS",
  getFavorites = "GET_FAVORITES",
  getWeek = "GET_WEEK",
  getWarnings = "GET_WARNINGS",
  requestWeek = "REQUEST_WEEK",
  setAcceptedNotification = "SET_ACCEPTED_NOTIFICATION",
  setFavorites = "SET_FAVORITES",
  setWeek = "SET_WEEK",
  setNewWarning = "SET_NEW_WARNING",
  setWarnings = "SET_WARNINGS",
  setIsRequesting = "SET_IS_REQUESTING",
  updateWeek = "UPDATE_WEEK"
}
