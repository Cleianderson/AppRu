import React, {useContext, useRef, useEffect} from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
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

  const {foods, day, setDay, reload, thereIsWarn, updateThereIsWarn} = useContext(DataContext)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            width: 150,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={reload}>
            <Icon name="reload" color="#1b2d4f" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Info')}>
            <Icon name="information-outline" color="#1b2d4f" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Config')}>
            <Icon name="settings" color="#1b2d4f" size={25} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <Image style={{width: 50, height: 50}} source={require('../../assets/iconSquare.png')} />
      ),
    })
    PageFoods.current.setPage(day)
  }, [])

  return (
    <Container>
      <WeekIndicator day={day} press={(index) => PageFoods.current.setPage(index)} />
      <Content>
        <ViewPage
          ref={PageFoods}
          style={{flex: 1}}
          onPageScroll={() => {}}
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
              <EmptyText style={{fontSize: 16}}>desculpa, não encontrei a semana</EmptyText>
            </EmptyContainer>
          )}
        </ViewPage>
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
