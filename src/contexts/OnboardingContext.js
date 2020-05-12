import {createContext} from 'react'

const DataContext = createContext({
  onBoarded: false,
  setOnBoarded: () => {},
})

export default DataContext
