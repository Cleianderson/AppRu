import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import constants from '../../service/constants'

// import { Container } from './styles';

export default function Requesting() {
  return (
    <View
      style={style.container}
    >
      <ActivityIndicator color={constants.SECOND_COLOR} size={72} />
      <Text style={style.text}>Fazendo requisição ao servidor</Text>
    </View>

  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    padding: 10,
    margin: 20,
    borderRadius: constants.RADIUS_NUM,
  },
  text: { color: '#000', fontSize: 16 }
})
