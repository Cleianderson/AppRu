import styled from 'styled-components/native'

import constants from '../../constants'

export const Info = styled.View`
	margin: 20px;
	background-color: ${constants.PRIMARY_BG_COLOR};
	paddingHorizontal: 10px;
	paddingVertical: 15px;
	border-radius: ${constants.RADIUS};
`
export const FoodType = styled.Text`
	font-size: 18px;
	flex-direction: column;
	text-align: center;
	elevation: 2px;
	margin-top: 5px;

	background: ${constants.SECOND_COLOR};
	border-top-left-radius: ${constants.RADIUS};
	border-top-right-radius: ${constants.RADIUS};
`

export const FoodDescription = styled.Text`
	text-align: center;
	background: ${constants.SECOND_BG_COLOR};
	padding: 5px;

	border-bottom-left-radius: ${constants.RADIUS};
	border-bottom-right-radius: ${constants.RADIUS};
`
