import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import constants from '../../constants'

export default function DataNull() {
  return (

    <View style={style.container}>
      <Text style={style.text}>
        O cardápio dessa semana ainda não está disponível
      </Text>
      <Text>:(</Text>
    </View>

  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: constants.DATANULL_BG_COLOR,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
  }
})
