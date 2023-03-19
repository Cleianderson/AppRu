import React, { useState, useEffect } from 'react'
import moment from 'moment'
// import { Container } from './styles';
import DataContext from '~/contexts/DataContext'

import { setItem, getItem } from '~/service/Storage'

const weekDay = moment().isoWeekday()

const State: React.FC = ({ children }) => {
  const [foods, setFoods] = useState<Table[]>()
  const [day, setDay] = useState(weekDay >= 1 && weekDay <= 5 ? weekDay - 1 : 0)
  // const [favorites, setFavorites] = useState<string[]>([])
  const [warns, setWarns] = useState<WarningType[]>()
  const [thereIsWarn, setThereIsWarn] = useState(false)
  const [homeViewPage, setHomeViewPage] = useState<JSX.Element>()


  const updateThereIsWarn = async (value: boolean) => {
    await setItem('@thereIsWarn', { data: value })
    setThereIsWarn(value)
  }

  // const addFavorites = async (str: string) => {
  //   await setItem('@favorites', { data: [...favorites, str] })
  //   setFavorites([...favorites, str])
  // }

  // const removeFavorites = async (str: string) => {
  //   const favoritesFiltered = favorites.filter((value) => value.toLowerCase() !== str.toLowerCase())
    // setFavorites(favoritesFiltered)
    // await setItem('@favorites', { data: favoritesFiltered })
  }

  useEffect(() => {
    // loadFavorites()
  }, [])

  return (
    <DataContext.Provider
      value={{
        // favorites,
        addFavorites,
        removeFavorites,
        // setFavorites,
        warns,
        setWarns,
        thereIsWarn,
        setThereIsWarn,
        updateThereIsWarn,
        foods,
        setFoods,
        day,
        setDay,
        homeViewPage,
        setHomeViewPage
      }}>
      {children}
    </DataContext.Provider>
  )
}

export default State
