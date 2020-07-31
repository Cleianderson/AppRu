// eslint-disable-next-line no-unused-vars
import { createContext, Dispatch, SetStateAction } from 'react'

type OnboadirngContext = {
  onBoarded: boolean,
  setOnBoarded: Dispatch<SetStateAction<boolean | undefined>>
}

const DataContext = createContext<OnboadirngContext>({} as OnboadirngContext)

export default DataContext
