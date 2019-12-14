import styled from 'styled-components/native'

import {SECONDARY_COLOR, ONE_BG_COLOR, TWO_BG_COLOR,RADIUS} from '../../styles'

export const Info = styled.View`
	margin: 20px;
	background-color: ${ONE_BG_COLOR};
	paddingHorizontal: 10px;
	paddingVertical: 15px;
	border-radius: ${RADIUS};
`
export const FoodType = styled.Text`
	font-size: 18px;
	flex-direction: column;
	text-align: center;
	elevation: 2px;
	margin-top: 5px;

	background: ${SECONDARY_COLOR};
	border-top-left-radius: ${RADIUS};
	border-top-right-radius: ${RADIUS};
`

export const FoodDescription = styled.Text`
	text-align: center;
	background: ${TWO_BG_COLOR};
	padding: 5px;

	border-bottom-left-radius: ${RADIUS};
	border-bottom-right-radius: ${RADIUS};
`
