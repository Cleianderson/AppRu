import styled from 'styled-components/native'

import constants from '../../service/constants'

export const Container = styled.View`
  flex: 1;
  margin: 30px 10px 30px 10px;
  `

export const Header = styled.View`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #1b2d4f;
  padding: 10px 7px;
  align-items: center;
`
export const Footer = styled.View`
  flex-direction: row;
  /* margin-top: 5px; */
  margin-bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #1b2d4f;
  padding: 10px 7px;
  align-items: center;
  justify-content: space-between;
`

export const DayText = styled.Text`
  flex: 1;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  `

export const Content = styled.ScrollView`
  /* padding: 2px 10px; */
  background-color: #FFFFFF;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-top-width: 0px;
  /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
  padding: 5px;
`

export const FoodText = styled.Text`
  color: #1b2d4f;
  font-weight: bold;
`
export const FoodDescription = styled.Text`
  text-transform: capitalize;
  color: #666;
  
  border-bottom-left-radius: ${constants.RADIUS};
  border-bottom-right-radius: ${constants.RADIUS};
`

export const FoodContainer = styled.View`
  flex-direction: row;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  align-items: center;
  padding: 5px;
`
export const MenuContainer = styled.View`
  flex:1;
  padding: 2px 4px;

  border-top-left-radius: ${constants.RADIUS};
  border-top-right-radius: ${constants.RADIUS};
`

export const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 5px 10px;
`
export const NavButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #eee;
  border-radius: 10px;
`
