type Storage = {
  acceptedNotification?: boolean
  configurations?: object
  favorites: string[]
  isOnboarded?: boolean
  week?: Table[]
  newWarning?: boolean
  questions?: object[]
  warnings: WarningType[]
}

type Select<T=any> = (state: RootState, ...args: any) => T

type StorageActionType =
  | "REQUEST_WEEK"
  | "SET_ACCEPTED_NOTIFICATION"
  | "SET_CONFIGURATIONS"
  | "SET_FAVORITES"
  | "SET_IS_ONBOARDED"
  | "SET_WEEK"
  | "SET_NEW_WARNING"
  | "SET_QUESTIONS"
  | "SET_WARNINGS"
  | "SET_IS_REQUESTING"

// type StorageKeys =
//   | "@RUral:acceptedNotification"
//   | "@RUral:configuration"
//   | "@RUral:favorites"
//   | "@RUral:isOnboarded"
//   | "@RUral:week"
//   | "@RUral:newWarning"
//   | "@RUral:questions"
//   | "@RUral:warnings"
// declare enum StorageKeys {
//   ACCEPTED_NOTIFICATION = "@RUral:acceptedNotification"|
//   CONFIGURATIONS = "@RUral:configuration",
//   FAVORITES = "@RUral:favorites",
//   IS_ONBOARDED = "@RUral:isOnboarded",
//   WEEK = "@RUral:week",
//   NEW_WARNING = "@RUral:newWarning",
//   QUESTIONS = "@RUral:questions",
//   WARNINGS = "@RUral:warnings",
// }

type StorageAction<T = any> = {
  type: StorageActionType
  payload?: { value: T, state?: Storage }
}

type StoragesReducer = (state: Storage, action: StorageAction) => Storage

type MapAction = {
  [key in StorageActionType]: (state: Storage, action: StorageAction) => Storage
}
