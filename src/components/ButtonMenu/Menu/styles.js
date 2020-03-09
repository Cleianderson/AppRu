import styled from 'styled-components/native'

import constants from '../../../service/constants'

export const Info = styled.View`
  margin: 20px;
  background-color: ${constants.PRIMARY_BG_COLOR};
  padding: 4px 0px;
  border-radius: ${constants.RADIUS};
`
export const FoodText = styled.Text`
  flex: 1;
  padding-left: 5px;
  color: #fff;
  /* font-size: 18px; */
  /* text-align: center; */
`
export const FoodDescription = styled.Text`
	padding: 4px 7px;
	color: #333;
  background: #dde;
`

export const FoodContainer = styled.View`
  /* flex: 1; */
  flex-direction: column;
  margin-bottom: 10px;

  border-top-left-radius: ${constants.RADIUS};
  border-top-right-radius: ${constants.RADIUS};
  border-bottom-left-radius: ${constants.RADIUS};
  border-bottom-right-radius: ${constants.RADIUS};
  elevation: 3;
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
