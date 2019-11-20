import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import {
	View,
	TouchableOpacity,
	StatusBar,
	ToastAndroid,
	Linking,
} from 'react-native'

import packageJSON from '../package.json'
import { Text, Container, Content, Data, InfoDate } from './styles'

import api from './service/Api'
import { getDate, tranformNum2Day } from './service/DateUtils'
import { getWeek, setWeek } from './service/Storage'

import Options from './components/Page'
import Modals from './components/Modal'
import Details from './components/Details'

const ARRAY_LAUNCH = [
	'p1',
	'p2',
	'gre',
	'fag',
	'veg',
	'gua',
	'sal',
	'sco',
	'sob',
	'suc',
]
const ARRAY_DINNER = [
	'p1',
	'p2',
	'gre',
	'fag',
	'veg',
	'gua',
	'sal',
	'sopa',
	'sob',
	'suc',
]

export default function App() {
	const [foods, setFoods] = useState(Array)
	const [action, setAction] = useState('')
	const [contentModal, setContentModal] = useState()

	const Page = useRef(Container)

	// Função que faz requisição ao servidor e
	// atualiza as variáveis foods e @week
	async function checkWeekAndSetFoods() {
		const nowWeek = moment().isoWeek()

		const storage = await getWeek('@week')
		const jsonStorage = JSON.parse(storage)

		if (jsonStorage === null || jsonStorage.number_week !== nowWeek) {
			const { data } = await api.get('/thisweek')

			if (data === null) {
				setContentModal(
					<View
						style={{
							backgroundColor: '#a00',
							padding: 10,
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 25,
							}}
						>
							O cardápio dessa semana ainda não está disponível
						</Text>
						<Text>:(</Text>
					</View>
				)
				setAction('dataNull')
			} else {
				setFoods(data.data)
				await setWeek('@week', data.number_week, data.data)
				ToastAndroid.show('Requisição feita ao servidor', ToastAndroid.LONG)
			}
		} else {
			setFoods(jsonStorage.foods)
			ToastAndroid.show('Requisição feita localmente', ToastAndroid.LONG)
		}

		Page.current.setPage(moment().weekday() > 5 ? 0 : moment().weekday() - 1)
	}

	useEffect(() => {
		checkWeekAndSetFoods()
	}, [])

	return (
		<Container>
			<StatusBar backgroundColor='#1b2d4f' />
			<Content ref={Page}>
				{foods.map((item, inx) => (
					<View key={inx}>
						<InfoDate>
							<Text>{tranformNum2Day(inx)}</Text>
							<Data>{getDate(inx)}</Data>
						</InfoDate>
						<Options
							firstAction={() => {
								setContentModal(
									<Details names={ARRAY_LAUNCH} item={item.almoco} />
								)
								setAction('Almoço')
							}}
							secondAction={() => {
								setContentModal(
									<Details names={ARRAY_DINNER} item={item.jantar} />
								)
								setAction('Jantar')
							}}
						/>
					</View>
				))}
				<Modals
					visible={Boolean(action)}
					close={() => setAction('')}
					component={contentModal}
				/>
			</Content>
			<TouchableOpacity
				onPress={() => Linking.openURL('https://github.com/Cleianderson/RUral')}
			>
				<Text
					style={{
						fontSize: 16,
						color: '#57f',
						textDecorationLine: 'underline',
					}}
				>
					CÓDIGO
				</Text>
			</TouchableOpacity>
			<Text style={{ fontSize: 12, color: 'gray' }}>
				Versão {packageJSON.version}
			</Text>
		</Container>
	)
}
