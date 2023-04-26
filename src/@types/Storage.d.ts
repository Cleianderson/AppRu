type Table = {
  [key: string]:
    | string
    | {
        suc: string
        p1: string
        p2: string
        gua: string
        sob: string
        veg: string
        gre: string
        fag: string
        sal: string
        sco?: string
        sopa?: string
      }
}

type Week = {
  data: Table[]
  // eslint-disable-next-line camelcase
  number_week: number
  year: number
}

type RootState = {
  mainState: MainState
  requestState: RequestState
  storageState: Storage
}

type MainState = {
  warns: Warning[] | undefined // setWarns: Dispatch<SetStateAction<Warning[] | undefined>>
  foods: Table[] | undefined // setFoods: Dispatch<SetStateAction<Table[] | undefined>>
  week?: Week // setFoods: Dispatch<SetStateAction<Table[] | undefined>>
  favorites: string[] | undefined //  setFavorites: Dispatch<SetStateAction<string[]>>,
  day: number | undefined // setDay: (d: number) => void,
  // homeViewPage: JSX.Element | undefined, //  setHomeViewPage: Dispatch<SetStateAction<JSX.Element | undefined>>,
  homeView: any //  setHomeViewPage: Dispatch<SetStateAction<JSX.Element | undefined>>,
  // addFavorites: (str: string) => Promise<void>,
  // removeFavorites: (str: string) => void,
  thereIsWarn: boolean // setThereIsWarn: Dispatch<SetStateAction<boolean>>,
  // updateThereIsWarn: (bool: boolean) => {},
}

type RequestState = {
  action: string | undefined
  textSuccess: string
  textFailed: string
  isVisible: boolean
  isRequesting: boolean | undefined
  success: boolean | undefined
}

type Configurations = {
  showWeekDays?: boolean
  showDate?: boolean
  acceptedNotification?: boolean
  onBoarded?: boolean
}

type Storage = {
  acceptedNotification?: boolean
  configurations?: Configurations
  onBoarded?: boolean
  favorites?: string[]
  isOnboarded?: boolean
  week?: Week
  newWarning?: boolean
  questions?: object[]
  warnings?: Warning[]
}

type Select<T = any> = (state: RootState, ...args: any) => T

type StorageActionType =
  | "REQUEST_WEEK"
  | "SET_ACCEPTED_NOTIFICATION"
  | "SET_CONFIGURATIONS"
  | "SET_IS_REQUESTING"
  | "UPDATE_CONFIG"
  | "SET_FAVORITES"
  | "SET_IS_ONBOARDED"
  | "SET_WEEK"
  | "SET_NEW_WARNING"
  | "SET_QUESTIONS"
  | "SET_WARNINGS"

type Dispatch<T = any> = {
  type: StorageActionType
  payload?: Storage | T
}

type FNReducer = (state: Storage, action: Dispatch) => Storage

type MapAction = {
  [key in StorageActionType]: (state: Storage, action: Dispatch) => Storage
}

type Warning = {
  _id: string
  title: string
  content: string
  endDate: Date | string
}
