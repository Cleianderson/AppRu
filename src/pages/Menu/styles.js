import styled from 'styled-components/native'

import constants from '../../service/constants'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.ScrollView`
  /* padding: 2px 10px; */
  flex-grow: 1;
  padding: 10px;
`

export const FoodText = styled.Text`
  flex: 1;
  padding-left: 5px;
  color: #fff;
`
export const FoodDescription = styled.Text`
  padding: 4px 7px;
  background: #dde;
  border-bottom-left-radius: ${constants.RADIUS};
  border-bottom-right-radius: ${constants.RADIUS};
`

export const FoodContainer = styled.View`
  flex-direction: column;

  margin: 5px;

  border-radius: 10px;
`
export const MenuContainer = styled.View`
  flex-direction: row;
  padding: 2px 4px;
  background: ${constants.PRIMARY_COLOR};
  justify-content: center;
  align-items: center;

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
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 10px;
  elevation: 1;
`

export const NavText = styled.Text`
  /* margin-left: 5px; */
  /* margin-right: 5px; */
`
