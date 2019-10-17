import styled from 'styled-components/native'
import ViewPagerAndroid from '@react-native-community/viewpager'

const LARGE = 50,
  MEDIUM = 30,
  NORMAL = 12

export const Content = styled(ViewPagerAndroid)`
  flex: 1;
  background-color: #1b2d4f;
  align-content: center;
  align-items: center;
`

export const Container = styled.View`
  flex: 1;
  background-color: #1b2d4f;
`

export const Text = styled.Text`
  width: 100%;
  color: #fff;
  font-size: ${LARGE - 5};
  font-family: Akzidenz-Grotesk;
  text-align: center;
`

export const Data = styled.Text`
  width: 100%;
  font-size: ${MEDIUM - 10};
  text-align: center;
  color: #eee;
`

export const InfoDate = styled.View`
  align-items: center;
  align-content: center;
  padding: 5px 2px;
  background: transparent;
  border-radius: 7px;
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
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 7px;
  padding: 10px 2px;
  margin: 5px 40px;
`

export const TextButton = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #ddd;
`
export const ButtonDetails = styled.Text`
  font-size: 12px;
  text-align: center;
  color: #ddd;
`
