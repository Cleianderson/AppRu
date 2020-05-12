import React, {useContext, useRef, useEffect} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ViewPage from '@react-native-community/viewpager'

import {Container, Content, Buttons, EmptyText, EmptyContainer} from './styles'
import Button from './components/Button'
import WeekIndicator from './components/WeekIndicator'
import MButton from './components/MenuButton'

import DataContext from '../../contexts/DataContext'

const Home = () => {
  const PageFoods = useRef(ViewPage)

  const {foods, day, setDay, reload, thereIsWarn, updateThereIsWarn} = useContext(
    DataContext,
  )

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{margin: 20}} onPress={reload}>
          <Icon name="reload" color="#1b2d4f" size={30} />
        </TouchableOpacity>
      ),
      headerLeft: ()=>(
        <TouchableOpacity style={{margin: 20}} onPress={()=>navigation.navigate('Info')}>
        <Icon name="information-outline" color="#1b2d4f" size={30} />
      </TouchableOpacity>
      )
    })
    PageFoods.current.setPage(day)
  }, [])

  return (
    <Container>
      <Content>
        <ViewPage
          ref={PageFoods}
          style={{flex: 1}}
          onPageSelected={(props) => setDay(props.nativeEvent.position)}>
          {foods.length ? (
            foods.map((item, index) => (
              <View
                style={{
                  justifyContent: 'center',
                }}
                key={index}>
                <MButton item={item} launch pageView={PageFoods.current} />
                <MButton item={item} pageView={PageFoods.current} />
              </View>
            ))
          ) : (
            <EmptyContainer>
              <EmptyText>;(</EmptyText>
            </EmptyContainer>
          )}
        </ViewPage>
        <WeekIndicator day={day} press={(index) => PageFoods.current.setPage(index)} />
      </Content>
      <Buttons>
        <Button
          onPress={() => {
            navigation.navigate('Avisos')
            updateThereIsWarn(false)
          }}
          title="Avisos"
          iconColor="#1b2d4f"
          icon="alert-box"
          notify={thereIsWarn}
        />
        <Button
          onPress={() => navigation.navigate('Favoritos')}
          title="Favoritos"
          iconColor="#1b2d4f"
          icon="star"
        />
        <Button
          onPress={() => navigation.navigate('Sugerir')}
          title="Sugerir"
          iconColor="#1b2d4f"
          icon="voice"
        />
      </Buttons>
    </Container>
  )
}

export default Home
