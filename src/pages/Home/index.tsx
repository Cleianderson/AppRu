import React, { useContext, useRef, useEffect } from 'react'
import { View } from 'react-native'
import ViewPage from '@react-native-community/viewpager'

import { Container, Content, EmptyText, EmptyContainer } from './styles'
import WeekIndicator from './components/WeekIndicator'
import MButton from './components/MenuButton'

import DataContext from '~/contexts/DataContext'

const Home = () => {
  const PageFoods = useRef<ViewPage>()

  const { foods, day, setDay, setHomeViewPage } = useContext(DataContext)

  useEffect(() => {
    if (PageFoods.current !== undefined) {
      PageFoods.current.setPage(day)
      setHomeViewPage(PageFoods.current)
    }
  }, [foods])

  return (
    <Container>
      {foods && <WeekIndicator day={day} press={(index) => PageFoods.current!.setPage(index)} />}
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
                <MButton item={item} launch pageView={PageFoods.current} />
                <MButton item={item} pageView={PageFoods.current} />
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
