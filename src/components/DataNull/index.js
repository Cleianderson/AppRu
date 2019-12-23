import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import constants from '../../constants'

export default function DataNull() {
  return (

    <View style={style.view}>
      <Text style={style.text}>
        O cardápio dessa semana ainda não está disponível
      </Text>
      <Text style={style.text}>:(</Text>
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
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
})
