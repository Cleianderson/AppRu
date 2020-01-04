import styled from 'styled-components/native'
import ViewPager from '@react-native-community/viewpager'

import constants from './service/constants'

export const Content = styled(ViewPager)`
	flex: 1;
	/* background-color: ${constants.PRIMARY_COLOR}; */
	align-content: center;
	align-items: center;
`

export const Container = styled.View`
	flex: 1;

	background-color: ${constants.PRIMARY_COLOR};
`

export const Text = styled.Text`
	width: 100%;
	font-family: Akzidenz-Grotesk;
	text-align: center;

	color: ${constants.TEXT_COLOR};
	font-size: ${constants.LARGE - 5};
`

export const Data = styled.Text`
	width: 100%;
	text-align: center;

	font-size: ${constants.MEDIUM - 10};
	color: ${constants.TEXT_COLOR};
`

export const InfoDate = styled.View`
	align-items: center;
	align-content: center;
	padding: 5px 2px;
	background: transparent;

	border-radius: ${constants.RADIUS};
`
export const Info = styled.ScrollView`
	flex: 1;
`
export const FoodType = styled.Text`
	font-size: 18px;
	flex-direction: column;
	text-align: center;
	margin-left: 30px;
	margin-right: 30px;
	elevation: 2px;

	background: ${constants.SECOND_COLOR};
	border-top-left-radius: ${constants.RADIUS};
	border-top-right-radius: ${constants.RADIUS};
`

export const FoodDescription = styled.Text`
	text-align: center;
	background: #ddd;
	padding: 5px;
	margin-left: 30px;
	margin-right: 30px;
	margin-bottom: 7px;

	border-bottom-left-radius: ${constants.RADIUS};
	border-bottom-right-radius: ${constants.RADIUS};
`
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

export const ButtonBar = styled.View`
	flex-direction: row;
	justify-content: space-around;
	borderTopWidth: 1px;
	borderTopColor: #666;
	padding-top:5px;
`
