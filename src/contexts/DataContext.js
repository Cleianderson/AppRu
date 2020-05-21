import {createContext, Component} from 'react'

const DataContext = createContext({
  warns: [{title: 'string', content: 'string'}],
  foods: [['string']],
  favorites: ['string'],
  day: 0,
  addFavorites: (str = '') => {},
  removeFavorites: (str = '') => {},
  setFavorites: (str = '') => {},
  thereIsWarn: false,
  updateThereIsWarn: (bool = false) => {},
  setDay: (d = 0) => {},
  homeViewPage: Component,
  setHomeViewPage: (comp = Component) => {},
  reload: () => {},
})

export default DataContext
