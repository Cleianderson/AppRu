import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Requesting from "~/components/Requesting"

import Main from "~/routes/Main"
import { Creators } from "~/store/actions"
import { Container } from "~/styles"
import { Actions } from "~/utils/enums"

// const isoWeekOfTomorrow = moment().add(1, 'days').isoWeek()

const MainScreen: React.FC = () => {
  const dispatch = useDispatch()

  const setDay = () => {
    let _day = new Date(Date.now()).getDay() - 1
    _day = _day > 4 || _day < 0 ? 0 : _day

    // dispatch({ type: "SET_DAY", payload: { day: _day } })
    dispatch(Creators.setDay(_day))
  }

  useEffect(() => {
    
    // dispatch({ type: Actions.getFavorites })
    // dispatch({ type: Actions.getWeek })
    // dispatch({ type: Actions.getWarnings })
    dispatch(Creators.getFavorites())
    dispatch(Creators.getWeek())
    dispatch(Creators.getWarnings())
    setDay()
  }, [])

  return (
    <Container>
      <Main />
      <Requesting />
    </Container>
  )
}

export default MainScreen
