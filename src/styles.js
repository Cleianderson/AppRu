import styled from 'styled-components/native'
import ViewPagerAndroid from '@react-native-community/viewpager'

export const Container = styled(ViewPagerAndroid)`
  flex: 1;
  background-color: #1b2d4f;
  align-content: center;
  align-items: center;
`

export const Content = styled.View`
  flex: 1;
`

export const Text = styled.Text`
  width: 100%;
  color: #fff;
  font-size: 30px;
  font-family: Akzidenz-Grotesk;
  text-align: center;
`

export const Data = styled.Text`
  color: #ddd;
`

export const InfoDate = styled.View`
  align-items: center;
  align-content: center;
  border-bottom-color: #aaa;
  border-bottom-width: 1px;
  margin-bottom: 20px;
  padding: 5px 2px;
`
export const Info = styled.ScrollView`
  flex: 1;
`
export const FoodType = styled.Text`
  font-size: 18px;
  flex-direction: column;
  text-align: center;
  background: #f9b233;
  margin-left: 30px;
  margin-right: 30px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  elevation: 2px;
`

export const FoodDescription = styled.Text`
  text-align: center;
  background: #ddd;
  padding: 5px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 7px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`
export const Button = styled.TouchableOpacity`
  background: #ddd;
  border-radius: 7px;
  padding: 15px 2px;
  margin: 5px 20px;
`

export const TextButton = styled.Text`
  font-size: 20px;
  text-align: center;
`
