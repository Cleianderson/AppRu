import React, { useContext, useRef, useEffect } from 'react'
import Svg, { SvgProps, G, Path, Rect, Circle } from "react-native-svg"
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
  const day = useSelector<RootState, number | undefined>(state => state.mainState.day)
  const dispatch = useDispatch()

  const setDay = (num: number) => dispatch({ type: 'SET_DAY', payload: { day: num } })

  useEffect(() => {
    if (PageFoods.current !== undefined) {
      if (day !== undefined) {
        PageFoods.current.setPageWithoutAnimation(day)
      }
      dispatch({ type: 'SET_HOME_VIEW', payload: { homeView: PageFoods.current } })
    }
  }, [foods])

  if ((foods === undefined || foods.length === 0) || day === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <EmptyContainer>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 135.467 135.467"
          >
            <G transform="translate(0 -161.533)">
              <Path
                fill="#b8c4f0"
                d="M43.97 191.624a3.208 3.208 0 0 0-3.872 2.385l-15.74 66.229a3.208 3.208 0 0 0 2.385 3.871l50.923 12.103a3.208 3.208 0 0 0 3.872-2.385l15.74-66.229a3.208 3.208 0 0 0-2.386-3.872z"
              />
              <Path
                fill="#4c5a80"
                d="M24.142 188.811a3.208 3.208 0 0 0-2.788 3.593l8.522 67.538a3.208 3.208 0 0 0 3.593 2.787l51.929-6.552a3.208 3.208 0 0 0 2.787-3.593l-8.521-67.537a3.208 3.208 0 0 0-3.593-2.788z"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={235.329}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={210.827}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={218.994}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={243.497}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={251.664}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={227.162}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={235.329}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={210.827}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={218.994}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={243.497}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={251.664}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={227.162}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Circle cx={77.582} cy={226.562} r={23.974} fill="#b7d6dfc5" />
              <Path
                fill="#6387ca"
                d="M77.513 200.423a26.002 26.002 0 0 0-26.002 26.002 26.002 26.002 0 0 0 26.002 26.001 26.002 26.002 0 0 0 26.001-26.001 26.002 26.002 0 0 0-26.001-26.002zm0 5.62a20.381 20.381 0 0 1 20.38 20.382 20.381 20.381 0 0 1-20.38 20.38 20.381 20.381 0 0 1-20.382-20.38 20.381 20.381 0 0 1 20.382-20.381z"
              />
              <Path
                fill="#6387ca"
                d="M89.095 246.593s10.044 23.083 20.505 23.878c1.98.15 4.367-1.9 4.517-3.879.767-10.09-19.778-23.03-19.778-23.03z"
              />
            </G>
          </Svg>
          <EmptyText style={{ fontSize: 16 }}>sem cardápio, ainda</EmptyText>
        </EmptyContainer>
      </View>
    )
  } else {

    return (
      <Container>
        {foods && configs.showIndicator &&
          <WeekIndicator press={(index) => PageFoods.current!.setPage(index)} />
        }
        <Content>
          <ViewPage
            ref={PageFoods}
            style={{ flex: 1 }}
            onPageSelected={(props) => {
              setDay(props.nativeEvent.position)
            }}
          >
            {foods?.map((item, index) => (
              <View
                style={{
                  justifyContent: 'center'
                }}
                key={index}>
                <MButton item={item} launch />
                <MButton item={item} />
              </View>
            ))}
          </ViewPage>
        </Content>
      </Container>
    )
  }
}

export default Home
