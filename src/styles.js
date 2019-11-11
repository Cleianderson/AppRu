import styled from 'styled-components/native'
import ViewPager from '@react-native-community/viewpager'

export const LARGE = 50
export const MEDIUM = 30
export const NORMAL = 12

export const TEXT_COLOR = '#fff'
export const STROKE = '#fff'

export const PRIMARY_COLOR = '#1b2d4f'
export const SECONDARY_COLOR = '#f9b233'

export const ONE_BG_COLOR = '#fff'
export const TWO_BG_COLOR = '#ddd'

export const RADIUS = '7px'

export const Content = styled(ViewPager)`
	flex: 1;
	background-color: ${PRIMARY_COLOR};
	align-content: center;
	align-items: center;
`

export const Container = styled.View`
	flex: 1;

	background-color: ${PRIMARY_COLOR};
`

export const Text = styled.Text`
	width: 100%;
	font-family: Akzidenz-Grotesk;
	text-align: center;

	color: ${TEXT_COLOR};
	font-size: ${LARGE - 5};
`

export const Data = styled.Text`
	width: 100%;
	text-align: center;

	font-size: ${MEDIUM - 10};
	color: ${TEXT_COLOR};
`

export const InfoDate = styled.View`
	align-items: center;
	align-content: center;
	padding: 5px 2px;
	background: transparent;

	border-radius: ${RADIUS};
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

	background: ${SECONDARY_COLOR};
	border-top-left-radius: ${RADIUS};
	border-top-right-radius: ${RADIUS};
`

export const FoodDescription = styled.Text`
	text-align: center;
	background: #ddd;
	padding: 5px;
	margin-left: 30px;
	margin-right: 30px;
	margin-bottom: 7px;

	border-bottom-left-radius: ${RADIUS};
	border-bottom-right-radius: ${RADIUS};
`
export const Button = styled.TouchableOpacity`
	background: transparent;
	padding: 10px 2px;
	margin: 5px 40px;

	border: 1px solid ${STROKE};
	border-radius: ${RADIUS};
`

export const TextButton = styled.Text`
	font-size: ${NORMAL + 8}px;
	text-align: center;

	color: ${STROKE};
`
export const ButtonDetails = styled.Text`
	font-size: ${NORMAL}px;
	text-align: center;

	color: ${STROKE};
`
