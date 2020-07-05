import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import constants from '../../service/constants'

export default function DataNull () {
  return (

    <View style={style.view}>
      <Text style={style.text}>
        O cardápio dessa semana ainda não está disponível
      </Text>
      <Text accessibilityLabel='Carinha triste' style={style.text}>:(</Text>
    </View>

  )
}

const style = StyleSheet.create({
  text: {
    fontSize: 25,
    color: constants.TEXT_COLOR,
    textAlign: 'center'
  },
  view: {
    backgroundColor: constants.DATANULL_BG_COLOR,
    elevation: 5,
    padding: 10,
    justifyContent: 'center',
    margin: 20,
    borderRadius: constants.RADIUS_NUM
  }
})
