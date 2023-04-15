// eslint-disable-next-line no-unused-vars
import { createContext, Dispatch, SetStateAction } from 'react'

type StateContext = {
  warns: WarningType[] | undefined, setWarns: Dispatch<SetStateAction<WarningType[] | undefined>>
  // foods: Table[] | undefined, setFoods: Dispatch<SetStateAction<Table[] | undefined>>
  week?: Week,
  favorites: string[] | undefined, setFavorites: Dispatch<SetStateAction<string[]>>,
  day: number, setDay: (d: number) => void,
  homeViewPage: JSX.Element | undefined, setHomeViewPage: Dispatch<SetStateAction<JSX.Element | undefined>>,
  addFavorites: (str: string) => Promise<void>,
  removeFavorites: (str: string) => void,
  thereIsWarn: boolean, setThereIsWarn: Dispatch<SetStateAction<boolean>>,
  updateThereIsWarn: (bool: boolean) => {},
}

const DataContext = createContext<StateContext>({} as StateContext)

export default DataContext
