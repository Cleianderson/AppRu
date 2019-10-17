import React from 'react'
import { Modal, View } from 'react-native'
import Details from '../Details'

export default function Modals(props) {
	return (
		<Modal
			visible={props.visible}
			transparent={true}
			animationType="slide"
			onRequestClose={() => {
				props.close()
			}}
		>
			<View
				style={{
					flex: 1,
					margin: 10,
					backgroundColor: '#fff',
					paddingHorizontal: 10,
					paddingVertical: 15,
					borderRadius: 7,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Details item={props.data} names={props.names} />
			</View>
		</Modal>
	)
}
