import styled from 'styled-components/native'
import constants from '../../service/constants'

export const Button = styled.TouchableOpacity`
	background: transparent;
	padding: 10px 2px;
	margin: 5px 40px;

	border: 1px solid ${constants.STROKE};
	border-radius: ${constants.RADIUS};
`

export const TextButton = styled.Text`
	font-size: ${constants.NORMAL + 8}px;
	text-align: center;

	color: ${constants.STROKE};
`
export const ButtonDetails = styled.Text`
	font-size: ${constants.NORMAL}px;
	text-align: center;

	color: ${constants.STROKE};
`
