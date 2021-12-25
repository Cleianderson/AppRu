import React, { useContext, useRef, useEffect } from 'react'
import { View } from 'react-native'
import ViewPage from '@react-native-community/viewpager'

import { Container, Content, EmptyText, EmptyContainer } from './styles'
import WeekIndicator from './components/WeekIndicator'
import MButton from './components/MenuButton'

import Config from '~/contexts/ConfigContext'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const PageFoods = useRef<ViewPage>()

  const { configs } = useContext(Config)
  const foods = useSelector<RootState, Table[] | undefined>(state => state.mainState.foods)
  const day = useSelector<RootState, number>(state => state.mainState.day)
  const dispatch = useDispatch()

  const setDay = (num: number) => dispatch({ type: 'SET_DAY', payload: { day: num } })

  useEffect(() => {
    if (PageFoods.current !== undefined) {
      PageFoods.current.setPage(day)
      dispatch({ type: 'SET_HOME_VIEW', payload: { homeView: PageFoods.current } })
    }
  }, [foods])

  return (
    <Container>
      {foods && configs.showIndicator &&
        <WeekIndicator day={day} press={(index) => PageFoods.current!.setPage(index)} />
      }
      <Content>
        <ViewPage
          ref={PageFoods}
          style={{ flex: 1 }}
          onPageScroll={() => { }}
          onPageSelected={(props) => setDay(props.nativeEvent.position)}>
          {foods ? (
            foods.map((item, index) => (
              <View
                style={{
                  justifyContent: 'center'
                }}
                key={index}>
                <MButton item={item} launch />
                <MButton item={item} />
              </View>
            ))
          ) : (
            <EmptyContainer>
              <EmptyText>;(</EmptyText>
              <EmptyText style={{ fontSize: 16 }}>desculpa, não encontrei a semana</EmptyText>
            </EmptyContainer>
          )}
        </ViewPage>
      </Content>
    </Container>
  )
}

export default Home
