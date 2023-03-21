type Storage = {
  acceptedNotification?: boolean
  configurations?: object
  favorites: string[]
  isOnboarded?: boolean
  menu?: Table[]
  newWarning?: boolean
  questions?: object[]
  warnings: WarningType[]
}

type Select<T=any> = (state: RootState, ...args: any) => T

type StorageActionType =
  | "SET_ACCEPTED_NOTIFICATION"
  | "SET_CONFIGURATIONS"
  | "SET_FAVORITES"
  | "SET_IS_ONBOARDED"
  | "SET_MENU"
  | "SET_NEW_WARNING"
  | "SET_QUESTIONS"
  | "SET_WARNINGS"

// type StorageKeys =
//   | "@RUral:acceptedNotification"
//   | "@RUral:configuration"
//   | "@RUral:favorites"
//   | "@RUral:isOnboarded"
//   | "@RUral:menu"
//   | "@RUral:newWarning"
//   | "@RUral:questions"
//   | "@RUral:warnings"
// declare enum StorageKeys {
//   ACCEPTED_NOTIFICATION = "@RUral:acceptedNotification"|
//   CONFIGURATIONS = "@RUral:configuration",
//   FAVORITES = "@RUral:favorites",
//   IS_ONBOARDED = "@RUral:isOnboarded",
//   MENU = "@RUral:menu",
//   NEW_WARNING = "@RUral:newWarning",
//   QUESTIONS = "@RUral:questions",
//   WARNINGS = "@RUral:warnings",
// }

type StorageAction<T = any> = {
  type: StorageActionType
  payload: { value: T, state?: Storage }
}

type StoragesReducer = (state: Storage, action: StorageAction) => Storage

type MapAction = {
  [key in StorageActionType]: (state: Storage, action: StorageAction) => Storage
}
