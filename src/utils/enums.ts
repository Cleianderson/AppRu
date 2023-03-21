export enum StorageKeys {
  acceptedNotification = "@RUral:acceptedNotification",
  configuration = "@RUral:configuration",
  favorites = "@RUral:favorites",
  isOnboarded = "@RUral:isOnboarded",
  menu = "@RUral:menu",
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
  getWarnings = "GET_WARNINGS",
  setAcceptedNotification = "SET_ACCEPTED_NOTIFICATION",
  setFavorites = "SET_FAVORITES",
  setNewWarning = "SET_NEW_WARNING",
  setWarnings = "SET_WARNINGS",
}
