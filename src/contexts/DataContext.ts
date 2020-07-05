// eslint-disable-next-line no-unused-vars
import { createContext, Dispatch, SetStateAction } from 'react'

type StateContext = {
  warns: WarningType[] | undefined,
  foods: Table[] | undefined,
  favorites: string[] | undefined,
  day: number,
  setHomeViewPage: Dispatch<SetStateAction<JSX.Element | undefined>>,
  setFavorites: Dispatch<SetStateAction<string[]>>,
  setDay: (d: number) => void,
  addFavorites: (str: string) => Promise<void>,
  removeFavorites: (str: string) => void,
  thereIsWarn: boolean,
  updateThereIsWarn: (bool: boolean) => {},
  homeViewPage: JSX.Element | undefined,
  reload: () => void
}

const DataContext = createContext<StateContext>({} as StateContext)

export default DataContext
